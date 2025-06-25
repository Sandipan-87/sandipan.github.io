import React, { createContext, useContext, useState, useEffect } from 'react';

const WatchLaterContext = createContext();

export function useWatchLater() {
  return useContext(WatchLaterContext);
}

export function WatchLaterProvider({ children }) {
  // Initialize from sessionStorage
  const [watchLater, setWatchLater] = useState(() => {
    const stored = sessionStorage.getItem('watchLater');
    return stored ? JSON.parse(stored) : [];
  });

  // Sync to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem('watchLater', JSON.stringify(watchLater));
  }, [watchLater]);

  const addToWatchLater = (video) => {
    setWatchLater(prev =>
      prev.some(v => v.id === video.id) ? prev : [...prev, video]
    );
  };

  const removeFromWatchLater = (videoId) => {
    setWatchLater(prev => prev.filter(video => video.id !== videoId));
  };

  return (
    <WatchLaterContext.Provider value={{
      watchLater,
      addToWatchLater,
      removeFromWatchLater
    }}>
      {children}
    </WatchLaterContext.Provider>
  );
}


