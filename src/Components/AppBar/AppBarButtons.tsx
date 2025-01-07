import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon, UserIcon, PlusIcon } from "@heroicons/react/24/solid";
import styles from "./AppBar.module.css";

interface AdminButtonsProps {
  onAddProduct: () => void;
}

interface UserButtonsProps {
  onSignOut: () => void;
}

interface GuestButtonsProps {
  onLogin: () => void;
  onRegister: () => void;
}

export const AdminButtons: React.FC<AdminButtonsProps> = ({ onAddProduct }) => (
  <>
    <li>
      <button onClick={onAddProduct}>
        <PlusIcon className={styles.icon} />
      </button>
    </li>
  </>
);

export const UserButtons: React.FC<UserButtonsProps> = ({ onSignOut }) => (
  <>
    <li>
      <button>
        <Link to="/cart">
          <ShoppingCartIcon className={styles.icon} />
        </Link>
      </button>
    </li>
    <li>
      <button onClick={onSignOut}>Cerrar sesión</button>
    </li>
  </>
);

export const GuestButtons: React.FC<GuestButtonsProps> = ({ onLogin, onRegister }) => (
  <>
    <li>
      <button onClick={onLogin}>
        <UserIcon className={styles.icon} />
      </button>
    </li>
    <li>
      <button onClick={onRegister}>Regístrate</button>
    </li>
  </>
);
