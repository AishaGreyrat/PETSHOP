import React, { useState } from "react";
import { ShoppingCartIcon, UserIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import SearchBar from '@/Components/SearchBar/SearchBar';
import LoginModal from '@/Components/Modal/LoginModal';
import RegisterModal from "../Modal/RegisterModal";
import AddProductModal from '@/Components/Modal/AddProductModal';
import { AppBarProps } from '@/Types/types'
import styles from './Appbar.module.css';
import { useUser } from "@/Contexts/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { adminEmails } from "../../Roles/useAdminCheck"

const AppBar: React.FC<AppBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) => {
  const { user, setUser } = useUser();
  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  }
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  return (
    <header className={styles["app-bar"]}>
    

      {/* Barra de navegación principal */}
      <div className={styles["app-bar-content"]}>
        <div className={styles["logo-section"]}>
          <Link to="/">
            <img
              src="/assets/daysi.png"
              alt="Daysi Logo"
              className={styles["title-image"]}
            />
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
            {user ? (
              <>
                <li>
                  <span>Bienvenido, {user.displayName}</span>
                  <button onClick={handleSignOut}>Cerrar sesión</button>
                </li>
                {user = adminEmails
                (

                )}
                <li>
                  <a href="#" onClick={() => setIsAddProductModalOpen(true)}>
                    <PlusIcon className={styles.icon} />
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="#" onClick={() => setIsLoginModalOpen(true)}>
                    <UserIcon className={styles.icon} />
                  </a>
                </li>
                <li>
                  <button onClick={() => setIsRegisterModalOpen(true)}>
                    Regístrate
                  </button>
                </li>
              </>
            )
          
          }
              <li>
                <a >
                  
                </a>
              </li>
              
              <li>
                <Link to="/cart">
                  <ShoppingCartIcon className={styles.icon} />
                </Link>
              </li>
          </ul>
        </nav>
      </div>

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
