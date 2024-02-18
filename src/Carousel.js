import React, { useState, useEffect } from 'react';
import './Carousel.css'; // Make sure to have your CSS file for styles

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    // Clear the interval when the component unmounts or currentIndex changes
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  // Manual navigation to the next image
  const goToNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carousel-container">
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} style={{ width: '100%', transition: 'transform 0.5s ease' }} />
        
    </div>
  );
};

export default Carousel;