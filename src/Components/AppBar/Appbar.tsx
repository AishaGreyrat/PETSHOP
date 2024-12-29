import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, UserIcon, PlusIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import SearchBar from '@/Components/SearchBar/SearchBar';
import LoginModal from '@/Components/Modal/LoginModal';
import RegisterModal from '@/Components/Modal/RegisterModal';
import LogoutButton from '../Forms/logout/LogoutButton';
import AddProductModal from '@/Components/Modal/AddProductModal';
import useMediaQuery from '@/Hooks/useMediaQuery';
import { AppBarProps } from '@/Types/types';
import styles from './Appbar.module.css';

const AppBar: React.FC<AppBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  
  return (
    <header className={styles["app-bar"]}>
      {/* Header superior */}
      <div className={styles["top-header"]}>
        <p>Envío gratis en todo México en compras mayores a $1500.</p>
      </div>

      {/* Navbar principal */}
      <div className={styles["app-bar-content"]}>
        <div className={styles["logo-section"]}>
          <Link to="/">
            <img src="/assets/daysi.png" alt="Daysi Logo" className={styles["title-image"]} />
          </Link>
        </div>

      {/* Barra de búsqueda: Una sola versión con clases adaptativas */}
      <div className={isAboveMediumScreens ? styles["search-bar"] : styles["mobile-search"]}>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

        {/* Menú de navegación para pantallas grandes */}
        {isAboveMediumScreens ? (
          <nav className={styles["navbar-icons"]}>
            <ul>
              <li>
                <button onClick={() => setIsLoginModalOpen(true)}>
                  <UserIcon className={styles.icon} />
                </button>
              </li>
              <li>
                <button onClick={() => setIsAddProductModalOpen(true)}>
                  <PlusIcon className={styles.icon} />
                </button>
              </li>
              <li>
                <Link to="/cart">
                  <ShoppingCartIcon className={styles.icon} />
                </Link>
              </li>
              <button className={styles["registrar"]} onClick={() => setIsRegisterModalOpen(true)}>
                Regístrate
              </button>
              <LogoutButton />
            </ul>
          </nav>
        ) : (
          /* Botón hamburguesa para pantallas pequeñas */
          <button
            className={styles["menu-toggle"]}
            onClick={() => setIsMenuToggled(!isMenuToggled)}
          >
            <Bars3Icon className={styles["menu-icon"]} />
          </button>
        )}
      </div>

      {/* Menú lateral móvil */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className={styles["mobile-menu"]}>
          <div className={styles["menu-header"]}>
            <button className={styles["menu-close"]} onClick={() => setIsMenuToggled(false)}>
              <XMarkIcon className={styles["menu-icon"]} />
            </button>
          </div>
          <div className={styles["menu-items"]}>
            <a href="#" onClick={() => setIsLoginModalOpen(true)}>Iniciar sesión</a>
            <a href="#" onClick={() => setIsRegisterModalOpen(true)}>Regístrate</a>
            <Link to="/cart">Carrito</Link>
            <a href="#" onClick={() => setIsAddProductModalOpen(true)}>Agregar producto</a>
            <LogoutButton />
          </div>
        </div>
      )}
    </header>
  );
};


export default AppBar;