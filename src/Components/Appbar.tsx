import React, { useState } from "react";
import {
  ShoppingCartIcon,
  UserIcon,
  PlusIcon,
} from "@heroicons/react/24/solid"; // Importar íconos necesarios
import { Link } from "react-router-dom";
import "../Styles/AppBar.css";
import SearchBar from "./SearchBar";
import Login from "./Login"; // Importa el componente Login
import Register from "./Register"; // Importa el componente Register
import ProductForm from "./ProductForm"; // Importa el componente ProductForm

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

  // Esta función estaba mal implementada y no era utilizada correctamente.
  // La eliminamos porque no tiene sentido mantenerla aquí:
  // function closeModal(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
  //   throw new Error('Function not implemented.');
  // }

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

        {/* Los link se quitaron porque cuando se podrían con el modal salía doble cuando dabas click */}
        <nav className="navbar-icons">
          <ul>
            {/* Enlace que abre el modal de Login */}
            <li>
              <a href="#" onClick={openLoginModal}>
                <UserIcon className="icon" />
              </a>
            </li>

            {/* Enlace para abrir el modal de añadir producto */}
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

            {/* Enlace que abre el modal de Registro */}
            <button className="registrar" onClick={openRegisterModal}>
              Registrate
            </button>
          </ul>
        </nav>
      </div>

      {/* Modal de Login */}
      {isLoginModalOpen && (
        <div className="modal-footer">
          <Login closeModal={closeLoginModal} />
        </div>
      )}

      {/* Modal de Registro */}
      {isRegisterModalOpen && (
        <div className="modal-footer">
          <Register closeModal={closeRegisterModal} />
        </div>
      )}

      {/* Modal para añadir producto */}
      {isAddProductModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-footer">
              {/* Aquí cambiamos el uso de `closeModal` por `closeAddProductModal`,
                que es la función correcta para este modal */}
              <button className="close-button" onClick={closeAddProductModal}>
                &times;
              </button>
              <ProductForm closeModal={closeAddProductModal} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AppBar;
