import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {fetchArticleById}  from '../utils/fetchArticleById';
import CommentList from './CommentList'; // adjust path if needed
import VoteButtons from './VoteButtons';
import ClipLoader from 'react-spinners/ClipLoader';
import ErrorPage from "./ErrorPage";
import ArticleMeta from './ArticleMeta';
import './ArticleView.css';

function ArticleView({ setCommentCount }) {
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
                const res = await fetchArticleById(article_id);
                setArticle(res || {});
                setVoteCount(res.votes);
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
                  <ArticleMeta
                    author={article.author}
                    topic={article.topic}
                    showAuthor={true}
                    showTopic={true}
                    topicLink={true}
                  />
              <img id="article-view-img" src={article.article_img_url} />
              <h2>{article.title}</h2>
              <article>
                <p>{article.body}</p>
              </article>
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
              <hr className="article-comments-separator" />
              <CommentList article_id={article_id} setCommentCount={setCommentCount} />
            </div>
          )}
        </main>
    );
}

export default ArticleView;