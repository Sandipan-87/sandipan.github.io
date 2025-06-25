import React from 'react'
import './sidebar.css'
import home from '../../assets/home.png'
import game_icon from '../../assets/game_icon.png'
import automobiles from '../../assets/automobiles.png'
import sports from '../../assets/sports.png'
import entertainment from '../../assets/entertainment.png'
import tech from '../../assets/tech.png'
import music from '../../assets/music.png'
import blogs from '../../assets/blogs.png'
import news from '../../assets/news.png'
import jack from '../../assets/pdp.jpg'
import simon from '../../assets/mb.jpg'
import tom from '../../assets/jb.jpg'
import megan from '../../assets/5mc.jpg'
import cameron from '../../assets/cr7.jpg'
import { Link } from 'react-router-dom';




const Sidebar = ({sidebar}) => {
  return (
    <div className={` sidebar ${sidebar?"":"small-sidebar"}`}>
      <Link to="/watch-later" className="sidebar-link">
        Watch Later
      </Link>
      <div className="shortcut-links">
        <div className="side-link">
            <img src={home} alt="" /><p>Home</p>
        </div>
        <div className="side-link">
            <img src={game_icon} alt="" /><p>Gaming</p>
        </div>
        <div className="side-link">
            <img src={automobiles} alt="" /><p>Automobiles</p>
        </div>
        <div className="side-link">
            <img src={sports} alt="" /><p>Sports</p>
        </div>
        <div className="side-link">
            <img src={entertainment} alt="" /><p>Entertainment</p>
        </div>
        <div className="side-link">
            <img src={tech} alt="" /><p>Technologia</p>
        </div>
        <div className="side-link">
            <img src={music} alt="" /><p>Music</p>
        </div>
        <div className="side-link">
            <img src={blogs} alt="" /><p>Blogs</p>
        </div>
        <div className="side-link">
            <img src={news} alt="" /><p>News</p>
        </div>
        <hr />
      </div>
      <div className="subscribed-list">
        <h3>Subscribed</h3>
        <div className="side-link">
            <img src= {jack} alt="" /> <p>PewDiePie</p> 
        </div>
        <div className="side-link">
            <img src= {simon} alt="" /> <p>Mr. Beast</p> 
        </div>
        <div className="side-link">
            <img src= {tom} alt="" /> <p>Justin Bieber</p> 
        </div>
        <div className="side-link">
            <img src= {megan} alt="" /> <p>5-Minutes Craft</p> 
        </div>
        <div className="side-link">
            <img src= {cameron} alt="" /> <p>Suuuuiiiiiii</p> 
        </div>
      </div>
    </div>
  )
}

export default Sidebar
