// src/hooks/useAdminCheck.ts

import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

// Correos electrónicos de las cuentas administradoras
const adminEmails = ["lord128@gmail.com", "admin2@example.com"];

export const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        // Verifica si el correo del usuario está en la lista de administradores
        if (adminEmails.includes(user.email || "")) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
      setLoading(false);
    };

    checkAdminStatus();
  }, [auth]);

  return { isAdmin, loading };
};
