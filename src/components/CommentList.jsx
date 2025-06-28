import { useState, useEffect } from 'react';
import { fetchCommentsByArticleId } from '../utils/fetchCommentsByArticleId';
import CommentCard from './CommentCard';
import AddComment from './AddComment';
import ClipLoader from 'react-spinners/ClipLoader';
import ErrorPage from "./ErrorPage";
import useMobileInView from './useMobileInView';
import './CommentList.css';

function CommentList({ article_id, setCommentCount }){
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [activeComment, cardRefs] = useMobileInView(comments, c => c.comment_id);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetchCommentsByArticleId(article_id, true);
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
                <ErrorPage message={
                    error.includes('Network') ? 'Network error: Please check your connection.' :
                    error.includes('404') ? 'Comments not found.' :
                    `Failed to load comments: ${error}`
                } />
            ) : (
                <section className="comments">
                    <h2>Discourse</h2>
                    <AddComment article_id={article_id} setComments={setComments} setCommentCount={setCommentCount} />
                    {comments.length === 0 && <p>No comments yet. Be the first to speak!</p>}
                    <ul>
                        {comments.map((comment, idx) => (
                            <CommentCard
                                key={comment.comment_id}
                                comment={comment}
                                setCommentCount={setCommentCount}
                                isActive={activeComment === comment.comment_id}
                                cardRef={el => cardRefs.current[idx] = el}
                            />
                        ))}
                    </ul>
                </section>
            )}
        </>
    )
}

export default CommentList;