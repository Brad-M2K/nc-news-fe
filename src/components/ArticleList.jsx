import { useEffect, useState, useRef } from "react";
import ArticleCard from "./ArticleCard";
import {fetchAllArticles} from '../utils/fetchArticles';
import ClipLoader from 'react-spinners/ClipLoader';
import SortControls from './SortControls';
import ErrorPage from "./ErrorPage";
import './ArticleList.css';



function ArticleList({ topic, articles: propArticles }) {
    const [articles, setArticles] = useState(propArticles || []);
    const [isLoading, setIsLoading] = useState(!propArticles);
    const [error, setError] = useState(null);
    const [activeCard, setActiveCard] = useState(null);
    const cardRefs = useRef([]);
    const [order, setOrder] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const hasRestoredScroll = useRef(false);

    useEffect(() => {
        if (propArticles) {
            setArticles(propArticles);
            setIsLoading(false);
            return;
        }
        const getArticles = async () => {
            try {
                let data = await fetchAllArticles({ topic, sortBy, order });
                setArticles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        getArticles();
    }, [topic, propArticles, sortBy, order]);

    // Restore scroll position when returning from article view
    useEffect(() => {
        if (!isLoading && articles.length && !hasRestoredScroll.current) {
            const savedScrollPosition = sessionStorage.getItem('articleListScrollPosition');
            const savedTopic = sessionStorage.getItem('articleListTopic');
            
            if (savedScrollPosition && (topic || 'all') === savedTopic) {
                setTimeout(() => {
                    window.scrollTo(0, parseInt(savedScrollPosition));
                    hasRestoredScroll.current = true;
                    // Clear the saved position after using it
                    sessionStorage.removeItem('articleListScrollPosition');
                    sessionStorage.removeItem('articleListTopic');
                }, 100);
            }
        }
    }, [isLoading, articles, topic]);

    useEffect(() => {
        if (!articles.length) return;
        cardRefs.current = cardRefs.current.slice(0, articles.length);
        const handleScroll = () => {
            let minDist = Infinity;
            let minIdx = null;
            cardRefs.current.forEach((ref, idx) => {
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    const cardCenter = rect.top + rect.height / 2;
                    const viewportCenter = window.innerHeight / 2;
                    const dist = Math.abs(cardCenter - viewportCenter);
                    if (dist < minDist) {
                        minDist = dist;
                        minIdx = idx;
                    }
                }
            });
            setActiveCard(minIdx !== null ? articles[minIdx].article_id : null);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call
        return () => window.removeEventListener('scroll', handleScroll);
    }, [articles]);

    if (isLoading) {
        return (
            <div className="topics-loader">
                <ClipLoader color="#36d7b7" size={70} />
            </div>
        );
    }

    if (error) {
        return <ErrorPage message={
            error.includes('Network') ? 'Network error: Please check your connection.' :
            error.includes('404') ? 'Articles not found.' :
            `Failed to load articles: ${error}`
        } />;
    }

    return (
        <div className="article-list-container">
            <SortControls
                sortBy={sortBy}
                setSortBy={setSortBy}
                order={order}
                setOrder={setOrder}
            />
            <ul>
                {articles.map((article, idx) => (
                    <ArticleCard
                        key={article.article_id}
                        article={article}
                        isActive={activeCard === article.article_id}
                        cardRef={el => cardRefs.current[idx] = el}
                        topic={topic}
                    />
                ))}
            </ul>
        </div>
    );
}

export default ArticleList;