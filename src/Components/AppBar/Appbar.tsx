import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "@/Components/SearchBar/SearchBar";
import LoginModal from "@/Components/Modal/LoginModal";
import RegisterModal from "@/Components/Modal/RegisterModal";
import AddProductModal from "@/Components/Modal/AddProductModal";
import { AppBarProps } from "@/Types/props";
import styles from "./AppBar.module.css";
import { useUser } from "@/Contexts/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useAdminCheck } from "../../Roles/useAdminCheck";
import { AdminButtons, UserButtons, GuestButtons } from "./AppBarButtons";

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

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <header className={styles["app-bar"]}>
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

        {/* Navegación */}
        <nav className={styles["navbar-icons"]}>
          <ul>
            {user ? (
              <>
                {isAdmin && <AdminButtons onAddProduct={() => setIsAddProductModalOpen(true)} />}
                <UserButtons onSignOut={handleSignOut} />
              </>
            ) : (
              <GuestButtons
                onLogin={() => setIsLoginModalOpen(true)}
                onRegister={() => setIsRegisterModalOpen(true)}
              />
            )}
          </ul>
        </nav>
      </div>

      {/* Modales */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
      <AddProductModal isOpen={isAddProductModalOpen} onClose={() => setIsAddProductModalOpen(false)} />
    </header>
  );
};

export default AppBar;
