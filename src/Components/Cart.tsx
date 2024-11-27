import React, { useState } from 'react';
import { useCart } from '../Context/CartContext';
<<<<<<< Updated upstream
=======
import { useNavigate } from 'react-router-dom';
import "../Styles/AppBar.css";
>>>>>>> Stashed changes

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    setItemToRemove(id);
    setIsRemoveModalOpen(true);
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      dispatch({ type: 'REMOVE_ITEM', payload: { id: itemToRemove, name: '', price: 0 } });
      setItemToRemove(null);
      setIsRemoveModalOpen(false);
    }
  };

  const handleClearCart = () => {
    setIsClearModalOpen(true);
  };

  const confirmClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    setIsClearModalOpen(false);
  };

  return (
    <div>
      <> Luego se cambiará por un svg de carrito </> 
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
      {state.items.length > 0 && <button onClick={handleClearCart}>Limpiar carrito</button>}

      {isRemoveModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsRemoveModalOpen(false)}>&times;</span>
            <h3>¿Estás seguro de que deseas remover este producto?</h3>
            <div>
              <button onClick={confirmRemove}>Confirmar</button>
              <button onClick={() => setIsRemoveModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {isClearModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsClearModalOpen(false)}>&times;</span>
            <h3>¿Estás seguro de que deseas limpiar el carrito?</h3>
            <div>
              <button onClick={confirmClearCart}>Confirmar</button>
              <button onClick={() => setIsClearModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
