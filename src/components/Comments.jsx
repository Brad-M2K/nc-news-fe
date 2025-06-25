import { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';
import CommentCard from './CommentCard';

function Comments({ article_id }){

    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();


    useEffect(() => {
            const fetchComments = async () => {
                try {
                    const res = await fetchData(article_id, true);
                    setComments(res || []);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchComments();
    }, [article_id]);
    

    return (
        <>
            {isLoading && <p>Loading Comments...</p>}
            {error && <p>Error: {error}</p>}
            
            {!isLoading && !error && (
                <section className="comments">
                    <h2>Discourse</h2>
                    {comments.length === 0 && <p>No comments yet. Be the first to speak!</p>}
                    <ul>
                        {comments.map((comment) => (
                            <CommentCard key={comment.comment_id} comment={comment} />
                        ))}
                    </ul>
                </section>
            )}
        </>
    )
}

export default Comments;