import React, { useState } from 'react';
import { useCart } from '@/Contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { handleRemove, handleClearCart } from '@/Utils/utils';
import ClearCartModal from '@/Components/Modal/ClearCartModal'; // Importamos el modal
import styles from "@/Pages/Cart/Cart.module.css"; // Ajuste para usar CSS modules
import '@/Styles/AppBar.css'; // Estilos adicionales

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const total = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();

  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);

  const openClearCartModal = () => {
    setIsClearCartModalOpen(true);
  };

  const closeClearCartModal = () => {
    setIsClearCartModalOpen(false);
  };

  const confirmClearCart = () => {
    handleClearCart(dispatch); // Limpiar carrito
    setIsClearCartModalOpen(false); // Cerrar el modal
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2 className={styles.carritotitle || 'carritotitle'}>Tu carrito</h2>
      {state.items.length === 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
          }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#555' }}>
            Tu carrito está vacío
          </h2>
          <img
            src="/assets/gatitriste.png"
            alt="Carrito vacío"
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'contain',
              marginBottom: '20px',
            }}
          />
        </div>
      ) : (
        <>
          <ul className={styles.productGrid || 'product-grid'}>
            {state.items.map((item) => (
              <li
                key={item.id}
                className={styles.productCard || 'product-card'}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '150px',
                      height: '150px',
                      marginBottom: '10px',
                      objectFit: 'cover',
                    }}
                  />
                )}
                <div>
                  <h3>{item.name}</h3>
                  <p className={styles.price || 'price'}>
                    ${item.price} x {item.quantity}
                  </p>
                  <button
                    className={styles.removeButton || 'remove-button'}
                    onClick={() => handleRemove(item.id, dispatch)}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className={styles.total || 'total'}>
            Total: ${total.toFixed(2)}
          </h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '20px',
            }}
          >
            <button
              className={styles.clearCartButton || 'clear-cart-button'}
              onClick={openClearCartModal}
            >
              Limpiar carrito
            </button>
            <button
              className={styles.paymentButton || 'payment-button'}
              onClick={() => navigate('/payment')}
            >
              Pagar
            </button>
          </div>
        </>
      )}

      {/* Modal de confirmar limpieza del carrito */}
      <ClearCartModal
        isOpen={isClearCartModalOpen}
        onClose={closeClearCartModal}
        onConfirm={confirmClearCart}
      />
    </div>
  );
};

export default Cart;
