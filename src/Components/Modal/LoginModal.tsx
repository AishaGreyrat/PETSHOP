import React from 'react';
import Modal from './Modal';  // Importa el componente Modal base
import { LoginModalProps } from '@/Types/types';  // Importa ModalProps desde types.ts
import Login from '../Forms/Login/LoginForm';  // El formulario de login
import styles from './Modal.module.css';  // Estilos específicos

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalBody}>
        <Login closeModal={onClose} />  {/* El contenido del modal */}
      </div>
    </Modal>
  );
};

export default LoginModal;

