import { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';
import CommentCard from './CommentCard';
import AddComment from './AddComment';
import ClipLoader from 'react-spinners/ClipLoader';

function Comments({ article_id, setCommentCount }){
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
            {isLoading ? (
                <div className="loading-container">
                    <ClipLoader color="#36d7b7" size={50} />
                </div>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <section className="comments">
                    <h2>Discourse</h2>
                    <AddComment article_id={article_id} setComments={setComments} setCommentCount={setCommentCount} />
                    {comments.length === 0 && <p>No comments yet. Be the first to speak!</p>}
                    <ul>
                        {comments.map((comment) => (
                            <CommentCard key={comment.comment_id} comment={comment} setCommentCount={setCommentCount} />
                        ))}
                    </ul>
                </section>
            )}
        </>
    )
}

export default Comments;