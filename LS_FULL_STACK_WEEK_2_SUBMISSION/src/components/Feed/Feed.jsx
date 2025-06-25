import React, { useState } from 'react'
import './Feed.css'
import thumbnail1 from '../../assets/att.jpg'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'
import { Link } from 'react-router-dom'
import { useWatchLater } from '../../context/WatchLaterContext'

const Feed = () => {
  const { addToWatchLater } = useWatchLater();
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToWatchLater = (video, e) => {
    e.preventDefault();
    addToWatchLater(video);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  return (
    <div className="feed">
      {showPopup && (
        <div className="popup-notification">
          Added to Watchlist!
        </div>
      )}

      <Link to={`video/20/4521`} className='card'>
        <img src={thumbnail1} alt="" />
        <button
          className="watch-later-btn"
          onClick={e => handleAddToWatchLater({
            id: 4521,
            thumbnail: thumbnail1,
            title: "Charlie Puth-Attention [Official Video]",
            channel: "Charlie Puth",
            views: "1.67B",
            time: "8 years ago"
          }, e)}
        >
          Watch Later
        </button>
        <h2>Charlie Puth-Attention [Official Video]</h2>
        <h3>Charlie Puth</h3>
        <p>1.67B views &bull; 8 years ago</p>
      </Link>
      <div className='card'>
        <img src={thumbnail2} alt="" />
        <button
          className="watch-later-btn"
          onClick={e => handleAddToWatchLater({
            id: 1,
            thumbnail: thumbnail2,
            title: "Top 10 Coding Tips",
            channel: "CodeMaster",
            views: "221k",
            time: "1 week ago"
          }, e)}
        >
          Watch Later
        </button>
        <h2>Top 10 Coding Tips</h2>
        <h3>CodeMaster</h3>
        <p>221k views &bull; 1 week ago</p>
      </div>
      <div className='card'>
        <img src={thumbnail3} alt="" />
        <button
          className="watch-later-btn"
          onClick={e => handleAddToWatchLater({
            id: 2,
            thumbnail: thumbnail3,
            title: "Epic Fails Compilation",
            channel: "LaughHub",
            views: "1.2M",
            time: "3 days ago"
          }, e)}
        >
          Watch Later
        </button>
        <h2>Epic Fails Compilation</h2>
        <h3>LaughHub</h3>
        <p>1.2M views &bull; 3 days ago</p>
      </div>
      <div className='card'>
        <img src={thumbnail4} alt="" />
        <button
          className="watch-later-btn"
          onClick={e => handleAddToWatchLater({
            id: 3,
            thumbnail: thumbnail4,
            title: "Funny Cat Compilation",
            channel: "Catastic",
            views: "608k",
            time: "5 days ago"
          }, e)}
        >
          Watch Later
        </button>
        <h2>Funny Cat Compilation</h2>
        <h3>Catastic</h3>
        <p>608k views &bull; 5 days ago</p>
      </div>
      <div className='card'>
        <img src={thumbnail5} alt="" />
        <button
          className="watch-later-btn"
          onClick={e => handleAddToWatchLater({
            id: 4,
            thumbnail: thumbnail5,
            title: "Learn React in 10 Minutes",
            channel: "Reactify",
            views: "199k",
            time: "1 day ago"
          }, e)}
        >
          Watch Later
        </button>
        <h2>Learn React in 10 Minutes</h2>
        <h3>Reactify</h3>
        <p>199k views &bull; 1 day ago</p>
      </div>
      <div className='card'>
        <img src={thumbnail6} alt="" />
        <button
          className="watch-later-btn"
          onClick={e => handleAddToWatchLater({
            id: 5,
            thumbnail: thumbnail6,
            title: "Travel Vlog: Exploring Japan",
            channel: "WanderWorld",
            views: "310k",
            time: "4 days ago"
          }, e)}
        >
          Watch Later
        </button>
        <h2>Travel Vlog: Exploring Japan</h2>
        <h3>WanderWorld</h3>
        <p>310k views &bull; 4 days ago</p>
      </div>
      <div className='card'>
        <img src={thumbnail7} alt="" />
        <button
          className="watch-later-btn"
          onClick={e => handleAddToWatchLater({
            id: 6,
            thumbnail: thumbnail7,
            title: "Beginner's Guide to Yoga",
            channel: "ZenZone",
            views: "120k",
            time: "2 days ago"
          }, e)}
        >
          Watch Later
        </button>
        <h2>Beginner's Guide to Yoga</h2>
        <h3>ZenZone</h3>
        <p>120k views &bull; 2 days ago</p>
      </div>
      <div className='card'>
        <img src={thumbnail8} alt="" />
        <button
          className="watch-later-btn"
          onClick={e => handleAddToWatchLater({
            id: 7,
            thumbnail: thumbnail8,
            title: "Amazing Street Food Tour",
            channel: "FoodieFun",
            views: "284k",
            time: "6 days ago"
          }, e)}
        >
          Watch Later
        </button>
        <h2>Amazing Street Food Tour</h2>
        <h3>FoodieFun</h3>
        <p>284k views &bull; 6 days ago</p>
      </div>
      <div className='card'>
        <img src={thumbnail1} alt="" />
        <button
          className="watch-later-btn"
          onClick={e => handleAddToWatchLater({
            id: 8,
            thumbnail: thumbnail1,
            title: "How to Edit Photos Like a Pro",
            channel: "PixelPerfect",
            views: "101k",
            time: "2 days ago"
          }, e)}
        >
          Watch Later
        </button>
        <h2>How to Edit Photos Like a Pro</h2>
        <h3>PixelPerfect</h3>
        <p>101k views &bull; 2 days ago</p>
      </div>
      <div className='card'>
        <img src={thumbnail2} alt="" />
        <button
          className="watch-later-btn"
          onClick={e => handleAddToWatchLater({
            id: 9,
            thumbnail: thumbnail2,
            title: "The Science of Sleep",
            channel: "BrainBoost",
            views: "187k",
            time: "3 days ago"
          }, e)}
        >
          Watch Later
        </button>
        <h2>The Science of Sleep</h2>
        <h3>BrainBoost</h3>
        <p>187k views &bull; 3 days ago</p>
      </div>
      <div className='card'>
        <img src={thumbnail3} alt="" />
        <button
          className="watch-later-btn"
          onClick={e => handleAddToWatchLater({
            id: 10,
            thumbnail: thumbnail3,
            title: "Ultimate Gaming Setup 2025",
            channel: "GameZone",
            views: "250k",
            time: "1 week ago"
          }, e)}
        >
          Watch Later
        </button>
        <h2>Ultimate Gaming Setup 2025</h2>
        <h3>GameZone</h3>
        <p>250k views &bull; 1 week ago</p>
      </div>
      <div className='card'>
        <img src={thumbnail4} alt="" />
        <button
          className="watch-later-btn"
          onClick={e => handleAddToWatchLater({
            id: 11,
            thumbnail: thumbnail4,
            title: "Music Mashup 2025",
            channel: "MixMaster",
            views: "210k",
            time: "5 days ago"
          }, e)}
        >
          Watch Later
        </button>
        <h2>Music Mashup 2025</h2>
        <h3>MixMaster</h3>
        <p>210k views &bull; 5 days ago</p>
      </div>
      <div className='card'>
        <img src={thumbnail5} alt="" />
        <button
          className="watch-later-btn"
          onClick={e => handleAddToWatchLater({
            id: 12,
            thumbnail: thumbnail5,
            title: "Unbelievable Animal Facts",
            channel: "WildWorld",
            views: "333k",
            time: "2 days ago"
          }, e)}
        >
          Watch Later
        </button>
        <h2>Unbelievable Animal Facts</h2>
        <h3>WildWorld</h3>
        <p>333k views &bull; 2 days ago</p>
      </div>
      <div className='card'>
        <img src={thumbnail6} alt="" />
        <button
          className="watch-later-btn"
          onClick={e => handleAddToWatchLater({
            id: 13,
            thumbnail: thumbnail6,
            title: "History's Greatest Inventions",
            channel: "HistoryHub",
            views: "170k",
            time: "1 day ago"
          }, e)}
        >
          Watch Later
        </button>
        <h2>History's Greatest Inventions</h2>
        <h3>HistoryHub</h3>
        <p>170k views &bull; 1 day ago</p>
      </div>
      <div className='card'>
        <img src={thumbnail7} alt="" />
        <button
          className="watch-later-btn"
          onClick={e => handleAddToWatchLater({
            id: 14,
            thumbnail: thumbnail7,
            title: "Quick & Easy Recipes",
            channel: "KitchenKing",
            views: "140k",
            time: "4 days ago"
          }, e)}
        >
          Watch Later
        </button>
        <h2>Quick & Easy Recipes</h2>
        <h3>KitchenKing</h3>
        <p>140k views &bull; 4 days ago</p>
      </div>
      <div className='card'>
        <img src={thumbnail8} alt="" />
        <button
          className="watch-later-btn"
          onClick={e => handleAddToWatchLater({
            id: 15,
            thumbnail: thumbnail8,
            title: "Motivational Morning Routine",
            channel: "MindsetMania",
            views: "271k",
            time: "3 days ago"
          }, e)}
        >
          Watch Later
        </button>
        <h2>Motivational Morning Routine</h2>
        <h3>MindsetMania</h3>
        <p>271k views &bull; 3 days ago</p>
      </div>
    </div>
  )
}

export default Feed




