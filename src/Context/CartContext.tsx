import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { db, auth } from '../../firebaseConfig';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { cartReducer } from '../Reducers/cartReducer';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

interface CartAction {
  type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'CLEAR_CART' | 'SET_CART';
  payload?: any;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<CartAction> } | undefined>(undefined);

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const cartRef = doc(collection(db, 'carts'), user.uid);
        const cartDoc = await getDoc(cartRef);
        if (cartDoc.exists()) {
          dispatch({ type: 'SET_CART', payload: cartDoc.data().items });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      const user = auth.currentUser;
      if (user) {
        const cartRef = doc(collection(db, 'carts'), user.uid);
        await setDoc(cartRef, { items: state.items });
      }
    };

    if (auth.currentUser) {
      saveCart();
    }
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
