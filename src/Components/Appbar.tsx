import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/AppBar.css';
import SearchBar from './SearchBar';
import Login from './Login';
import Register from './Register';
import ProductForm from './ProductForm';

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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const openAddProductModal = () => setIsAddProductModalOpen(true);
  const closeAddProductModal = () => setIsAddProductModalOpen(false);

  return (
    <header className="app-bar">
      <div className="app-bar-content">
        <div className="logo-section">
          <Link to="/">
            <img src="/assets/daysi.png" alt="Daysi Logo" className="title-image" />
          </Link>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <button className="menu-toggle" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      {/* Barra lateral */}
      <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <a href="#" onClick={openLoginModal}>
              <img src="/assets/perfil.svg" alt="perfil" className="icon" />
            </a>
          </li>
          <li>
            <a href="#" onClick={openAddProductModal}>
              <img src="/assets/add.svg" alt="add" className="icon" />
            </a>
          </li>
          <li>
            <Link to="/cart">
              <img src="/assets/cart-outline.svg" alt="cart" className="icon" />
            </Link>
          </li>
          <li>
            <a href="#" onClick={openRegisterModal}>Registrar</a>
          </li>
        </ul>
      </nav>

      {/* Fondo para cerrar la barra lateral */}
      {isSidebarOpen && <div className="backdrop" onClick={toggleSidebar}></div>}

      {/* Modales */}
      {isLoginModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeLoginModal}>&times;</span>
            <Login closeModal={closeLoginModal} />
          </div>
        </div>
      )}

      {isRegisterModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeRegisterModal}>&times;</span>
            <Register closeModal={closeRegisterModal} />
          </div>
        </div>
      )}

      {isAddProductModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeAddProductModal}>&times;</span>
            <ProductForm closeModal={closeAddProductModal} />
          </div>
        </div>
      )}
    </header>
  );
};

export default AppBar;
