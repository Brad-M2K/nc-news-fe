import axios from 'axios';


export const fetchCommentsByArticleId = async (article_id) => {
    const url = `https://nc-news-api-b3sf.onrender.com/api/articles/${article_id}/comments`;
    try {
        const res = await axios.get(url);
        return res.data.comments;
    } catch (err) {
        throw new Error(`Failed to fetch comments: ${err.message}`);
    }
};