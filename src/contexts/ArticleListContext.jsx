import React, { createContext, useContext, useState, useRef } from 'react';

const ArticleListContext = createContext();

export const useArticleList = () => {
  const context = useContext(ArticleListContext);
  if (!context) {
    throw new Error('useArticleList must be used within an ArticleListProvider');
  }
  return context;
};

export const ArticleListProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [order, setOrder] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastFetchKey, setLastFetchKey] = useState('');
  const articlesRef = useRef([]);
  const scrollTimeoutRef = useRef(null);

  const getStorageKey = (topic) => `articleList_${topic || 'all'}`;

  const saveState = (topic, data) => {
    const stateToSave = {
      articles: data.articles || articles,
      sortBy: data.sortBy !== undefined ? data.sortBy : sortBy,
      order: data.order !== undefined ? data.order : order,
      scrollPosition: data.scrollPosition !== undefined ? data.scrollPosition : scrollPosition,
      timestamp: Date.now()
    };
    try {
      sessionStorage.setItem(getStorageKey(topic), JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Could not save article list state:', e);
    }
  };

  const loadState = (topic) => {
    try {
      const saved = sessionStorage.getItem(getStorageKey(topic));
      if (saved) {
        const parsedState = JSON.parse(saved);
        if (Date.now() - parsedState.timestamp < 10 * 60 * 1000) {
          return parsedState;
        }
      }
    } catch (e) {
      console.warn('Could not load article list state:', e);
    }
    return null;
  };

  const clearState = (topic) => {
    try {
      sessionStorage.removeItem(getStorageKey(topic));
    } catch (e) {
      console.warn('Could not clear article list state:', e);
    }
  };

  const updateScrollPosition = (position) => {
    setScrollPosition(position);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      saveState(currentTopic, { scrollPosition: position });
    }, 200);
  };

  const needsRefetch = (topic, newSortBy, newOrder) => {
    const fetchKey = `${topic || 'all'}_${newSortBy || 'default'}_${newOrder || 'default'}`;
    return fetchKey !== lastFetchKey;
  };

  const updateArticles = (newArticles, topic, newSortBy, newOrder) => {
    setArticles(newArticles);
    articlesRef.current = newArticles;
    const fetchKey = `${topic || 'all'}_${newSortBy || 'default'}_${newOrder || 'default'}`;
    setLastFetchKey(fetchKey);
    setScrollPosition(0);
    saveState(topic, {
      articles: newArticles,
      sortBy: newSortBy,
      order: newOrder,
      scrollPosition: 0
    });
  };

  const restoreState = (topic) => {
    const savedState = loadState(topic);
    if (savedState) {
      setArticles(savedState.articles);
      setSortBy(savedState.sortBy);
      setOrder(savedState.order);
      setScrollPosition(savedState.scrollPosition);
      setCurrentTopic(topic);
      setIsLoading(false);
      setError(null);
      const fetchKey = `${topic || 'all'}_${savedState.sortBy || 'default'}_${savedState.order || 'default'}`;
      setLastFetchKey(fetchKey);
      return true;
    }
    return false;
  };

  const value = {
    articles,
    isLoading,
    error,
    sortBy,
    order,
    currentTopic,
    scrollPosition,
    setArticles,
    setIsLoading,
    setError,
    setSortBy,
    setOrder,
    setCurrentTopic,
    updateScrollPosition,
    updateArticles,
    restoreState,
    needsRefetch,
    saveState,
    clearState
  };

  return (
    <ArticleListContext.Provider value={value}>
      {children}
    </ArticleListContext.Provider>
  );
};
