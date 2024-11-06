import React from 'react';
import ImageCarousel from './Components/ImageCarousel'; // Importa el carrusel
import './Styles/AppBar.css';

import ReactRouter from './Routes/ReactRouter';

import ShopPage from './Components/ShopPage';

//import FileInput from './Components/fileInput';

// Correccion del codigo duplicado

const App: React.FC = () => {
  return (
    <div>
      <ReactRouter />
      
      {/* Carrusel de imágenes */}
      <ImageCarousel />

      {/* input del archivo separado por su propio componente */}
      <ShopPage/>
      {/* footer */}
      <footer className="footer">
        <p>&copy; 2024 Petshop. Todos los derechos reservados.</p>
        <ul>
          <li>
            <a href="#terms"/>Términos de servicio
          </li>
          <li>
            <a href="#contact"/>Contáctanos
          </li>
        </ul>
      </footer>
    </div>
  );
};
      
export default App;
