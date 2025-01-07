import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver de Zod
import { loginSchema, LoginFormData } from "@/ValidationSchemas/validationSchemas"; // Esquema de validación
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { LoginFormProps } from "@/Types/props"; // Props centralizadas
import { loginWithGoogle } from "@/Services/authService"; // Servicio de autenticación
import styles from "./Forms.module.css"; // Estilos específicos

const LoginForm: React.FC<LoginFormProps> = ({ closeModal }) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), // Validación con Zod
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      alert("Inicio de sesión exitoso");
      closeModal?.(); // Cierra el modal si está definido
      navigate("/"); // Redirige a la página de inicio
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error en el inicio de sesión. Por favor, intenta nuevamente.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      alert("Inicio de sesión con Google exitoso");
      closeModal?.(); // Cierra el modal si está definido
      navigate("/"); // Redirige a la página de inicio
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      alert("Error en el inicio de sesión con Google. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
        {/* Campo de Email */}
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Introduce tu email"
            {...register("email")}
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>

        {/* Campo de Contraseña */}
        <div className={styles.inputGroup}>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Introduce tu contraseña"
            {...register("password")}
          />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>

        <button type="submit" className={styles.submitButton}>
          Iniciar sesión
        </button>
      </form>

      <button onClick={handleGoogleLogin} className={styles.googleButton}>
        Iniciar sesión con Google
      </button>
    </div>
  );
};

export default LoginForm;
