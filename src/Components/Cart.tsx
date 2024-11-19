import React from 'react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const navigate = useNavigate();

  // Eliminar un producto del carrito
  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  // Limpiar el carrito
  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div>
      <h2>Tu carrito</h2>
      {state.items.length === 0 ? (
        <p>Tu carrito está vacío</p>
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
      {state.items.length > 0 && (
        <>
          <button onClick={handleClearCart}>Limpiar carrito</button>

          {/* Botón de Pagar que redirige a la página de pago */}
          <button onClick={() => navigate('/payment')}>Pagar</button>
        </>
      )}
    </div>
  );
};

export default Cart;
