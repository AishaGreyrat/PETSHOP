import React, { useEffect, useState } from 'react';
import { fetchProducts } from '@/Services/productoService';
import { useCart } from '@/Contexts/CartContext';
import { Product, ShopPageProps } from '@/Types/types';
import { db } from '../../../firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';
import { useAdminCheck } from '../../Roles/useAdminCheck';
import { EditProductModal, ConfirmModal } from '../../Components/Modal';
import styles from './ShopPage.module.css';

const ShopPage: React.FC<ShopPageProps> = ({ searchTerm, selectedCategory }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { dispatch } = useCart();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [onConfirmAction, setOnConfirmAction] = useState<(() => void) | null>(null);
  const { isAdmin, loading } = useAdminCheck();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
    alert(`${product.name} ha sido añadido al carrito`);
  };

  const openEditModal = (product: Product) => {
    if (!isAdmin) return alert('No tienes permisos para editar productos');
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setConfirmationMessage(`¿Estás seguro de que deseas eliminar el producto "${product.name}"?`);
    setOnConfirmAction(() => () => handleDelete(product));
    setIsConfirmationModalOpen(true);
  };

  const handleDelete = async (product: Product) => {
    const productRef = doc(db, 'products', product.id);
    try {
      await deleteDoc(productRef);
      setProducts(products.filter((p) => p.id !== product.id));
      alert(`Producto "${product.name}" eliminado exitosamente`);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('Hubo un error al eliminar el producto');
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <div className={styles["product-grid"]}>
        {filteredProducts.map((product) => (
          <div className={styles["product-card"]} key={product.id}>
            {product.image && <img src={product.image} alt={product.name} />}
            <h3>{product.name}</h3>
            <p className={styles.price}>Precio: ${product.price.toFixed(2)}</p>
            <p className={styles.quantity}>Cantidad: {product.quantity}</p>
            <button className={styles["add-to-cart-button"]} onClick={() => addToCart(product)}>Agregar al carrito</button>

            {isAdmin && (
              <>
                <button className={styles["edit-button"]} onClick={() => openEditModal(product)}>Editar</button>
                <button className={styles["delete-button"]} onClick={() => handleDeleteClick(product)}>Eliminar</button>
              </>
            )}
          </div>
        ))}
      </div>

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        productData={selectedProduct}
        onSave={(updatedProduct) => {
          const updatedProducts = products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          );
          setProducts(updatedProducts);
          alert(`Producto "${updatedProduct.name}" actualizado exitosamente`);
        }}
      />

      <ConfirmModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        message={confirmationMessage}
        onConfirm={() => {
          if (onConfirmAction) onConfirmAction();
          setIsConfirmationModalOpen(false);
        }}
      />
    </div>
  );
};

export default ShopPage;
