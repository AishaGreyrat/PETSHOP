import React, { useState } from "react";
import { ShoppingCartIcon, UserIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import styles from "./AppBar.module.css"; // Importa los estilos encapsulados
import SearchBar from "../SearchBar/SearchBar";
import Login from "../../Pages/Login";
import Register from "../../Pages/Register";
import ProductForm from "../../componentes/ProductForm";

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
    <header className={styles["app-bar"]}>
      <div className={styles["app-bar-content"]}>
        <div className={styles["logo-section"]}>
          <Link to="/">
            <img src="/assets/daysi.png" alt="Daysi Logo" className={styles["title-image"]} />
          </Link>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <nav className={styles["navbar-icons"]}>
          <ul>
            <li>
              <a href="#" onClick={openLoginModal}>
                <UserIcon className={styles.icon} />
              </a>
            </li>
            <li>
              <a href="#" onClick={openAddProductModal}>
                <PlusIcon className={styles.icon} />
              </a>
            </li>
            <li>
              <Link to="/cart">
                <ShoppingCartIcon className={styles.icon} />
              </Link>
            </li>
            <button className={styles.registrar} onClick={openRegisterModal}>
              Regístrate
            </button>
          </ul>
        </nav>
      </div>

      {isLoginModalOpen && <Login closeModal={closeLoginModal} />}
      {isRegisterModalOpen && <Register closeModal={closeRegisterModal} />}
      {isAddProductModalOpen && (
        <div className={styles.modal}>
          <div className={styles["modal-content"]}>
            <button className={styles["close-button"]} onClick={closeAddProductModal}>
              &times;
            </button>
            <ProductForm closeModal={closeAddProductModal} />
          </div>
        </div>
      )}
    </header>
  );
};

export default AppBar;
