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

import './App.css'


function App() {
  

  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <NavBar />
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/articles/:article_id" element={<ArticleView />} />
      
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
    
  )
}

export default App
