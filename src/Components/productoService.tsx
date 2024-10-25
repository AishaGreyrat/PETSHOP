import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Asegúrate de que la ruta sea correcta

interface Product {
  name: string;
  price: number;
  quantity: number;
  image?: string; // Almacenar imagen como cadena de Base64
}

export const addProduct = async (product: Product) => {
  try {
    await addDoc(collection(db, 'products'), product);
    return { success: true, message: 'Producto añadido correctamente!' };
  } catch (error) {
    console.error('Error añadiendo el producto:', error);
    return { success: false, message: 'Error añadiendo el producto' };
  }
};
