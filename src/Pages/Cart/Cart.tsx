import React from 'react';
import { useCart } from '@/Contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { handleRemove, handleClearCart } from '@/Utils/utils';

import styles from "./Cart.module.css";

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const total = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();

  return (
    <div >
      <h2 className={styles.carritotitle} >Tu carrito</h2>
      {state.items.length === 0 ? (
        <div>
          <h2 className={styles["Carrito-vacío"]} >
            Tu carrito está vacío
          </h2>
          <img
            className={styles.cat}
            src="/assets/gatitriste.png" // URL relativa para imágenes en "public"
            alt="Carrito vacío"
           />
        </div>
      ) : (
        <>
          <ul className={styles["product-grid"]}>
            {state.items.map((item) => (
              <li
                key={item.id}
                className={styles["product-card"]}
              >
                {item.image && (
                  <img
                  className={styles["cart-item-image"]}
                    src={item.image}
                    alt={item.name}
                  />
                )}
                <div>
                  <h3>{item.name}</h3>
                  <p className={styles.price}>
                    ${item.price} x {item.quantity}
                  </p>
                  <button className={styles.remover} onClick={() => handleRemove(item.id, dispatch)}>
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className={styles.total}>Total: ${total.toFixed(2)}</h3>
          <div
          >
            <button className={styles.limpiar} onClick={() => handleClearCart(dispatch)}>
              Limpiar carrito
            </button>
            <button className={styles.pagar} onClick={() => navigate('/payment')}>Pagar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;



