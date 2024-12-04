import React, { useState, useEffect } from 'react';
import styles from './ImageCarousel.module.css';

const images = [
  '/assets/happypets.png',
  '/assets/food.png',
  '/assets/loveurpet.png',
  '/assets/sale.png'
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
    <div className={styles['image-Carousel']}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Imagen ${index + 1}`}
          className={`${styles['carousel-Image']} ${index === currentImageIndex ? styles.active : ''}`}
        />
      ))}
      <button className={`${styles['carousel-Button']} ${styles['left']}`} onClick={previousImage}>
        &#10094;
      </button>
      <button className={`${styles['carousel-Button']} ${styles['right']}`} onClick={nextImage}>
        &#10095;
      </button>
    </div>
  );
};

export default ImageCarousel;
