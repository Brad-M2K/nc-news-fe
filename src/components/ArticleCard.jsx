import { Link } from "react-router-dom";
import { useState } from 'react';
import VoteButtons from "./VoteButtons";

function ArticleCard({ article, isActive, cardRef }) {
    const [voteCount, setVoteCount] = useState(article.votes);

    return (
        <li ref={cardRef} className={`article-card${isActive ? ' in-view' : ''}`}>
            <div>
            <span>By {article.author}</span> | 
            <span> Topic: {article.topic} </span> 
            </div>
            <Link to={`/articles/${article.article_id}`}>
                <img id="article-cards-img" src={article.article_img_url}/>
                <h2>{article.title}</h2>
            </Link>
            <div className="article-meta">
                <VoteButtons
                    type="article"
                    id={article.article_id}
                    votes={article.votes}
                    voteCount={voteCount}
                    setVoteCount={setVoteCount} />| 
                <span> 💬 {article.comment_count} </span> |
                <span> Posted: {new Date(article.created_at).toLocaleString()}</span>
            </div>
            
        </li>
    );
}

export default ArticleCard;