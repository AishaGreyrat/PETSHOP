import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/AppBar.css';
import SearchBar from './SearchBar';
import Login from './Login'; // Importa el componente Login
import Register from './Register'; // Importa el componente Register
import ProductForm from './ProductForm'; // Importa el componente ProductForm

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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Estado para controlar el modal de login
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // Estado para controlar el modal de registro
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false); // Estado para controlar el modal de añadir producto

  // Funciones para abrir y cerrar los modales
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const openAddProductModal = () => setIsAddProductModalOpen(true); // Abre el modal para añadir producto
  const closeAddProductModal = () => setIsAddProductModalOpen(false); // Cierra el modal para añadir producto

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

        {/* Los link se quitaron porque cuando se podrian con el modal salira doble cuando dabas click*/}
        <nav className="navbar-icons">
          <ul>
            {/* Enlace que abre el modal de Login */}
            <li>
              <a href="#" onClick={openLoginModal}>
                <img src="/assets/perfil.svg" alt="perfil" className="icon" />
              </a>
            </li>

            {/* Enlace para abrir el modal de añadir producto */}
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

            {/* Enlace que abre el modal de Registro */}
            <li>
              <a href="#" onClick={openRegisterModal}>Registrar</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Modal de Login */}
      {isLoginModalOpen && (
        <div className="modal">
            <Login closeModal={closeLoginModal} />
          </div>
      )}

      {/* Modal de Registro */}
      {isRegisterModalOpen && (
        <div className="modal">
            <Register closeModal={closeRegisterModal} />
          </div>
      )}

      {/* Modal para añadir producto */}
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