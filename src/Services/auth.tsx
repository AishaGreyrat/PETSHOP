import React, { useState } from 'react';
import { auth, provider } from '../../firebaseConfig';
import { signInWithPopup, signOut } from 'firebase/auth';

const Auth: React.FC = () => {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
      console.log('Usuario iniciado en:', auth.currentUser);
    } catch (error) {
      console.error('Error iniciando sesión:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log('Usuario cerró la sesión');
    } catch (error) {
      console.error('Error cerrando la sesión:', error);
    }
  };

  const confirmLogout = () => {
    setLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setLogoutModalOpen(false);
  };

  return (
    <div>
      {auth.currentUser ? (
        <>
          <p>Bienvenido, {auth.currentUser.displayName}</p>
          <button onClick={confirmLogout}>Cerrar sesión</button>
        </>
      ) : (
        <button onClick={login}>Iniciar sesión con Google</button>
      )}

      {isLogoutModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setLogoutModalOpen(false)}>&times;</span>
            <h3>¿Estás seguro de que deseas cerrar sesión?</h3>
            <div>
              <button onClick={handleConfirmLogout}>Confirmar</button>
              <button onClick={() => setLogoutModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
