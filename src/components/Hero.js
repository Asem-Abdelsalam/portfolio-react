import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageContainerRef = useRef(null);
  const images = [
    { src: `${process.env.PUBLIC_URL}/images/hero/automation_project.jpg`, alt: 'Automation Project', title: 'Grasshopper Scripting for Automation', category: 'automation' },
    { src: `${process.env.PUBLIC_URL}/images/hero/fabrication_project.png`, alt: 'Fabrication Project', title: 'Grasshopper Scripting for Digital Fabrication', category: 'fabrication' },
    { src: `${process.env.PUBLIC_URL}/images/hero/parametric-project.jpg`, alt: 'Parametric Modeling Project', title: 'Architectural Parametric Modeling', category: 'parametric-modeling' },
    { src: `${process.env.PUBLIC_URL}/images/hero/furniture_project.jpg`, alt: 'Furniture Design Project', title: 'Parametric Furniture Design', category: 'furniture-design' },
  ];
  const intervalTime = 7000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [images.length]);

  const updateImage = (index) => setCurrentIndex(index);
  const nextImage = () => updateImage((currentIndex + 1) % images.length);
  const prevImage = () => updateImage((currentIndex - 1 + images.length) % images.length);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, nextImage, prevImage]);

  const handleSwipe = (startX, endX) => {
    const deltaX = endX - startX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) prevImage();
      else nextImage();
    }
  };

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const handleMouseMove = (moveE) => {
      handleSwipe(startX, moveE.clientX);
      document.removeEventListener('mousemove', handleMouseMove);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => document.removeEventListener('mousemove', handleMouseMove), { once: true });
  };

  const handleTouchStart = (e) => {
    const startX = e.touches[0].clientX;
    let hasSwiped = false;
    const handleTouchMove = (moveE) => {
      if (!hasSwiped) {
        handleSwipe(startX, moveE.touches[0].clientX);
        hasSwiped = true;
      }
    };
    imageContainerRef.current.addEventListener('touchmove', handleTouchMove);
    imageContainerRef.current.addEventListener('touchend', () => {
      imageContainerRef.current.removeEventListener('touchmove', handleTouchMove);
    }, { once: true });
  };

  return (
    <section id="hero" className="hero">
      <div
        className="image-container"
        ref={imageContainerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.alt}
            className={`hero-image ${index === currentIndex ? 'active' : ''}`}
            data-service={index}
            loading="lazy"
          />
        ))}
      </div>
      <Link to={`/projects?category=${images[currentIndex].category}`} className="image-title" id="image-title">
        {images[currentIndex].title}
      </Link>
      <div className="image-controls">
        <div className="progress-bars">
          {images.map((_, index) => (
            <div
              key={index}
              className={`progress-bar ${index === currentIndex ? 'active' : ''}`}
              data-service={index}
              onClick={() => updateImage(index)}
            >
              <div className="progress-fill"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;