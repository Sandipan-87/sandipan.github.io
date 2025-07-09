import React from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { value_converter } from '../../data';
import moment from 'moment';

const Feed = ({ videos }) => {
 
  if (!videos || videos.length === 0) {
    return <div className="loader"></div>; 
  }

  return (
    <div className="feed">
      {videos.map((item, index) => {
        
        const videoId = item.id.videoId || item.id;
        
       
        if (!videoId) return null;

        return (
          <Link to={`video/${item.snippet.categoryId}/${videoId}`} className='card' key={`${videoId}-${index}`}>
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>
              {/* Search results don't have statistics, so we check if it exists */}
              {item.statistics ? `${value_converter(item.statistics.viewCount)} views` : ''} 
              &bull; {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;




