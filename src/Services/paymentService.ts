import { CartItem } from "@/Redux/types";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebaseConfig";

// Procesa el pago y actualiza las cantidades de los productos
export const processPayment = async (cartItems: CartItem[]): Promise<void> => {
  try {
    for (const item of cartItems) {
      const productRef = doc(db, "products", item.id);
      await updateDoc(productRef, {
        quantity: increment(-item.quantity), // Decrementa la cantidad
      });
    }
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    throw error;
  }
};
