import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchData } from '../utils/api'
import Comments from './Comments'; // adjust path if needed
import VoteButtons from './VoteButtons';

function ArticleView() {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [voteCount, setVoteCount] = useState(0);

    // Scroll to top on mount/article change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [article_id]);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await fetchData(article_id);
                setArticle(res || {});
                setVoteCount(res.votes)
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
            <div className="article-meta">
                <span>By {article.author}</span> |
                <span>Topic: {article.topic}</span> |
            </div>
            <img id="article-view-img" src={article.article_img_url}/>
            <h2>{article.title}</h2>
            <div className="article-meta">
                <VoteButtons type="article" id={article_id} votes={article.votes} voteCount={voteCount} setVoteCount={setVoteCount}/> |
                <span>💬 {article.comment_count}</span> |
                <span>Posted: {new Date(article.created_at).toLocaleString()}</span>
            </div>
            <article>
                <p>{article.body}</p>
            </article>
            <Comments article_id={article_id}/>
        </main>
    );
}

export default ArticleView;