import axios from 'axios';


export const fetchArticleById = async (article_id) => {
    const url = `https://nc-news-api-b3sf.onrender.com/api/articles/${article_id}`;
    try {
        const res = await axios.get(url);
        return res.data.article;
    } catch (err) {
        throw new Error(`Failed to fetch article: ${err.message}`);
    }
};