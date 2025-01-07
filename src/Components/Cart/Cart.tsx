import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import styles from './Cart.module.css';

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <div className={styles.cart}>
      <h2>Carrito</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.quantity} x ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
