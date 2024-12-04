import React from 'react';
import Modal from './Modal';
import ProductForm from '@/Components/Forms/AddProduct/AddProductForm';
import { AddProductModalProps } from '@/Types/types';
import styles from './Modal.module.css';

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles.modalBody}>
            <ProductForm closeModal={onClose} />
        </div>
    </Modal>
  );
};

export default AddProductModal;
