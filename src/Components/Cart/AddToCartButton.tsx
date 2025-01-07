import React from 'react';
import styles from './Cart.module.css';

interface AddToCartProps {
  id: string;
  name: string;
  price: number;
}

const AddToCartButton: React.FC<AddToCartProps> = ({ id, name, price }) => {
  const handleAddToCart = () => {
    console.log(`Producto añadido: ${name}`);
  };

  return (
    <button className={styles['add-to-cart-button']} onClick={handleAddToCart}>
      Agregar al carrito
    </button>
  );
};

export default AddToCartButton;
