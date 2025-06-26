import axios from 'axios';

export const fetchTopics = async ()=> {
    const res = await axios.get('https://nc-news-api-b3sf.onrender.com/api/topics');

    return res.data.topics;
}