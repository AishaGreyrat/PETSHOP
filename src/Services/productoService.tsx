import { collection, addDoc, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Product } from '@/Types/types';

// Función para añadir un producto sin ID, ya que Firebase generará uno automáticamente
export const addProduct = async (product: Omit<Product, 'id'>) => {
  try {
    await addDoc(collection(db, 'products'), product);
    return { success: true, message: 'Producto añadido correctamente!' };
  } catch (error) {
    console.error('Error añadiendo el producto:', error);
    return { success: false, message: 'Error añadiendo el producto' };
  }
};

// Función para obtener los productos desde Firebase
export const fetchProducts = async (): Promise<Product[]> => {
  const productsCollection = collection(db, 'products');
  const productsSnapshot = await getDocs(productsCollection) as QuerySnapshot<DocumentData>;

  return productsSnapshot.docs.map((doc) => ({
    id: doc.id, // Asegúrate de que `id` es una cadena
    ...doc.data() as Omit<Product, 'id'>, // Utiliza el tipo sin `id` aquí
  }));
};

export default fetchProducts;
