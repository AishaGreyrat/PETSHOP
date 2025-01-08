import React from "react";
import Modal from "./Modal";
import { ModalProps } from "@/Types/types";
import styles from "./Modal.module.css";

const SignOutModal: React.FC<ModalProps & { onConfirm: () => void }> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>  {/* Usamos `onClose` para manejar el cierre */}
      <div className={styles.modalBody}>
        <h2>Confirmar Cierre de Sesión</h2>
        <p>¿Estás seguro de que deseas cerrar sesión?</p>
        <div className={styles.modalActions}>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={() => { onConfirm(); onClose(); }}>Confirmar</button>
        </div>
      </div>
    </Modal>
  );
};

export default SignOutModal;
