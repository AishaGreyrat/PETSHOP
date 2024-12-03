import React, { useState, useEffect } from 'react';
import '../Styles/ImageCarousel.css';

const images = [
  '/assets/petshop1.jpg', // Cambia estas rutas por las correctas de tus imágenes
  '/assets/petshop2.jpg',
  '/assets/petshop3.jpg',
];

const ImageCarousel: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Función para cambiar a la imagen anterior
  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Función para cambiar a la siguiente imagen
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Efecto para cambiar la imagen automáticamente cada 10 segundos
  useEffect(() => {
    const interval = setInterval(nextImage, 10000); // Cambiar cada 10 segundos
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  return (
    <div className="image-carousel">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Imagen ${index + 1}`}
          className={`carousel-image ${
            index === currentImageIndex ? 'active' : ''
          }`}
        />
      ))}
      <button className="carousel-button left" onClick={previousImage}>
        &#10094;
      </button>
      <button className="carousel-button right" onClick={nextImage}>
        &#10095;
      </button>
    </div>
  );
};

export default ImageCarousel;
