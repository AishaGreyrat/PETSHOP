import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";

// Inicia sesión con Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return {
      uid: result.user.uid,
      email: result.user.email || "",
      displayName: result.user.displayName || "",
    };
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    throw error;
  }
};

// Cierra la sesión del usuario
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};
