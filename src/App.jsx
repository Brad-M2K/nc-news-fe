// import { useState } from 'react'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ArticleView from './components/ArticleView';
import ErrorPage from './components/ErrorPage';
import Footer from './components/Footer';
import { UserProvider } from './contexts/UserContext';
import TopicPage from './components/TopicPage';
import FloatingNavOnHeaderHide from './components/FloatingNavOnHeaderHide';

import './App.css'


function App() {
  

  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <FloatingNavOnHeaderHide>
          <NavBar />
        </FloatingNavOnHeaderHide>
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/articles/:article_id" element={<ArticleView />} />
           <Route path="/topics" element={<TopicPage />} />
           <Route path="/topics/:topic" element={<TopicPage />} />
            
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
    
  )
}

export default App
