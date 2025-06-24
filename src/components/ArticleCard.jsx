import { Link } from "react-router-dom";

function ArticleCard({ article }) {
    return (
        <li className="article-card">
            <Link to={`/articles/${article.article_id}`}>
                <h2>{article.title}</h2>
            </Link>
            <div className="article-meta">
                <span>By {article.author}</span> |
                <span>Topic: {article.topic}</span> |
                <span>Votes: {article.votes}</span> |
                <span>Comments: {article.comment_count}</span> |
                <span>Posted: {new Date(article.created_at).toLocaleString()}</span>
            </div>
            <p>{article.body?.slice(0, 120)}{article.body && article.body.length > 120 ? '...' : ''}</p>
        </li>
    );
}

export default ArticleCard;