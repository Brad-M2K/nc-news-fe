import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchArticles } from '../utils/api'

function ArticleView() {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await fetchArticles(article_id);
                setArticle(res || {});
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
            <img id="article-view-img" src={article.article_img_url}/>
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