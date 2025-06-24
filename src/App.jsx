import { useState } from 'react'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ArticleView from './components/ArticleView';
import ErrorPage from './components/ErrorPage';

import './App.css'


function App() {
  

  return (
    <BrowserRouter>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles/:article_id" element={<ArticleView />} />
        <Route path="*" element={<ErrorPage />} />
        
        {/* more routes to be added */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
