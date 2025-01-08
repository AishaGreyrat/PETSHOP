import React, { useEffect, useState } from 'react';
import { fetchProducts } from '@/Services/productoService';
import { useCart } from '@/Contexts/CartContext';
import { Product, ShopPageProps } from '@/Types/types';
import { db, storage } from '../../../firebaseConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAdminCheck } from '../../Roles/useAdminCheck';
import ConfirmSaveChangesModal from '@/Components/Modal/ConfirmSaveChangesModal';
import SaveChangesSuccessModal from '@/Components/Modal/SaveChangesSuccessModal';
import AddToCartSuccessModal from '@/Components/Modal/AddToCartSuccessModal';
import ConfirmDeleteModal from '@/Components/Modal/ConfirmDeleteModal';
import './ShopPage.module.css';

const ShopPage: React.FC<ShopPageProps> = ({
  searchTerm,
  selectedCategory,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { dispatch } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [isConfirmSaveModalOpen, setIsConfirmSaveModalOpen] = useState(false);
  const [isSaveChangesSuccessModalOpen, setIsSaveChangesSuccessModalOpen] = useState(false);
  const [isAddToCartSuccessModalOpen, setIsAddToCartSuccessModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const { isAdmin, loading } = useAdminCheck();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
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
    setIsAddToCartSuccessModalOpen(true); // Mostrar el modal de éxito
  };

  const openEditModal = (product: Product) => {
    if (!isAdmin) return alert('No tienes permisos para editar productos');
    setSelectedProduct(product);
    setNewImage(null);
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setNewImage(file);
    }
  };

  const handleSaveChangesClick = () => {
    setIsConfirmSaveModalOpen(true); // Mostrar modal de confirmación
  };

  const handleConfirmSaveChanges = async () => {
    if (!selectedProduct) return;

    let updatedProduct = {
      ...selectedProduct,
      image: newImage ? URL.createObjectURL(newImage) : selectedProduct.image,
    };

    try {
      if (newImage) {
        const imageRef = ref(storage, `product-images/${newImage.name}`);
        await uploadBytes(imageRef, newImage);
        const imageUrl = await getDownloadURL(imageRef);
        updatedProduct = {
          ...updatedProduct,
          image: imageUrl,
        };
      }

      const productRef = doc(db, 'products', selectedProduct.id);
      await updateDoc(productRef, updatedProduct);

      const updatedProducts = products.map((product) =>
        product.id === selectedProduct.id ? updatedProduct : product
      );
      setProducts(updatedProducts);

      setIsSaveChangesSuccessModalOpen(true); // Mostrar modal de éxito
      setIsModalOpen(false);
      setIsConfirmSaveModalOpen(false); // Cerrar modal de confirmación
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      alert('Hubo un error al actualizar el producto');
    }
  };

  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setIsConfirmDeleteModalOpen(true); // Mostrar modal de confirmación de eliminación
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    const productRef = doc(db, 'products', productToDelete);
    try {
      await deleteDoc(productRef);
      const updatedProducts = products.filter((product) => product.id !== productToDelete);
      setProducts(updatedProducts);
      alert('Producto eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('Hubo un error al eliminar el producto');
    } finally {
      setIsConfirmDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setNewImage(null);
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            {product.image && <img src={product.image} alt={product.name} />}
            <h3>{product.name}</h3>
            <p className="price">Precio: ${product.price.toFixed(2)}</p>
            <p className="quantity">Cantidad: {product.quantity}</p>
            <button className="add-to-cart-button" onClick={() => addToCart(product)}>
              Agregar al carrito
            </button>
            {isAdmin && (
              <>
                <button className="edit-button" onClick={() => openEditModal(product)}>
                  Editar
                </button>
                <button className="delete-button" onClick={() => handleDeleteClick(product.id)}>
                  Eliminar
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Modales */}
      <ConfirmSaveChangesModal
        isOpen={isConfirmSaveModalOpen}
        onClose={() => setIsConfirmSaveModalOpen(false)}
        onConfirm={handleConfirmSaveChanges}
      />
      <SaveChangesSuccessModal
        isOpen={isSaveChangesSuccessModalOpen}
        onClose={() => setIsSaveChangesSuccessModalOpen(false)}
      />
      <AddToCartSuccessModal
        isOpen={isAddToCartSuccessModalOpen}
        onClose={() => setIsAddToCartSuccessModalOpen(false)}
      />
      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {isModalOpen && selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Producto</h2>
            <form>
              <label>
                Nombre:
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Precio:
                <input
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </label>
              <label>
                Cantidad:
                <input
                  type="number"
                  value={selectedProduct.quantity}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      quantity: parseInt(e.target.value),
                    })
                  }
                />
              </label>
              <label>
                Imagen:
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>
              <button type="button" onClick={handleSaveChangesClick}>
                Guardar cambios
              </button>
            </form>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
