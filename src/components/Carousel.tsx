import React, { useState } from 'react';
import './Carousel.css';

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/pets-background.jpg',
    '/catdog.jpg',
    '/inicioanimal.jpeg',
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-container">
      <button className="carousel-button prev" onClick={prevSlide}>❮</button>
      <img src={images[currentIndex]} alt="Carousel Slide" className="carousel-image" />
      <button className="carousel-button next" onClick={nextSlide}>❯</button>
    </div>
  );
};

export default Carousel;