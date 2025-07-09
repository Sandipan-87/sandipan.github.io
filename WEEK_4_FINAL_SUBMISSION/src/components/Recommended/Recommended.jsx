import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { API_KEY, value_converter } from '../../data';
import { Link } from 'react-router-dom';


const Recommended = ({ categoryId, globalCategory }) => {
  const [apiData, setApiData] = useState([]);


  const displayCategoryId = globalCategory !== undefined ? globalCategory : categoryId;

  const fetchData = async () => {
    const recommended_videos_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&videoCategoryId=${displayCategoryId}&key=${API_KEY}`;
    
    try {
      const response = await fetch(recommended_videos_url);
      const data = await response.json();
      if (data.items) {
        setApiData(data.items);
      }
    } catch (error) {
      console.error("Failed to fetch recommended videos:", error);
    }
  }

 
  useEffect(() => {
    if (displayCategoryId) {
      fetchData();
    }
  }, [displayCategoryId]);

  return (
    <div className='recommended'>
      {apiData.map((item, index) => (
        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <div className="vid-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{value_converter(item.statistics.viewCount)} Views</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Recommended;


