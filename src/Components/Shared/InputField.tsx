import React from "react";
import { InputFieldProps } from "@/Types/props"; // Importa las props desde el archivo centralizado
import styles from "./Shared.module.css";

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={styles.inputField}
  />
);

export default InputField;
