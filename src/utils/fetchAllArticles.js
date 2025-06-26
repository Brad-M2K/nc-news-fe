import axios from 'axios';

export const fetchAllArticles = async ({ topic } = {}) => {
    let url = 'https://nc-news-api-b3sf.onrender.com/api/articles';
    const params = {};
    if (topic) params.topic = topic;
    try {
        const res = await axios.get(url, { params });
        return res.data.articles;
    } catch (err) {
        throw new Error(`Failed to fetch articles: ${err.message}`);
    }
};



