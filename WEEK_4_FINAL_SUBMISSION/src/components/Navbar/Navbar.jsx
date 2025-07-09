import React from 'react';
import './Navbar.css';
import './ToggleSwitch.css'; 
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';


import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';

import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ setSidebar, onSearchSubmit }) => { 
  const { user, logoutUser } = useAuth(); 
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className='flex-div'>
      <div className="nav-left flex-div">
        <img className='menu-icon' onClick={() => setSidebar(prev => !prev)} src={menu_icon} alt="Menu" />
        <Link to='/'><img className='logo' src={logo} alt="Logo" /></Link>
      </div>

      <div className="nav-middle flex-div">
        <SearchBar onSearchSubmit={onSearchSubmit} />
      </div>

      <div className="nav-right flex-div">
        {/* 4. The stylish toggle switch is implemented here */}
        <label className="theme-switch">
          <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
          <span className="slider"></span>
        </label>
        
        {user ? (
          <>
            <img src={upload_icon} alt="Upload" />
            <img src={more_icon} alt="More" />
            <img src={notification_icon} alt="Notifications" />
            
        
            <div className="user-profile">
              
              <span>Welcome, {user.username}!</span>
              <button onClick={logoutUser} className="logout-button">Logout</button>
            </div>
          </>
        ) : (
         
          <Link to="/login" className="login-link">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


