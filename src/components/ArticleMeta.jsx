import './ArticleMeta.css';
import TopicsIcon from '../assets/Topics.svg?react';
import UserIcon from '../assets/User-Icon.svg?react';
import MessageCircleIcon from '../assets/Message-Circle-Icon.svg?react';
import VoteButtons from './VoteButtons';
import { Link } from 'react-router-dom';

function ArticleMeta({
  author,
  topic,
  articleId,
  votes,
  voteCount,
  setVoteCount,
  commentCount,
  createdAt,
  showVotes = false,
  showAuthor = true,
  showTopic = true,
  showComments = false,
  showDate = false,
  topicLink = false
}) {
  return (
    <div className="article-meta">
      {showAuthor && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
          <UserIcon style={{ width: 20, height: 20, verticalAlign: 'middle', pointerEvents: 'none' }} />
          {author}
        </span>
      )}
      {showTopic && (
        topicLink ? (
          <span className="topic-meta-span">
            <Link to={`/topics/${topic}`} className="topic-link">
              <TopicsIcon className="topic-icon" style={{ width: 20, height: 20, verticalAlign: 'middle', pointerEvents: 'none' }} />
              {topic}
            </Link>
          </span>
        ) : (
          <span className="topic-meta-span" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <TopicsIcon className="topic-icon" style={{ width: 20, height: 20, verticalAlign: 'middle', pointerEvents: 'none' }} />
            {topic}
          </span>
        )
      )}
      {showVotes && (
        <VoteButtons
          type="article"
          id={articleId}
          votes={votes}
          voteCount={voteCount}
          setVoteCount={setVoteCount}
        />
      )}
      {showComments && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
          <MessageCircleIcon style={{ width: 20, height: 20, verticalAlign: 'middle', pointerEvents: 'none' }} />
          {commentCount}
        </span>
      )}
      {showDate && createdAt && (
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      )}
    </div>
  );
}

export default ArticleMeta;
