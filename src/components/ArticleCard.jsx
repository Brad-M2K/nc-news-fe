import { Link } from "react-router-dom";
import { useState } from 'react';
import ArticleMeta from './ArticleMeta';
import VoteButtons from "./VoteButtons";
import MessageCircleIcon from '../assets/Message-Circle-Icon.svg?react';
import TopicsIcon from '../assets/Topics.svg?react';
import UserIcon from '../assets/User-Icon.svg?react';
import './ArticleCard.css';

function ArticleCard({ article, isActive, cardRef, topic }) {
    const [voteCount, setVoteCount] = useState(article.votes);

    const handleArticleClick = () => {
        // Save current scroll position and topic before navigating
        sessionStorage.setItem('articleListScrollPosition', window.scrollY.toString());
        sessionStorage.setItem('articleListTopic', topic || 'all');
    };

    return (
        <li ref={cardRef} className={`article-card${isActive ? ' in-view' : ''}`}>
            <ArticleMeta
                author={article.author}
                topic={article.topic}
                showAuthor={true}
                showTopic={true}
                topicLink={true}
            />
            <Link to={`/articles/${article.article_id}`} onClick={handleArticleClick}>
                <img id="article-cards-img" src={article.article_img_url}/>
                <h2>{article.title}</h2>
            </Link>
            <ArticleMeta
                articleId={article.article_id}
                votes={article.votes}
                voteCount={voteCount}
                setVoteCount={setVoteCount}
                commentCount={article.comment_count}
                createdAt={article.created_at}
                showVotes={true}
                showComments={true}
                showDate={true}
                showAuthor={false}
                showTopic={false}
            />
        </li>
    );
}

export default ArticleCard;