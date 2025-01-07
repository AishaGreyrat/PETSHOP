import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../Redux/features/cartSlice';

const AddToCartButton: React.FC<{ id: string; name: string; price: number }> = ({ id, name, price }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ id, name, price, quantity: 1 }));
  };

  return <button onClick={handleAddToCart}>Agregar al carrito</button>;
};

export default AddToCartButton;
