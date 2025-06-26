import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchData } from '../utils/api'
import Comments from './Comments'; // adjust path if needed
import VoteButtons from './VoteButtons';
import ClipLoader from 'react-spinners/ClipLoader';


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
                const res = await fetchData(article_id);
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
            <ClipLoader color="#36d7b7" size={50} />
          ) : error ? (
            <p>Error: {error}</p>
          ) : !article.title ? (
            <p>No article found.</p>
          ) : (
            <div className="article-card-container">
              <div className="article-meta">
                <span>By {article.author}</span> | <span>Topic: {article.topic}</span> |
              </div>
              <img id="article-view-img" src={article.article_img_url} />
              <h2>{article.title}</h2>
              <div className="article-meta">
                <VoteButtons
                  type="article"
                  id={article_id}
                  votes={article.votes}
                  voteCount={voteCount}
                  setVoteCount={setVoteCount}
                /> |
                <span>💬 {commentCount}</span> |
                <span>Posted: {new Date(article.created_at).toLocaleString()}</span>
              </div>
              <article>
                <p>{article.body}</p>
              </article>
              <hr className="article-comments-separator" />
              <Comments article_id={article_id} setCommentCount={setCommentCount} />
            </div>
          )}
        </main>
    );
}

export default ArticleView;