import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/Contexts/CartContext';
import { db } from '../../../firebaseConfig';
import { doc, updateDoc, increment } from 'firebase/firestore';
import './Payment.module.css';

// Componente Modal reutilizable
const Modal: React.FC<{
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>¿Estás seguro de que deseas confirmar el pago?</h3>
        <button onClick={onConfirm}>Confirmar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

const Payment: React.FC = () => {
  const { state, dispatch } = useCart();
  const total = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvv: '',
    address: '',
    nombre: '', // Campo para el nombre completo
  });
  const [errors, setErrors] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvv: '',
    address: '',
    nombre: '', // Error para el nombre completo
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMethodChange = (method: string) => {
    setSelectedMethod(method);
    setErrors({
      cardNumber: '',
      cardHolder: '',
      expirationDate: '',
      cvv: '',
      address: '',
      nombre: '', // Resetea los errores del nombre
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;
    const errors = {
      cardNumber: '',
      cardHolder: '',
      expirationDate: '',
      cvv: '',
      address: '',
      nombre: '', // Validación para el nombre completo
    };

    if (!formData.nombre.trim()) {
      errors.nombre = 'El nombre completo es obligatorio.'; // Mensaje de error para el nombre completo
      valid = false;
    }

    if (!formData.address.trim()) {
      errors.address = 'La dirección es obligatoria.';
      valid = false;
    }

    if (!formData.cardNumber.match(/^\d{16}$/)) {
      errors.cardNumber = 'El número de tarjeta debe tener 16 dígitos.';
      valid = false;
    }

    if (!formData.cardHolder.trim()) {
      errors.cardHolder = 'El nombre del titular es obligatorio.';
      valid = false;
    }

    if (!formData.expirationDate.trim()) {
      errors.expirationDate = 'La fecha de vencimiento es obligatoria.';
      valid = false;
    } else if (!formData.expirationDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      errors.expirationDate = 'Formato de fecha inválido (MM/AA).';
      valid = false;
    } else {
      const [month, year] = formData.expirationDate.split('/').map(Number);
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear() % 100;
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        errors.expirationDate = 'La tarjeta está vencida.';
        valid = false;
      }
    }

    if (!formData.cvv.match(/^\d{3}$/)) {
      errors.cvv = 'El CVV debe tener 3 dígitos.';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsModalOpen(true);
    }
  };

  const handleConfirmPayment = async () => {
    try {
      alert('Pago realizado con éxito');
      for (const item of state.items) {
        const productRef = doc(db, 'products', item.id);
        await updateDoc(productRef, {
          quantity: increment(-item.quantity),
        });
      }
      dispatch({ type: 'CLEAR_CART' });
      navigate('/');
    } catch (error) {
      console.error('Error al procesar el pago: ', error);
      alert(
        'Hubo un error al procesar tu pago. Inicia sesión para proceder con el pago.'
      );
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCancelPayment = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="payment-page">
      <h2 className="payment">Método de Pago</h2>
      <div className="cart-summary">
        <h3 className="resumen-cart">Resumen del Carrito</h3>
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
        {/* Campo para el nombre completo */}
        <div className="payment-nombre">
          <label htmlFor="nombre">Nombre Completo</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            placeholder="Ingrese su nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          {errors.nombre && <p className="error">{errors.nombre}</p>}
        </div>

        <div className="payment-direccion">
          <label htmlFor="address">Dirección</label>
          <input
            id="address"
            type="text"
            name="address"
            placeholder="Dirección"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>

        <h3 className="payment-options-title">Opciones de Pago</h3>
        <div className="payment-method">
          <div>
            <input
              type="radio"
              id="credit-card"
              name="payment-method"
              value="credit-card"
              onChange={() => handleMethodChange('credit-card')}
              checked={selectedMethod === 'credit-card'}
            />
            <label htmlFor="credit-card">Tarjeta de Crédito</label>
          </div>

          <div>
            <input
              type="radio"
              id="debit-card"
              name="payment-method"
              value="debit-card"
              onChange={() => handleMethodChange('debit-card')}
              checked={selectedMethod === 'debit-card'}
            />
            <label htmlFor="debit-card">Tarjeta de Débito</label>
          </div>
        </div>

        {selectedMethod && (
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
            {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}

            <input
              type="text"
              name="cardHolder"
              placeholder="Nombre del titular"
              value={formData.cardHolder}
              onChange={handleChange}
              required
            />
            {errors.cardHolder && <p className="error">{errors.cardHolder}</p>}

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

        <button type="submit" className="btn-confirm">
          Confirmar Pago
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onConfirm={handleConfirmPayment}
        onCancel={handleCancelPayment}
      />
    </div>
  );
};

export default Payment;
