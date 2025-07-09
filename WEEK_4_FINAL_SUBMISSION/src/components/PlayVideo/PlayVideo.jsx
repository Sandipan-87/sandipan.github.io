// src/Pages/Video/PlayVideo.jsx

import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import {
  FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton,
  FacebookIcon, TwitterIcon, WhatsappIcon, LinkedinIcon
} from 'react-share';
import { useWatchLater } from '../../context/WatchLaterContext';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {
  const { videoId } = useParams();
  
  // --- STATE MANAGEMENT ---
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [likeStatus, setLikeStatus] = useState('none'); // 'liked', 'disliked', or 'none'
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Correctly get the 'watchLater' array from the context
  const { watchLater, addToWatchLater, removeFromWatchLater } = useWatchLater();

  // --- API FETCHING LOGIC ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        const videoResponse = await fetch(videoDetails_url);
        const videoJson = await videoResponse.json();
        const videoItem = videoJson.items[0];
        
        if (videoItem) {
          setApiData(videoItem);
          setLikeCount(parseInt(videoItem.statistics.likeCount));
          
          const channelId = videoItem.snippet.channelId;
          const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`;
          const channelResponse = await fetch(channelData_url);
          const channelJson = await channelResponse.json();
          const channelItem = channelJson.items[0];

          if (channelItem) {
            setChannelData(channelItem);
            setSubscriberCount(parseInt(channelItem.statistics.subscriberCount));
          }
        }
        
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=50&key=${API_KEY}`;
        const commentResponse = await fetch(comment_url);
        const commentJson = await commentResponse.json();
        setCommentData(commentJson.items || []);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [videoId]);

  // --- LOCALSTORAGE & CONTEXT LOGIC ---
  useEffect(() => {
    const currentLikeStatus = localStorage.getItem(`video-like-status-${videoId}`);
    if (currentLikeStatus) setLikeStatus(currentLikeStatus);

    if (channelData) {
      const currentSubStatus = localStorage.getItem(`subscribed-to-${channelData.id}`);
      if (currentSubStatus === 'true') setIsSubscribed(true);
    }

    if (apiData) {
      // Add a fallback empty array to prevent crashes
      setIsSaved((watchLater || []).some(video => video.id === apiData.id));
    }
  }, [videoId, channelData, apiData, watchLater]);

  // --- RESTORED HANDLER FUNCTIONS ---
  const handleLike = () => {
    if (likeStatus === 'liked') {
      setLikeStatus('none');
      setLikeCount(prev => prev - 1);
      localStorage.removeItem(`video-like-status-${videoId}`);
    } else {
      if (likeStatus === 'disliked') { /* No change to like count */ }
      setLikeStatus('liked');
      setLikeCount(prev => prev + 1);
      localStorage.setItem(`video-like-status-${videoId}`, 'liked');
    }
  };

  const handleDislike = () => {
    if (likeStatus === 'disliked') {
      setLikeStatus('none');
      localStorage.removeItem(`video-like-status-${videoId}`);
    } else {
      if (likeStatus === 'liked') {
        setLikeCount(prev => prev - 1);
      }
      setLikeStatus('disliked');
      localStorage.setItem(`video-like-status-${videoId}`, 'disliked');
    }
  };
  
  const handleSubscribe = () => {
    if (!channelData) return;
    if (isSubscribed) {
      setIsSubscribed(false);
      setSubscriberCount(prev => prev - 1);
      localStorage.removeItem(`subscribed-to-${channelData.id}`);
    } else {
      setIsSubscribed(true);
      setSubscriberCount(prev => prev + 1);
      localStorage.setItem(`subscribed-to-${channelData.id}`, 'true');
    }
  };
  
  const handleSaveToWatchLater = () => {
    if (!apiData) return;
    if (isSaved) {
      removeFromWatchLater(apiData.id);
      setPopupMessage('Removed from Watch Later');
    } else {
      addToWatchLater(apiData);
      setPopupMessage('Added to Watch Later');
    }
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  if (!apiData || !channelData) {
    return <div className="play-video"><h3>Loading...</h3></div>;
  }
  
  const shareUrl = window.location.href;

  return (
    <div className='play-video'>
      {showPopup && ( <div className="popup-notification-top">{popupMessage}</div> )}
      {showShareModal && (
        <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Share Video</h3>
            <div className="share-modal-buttons">
              <FacebookShareButton url={shareUrl} quote={apiData.snippet.title}><FacebookIcon size={48} round /></FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={apiData.snippet.title}><TwitterIcon size={48} round /></TwitterShareButton>
              <WhatsappShareButton url={shareUrl} title={apiData.snippet.title}><WhatsappIcon size={48} round /></WhatsappShareButton>
              <LinkedinShareButton url={shareUrl} title={apiData.snippet.title} summary={apiData.snippet.description}><LinkedinIcon size={48} round /></LinkedinShareButton>
            </div>
            <button className="modal-close-btn" onClick={() => setShowShareModal(false)}>Close</button>
          </div>
        </div>
      )}
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      <h3>{apiData.snippet.title}</h3>
      <div className='play-video-info'>
        <p>{value_converter(apiData.statistics.viewCount)} Views &bull; {moment(apiData.snippet.publishedAt).fromNow()}</p>
        <div>
          {/* JSX for buttons with dynamic classes */}
          <span onClick={handleLike} className={`action-btn ${likeStatus === 'liked' ? 'active' : ''}`}><img src={like} alt="Like" /> {value_converter(likeCount)}</span>
          <span onClick={handleDislike} className={`action-btn ${likeStatus === 'disliked' ? 'active' : ''}`}><img src={dislike} alt="Dislike" /></span>
          <span className="action-btn" onClick={() => setShowShareModal(true)}><img src={share} alt="Share" /> Share</span>
          <span onClick={handleSaveToWatchLater} className={`action-btn ${isSaved ? 'active' : ''}`}>
            <img src={save} alt="Save to Watch Later" /> 
            {isSaved ? 'Saved' : 'Save'}
          </span>
        </div>
      </div>
      <hr />
      <div className='publisher'>
        <img src={channelData.snippet.thumbnails.default.url} alt="Channel" />
        <div>
          <p>{apiData.snippet.channelTitle}</p>
          <span>{value_converter(subscriberCount)} Subscribers</span>
        </div>
        <button onClick={handleSubscribe} className={isSubscribed ? 'subscribed' : ''}>
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
      <div className='vid-description'>
        <p>{apiData.snippet.description.slice(0, 350)}...</p>
        <hr />
        <h4>{value_converter(apiData.statistics.commentCount)} Comments</h4>
        {commentData.map((item, index) => {
            const comment = item.snippet.topLevelComment.snippet;
            return (
                <div className="comment" key={index}>
                    <img src={comment.authorProfileImageUrl} alt="" />
                    <div>
                        <h3>{comment.authorDisplayName} <span>{moment(comment.publishedAt).fromNow()}</span></h3>
                        <p dangerouslySetInnerHTML={{ __html: comment.textDisplay }}></p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>{value_converter(comment.likeCount)}</span>
                            <img src={dislike} alt="" />
                        </div>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
