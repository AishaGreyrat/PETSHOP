import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

type RegisterProps = {
  closeModal: () => void; // Prop para cerrar el modal
};

const Register: React.FC<RegisterProps> = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Crear el usuario con email y contraseña
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registro exitoso');
      closeModal(); // Cerrar el modal después del registro exitoso
      navigate('/'); // Redirige a la página de inicio después del registro exitoso
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Error en el registro. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Registro</h2>
        {/* Botón para cerrar el modal */}
        <button className="close-button" onClick={closeModal}>&times;</button>
        <form onSubmit={handleRegister} className="register-form">
      <div className='modal-body' >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
      </div>    
          <button type="submit">Enter</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
