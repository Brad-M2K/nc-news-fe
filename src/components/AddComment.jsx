import { useState } from 'react';
import { postComment } from '../utils/postComment';
import ClipLoader from 'react-spinners/ClipLoader'


function AddComment({ article_id, setComments}) {
    const [comment, setComment] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [error, setError] = useState(null);
    

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
                <>
                    <input
                        type="text"
                        placeholder="Join the discussion"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button type="submit" disabled={!comment.trim()}>Comment</button>
                </>
            )}
            {error && <p className='error'>{error}</p>}
        </form>
    )
}

export default AddComment;