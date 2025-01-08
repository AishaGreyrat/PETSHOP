import React from 'react';
import { useCart } from '@/Contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { handleRemove, handleClearCart } from '@/Utils/utils';
import styles from './Cart.module.css';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const total = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.carritotitle}>Tu carrito</h2>
      {state.items.length === 0 ? (
        <div className={styles.emptyCart}>
          <h2>Tu carrito está vacío</h2>
          <img
            className={styles.cat}
            src="/assets/gatitriste.png"
            alt="Carrito vacío"
          />
        </div>
      ) : (
        <>
          <ul className={styles.productGrid}>
            {state.items.map((item) => (
              <li key={item.id} className={styles.productCard}>
                {item.image && (
                  <img
                    className={styles.cartItemImage}
                    src={item.image}
                    alt={item.name}
                  />
                )}
                <h3>{item.name}</h3>
                <p className={styles.price}>${item.price} x {item.quantity}</p>
                <div className={styles.buttonGroup}>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemove(item.id, dispatch)}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className={styles.total}>Total: ${total.toFixed(2)}</h3>
          <div className={styles.actionButtons}>
            <button
              className={styles.clearCartButton}
              onClick={() => handleClearCart(dispatch)}
            >
              Limpiar carrito
            </button>
            <button
              className={styles.payButton}
              onClick={() => navigate('/payment')}
            >
              Pagar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
