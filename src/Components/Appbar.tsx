import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Appbar.css';

/* Se añadieoron las rutas con el plugin de react-router-dom */

const AppBar: React.FC = () => {
  return (
    <header className="app-bar">
      <div className="app-bar-content">
        <div className="logo-section">
        <img src="/images/daysi.png" alt="Daysi Logo" className="title-image" />
         
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Buscar..." />
        </div>
        <nav className="navbar-icons">
          <ul>
          <li>
              <Link to="/perfile">
              <img src="/images/perfil.svg" alt="perfile" className="icon" />
              </Link>
            </li>
            <li>
              <Link to="/add-product">
              <img src="images/add.svg" alt="add" className="icon" />
              </Link>
            </li>
            <li>
              <Link to="/products">
              <img src="images/bag.svg" alt="bag" className="icon" />
              </Link>
            </li>
            <li>
              <Link to="/cart">
              <img src="images/cart-outline.svg" alt="cart" className="icon" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>


  );
};

export default AppBar;

