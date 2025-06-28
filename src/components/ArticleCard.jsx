import { Link } from "react-router-dom";
import { useState } from 'react';
import VoteButtons from "./VoteButtons";
import MessageCircleIcon from '../assets/Message-Circle-Icon.svg?react';
import TopicsIcon from '../assets/Topics.svg?react';
import UserIcon from '../assets/User-Icon.svg?react';

function ArticleCard({ article, isActive, cardRef }) {
    const [voteCount, setVoteCount] = useState(article.votes);

    return (
        <li ref={cardRef} className={`article-card${isActive ? ' in-view' : ''}`}>
            <div className="article-meta">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <UserIcon style={{ width: 20, height: 20, verticalAlign: 'middle', pointerEvents: 'none' }} />
                  {article.author}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <TopicsIcon style={{ width: 20, height: 20, verticalAlign: 'middle', pointerEvents: 'none' }} />
                  {article.topic}
                </span>
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
                    setVoteCount={setVoteCount} />
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MessageCircleIcon style={{ width: 20, height: 20, verticalAlign: 'middle', pointerEvents: 'none' }} />
                    {article.comment_count}
                </span>
                <span>{new Date(article.created_at).toLocaleDateString()}</span>
            </div>
        </li>
    );
}

export default ArticleCard;