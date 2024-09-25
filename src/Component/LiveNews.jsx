import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Component/Layout/Header';
import './LiveNews.css'; //

const LiveNews = () => {
  const [selectedTopic, setSelectedTopic] = useState('Market Trends'); 
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const topics = [
    'Market Trends',
    'Property Trends',
    'Legal Information',
    'How-To Guides',
    'Case Studies',
    'Financial Insights',
    'Local Focus',
    'Expert Opinions',
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log(`Fetching news for topic: ${selectedTopic}`);
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: `${selectedTopic} India`,
            language: 'en',
            sortBy: 'publishedAt',
            apiKey: 'd042251b41ee449b8b1fbff8cb7d6d76', // Replace with your actual API key
          },
        });
        console.log(response.data);
        setNews(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedTopic]);

  if (loading) {
    return (
      <div className="loading-animation vh-100">
        <div className="hand-animation">
          <div className="finger"></div>
          <div className="finger"></div>
          <div className="finger"></div>
          <div className="finger"></div>
          <div className="palm"></div>
          <div className="thumb"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Error loading news: {error.message}</p>;
  }

  return (
    <div>
      <Header /> {/* Include the header component */}
      <div className="live-news-container">
        <h2>Live News</h2>
        <div className="topics-menu">
          {topics.map((topic, index) => (
            <button
              key={index}
              className={`topic-button ${selectedTopic === topic ? 'active' : ''}`}
              onClick={() => setSelectedTopic(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
        <div className="news-list">
          {news.length > 0 ? (
            <ul>
              {news.map((article, index) => (
                <li key={index} className="news-item">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No news articles found for {selectedTopic}.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveNews;
