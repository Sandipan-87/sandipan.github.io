import React from "react";
import "./PlayVideo.css";
import video1 from "../../assets/attention.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/cp.jpg";
import user_profile from "../../assets/user_profile.jpg";

const PlayVideo = () => {
  return (
    <div className="play-video">
      <video src={video1} controls autoPlay muted></video>
      <h3>Attention-Charlie Puth [Official Music Video]</h3>
      <div className="play-video-info">
        <p>1.67B Views &bull; 8 years ago</p>
        <div>
          <span>
            <img src={like} alt="" />
            11M
          </span>
          <span>
            <img src={dislike} alt="" />
          
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={jack} alt="" />
        <div>
          <p> Charlie Puth</p>
          <span>22.8M Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          Charlie Puth - Attention [Official Video]
From Charlie's album Voicenotes!
        </p>
        <p>The official YouTube channel of Atlantic Records artist Charlie Puth. Subscribe for the latest music videos, performances, and more</p>
        <hr />
        <h4>2.5lakh Comments</h4>
        <div className="comment">
            <img src={user_profile} alt="" />
            <div>
                <h3>Sucharita Ghosh <span>1 day ago</span></h3>
                <p>He wants both my attention and heart!</p>
                <div className="comment-action">
                    <img src={like} alt="" />
                    <span>42</span>
                    <img src={dislike} alt="" />
                </div>
            </div>
        </div>
         <div className="comment">
            <img src={user_profile} alt="" />
            <div>
                <h3>Harry <span>3 days ago</span></h3>
                <p>Awesom!!</p>
                <div className="comment-action">
                    <img src={like} alt="" />
                    <span>24</span>
                    <img src={dislike} alt="" />
                </div>
            </div>
        </div>
         <div className="comment">
            <img src={user_profile} alt="" />
            <div>
                <h3>Sandipan <span>1 week ago</span></h3>
                <p>who is listening this in 2025??</p>
                <div className="comment-action">
                    <img src={like} alt="" />
                    <span>184</span>
                    <img src={dislike} alt="" />
                </div>
            </div>
        </div>
         <div className="comment">
            <img src={user_profile} alt="" />
            <div>
                <h3>musicoholic<span>3 weeks ago</span></h3>
                <p>Love this!!</p>
                <div className="comment-action">
                    <img src={like} alt="" />
                    <span>27</span>
                    <img src={dislike} alt="" />
                </div>
            </div>
        </div>
         <div className="comment">
            <img src={user_profile} alt="" />
            <div>
                <h3>unknown paradox<span>1 month ago</span></h3>
                <p>fcgjfvyjrcjvfv</p>
                <div className="comment-action">
                    <img src={like} alt="" />
                    <span>72</span>
                    <img src={dislike} alt="" />
                </div>
            </div>
        </div>
         <div className="comment">
            <img src={user_profile} alt="" />
            <div>
                <h3>suvro <span>2 months ago</span></h3>
                <p>jamming in my head</p>
                <div className="comment-action">
                    <img src={like} alt="" />
                    <span>2</span>
                    <img src={dislike} alt="" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
