import { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard'; 
import ArticleList from './ArticleList';
import ClipLoader from 'react-spinners/ClipLoader';
import TopicsList from './TopicsList';
import { useLocation, useParams } from 'react-router-dom';
import { fetchAllArticles } from '../utils/fetchAllArticles';



function TopicPage() {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const { topic } = useParams();

    // Reset selectedTopic if the nav triggers a reset
    useEffect(() => {
        if (location.state && location.state.reset) {
            setSelectedTopic(null);
            setArticles([]);
            setIsLoading(false);
        }
    }, [location.state]);

    useEffect(() => {
        const currentTopic = selectedTopic || topic;
        if (!currentTopic) return;

        const fetchArticles = async () => {
            setIsLoading(true);
            try {
                // Use your fetchAllArticles or fetchArticlesByTopic here
                const topicArticles = await fetchAllArticles({ topic: currentTopic });
                setArticles(topicArticles);
            } catch (error) {
                console.error("Error fetching articles by topic:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, [selectedTopic, topic]);

    // Scroll to top when this page is mounted or navigated to
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.key]);

    return (
        <main className="topics-page">
            {selectedTopic || topic ? (
                isLoading ? (
                    <div className="topics-loader">
                        <ClipLoader color="#36d7b7" size={70} />
                    </div>
                ) : (
                    <>
                        <h2 className="topic-header">
                            {selectedTopic || topic} Articles
                        </h2>
                        <ArticleList articles={articles} />
                    </>
                        
                )
            ) : (
                <TopicsList onSelectTopic={setSelectedTopic} />
            )}
        </main>
    );
}

export default TopicPage;