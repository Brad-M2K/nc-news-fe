import { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard'; 
import ArticleList from './ArticleList';
import ClipLoader from 'react-spinners/ClipLoader';
import TopicsList from './TopicsList';
import { useLocation, useParams } from 'react-router-dom';



function TopicPage() {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [sortBy, setSortBy] = useState(null);
    const [order, setOrder] = useState(null);
    const location = useLocation();
    const { topic } = useParams();

    // Reset selectedTopic if the nav triggers a reset
    useEffect(() => {
        if (location.state && location.state.reset) {
            setSelectedTopic(null);
            setIsLoading(false);
        }
    }, [location.state]);


    // Scroll to top when this page is mounted or navigated to
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.key]);

    return (
        <main className="topics-page">
            {(selectedTopic || topic) ? (
                isLoading ? (
                    <div className="topics-loader">
                        <ClipLoader color="#36d7b7" size={70} />
                    </div>
                ) : (
                    <>
                        <h2 className="topic-header">
                            {selectedTopic || topic} Articles
                        </h2>
                        <ArticleList
                            topic={selectedTopic || topic}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            order={order}
                            setOrder={setOrder}
                        />
                    </>
                )
            ) : (
                <TopicsList onSelectTopic={setSelectedTopic} />
            )}
        </main>
    );
}

export default TopicPage;