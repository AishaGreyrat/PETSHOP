import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import "../Styles/AppBar.css"


type LoginProps = {
  closeModal: () => void; // Prop para cerrar el modal
};

const Login: React.FC<LoginProps> = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook para redirigir

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Inicio de sesión exitoso");
      closeModal(); // Cierra el modal después de iniciar sesión
      navigate("/"); // Redirige a la página de inicio ("/") después de iniciar sesión
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className='modal-header'></div>
        <h2 className="iniciarsesión">Iniciar Sesisón</h2>
        {/* Botón para cerrar el modal */}
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        <form onSubmit={handleLogin}>
          <div className="modal-body">
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
          <button className="confirmar-button" type="submit">Confirmar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
