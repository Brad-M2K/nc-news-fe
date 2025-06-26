import axios from 'axios';

// Inside src/utils/api.js
export const fetchData = async (article_id = null, getComments = false) => {
    let url = 'https://nc-news-api-b3sf.onrender.com/api/articles';

    if (article_id) {
        url += `/${article_id}`;
        if (getComments) url += '/comments';
    }

    try {
        const res = await axios.get(url);
        const data = res.data;

        if (getComments) return data.comments;
        if (article_id) return data.article;
        return data.articles;
    } catch (err) {
        throw new Error('Failed to fetch data', err);
    }
};