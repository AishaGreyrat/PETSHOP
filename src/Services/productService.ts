import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Product } from "@/Redux/types";

// Obtiene todos los productos de Firestore
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

// Actualiza un producto
export const updateProduct = async (productId: string, updatedData: Partial<Product>) => {
  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, updatedData);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};

// Elimina un producto
export const deleteProduct = async (productId: string) => {
  try {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
};
