import { useState } from 'react';
import { postComment } from '../utils/postComment';
import ClipLoader from 'react-spinners/ClipLoader'
import './AddComment.css';
import CommentTextField from './CommentTextField';


function AddComment({ article_id, setComments, setCommentCount }) {
    const [comment, setComment] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [error, setError] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPosting(true);
        setError(null);

        try {
            const newComment = await postComment({
                article_id,
                username: 'jessjelly', //TODO add non hardcoded user once users set up
                body: comment,
            });
            setComments((curr) => [newComment, ...curr]);
            setComment('');
            if (setCommentCount) setCommentCount((count) => count + 1);
        } catch {
            setError('Failed to post comment');
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='post-comment'>
            {isPosting ? (
                <ClipLoader color="#36d7b7" size={50} /> 
            ) : (
                <CommentTextField
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    isFocused={isFocused}
                    showConfirm={showConfirm}
                    setShowConfirm={setShowConfirm}
                    setComment={setComment}
                    setIsFocused={setIsFocused}
                    error={error}
                />
            )}
        </form>
    )
}

export default AddComment;