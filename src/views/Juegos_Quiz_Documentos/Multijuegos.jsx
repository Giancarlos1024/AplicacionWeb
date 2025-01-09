import React, { useState } from 'react';
import '../../assets/css/Multijuegos.css';

const Multijuegos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'img/carrusel/foto1.jpeg',
    'img/carrusel/foto2.jpeg',
    'img/carrusel/foto3.jpeg',
    'img/carrusel/foto4.jpeg',
    'img/carrusel/foto5.jpeg',
    'img/carrusel/foto6.jpeg',
    'img/carrusel/foto7.jpeg',
    'img/carrusel/foto8.jpeg',
    'img/carrusel/foto9.jpeg',
    'img/carrusel/foto10.jpeg',
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className='contenedorGaleria'>
        <div className="carousel-container">
        <button className="carousel-button prev" onClick={prevSlide}>
          &#10094;
        </button>
        <div className='contenedorI'>
          <div
              className="carousel-wrapper"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {images.map((image, index) => (
                <div key={index} className="carousel-slide">
                  <img src={image} alt={`Slide ${index + 1}`} />
                </div>
              ))}
            </div>
        </div>
        <button className="carousel-button next" onClick={nextSlide}>
          &#10095;
        </button>
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default Multijuegos;
