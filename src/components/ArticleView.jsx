import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {fetchArticleById}  from '../utils/fetchArticleById';
import CommentList from './CommentList'; // adjust path if needed
import VoteButtons from './VoteButtons';
import ClipLoader from 'react-spinners/ClipLoader';
import ErrorPage from "./ErrorPage";
import MessageCircleIcon from '../assets/Message-Circle-Icon.svg?react';
import TopicsIcon from '../assets/Topics.svg?react';
import UserIcon from '../assets/User-Icon.svg?react';


function ArticleView() {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [voteCount, setVoteCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    // Scroll to top on mount/article change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [article_id]);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await fetchArticleById(article_id);
                setArticle(res || {});
                setVoteCount(res.votes);
                setCommentCount(res.comment_count);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchArticle();
    }, [article_id]);

    
    return (
        <main className="article-view">
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh', width: '100%' }}>
              <ClipLoader color="#36d7b7" size={70} />
            </div>
          ) : error ? (
            <ErrorPage message={
              error.includes('Network') ? 'Network error: Please check your connection.' :
              error.includes('404') ? 'Article not found.' :
              `Failed to load article: ${error}`
            } />
          ) : !article.title ? (
            <p>No article found.</p>
          ) : (
                <div className="article-view-container">
                  
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
              <img id="article-view-img" src={article.article_img_url} />
              <h2>{article.title}</h2>
              <article>
                <p>{article.body}</p>
              </article>
              <div className="article-meta">
                  <VoteButtons
                    type="article"
                    id={article_id}
                    votes={article.votes}
                    voteCount={voteCount}
                    setVoteCount={setVoteCount}
                  />
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <MessageCircleIcon style={{ width: 20, height: 20, verticalAlign: 'middle', pointerEvents: 'none' }} />
                  {article.comment_count}
                </span>
                <span>{new Date(article.created_at).toLocaleDateString()}</span>
              </div>
              <hr className="article-comments-separator" />
              <CommentList article_id={article_id} setCommentCount={setCommentCount} />
            </div>
          )}
        </main>
    );
}

export default ArticleView;