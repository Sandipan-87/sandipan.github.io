// src/App.jsx

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Video from './Pages/Video/Video';
import { WatchLaterProvider } from './context/WatchLaterContext';
import WatchLaterPage from './Pages/WatchLaterPage/WatchLaterPage';
import LoginPage from './Pages/Login/LoginPage';
import RegisterPage from './Pages/Register/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { API_KEY } from './data';

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState(0);

  // This function is already correct and fetches videos based on category
  const fetchPopularVideos = async (videoCategory) => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${videoCategory}&key=${API_KEY}`;
    try {
      const response = await fetch(videoList_url);
      const data = await response.json();
      setVideos(data.items || []);
    } catch (error) {
      console.error("Error fetching popular videos:", error);
    }
  };

  const handleSearchSubmit = async (searchTerm) => {
    const search_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&maxResults=50&type=video&key=${API_KEY}`;
    try {
      const response = await fetch(search_url);
      const data = await response.json();
     
      setVideos(data.items || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // This useEffect hook is also correct. It re-fetches videos when 'category' changes.
  useEffect(() => {
    fetchPopularVideos(category);
  }, [category]);

  return (
    <WatchLaterProvider>
      <Navbar setSidebar={setSidebar} onSearchSubmit={handleSearchSubmit} />
      <Routes>
        {/* Public Routes */}
        <Route 
          path='/' 
          element={
            <Home 
              sidebar={sidebar} 
              videos={videos} 
              
              category={category}
              setCategory={setCategory} 
              // --- CHANGES END HERE ---
            />
          } 
        />
        <Route 
          path='/video/:categoryId/:videoId' 
          element={
            <Video/>
          } 
        />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        
        
        <Route element={<ProtectedRoute />}>
          <Route path='/watch-later' element={<WatchLaterPage />} />
        </Route>
      </Routes>
    </WatchLaterProvider>
  );
};

export default App;
