import { useState, useContext } from 'react';
import DeleteCommentButton from './DeleteCommentButton';
import { UserContext } from '../contexts/UserContext';
import TrashIcon from '../assets/TrashIcon.svg?react';
import CancelIcon from '../assets/Cancel.svg?react';

function CommentCard({ comment }) {
    const [isDeleted, setIsDeleted] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { currentUser } = useContext(UserContext);

    if (isDeleted) return null;

    return (
        <li className="comment-card">
            <div className="comment-header">
                <strong>{comment.author}</strong>
                <span className="comment-date">
                    {new Date(comment.created_at).toLocaleString()}
                </span>
            </div>

            <p className="comment-body">{comment.body}</p>

            <div className="comment-footer">
                <span>Votes: {comment.votes}</span>

                {currentUser === comment.author && (
                    !showConfirm ? (
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="delete-comment-button"
                            title="Delete comment"
                        >
                            <TrashIcon style={{ width: 20, height: 20, verticalAlign: 'middle', pointerEvents: 'none' }} />
                        </button>
                    ) : (
                        <div className="delete-confirm">
                            <DeleteCommentButton
                                comment_id={comment.comment_id}
                                onDelete={() => setIsDeleted(true)}
                            />
                            <button 
                                className="cancel-delete-btn icon-btn"
                                onClick={() => setShowConfirm(false)}
                                title="Cancel"
                            >
                                <CancelIcon style={{ width: 20, height: 20, verticalAlign: 'middle', pointerEvents: 'none' }} />
                            </button>
                        </div>
                    )
                )}
            </div>
        </li>
    );
}

export default CommentCard;