import React, { useState, useEffect } from 'react';
import '../Styles/ImageCarousel.css';

const images = [
  '/assets/portadagorgi.jpg',
  '/assets/animalworld.avif',
  '/assets/gatopubli.avif',
]; // Lista de imágenes que se mostrarán en el carrusel

const ImageCarousel: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Función para cambiar a la siguiente imagen
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Efecto para cambiar la imagen automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(nextImage, 10000); // Cambiar cada 10 segundos
    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonta
  }, []);

  return (
    <div className="image-carousel">
      <img
        src={images[currentImageIndex]}
        alt={`Imagen ${currentImageIndex + 1}`}
        className="carousel-image"
      />
    </div>
  );
};

export default ImageCarousel;
