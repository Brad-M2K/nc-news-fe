import { useState } from 'react'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Articles from './components/Articles';
import SingleArticle from './components/SingleArticle';
import ErrorPage from './components/ErrorPage';

import './App.css'


function App() {
  

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="*" element={<ErrorPage />} />
        {/* more routes to be added */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
