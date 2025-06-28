import axios from 'axios';

export const fetchAllArticles = async ({ topic, sortBy, order } = {}) => {
    let url = new URL('https://nc-news-api-b3sf.onrender.com/api/articles');


    if (topic) url.searchParams.append('topic', topic);
    if (sortBy) url.searchParams.append('sort_by', sortBy);
    if (order) url.searchParams.append('order', order);

    try {
        const res = await axios.get(url.toString());
        return res.data.articles;
    } catch (err) {
        throw new Error(`Failed to fetch articles: ${err.message}`);
    }
};



