import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <div>
      <h1>Carrito</h1>
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
