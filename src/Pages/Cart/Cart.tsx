import React from 'react';
import { useCart } from '@/Contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { handleRemove, handleClearCart } from '@/Utils/utils';

import style from "./Cart.module.css";
import "./Cart.module.css";

import '@/Styles/AppBar.css';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const total = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();

  return (
    <div className="empty-cart-container">
      <h2 className="carritotitle">Tu carrito</h2>
      {state.items.length === 0 ? (
        <div>
          <h2 >
            Tu carrito está vacío
          </h2>
          <img
            className="cat"
            src="/assets/gatitriste.png" // URL relativa para imágenes en "public"
            alt="Carrito vacío"
           />
        </div>
      ) : (
        <>
          <ul className="product-grid">
            {state.items.map((item) => (
              <li
                key={item.id}
                className="product-card"
              >
                {item.image && (
                  <img
                  className="cart-item-image"
                    src={item.image}
                    alt={item.name}
                  />
                )}
                <div>
                  <h3>{item.name}</h3>
                  <p className="price">
                    ${item.price} x {item.quantity}
                  </p>
                  <button onClick={() => handleRemove(item.id, dispatch)}>
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="total">Total: ${total.toFixed(2)}</h3>
          <div
          >
            <button onClick={() => handleClearCart(dispatch)}>
              Limpiar carrito
            </button>
            <button onClick={() => navigate('/payment')}>Pagar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;



