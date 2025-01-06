import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';  // Resolver de Zod
import { loginSchema, LoginFormData } from '@/ValidationSchemas/validationSchemas';  // Importamos el esquema
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebaseConfig';
import { useNavigate } from "react-router-dom";
import { LoginFormProps } from '@/Types/types';

import '@/Styles/AppBar.css';
import { signInWithGoogle } from '@/Services/authService';

const LoginForm: React.FC<LoginFormProps> = ({ closeModal }) => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),  // Usamos Zod para la validación
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      // Aquí iría la lógica para iniciar sesión
      await signInWithEmailAndPassword(auth, data.email, data.password);
      alert("Inicio de sesión exitoso");
      
      // Cerrar el modal si está definido
      closeModal?.();  
      navigate("/"); // Redirigir a la página de inicio
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error en el inicio de sesión. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit(handleLogin)} className="login-form">
            <div>
                <label htmlFor="email">Email</label>
                <input
                id="email"
                type="email"
                placeholder="Introduce tu email"
                {...control.register("email")}
                />
                {errors.email && <span>{errors.email.message}</span>} {/* Mostrar errores */}
            </div>

            <div>
                <label htmlFor="password">Contraseña</label>
                <input
                id="password"
                type="password"
                placeholder="Introduce tu contraseña"
                {...control.register("password")}
                />
                {errors.password && <span>{errors.password.message}</span>} {/* Mostrar errores */}
            </div>
            <button type="submit">Iniciar sesión</button>

            <button onClick={signInWithGoogle}>Iniciar sesion con Google</button>
        </form>
    </div>
  );
};

export default LoginForm;
