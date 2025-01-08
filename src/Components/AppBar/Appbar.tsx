// src/Components/AppBar/AppBar.tsx
import React, { useState } from "react";
import { ShoppingCartIcon, UserIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import SearchBar from '@/Components/SearchBar/SearchBar';
import LoginModal from '@/Components/Modal/LoginModal';
import RegisterModal from "../Modal/RegisterModal";
import AddProductModal from '@/Components/Modal/AddProductModal';
import SignOutModal from '@/Components/Modal/SignOutModal'; // Importa el modal
import { AppBarProps } from '@/Types/types';
import styles from './Appbar.module.css';
import { useUser } from "@/Contexts/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useAdminCheck } from "../../Roles/useAdminCheck";

const AppBar: React.FC<AppBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) => {
  const { user, setUser } = useUser();
  const { isAdmin } = useAdminCheck();
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false); // Estado para abrir el modal de cerrar sesión

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    setIsSignOutModalOpen(false); // Cierra el modal después de cerrar sesión
  };

  return (
    <header className={styles["app-bar"]}>
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
                {isAdmin && (
                  <li>
                    <button>
                      <a href="#" onClick={() => setIsAddProductModalOpen(true)}>
                        <PlusIcon className={styles.icon} />
                      </a>
                    </button>
                  </li>
                )}
                <li>
                  <button>
                    <Link to="/cart">
                      <ShoppingCartIcon className={styles.icon} />
                    </Link>
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsSignOutModalOpen(true)}>Cerrar sesión</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button>
                    <a href="#" onClick={() => setIsLoginModalOpen(true)}>
                      <UserIcon className={styles.icon} />
                    </a>
                  </button>
                </li>
                <li>
                  <button className="register-button" onClick={() => setIsRegisterModalOpen(true)}>Regístrate</button>

                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Modal de cerrar sesión */}
      <SignOutModal
        isOpen={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
        onConfirm={handleSignOut}
      />

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
