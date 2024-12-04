import React from "react";
import { ModalProps } from "../../Types/types"; // Importamos ModalProps desde types.ts
import styles from "./Modal.module.css";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no renderizamos nada

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}  {/* El contenido del modal */}
      </div>
    </div>
  );
};

export default Modal;
