import React, { useState } from 'react';
import './SearchBar.css';
import search_icon from '../../assets/search.png';

const SearchBar = ({ onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    
    event.preventDefault(); 
    if (searchTerm.trim()) {
      onSearchSubmit(searchTerm);
    
    }
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search"
      />
      <button type="submit" className="search-btn">
        <img src={search_icon} alt="Search" />
      </button>
    </form>
  );
};

export default SearchBar;
