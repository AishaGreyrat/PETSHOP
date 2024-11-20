import React, { useState } from "react";
import {ShoppingCartIcon, UserIcon, PlusIcon } from "@heroicons/react/24/solid"; // Importar íconos necesarios
import { Link } from "react-router-dom";
import "../Styles/AppBar.css";
import SearchBar from "./SearchBar";
import Login from "./Login"; // Importa el componente Login
import Register from "./Register"; // Importa el componente Register
import ProductForm from "./ProductForm"; // Importa el componente ProductForm

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
            <img
              src="/assets/daysi.png"
              alt="Daysi Logo"
              className="title-image"
            />
          </Link>
        </div>

        {/* Barra de búsqueda y filtro */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Iconos de navegación */}
        <nav className="navbar-icons">
          <ul>
            <li>
              <a href="#" onClick={openLoginModal}>
                <UserIcon className="icon" />
              </a>
            </li>
            <li>
              <a href="#" onClick={openAddProductModal}>
                <PlusIcon className="icon" />
              </a>
            </li>
            <li>
              <Link to="/cart">
                <ShoppingCartIcon className="icon" />
              </Link>
            </li>
            <li>
              <a href="#" onClick={openRegisterModal}>
                Registrar
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Modal de Login */}
      {isLoginModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Iniciar Sesión</h2>
              <button className="close-button" onClick={closeLoginModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Contraseña" />
            </div>
            <div className="modal-footer">
              <button onClick={closeLoginModal}>Iniciar sesión</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Registro */}
      {isRegisterModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Registro</h2>
              <button className="close-button" onClick={closeRegisterModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <input type="text" placeholder="Nombre" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Contraseña" />
            </div>
            <div className="modal-footer">
              <button onClick={closeRegisterModal}>Registrar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para añadir producto */}
      {isAddProductModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Añadir Producto</h2>
              <button className="close-button" onClick={closeAddProductModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <ProductForm closeModal={closeAddProductModal} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AppBar;
