import React from "react";
import Modal from "./Modal";
import { ConfirmSaveChangesModalProps } from "../../Types/types";
import styles from "./Modal.module.css";

const ConfirmSaveChangesModal: React.FC<ConfirmSaveChangesModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.ModalBody}>
        <h2>Confirmar cambios</h2>
        <p>¿Estás seguro de que deseas guardar los cambios realizados?</p>
        <div className={styles.ModalActions}>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onConfirm}>Confirmar</button> {/* onConfirm no recibe parámetros */}
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmSaveChangesModal;
