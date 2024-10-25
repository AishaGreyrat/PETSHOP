import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AppBar.css';

/* Se añadieoron las rutas con el plugin de react-router-dom */

const AppBar: React.FC = () => {
  return (
    <header className="app-bar">
        <div className="app-bar-content">
          <div className="logo-section">
            <Link to="/">
              <img src="/assets/daysi.png" alt="Daysi Logo" className="title-image" />
            </Link>
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
  );
};

export default AppBar;

