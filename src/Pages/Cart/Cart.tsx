import React from "react";
import useAppSelector from "@/Hooks/UseAppSelector";
import useAppDispatch from "@/Hooks/useAppDispatch";
import { clearCart, removeItem } from "@/Redux/slices/cartSlice";
import styles from "./Cart.module.css";

const Cart: React.FC = () => {
  const { items, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.title}>Tu carrito</h1>
      {items.length === 0 ? (
        <p className={styles.emptyMessage}>Tu carrito está vacío</p>
      ) : (
        <div>
          <ul className={styles.cartItems}>
            {items.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <h3>{item.name}</h3>
                <p>Precio: ${item.price} x {item.quantity}</p>
                <button onClick={() => dispatch(removeItem(item.id))}>Remover</button>
              </li>
            ))}
          </ul>
          <h2 className={styles.total}>Total: ${total.toFixed(2)}</h2>
          <button onClick={() => dispatch(clearCart())}>Limpiar carrito</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
