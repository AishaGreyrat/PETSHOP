import React from 'react';
import Modal from './Modal';
import { ConfirmModalProps } from '@/Types/types';
import styles from './Modal.module.css';

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, message, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalBody}>
        <p>{message}</p>
        <div className={styles.modalFooter}>
          <button className={styles.confirmarButton} onClick={onConfirm}>Confirmar</button>
          <button className={styles.closeButton} onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
