

// Inside src/utils/api.js
export const fetchData = async (article_id = null, getComments = false) => {
    let url = 'https://nc-news-api-b3sf.onrender.com/api/articles';

    if (article_id) {
        url += `/${article_id}`;
        if (getComments) url += '/comments';
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();

    // Decide what to return depending on what was fetched
    if (getComments) return data.comments;
    if (article_id) return data.article;
    return data.articles;
};