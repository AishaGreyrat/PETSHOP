import React, { useState } from "react";
import { ShoppingCartIcon, UserIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import styles from "./AppBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import LoginModal from "../Modal/LoginModal";
import RegisterModal from "../Modal/RegisterModal";
import AddProductModal from "../Modal/AddProductModal";
import { AppBarProps } from "../../Types/types";


const AppBar: React.FC<AppBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

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
              <a href="#" onClick={() => setIsLoginModalOpen(true)}>
                <UserIcon className={styles.icon} />
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setIsAddProductModalOpen(true)}>
                <PlusIcon className={styles.icon} />
              </a>
            </li>
            <li>
              <Link to="/cart">
                <ShoppingCartIcon className={styles.icon} />
              </Link>
            </li>
            <button className={styles.registrar} onClick={() => setIsRegisterModalOpen(true)}>
              Regístrate
            </button>
          </ul>
        </nav>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
      <AddProductModal isOpen={isAddProductModalOpen} onClose={() => setIsAddProductModalOpen(false)} />
    </header>
  );
};

export default AppBar;
