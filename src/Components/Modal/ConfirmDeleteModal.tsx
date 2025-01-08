import React from "react";
import Modal from "./Modal";
import { ModalProps } from "@/Types/types";
import styles from "./Modal.module.css";

const ConfirmDeleteModal: React.FC<ModalProps & { onConfirm: () => void }> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>  {/* Usamos `onClose` para manejar el cierre */}
      <div className={styles.ModalBody}>
        <h2>Confirmar Eliminación</h2>
        <p>¿Estás seguro de que deseas eliminar este producto?</p>
        <div className={styles.ModalActions}>
          <button onClick={onClose} className={styles.CancelButton}>Cancelar</button>
          <button onClick={() => { onConfirm(); onClose(); }} className={styles.ConfirmButton}>Confirmar</button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
