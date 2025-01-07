import { CartItem } from "@/Redux/types";
import { collection, setDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

// Sincroniza el carrito con Firebase
export const syncCartWithFirebase = async (userId: string, cartItems: CartItem[]) => {
  try {
    const cartRef = doc(db, "carts", userId);
    await setDoc(cartRef, { items: cartItems });
  } catch (error) {
    console.error("Error al sincronizar el carrito:", error);
    throw error;
  }
};

// Obtiene el carrito desde Firebase
export const fetchCartFromFirebase = async (userId: string): Promise<CartItem[]> => {
  try {
    const cartRef = doc(db, "carts", userId);
    const docSnap = await getDoc(cartRef);
    return docSnap.exists() ? (docSnap.data().items as CartItem[]) : [];
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    throw error;
  }
};
