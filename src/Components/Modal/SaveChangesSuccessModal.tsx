import React from 'react';
import { ModalProps } from '@/Types/types';
import styles from './Modal.module.css';

const AddToCartSuccessModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no se renderiza

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Producto Agregado al Carrito</h2>
        <p>El producto se ha agregado al carrito exitosamente.</p>
        <div className={styles.modalActions}>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartSuccessModal;
