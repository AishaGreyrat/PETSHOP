import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductForm from '../src/Components/ProductForm';
import ProductList from '../src/Components/ProductList';
import Cart from './Components/Cart';
import Login from './Components/Login';
import Register from './Components/Register';
import ImageCarousel from './Components/ImageCarousel'; // Importa el carrusel
import './Styles/AppBar.css';

const AppBar: React.FC = () => {
  return (
    <Router>
      <header className="app-bar">
        <div className="app-bar-content">
          <div className="logo-section">
            <img src="/assets/daysi.png" alt="Daysi Logo" className="title-image" />
          </div>
          <div className="navbar-search">
            <input type="text" placeholder="Buscar..." />
          </div>
          <nav className="navbar-icons">
            <ul>
              <li>
                <Link to="/login">
                  <img src="/assets/perfil.svg" alt="perfil" className="icon" />
                </Link>
              </li>
              <li>
                <Link to="/add-product">
                  <img src="/assets/add.svg" alt="add" className="icon" />
                </Link>
              </li>
              <li>
                <Link to="/products">
                  <img src="/assets/bag.svg" alt="bag" className="icon" />
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <img src="/assets/cart-outline.svg" alt="cart" className="icon" />
                </Link>
              </li>
              <li>
                <Link to="/register">Registrar</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Aquí añadimos el carrusel de imágenes */}
      <ImageCarousel />

      <footer className="footer">
        <p>&copy; 2024 Petshop. Todos los derechos reservados.</p>
        <ul>
          <li><a href="#terms">Términos de servicio</a></li>
          <li><a href="#contact">Contáctanos</a></li>
        </ul>
      </footer>

      {/* Definir las rutas dentro del mismo archivo */}
      <Routes>
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default AppBar;
