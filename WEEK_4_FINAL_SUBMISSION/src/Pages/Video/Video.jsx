import React from 'react';
import './Video.css';
import PlayVideo from '../../components/PlayVideo/PlayVideo';
import Recommended from '../../components/Recommended/Recommended';
import { useParams, useNavigate } from 'react-router-dom'; // 1. Import useNavigate

// 2. Accept category and setCategory as props
const Video = ({ category, setCategory }) => {
  const { videoId, categoryId } = useParams();
  const navigate = useNavigate(); // 3. Get the navigate function

  const handleRecommendedClick = (newCategoryId) => {
    setCategory(newCategoryId);
    navigate('/'); // Optional: navigate to home to see the new feed
  };

  return (
    <div className='play-container'>
      <PlayVideo videoId={videoId} />
      
      <Recommended categoryId={categoryId} />
    </div>
  )
}

export default Video;


