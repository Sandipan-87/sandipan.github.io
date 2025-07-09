import React from 'react';
import './Home.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Feed from '../../components/Feed/Feed';


const Home = ({ sidebar, videos, category, setCategory }) => {
  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <div className={`container ${sidebar ? '' : 'large-container'}`}>
       
        <Feed videos={videos} />
      </div>
    </>
  );
};

export default Home;

