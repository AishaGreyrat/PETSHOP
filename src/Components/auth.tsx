import React from 'react';
import { auth, provider } from '../../firebaseConfig';
import { signInWithPopup, signOut } from 'firebase/auth';

const Auth: React.FC = () => {
  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
      console.log('Usuario iniciado en:', auth.currentUser);
    } catch (error) {
      console.error('Error iniciando sesion:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log('Usuario cerro la sesión');
    } catch (error) {
      console.error('Error cerrando la sesión:', error);
    }
  };

  return (
    <div>
      {auth.currentUser ? (
        <>
          <p>Bienvenido, {auth.currentUser.displayName}</p>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <button onClick={login}>Iniciar sesión con Google</button>
      )}
    </div>
  );
};

export default Auth;
