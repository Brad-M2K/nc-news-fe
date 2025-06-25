


function CommentCard({comment}) {
    return (
        <li className="comment-card">
            <div className="comment-header">
                <strong>{comment.author}</strong>
                <span className="comment-date">{new Date(comment.created_at).toLocaleString()}</span>
            </div>
            <p className="comment-body">{comment.body}</p>
            <div className="comment-footer">
                <span>Votes: {comment.votes}</span>
            </div>
        </li>
    );
}

export default CommentCard;