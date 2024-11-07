import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/AppBar.css';
import SearchBar from './SearchBar';

// Definir el tipo para las props de AppBar
type AppBarProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const AppBar: React.FC<AppBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <header className="app-bar">
      <div className="app-bar-content">
        <div className="logo-section">
          <Link to="/">
            <img src="/assets/daysi.png" alt="Daysi Logo" className="title-image" />
          </Link>
        </div>
        {/* Barra de búsqueda y filtro */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
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
