import React from "react";
import { useCart } from "../Contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "../Styles/AppBar.css";
import { handleRemove, handleClearCart } from "../Utils/utils"; // Importa las funciones de utils

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const total = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="carritotitle">Tu carrito</h2>
      {state.items.length === 0 ? (
        <p className="carritovacio">Tu carrito está vacío</p>
      ) : (
        <ul>
          {/* Mapea los items del carrito */}
          {state.items.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                    objectFit: "cover",
                  }}
                />
              )}
              <div>
                <p>
                  {item.name} - ${item.price} x {item.quantity}
                </p>
                <button onClick={() => handleRemove(item.id, dispatch)}>Remover</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h3 className="total">Total: ${total.toFixed(2)}</h3>
      {state.items.length > 0 && (
        <>
          <button onClick={() => handleClearCart(dispatch)}>Limpiar carrito</button>
          <button onClick={() => navigate("/payment")}>Pagar</button>
        </>
      )}
    </div>
  );
};

export default Cart;
