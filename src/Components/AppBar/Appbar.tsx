import React, { useState } from "react";
import { ShoppingCartIcon, UserIcon, PlusIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import SearchBar from "@/Components/SearchBar/SearchBar";
import LoginModal from "@/Components/Modal/LoginModal";
import RegisterModal from "../Modal/RegisterModal";
import AddProductModal from "@/Components/Modal/AddProductModal";
import { AppBarProps } from "@/Types/types";
import { useUser } from "@/Contexts/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useAdminCheck } from "@/Roles/useAdminCheck";
import styles from "./Appbar.module.css";
import useMediaQuery from "@/Hooks/useMediaQuery";
import MessageCarousel from "../ImageCarousel/MessageCarousel";
import messages from "../ImageCarousel/messages";

const AppBar: React.FC<AppBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) => {
  const { user, setUser } = useUser();
  const { isAdmin } = useAdminCheck();

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1100px)");

  return (
    <header className={styles["app-bar"]}>
      {/* Header Superior */}
      <div className={styles["top-header"]}>
        <MessageCarousel messages={messages} interval={5000} />
      </div>

      {/* Contenido Principal */}
      <div className={styles["app-bar-content"]}>
        {/* Logo */}
        <div className={styles["logo-section"]}>
          <Link to="/">
            <img src="/assets/daysi.png" alt="Daysi Logo" className={styles["title-image"]} />
          </Link>
        </div>

        {/* Barra de búsqueda */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Botón de menú responsivo */}
        {!isAboveMediumScreens && (
          <button
            className={styles["menu-toggle"]}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className={styles.icon} />
            ) : (
              <Bars3Icon className={styles.icon} />
            )}
          </button>
        )}

        {/* Menú de navegación */}
        {isAboveMediumScreens && (
          <nav className={styles["navbar-icons"]}>
            <ul>
              {user ? (
                <>
                  {isAdmin && (
                    <li>
                      <button onClick={() => setIsAddProductModalOpen(true)}>
                        <PlusIcon className={styles.icon} />
                      </button>
                    </li>
                  )}
                  <li>
                    <Link to="/cart">
                      <button>
                        <ShoppingCartIcon className={styles.icon} />
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button
                      className="sign-out-button"
                      onClick={handleSignOut}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button onClick={() => setIsLoginModalOpen(true)}>
                      <UserIcon className={styles.icon} />
                    </button>
                  </li>
                  <li>
                    <button
                      className="register-button"
                      onClick={() => setIsRegisterModalOpen(true)}
                    >
                      Regístrate
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>

      {/* Menú lateral móvil */}
      {!isAboveMediumScreens && isMenuOpen && (
        <div className={`${styles["mobile-menu"]} ${isMenuOpen ? styles["open"] : ""}`}>
          <ul>
            {user ? (
              <>
                {isAdmin && (
                  <li>
                    <button onClick={() => setIsAddProductModalOpen(true)}>
                      Agregar Producto
                    </button>
                  </li>
                )}
                <li>
                  <button>
                    <Link to="/cart">Carrito</Link>
                  </button>
                </li>
                <li>
                  <button className="sign-out-button" onClick={handleSignOut}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={() => setIsLoginModalOpen(true)}>
                    <UserIcon className={styles.icon} />
                  </button>
                  <button onClick={() => setIsLoginModalOpen(true)}>
                  </button>
                </li>
                <li>
                  <button
                    className="register-button"
                    onClick={() => setIsRegisterModalOpen(true)}
                  >
                    Regístrate
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* Modales */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
      />
    </header>
  );
};


export default AppBar;