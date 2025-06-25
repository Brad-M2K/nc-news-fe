export const patchVotes = async (type, id, inc) => {
    const endpoint = type === 'article'
        ? `/articles/${id}`
        : `/comments/${id}`;

    const res = await fetch(`https://nc-news-api-b3sf.onrender.com/api${endpoint}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inc_votes: inc }),
    });

    if (!res.ok) throw new Error('Vote update failed');
    return res.json();
};