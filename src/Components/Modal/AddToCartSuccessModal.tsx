import React from "react";
import Modal from "./Modal";  // Importamos el componente Modal base
import { ModalProps } from "@/Types/types";  // Importamos las props definidas en types.ts
import styles from "./Modal.module.css";  // Estilos específicos

const AddToCartSuccessModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>  {/* Usamos `onClose` para manejar el cierre */}
      <div className={styles.modalBody}>
        <h2>Producto Agregado al Carrito</h2>
        <p>El producto se ha agregado al carrito exitosamente.</p>
        <div className={styles.modalActions}>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </Modal>
  );
};

export default AddToCartSuccessModal;
