import React, { useState, useEffect } from 'react';
import Layout from './Layout/Layout';
import SearchBar from './Layout/Searchbar';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % 3); // Assuming 3 images
    }, 50000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <Layout>
      <div className='Home'>
        <div className='slides'>
          <div className={`slide ${currentSlide === 0 ? 'active' : ''}`} style={{ backgroundImage: 'url(land0.jpg)' }}></div>
          <div className={`slide ${currentSlide === 1 ? 'active' : ''}`} style={{ backgroundImage: 'url(land1.jpg)' }}></div>
          <div className={`slide ${currentSlide === 2 ? 'active' : ''}`} style={{ backgroundImage: 'url(nature.jpg)' }}></div>
        </div>
        <SearchBar />
        <div className='dots'>
          {[0, 1, 2].map(index => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
