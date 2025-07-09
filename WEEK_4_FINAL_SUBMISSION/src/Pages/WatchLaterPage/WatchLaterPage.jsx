import React from 'react';
import { useWatchLater } from '../../context/WatchLaterContext';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { value_converter } from '../../data';
import './WatchLaterPage.css';

const WatchLaterPage = () => {
  const { watchLaterList, removeFromWatchLater } = useWatchLater();

  if (!watchLaterList || watchLaterList.length === 0) {
    return (
      <div className="watch-later-empty">
        <h2>Your Watch Later list is empty.</h2>
        <p>Click the "Save" button on a video to add it here.</p>
      </div>
    );
  }

  return (
    <div className="watch-later-container">
      <h1>Watch Later ({watchLaterList.length})</h1>
      <div className="watch-later-list">
        {watchLaterList.map(video => (
          <div className="watch-later-card" key={video.id}>
            <Link to={`/video/${video.snippet.categoryId}/${video.id}`} className="card-thumbnail">
              <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            </Link>
            <div className="card-info">
              <Link to={`/video/${video.snippet.categoryId}/${video.id}`}> <h3>{video.snippet.title}</h3> </Link>
              <p className="card-channel">{video.snippet.channelTitle}</p>
              <p className="card-stats">
                {video.statistics ? `${value_converter(video.statistics.viewCount)} views` : ''} &bull; {moment(video.snippet.publishedAt).fromNow()}
              </p>
              <button onClick={() => removeFromWatchLater(video.id)} className="remove-btn">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchLaterPage;




