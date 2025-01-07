import React from "react";
import { ButtonProps } from "@/Types/props"; // Importa las props desde el archivo centralizado
import styles from "./Shared.module.css";

const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <button className={styles.button} onClick={onClick}>
    {children}
  </button>
);

export default Button;
