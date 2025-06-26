import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopics } from '../utils/fetchTopics'; // Adjust path if needed
import ClipLoader from 'react-spinners/ClipLoader';

function TopicsList({ onSelectTopic }) {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getTopics = async () => {
            try {
                const data = await fetchTopics();
                setTopics(data);
            } catch (err) {
                console.error("Error fetching topics:", err);
            } finally {
                setIsLoading(false);
            }
        };
    getTopics();
    }, []);

    return (
        <div className="topics-list">
            {isLoading ? (
                <div className="topics-loader">
                    <ClipLoader color="#36d7b7" size={70} />
                </div>
            ) : (
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
            )}
        </div>
    );
}

export default TopicsList;
