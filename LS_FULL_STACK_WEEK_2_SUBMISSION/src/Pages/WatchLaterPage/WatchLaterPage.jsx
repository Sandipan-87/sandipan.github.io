import React from 'react';
import { useWatchLater } from '../../context/WatchLaterContext';
import './WatchLaterPage.css';

const WatchLaterPage = () => {
  const { watchLater, removeFromWatchLater } = useWatchLater();

  return (
    <div className="watch-later-page">
      <h1>Watch Later</h1>
      {watchLater.length === 0 ? (
        <p className="empty-message">Your watch later list is empty</p>
      ) : (
        <div className="watch-later-list">
          {watchLater.map(video => (
            <div className="video-card" key={video.id}>
              <img src={video.thumbnail} alt={video.title} />
              <div className="video-info">
                <h2>{video.title}</h2>
                <h3>{video.channel}</h3>
                <p>{video.views} • {video.time}</p>
              </div>
              <button 
                className="remove-btn"
                onClick={() => removeFromWatchLater(video.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchLaterPage;


