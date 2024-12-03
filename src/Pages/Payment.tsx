import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import { db } from "../../firebaseConfig"; // Asegúrate de importar tu configuración de Firebase
import { doc, updateDoc, increment } from "firebase/firestore";
import "../Styles/AppBar.css";

const Payment: React.FC = () => {
  const { state, dispatch } = useCart();
  const total = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

  // Manejo del cambio de método de pago (tarjeta de crédito / débito)
  const handleMethodChange = (method: string) => {
    setSelectedMethod(method);
    setErrors({ cardNumber: "", cardHolder: "", expirationDate: "", cvv: "" });
  };

  // Manejo de los cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;
    let errors = {
      cardNumber: "",
      cardHolder: "",
      expirationDate: "",
      cvv: "",
    };

    // Validación del número de tarjeta
    if (!formData.cardNumber.match(/^\d{16}$/)) {
      errors.cardNumber = "El número de tarjeta debe tener 16 dígitos.";
      valid = false;
    }

    // Validación del nombre del titular
    if (!formData.cardHolder) {
      errors.cardHolder = "El nombre del titular es obligatorio.";
      valid = false;
    }

    // Validación de la fecha de vencimiento
    const [month, year] = formData.expirationDate.split("/").map(Number);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;

    if (!formData.expirationDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      errors.expirationDate =
        "Formato de fecha de vencimiento inválido (MM/AA).";
      valid = false;
    } else if (
      year < currentYear ||
      (year === currentYear && month < currentMonth)
    ) {
      errors.expirationDate = "La tarjeta está vencida.";
      valid = false;
    }

    // Validación del CVV
    if (!formData.cvv.match(/^\d{3}$/)) {
      errors.cvv = "El CVV debe tener 3 dígitos.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  // Manejo del envío del formulario de pago
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Abrir el modal de confirmación
      setIsModalOpen(true);
    }
  };

  // Confirmar el pago y realizar la lógica de actualización
  const handleConfirmPayment = async () => {
    // Simula el procesamiento del pago
    alert("Pago realizado con éxito");

    // Actualizar las cantidades de productos en Firebase
    try {
      for (const item of state.items) {
        const productRef = doc(db, "products", item.id); // Asegúrate de que 'products' es tu colección en Firebase
        await updateDoc(productRef, {
          quantity: increment(-item.quantity), // Decrementa la cantidad según la cantidad en el carrito
        });
      }

      // Vaciar el carrito local después de procesar el pago
      dispatch({ type: "CLEAR_CART" });

      // Redirige al usuario a la página de inicio
      navigate("/");
    } catch (error) {
      console.error("Error actualizando las cantidades en Firebase: ", error);
      alert(
        "Hubo un error al procesar tu pago, inicie sesion para proceder con el pago."
      );
    } finally {
      // Cerrar el modal después de procesar el pago
      setIsModalOpen(false);
    }
  };

  // Cerrar el modal sin realizar el pago
  const handleCancelPayment = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="payment-page">
      <h2>Método de Pago</h2>
      <div className="cart-summary">
        <h3>Resumen del Carrito</h3>
        <ul>
          {state.items.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.quantity} = $
              {(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <h4>Total: ${total.toFixed(2)}</h4>
      </div>

      <form onSubmit={handleSubmit} className="payment-options">
        <h3>Opciones de Pago</h3>

        {/* Selección de método de pago */}
        <div className="payment-method">
          <div>
            <input
              type="radio"
              id="credit-card"
              name="payment-method"
              value="credit-card"
              onChange={() => handleMethodChange("credit-card")}
              checked={selectedMethod === "credit-card"}
            />
            <label htmlFor="credit-card">Tarjeta de Crédito</label>
            {selectedMethod === "credit-card" && (
              <div className="payment-details">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Número de tarjeta"
                  maxLength={16}
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
                {errors.cardNumber && (
                  <p className="error">{errors.cardNumber}</p>
                )}

                <input
                  type="text"
                  name="cardHolder"
                  placeholder="Nombre del titular"
                  value={formData.cardHolder}
                  onChange={handleChange}
                  required
                />
                {errors.cardHolder && (
                  <p className="error">{errors.cardHolder}</p>
                )}

                <input
                  type="text"
                  name="expirationDate"
                  placeholder="Fecha de vencimiento (MM/AA)"
                  maxLength={5}
                  value={formData.expirationDate}
                  onChange={handleChange}
                  required
                />
                {errors.expirationDate && (
                  <p className="error">{errors.expirationDate}</p>
                )}

                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  maxLength={3}
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
                {errors.cvv && <p className="error">{errors.cvv}</p>}
              </div>
            )}
          </div>

          <div>
            <input
              type="radio"
              id="debit-card"
              name="payment-method"
              value="debit-card"
              onChange={() => handleMethodChange("debit-card")}
              checked={selectedMethod === "debit-card"}
            />
            <label htmlFor="debit-card">Tarjeta de Débito</label>
            {selectedMethod === "debit-card" && (
              <div className="payment-details">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Número de tarjeta"
                  maxLength={16}
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
                {errors.cardNumber && (
                  <p className="error">{errors.cardNumber}</p>
                )}

                <input
                  type="text"
                  name="cardHolder"
                  placeholder="Nombre del titular"
                  value={formData.cardHolder}
                  onChange={handleChange}
                  required
                />
                {errors.cardHolder && (
                  <p className="error">{errors.cardHolder}</p>
                )}

                <input
                  type="text"
                  name="expirationDate"
                  placeholder="Fecha de vencimiento (MM/AA)"
                  maxLength={5}
                  value={formData.expirationDate}
                  onChange={handleChange}
                  required
                />
                {errors.expirationDate && (
                  <p className="error">{errors.expirationDate}</p>
                )}

                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  maxLength={3}
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
                {errors.cvv && <p className="error">{errors.cvv}</p>}
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="btn-confirm">
          Confirmar Pago
        </button>
      </form>

      {/* Modal de confirmación de pago */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>¿Estás seguro de que deseas confirmar el pago?</h3>
            <p>Total: ${total.toFixed(2)}</p>
            <button onClick={handleConfirmPayment}>Confirmar</button>
            <button onClick={handleCancelPayment}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
