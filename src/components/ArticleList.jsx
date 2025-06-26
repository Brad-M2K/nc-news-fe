import { useEffect, useState, useRef } from "react";
import ArticleCard from "./ArticleCard";
import {fetchAllArticles} from '../utils/fetchAllArticles';
import ClipLoader from 'react-spinners/ClipLoader';



function ArticleList({ topic, articles: propArticles }) {
    const [articles, setArticles] = useState(propArticles || []);
    const [isLoading, setIsLoading] = useState(!propArticles);
    const [error, setError] = useState(null);
    const [activeCard, setActiveCard] = useState(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        if (propArticles) {
            setArticles(propArticles);
            setIsLoading(false);
            return;
        }
        const getArticles = async () => {
            try {
                let data = await fetchAllArticles({ topic });
                setArticles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        getArticles();
    }, [topic, propArticles]);

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
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    return (
        <div className="article-list-container">
            <ul>
                {articles.map((article, idx) => (
                    <ArticleCard
                        key={article.article_id}
                        article={article}
                        isActive={activeCard === article.article_id}
                        cardRef={el => cardRefs.current[idx] = el}
                    />
                ))}
            </ul>
        </div>
    );
}

export default ArticleList;