import axios from 'axios';


export const deleteComment = async (comment_id) => {
    const res = await axios.delete(
        `https://nc-news-api-b3sf.onrender.com/api/comments/${comment_id}`
    );
    return res;
}

export default deleteComment;