import axios from 'axios';

export const patchVotes = async (type, id, inc) => {
    const endpoint = type === 'article'
        ? `/articles/${id}`
        : `/comments/${id}`;

    const { data } = await axios.patch(
        `https://nc-news-api-b3sf.onrender.com/api${endpoint}`,
        { inc_votes: inc },
        { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
};