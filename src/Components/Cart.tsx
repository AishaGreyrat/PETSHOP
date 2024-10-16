import React from 'react';
import { useCart } from '../Context/CartContext';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, name: '', price: 0 } });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div>
         <> Luego se cambiara por un svg de carrito </>
      <h2>Tu carrito</h2>
      {state.items.length === 0 ? (
        <p>Tu carrito esta vacio</p>
      ) : (
        <ul>
          {state.items.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.quantity}
              <button onClick={() => handleRemove(item.id)}>Remover</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
      {state.items.length > 0 && <button onClick={handleClearCart}>Limpiar carrito</button>}
    </div>
  );
};

export default Cart;
