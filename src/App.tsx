import React, { useState } from 'react';
import ImageCarousel from './Components/ImageCarousel'; // Importa el carrusel
import './Styles/AppBar.css';
import ReactRouter from './Routes/ReactRouter'; // Si este es el que gestiona las rutas
import ShopPage from './Components/ShopPage'; // Página de productos

const App: React.FC = () => {
  // Estado para el término de búsqueda y la categoría seleccionada
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div>
      {/* Pasamos los estados a ReactRouter para que pueda acceder a las rutas que lo necesiten */}
     
      {/* Carrusel de imágenes */}
      <ImageCarousel />
 <ReactRouter 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />

      {/* Página de productos */}
      <ShopPage searchTerm={searchTerm} selectedCategory={selectedCategory} />

      {/* footer */}
      <footer className="footer">
        <p>&copy; 2024 Petshop. Todos los derechos reservados.</p>
        <ul>
          <li>
            <a href="#terms">Términos de servicio</a>
          </li>
          <li>
            <a href="#contact">Contáctanos</a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default App;
