import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebaseConfig';  // Asegúrate de importar correctamente la configuración de Firebase

// Función para iniciar sesión con Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('Usuario autenticado:', user);
    return user;  // Retorna el usuario autenticado
  } catch (error) {
    console.error('Error de autenticación:', error);
    throw error;  // Propaga el error si algo falla
  }
};
