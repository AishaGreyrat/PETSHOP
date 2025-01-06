import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Correos electrónicos de las cuentas administradoras
const adminEmails = ["lord128@gmail.com", "noctuner21@gmail.com", "darckflame547@gmail.com"];

export const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const auth = getAuth();

  useEffect(() => {
    // Comprobar si el usuario está autenticado y es admin
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Verifica si el correo del usuario está en la lista de administradores
        const adminStatus = adminEmails.includes(user.email || "");
        setIsAdmin(adminStatus);
        localStorage.setItem("isAdmin", JSON.stringify(adminStatus)); // Guardamos en localStorage
      } else {
        setIsAdmin(false);
        localStorage.setItem("isAdmin", JSON.stringify(false)); // Asegura que se elimine el estado de admin cuando no hay usuario
      }
      setLoading(false);
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, [auth]);

  // Al cargar, verificar si el estado de administrador está guardado en localStorage
  useEffect(() => {
    const storedIsAdmin = localStorage.getItem("isAdmin");
    if (storedIsAdmin) {
      setIsAdmin(JSON.parse(storedIsAdmin));
      setLoading(false);
    }
  }, []);

  return { isAdmin, loading };
};
