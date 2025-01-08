import React from 'react';
import Modal from './Modal';
import EditProductForm from '../Forms/EditProductForm/EditProductForm';
import { EditProductModalProps, Product } from '@/Types/types';
import styles from './Modal.module.css';

const EditProductModal: React.FC<EditProductModalProps> = ({ isOpen, onClose, productData, onSave }) => {
  const handleSubmit = (updatedProduct: Product) => {
    onSave(updatedProduct); // Pasar los datos actualizados al padre
    onClose(); // Cerrar el modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalBody}>
        {productData && (
          <EditProductForm
            productData={productData}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        )}
      </div>
    </Modal>
  );
};

export default EditProductModal;
