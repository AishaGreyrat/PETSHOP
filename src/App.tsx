import React from 'react';
<<<<<<< HEAD
import ReactRouter from './Routes/ReactRouter';

/* Se reestructuro el app.tsx para las rutas */

const App: React.FC = () => {
  return (
    <div>
      <ReactRouter />
    </div>
  );
};

export default App;
=======
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductForm from '../src/Components/ProductForm';
import ProductList from '../src/Components/ProductList';
import Cart from './Components/Cart';
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
              <Link to="/perfile">
              <img src="/assets/perfil.svg" alt="perfile" className="icon" />
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
          </ul>
        </nav>
      </div>
    </header>

      {/* Definir las rutas dentro del mismo archivo */}
      <Routes>
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default AppBar;
>>>>>>> e7476820aee8a28a24cde2e97261ece6ef5ddf46
