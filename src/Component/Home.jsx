import React, { useState } from 'react';
import Layout from './Layout/Layout';
// import LandBuyingGuide from './LandBuyingGuide';
import SearchBar from './Layout/Searchbar';
// import Chatbox from '../Redirect/Chatbox'; // Correct path to Chatbox component

import './Home.css';

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <div className='Home'>
        <SearchBar />
        {/* <LandBuyingGuide /> */}
      </div>
    </Layout>
  );
}

export default Home;
