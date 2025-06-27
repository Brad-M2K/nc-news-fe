import { useEffect, useState } from 'react';
import { fetchTopics } from '../utils/fetchTopics'; 
import ClipLoader from 'react-spinners/ClipLoader';
import ErrorPage from './ErrorPage';

function TopicsList({ onSelectTopic }) {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTopics = async () => {
            try {
                const data = await fetchTopics();
                setTopics(data);
            } catch (error) {
                setError('Failed to load topics. Please try again later.', error);
            } finally {
                setIsLoading(false);
            }
        };
        getTopics();
    }, []);

    if (isLoading) {
        return (
            <div className="topics-loader">
                <ClipLoader color="#36d7b7" size={70} />
            </div>
        );
    }

    if (error) {
        return <ErrorPage message={error} />;
    }

    return (
        <div className="topics-list">
            <div className="topics-grid">
                {topics.map(({ slug, description }) => (
                    <div key={slug} className="topic-card">
                        <button onClick={() => onSelectTopic(slug)} className="topic-button">
                            <h3 className="topic-title">{slug}</h3>
                            <p className="topic-description">{description}</p>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopicsList;
