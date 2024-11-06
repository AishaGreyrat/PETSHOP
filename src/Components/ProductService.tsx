import { collection, addDoc, getDocs, DocumentData, QuerySnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

interface Product {
    id: string; // El ID único del producto en Firebase Firestore.
    name: string; // El nombre del producto.
    price: number; // El precio del producto.
    quantity: number; // La cantidad disponible del producto.
    image?: string; // Opcional: La URL de la imagen del producto.
  }
  

// Función para añadir un producto
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