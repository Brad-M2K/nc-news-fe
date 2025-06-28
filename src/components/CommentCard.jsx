import { useState, useContext } from 'react';
import DeleteCommentButton from './DeleteCommentButton';
import { UserContext } from '../contexts/UserContext';
import TrashIcon from '../assets/TrashIcon.svg?react';
import CancelIcon from '../assets/Cancel.svg?react';
import './CommentCard.css';

function CommentCard({ comment, setCommentCount, isActive, cardRef }) {
    const [isDeleted, setIsDeleted] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { currentUser } = useContext(UserContext);

    if (isDeleted) return null;

    return (
        <li ref={cardRef} className={`comment-card${isActive ? ' in-view' : ''}`}>
            <div className="comment-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <strong>{comment.author}</strong>
                <span className="comment-date" style={{ marginLeft: 'auto' }}>
                    {new Date(comment.created_at).toLocaleString()}
                </span>
            </div>

            <p className="comment-body">{comment.body}</p>

            <div className="comment-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                <span>Votes: {comment.votes}</span>
                {currentUser === comment.author && (
                    !showConfirm ? (
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="delete-comment-button"
                            title="Delete comment"
                            style={{ marginLeft: 'auto', marginBottom: 0 }}
                        >
                            <TrashIcon style={{ width: 20, height: 20, verticalAlign: 'middle', pointerEvents: 'none' }} />
                        </button>
                    ) : (
                        <div className="delete-confirm" style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginBottom: 0 }}>
                            <DeleteCommentButton
                                comment_id={comment.comment_id}
                                onDelete={() => {
                                    setIsDeleted(true);
                                    if (setCommentCount) setCommentCount((count) => count - 1);
                                }}
                            />
                            <button 
                                className="cancel-delete-btn icon-btn"
                                onClick={() => setShowConfirm(false)}
                                title="Cancel"
                                style={{ marginLeft: '0.3rem' }}
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