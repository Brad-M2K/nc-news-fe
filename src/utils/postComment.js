import axios from 'axios';

export const postComment = async ({ article_id, username, body }) => {
    const url = `https://nc-news-api-b3sf.onrender.com/api/articles/${article_id}/comments`;
    const commentData = { username, body };
    const res = await axios.post(url, commentData);
    

    return res.data.comment;
}