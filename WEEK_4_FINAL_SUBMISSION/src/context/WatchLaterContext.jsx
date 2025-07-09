import React, { createContext, useContext, useState, useEffect } from 'react';

const WatchLaterContext = createContext();

export const useWatchLater = () => {
  return useContext(WatchLaterContext);
};

export const WatchLaterProvider = ({ children }) => {
  const [watchLaterList, setWatchLaterList] = useState([]);

  // Load saved videos from localStorage when the app first starts
  useEffect(() => {
    try {
      const savedVideos = JSON.parse(localStorage.getItem('watchLaterList'));
      if (savedVideos && Array.isArray(savedVideos)) {
        setWatchLaterList(savedVideos);
      }
    } catch (error) {
      console.error("Could not parse watch later list from localStorage", error);
      setWatchLaterList([]);
    }
  }, []);

  // Helper function to save the list to localStorage whenever it changes
  const saveToLocalStorage = (videos) => {
    localStorage.setItem('watchLaterList', JSON.stringify(videos));
  };

  const addToWatchLater = (videoToAdd) => {
    setWatchLaterList(prevList => {
      // Prevent adding duplicate videos
      if (prevList.some(video => video.id === videoToAdd.id)) {
        return prevList;
      }
      const newList = [...prevList, videoToAdd];
      saveToLocalStorage(newList);
      return newList;
    });
  };

  const removeFromWatchLater = (videoIdToRemove) => {
    setWatchLaterList(prevList => {
      const newList = prevList.filter(video => video.id !== videoIdToRemove);
      saveToLocalStorage(newList);
      return newList;
    });
  };

  const value = {
    watchLaterList,
    addToWatchLater,
    removeFromWatchLater,
  };

  return (
    <WatchLaterContext.Provider value={value}>
      {children}
    </WatchLaterContext.Provider>
  );
};


