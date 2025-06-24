import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ArticleView() {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await fetch(`https://nc-news-api-b3sf.onrender.com/api/articles/${article_id}`);
                if (!res.ok) throw new Error("Failed to fetch articles");
                const data = await res.json();
                setArticle(data.article || {});
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchArticle();
    }, [article_id]);

    if (isLoading) return <main>Loading article...</main>;
    if (error) return <main>Error: {error}</main>;
    if (!article.title) return <main>No article found.</main>;

    return (
        <main className="article-view">
            <h2>{article.title}</h2>
            <div className="article-meta">
                <span>By {article.author}</span> |
                <span>Topic: {article.topic}</span> |
                <span>Votes: {article.votes}</span> |
                <span>Comments: {article.comment_count}</span> |
                <span>Posted: {new Date(article.created_at).toLocaleString()}</span>
            </div>
            <article>
                <p>{article.body}</p>
            </article>
        </main>
    );
}

export default ArticleView;