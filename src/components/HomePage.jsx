import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";

import { fetchData } from '../utils/api';

function HomePage() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const getArticles = async () => {
        try {
          const articlesData = await fetchData();
          setArticles(articlesData);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      getArticles();
    }, []);

  if (isLoading) return <main>Loading articles...</main>;
  if (error) return <main>Error: {error}</main>;

  return (
    <main className="homepage">
      <h1 style={{ color: '#1a237e', marginBottom: '2rem', letterSpacing: '2px' }}>All Articles</h1>
      <ul>
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </ul>
    </main>
  );
}

export default HomePage;