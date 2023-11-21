import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SignUpSuccessPage from './pages/SignUpSuccessPage';
import SearchPage from './pages/SearchPage';

function App()
{
  return(
   
    <BrowserRouter>
    
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signupsuccess" element={<SignUpSuccessPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/search" element={<SearchPage/>}/>
      
    </Routes>
    </BrowserRouter>
  );
};

export default App;
