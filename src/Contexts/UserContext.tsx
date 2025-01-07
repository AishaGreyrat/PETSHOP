import React, { createContext, useContext, useState, ReactNode } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";

interface User {
  uid: string;
  email: string;
  displayName: string;
}

export interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void; // Agrega esta propiedad
  login: () => Promise<void>;
  logout: () => Promise<void>;
}


// Crea el contexto
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Proveedor del contexto
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { uid, email, displayName } = result.user;
      setUser({ uid, email: email || "", displayName: displayName || "" });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};
