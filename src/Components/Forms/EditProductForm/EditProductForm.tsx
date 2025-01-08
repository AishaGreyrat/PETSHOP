import React, { useState } from 'react';
import { EditProductFormProps } from '@/Types/types';
import styles from './EditProductForm.module.css';

const EditProductForm: React.FC<EditProductFormProps> = ({ productData, onSubmit, onCancel }) => {
  const [product, setProduct] = useState(productData);
  const [newImage, setNewImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setNewImage(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...product, newImage });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Precio:
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Cantidad:
        <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Imagen:
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {newImage && (
          <img
            src={URL.createObjectURL(newImage)}
            alt="Nueva imagen"
            className={styles.previewImage}
          />
        )}
      </label>
      <div className={styles.actions}>
        <button type="submit" className={styles.saveButton}>Guardar</button>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>Cancelar</button>
      </div>
    </form>
  );
};

export default EditProductForm;
