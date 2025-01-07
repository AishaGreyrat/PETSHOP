import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

// Definición del tipo de producto
type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

// Estado del carrito
type CartState = {
  items: Product[];
};

// Acciones disponibles para el carrito
export type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<Product, 'quantity'> } // Excluye 'quantity' del payload de ADD_ITEM
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartState }; // Acción para establecer el carrito desde localStorage

// Contexto del carrito
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

// Reducer del carrito
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        // Si el producto ya existe, incrementamos la cantidad en 1
        return {
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // Si no existe, lo agregamos con una cantidad de 1
        return {
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case 'REMOVE_ITEM':
      return { items: state.items.filter(item => item.id !== action.payload.id) };

    case 'CLEAR_CART':
      return { items: [] };

    case 'SET_CART':
      return action.payload;

    default:
      return state;
  }
};

// Proveedor del contexto del carrito
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Recuperamos el carrito desde localStorage (si existe)
  const storedCart = localStorage.getItem('cart');
  const initialState = storedCart ? JSON.parse(storedCart) : { items: [] };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Guardamos el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  // Sincronizamos el estado si el carrito cambia desde otro origen (pestañas del navegador)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        dispatch({ type: 'SET_CART', payload: JSON.parse(storedCart) });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para acceder al contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
  return context;
};
