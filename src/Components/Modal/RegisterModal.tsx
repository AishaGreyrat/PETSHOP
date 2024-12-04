import React from 'react';
import Modal from './Modal';
import RegisterForm from '../Forms/Register/RegisterForm';
import { RegisterModalProps } from '@/Types/types';
import styles from './Modal.module.css';

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles.modalBody}>
            <RegisterForm closeModal={onClose} />  
        </div>
    </Modal>
  );
};

export default RegisterModal;
