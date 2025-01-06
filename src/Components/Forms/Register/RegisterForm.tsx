import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';  // Resolver de Zod
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { RegisterFormProps } from '@/Types/types';
import { registerSchema, RegisterFormData } from '@/ValidationSchemas/validationSchemas';  // Correcto para importar el esquema y tipo

import '@/Styles/AppBar.css';

const RegisterForm: React.FC<RegisterFormProps> = ({ closeModal }) => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),  // Usamos Zod para la validación
  });

  // Manejo del registro
  const handleRegister = async (data: RegisterFormData) => {
    try {
      // Crear el usuario con email y contraseña
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      alert("Registro exitoso");

      // Usamos el operador de encadenamiento opcional para invocar `closeModal` de manera segura
      closeModal?.();  // Solo se invoca si `closeModal` está definido

      navigate("/"); // Redirige a la página de inicio después del registro exitoso
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error en el registro. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit(handleRegister)} className="register-form">
        <div className="modal-body">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Introduce tu email"
            {...control.register("email")}  // Registro con react-hook-form
          />
          {errors.email && <span>{errors.email.message}</span>} {/* Mostrar errores */}

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Introduce tu contraseña"
            {...control.register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>} {/* Mostrar errores */}

          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirma tu contraseña"
            {...control.register("confirmPassword")}
          />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>} {/* Mostrar errores */}
        </div>

        <button className="register" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
