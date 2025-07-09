// src/components/Sidebar/Sidebar.jsx

import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

// Import your icon assets
import home from '../../assets/home.png';
import game_icon from '../../assets/game_icon.png';
import automobiles from '../../assets/automobiles.png';
import sports from '../../assets/sports.png';
import entertainment from '../../assets/entertainment.png';
import tech from '../../assets/tech.png';
import music from '../../assets/music.png';
import blogs from '../../assets/blogs.png';
import news from '../../assets/news.png';
import jack from '../../assets/pdp.jpg';
import simon from '../../assets/mb.jpg';
import tom from '../../assets/jb.jpg';
import megan from '../../assets/5mc.jpg';
import cameron from '../../assets/cr7.jpg';
import watch_later_icon from '../../assets/save.png'

const Sidebar = ({ sidebar, category, setCategory }) => {
    return (
        <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
            <div className="shortcut-links">
                {/* Category Links */}
                <div className={`sidebar-link ${category === 0 ? "active" : ""}`} onClick={() => setCategory(0)}>
                    <img src={home} alt="" /><p>Home</p>
                </div>
                <div className={`sidebar-link ${category === 20 ? "active" : ""}`} onClick={() => setCategory(20)}>
                    <img src={game_icon} alt="" /><p>Gaming</p>
                </div>
                <div className={`sidebar-link ${category === 2 ? "active" : ""}`} onClick={() => setCategory(2)}>
                    <img src={automobiles} alt="" /><p>Automobiles</p>
                </div>
                <div className={`sidebar-link ${category === 17 ? "active" : ""}`} onClick={() => setCategory(17)}>
                    <img src={sports} alt="" /><p>Sports</p>
                </div>
                <div className={`sidebar-link ${category === 24 ? "active" : ""}`} onClick={() => setCategory(24)}>
                    <img src={entertainment} alt="" /><p>Entertainment</p>
                </div>
                <div className={`sidebar-link ${category === 28 ? "active" : ""}`} onClick={() => setCategory(28)}>
                    <img src={tech} alt="" /><p>Technology</p>
                </div>
                <div className={`sidebar-link ${category === 10 ? "active" : ""}`} onClick={() => setCategory(10)}>
                    <img src={music} alt="" /><p>Music</p>
                </div>
                <div className={`sidebar-link ${category === 22 ? "active" : ""}`} onClick={() => setCategory(22)}>
                    <img src={blogs} alt="" /><p>Blogs</p>
                </div>
                <div className={`sidebar-link ${category === 25 ? "active" : ""}`} onClick={() => setCategory(25)}>
                    <img src={news} alt="" /><p>News</p>
                </div>
                <hr />
            </div>

            {/* User-Specific Links */}
            <div className="subscribed-list">
                {/* THIS IS THE NEW WATCH LATER LINK */}
                <Link to='/watch-later' className="sidebar-link">
                    <img src={watch_later_icon} alt="Watch Later" /><p>Watch Later</p>
                </Link>
                <hr />
                <h3>Subscribed</h3>
                <a href="#"><img src={jack} alt="" /><p>PewDiePie</p></a>
                <a href="#"><img src={simon} alt="" /><p>Mr. Beast</p></a>
                <a href="#"><img src={tom} alt="" /><p>Justin Bieber</p></a>
                <a href="#"><img src={megan} alt="" /><p>5-Minutes Craft</p></a>
                <a href="#"><img src={cameron} alt="" /><p>Suuuuiiiiiii</p></a>
            </div>
        </div>
    );
};

export default Sidebar;

