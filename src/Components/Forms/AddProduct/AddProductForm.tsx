import React from "react";
import useAppDispatch from "@/Hooks/useAppDispatch";
import { addItem } from "@/Redux/slices/cartSlice";
import styles from "./Forms.module.css";

const AddProductForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product = { id: "1", name: "Producto", price: 100, quantity: 1, image: "" };
    dispatch(addItem(product));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Agregar Producto</h2>
      {/* Campos del formulario */}
      <button type="submit">Agregar</button>
    </form>
  );
};

export default AddProductForm;
