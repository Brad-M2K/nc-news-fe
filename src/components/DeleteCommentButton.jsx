import { useState } from 'react';
import deleteComment from '../utils/deleteComment';
import TrashIcon from '../assets/TrashIcon.svg?react';
import ClipLoader from 'react-spinners/ClipLoader';


function DeleteCommentButton({comment_id, onDelete}) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (loading) return;
        setLoading(true);
        try {
            await deleteComment( comment_id );
            onDelete();
        } finally {
            setLoading(false);
        }
    };

    return (
        <button className="delete-comment-button" onClick={handleDelete} title="Delete comment" disabled={loading}>
            {loading ? (
                <ClipLoader size={20} color="#ff2222" />
            ) : (
                <TrashIcon style={{ width: 20, height: 20, verticalAlign: 'middle' }} />
            )}
        </button>
    );
}

export default DeleteCommentButton;