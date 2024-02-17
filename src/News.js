import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './News.css'; // Ensure you have some basic styling

function News() {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    // Simulate fetching news data with axios here
    // For demonstration, we'll use static data
    const fetchedNews = [
      { id: 1, title: 'News Item 1', content: 'This is the content for news item 1.' },
      { id: 2, title: 'News Item 2', content: 'This is the content for news item 2.' },
      // Add more news items as needed
    ];

    setNewsItems(fetchedNews);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <nav className="top-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/community">Community</Link></li>
          <li><Link to="/my-progress">My Progress</Link></li>
          <li><Link to="/friends">Friends</Link></li>
          <li><Link to="/news">News</Link></li>
          <li><Link to="/help">Help</Link></li>
          <li className="right"><Link to="/login" role="button">Login</Link></li>
          <li className="right"><Link to="/signup" role="button">Signup</Link></li>
        </ul>
      </nav>
      <div className="news-container">
        <h1>Latest News</h1>
        {newsItems.length > 0 ? (
          <ul>
            {newsItems.map((item) => (
              <li key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No news items to display.</p>
        )}
        <Link to="/">Go back to home</Link>
      </div>
    </>
  );
}

export default News;