import React, { useEffect, useState } from 'react';
import { fetchProducts } from '@/Services/productoService';
import { useCart } from '@/Contexts/CartContext';
import '@/Styles/ProductGrid.css'; // Archivo de estilos para la cuadrícula
import { Product, ShopPageProps } from '@/Types/types';
import { db, storage } from '../../firebaseConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ShopPage: React.FC<ShopPageProps> = ({
  searchTerm,
  selectedCategory,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { dispatch } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null); // Estado para manejar la imagen

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
    setSelectedProduct(product);
    setNewImage(null); // Limpiar imagen cargada al abrir el modal
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setNewImage(file);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Guardar cambios fue clickeado');
    if (selectedProduct) {
      let updatedProduct = {
        ...selectedProduct,
        image: newImage ? URL.createObjectURL(newImage) : selectedProduct.image,
      };

      // Si se seleccionó una nueva imagen, subirla a Firebase Storage
      if (newImage) {
        const imageRef = ref(storage, `product-images/${newImage.name}`);
        await uploadBytes(imageRef, newImage);
        const imageUrl = await getDownloadURL(imageRef);
        console.log('URL de la imagen:', imageUrl);
        updatedProduct = {
          ...updatedProduct,
          image: imageUrl,
        };
      }

      try {
        // Intentar actualizar el producto en Firestore
        const productRef = doc(db, 'products', selectedProduct.id);
        await updateDoc(productRef, updatedProduct);
        console.log('Producto actualizado en Firebase');
      } catch (error) {
        console.error('Error al actualizar el producto:', error);
      }

      // Actualizar el estado local
      const updatedProducts = products.map((product) =>
        product.id === selectedProduct.id ? updatedProduct : product
      );
      setProducts(updatedProducts);
      closeModal();
    }
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      const productRef = doc(db, 'products', selectedProduct.id);
      await deleteDoc(productRef);

      // Remover del estado local
      const updatedProducts = products.filter(
        (product) => product.id !== selectedProduct.id
      );
      setProducts(updatedProducts);
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setNewImage(null); // Limpiar la imagen cargada al cerrar el modal
  };

  return (
    <div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            {product.image && <img src={product.image} alt={product.name} />}
            <h3>{product.name}</h3>
            <p className="price">Precio: ${product.price.toFixed(2)}</p>
            <p className="quantity">Cantidad: {product.quantity}</p>
            <button onClick={() => addToCart(product)}>
              Agregar al carrito
            </button>
            <button onClick={() => openEditModal(product)}>Editar</button>
          </div>
        ))}
      </div>

      {isModalOpen && selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Producto</h2>
            <form onSubmit={handleEdit}>
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
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {newImage && (
                  <div>
                    <p>Imagen seleccionada:</p>
                    <img
                      src={URL.createObjectURL(newImage)}
                      alt="Imagen seleccionada"
                      style={{ width: '100px', height: 'auto' }}
                    />
                  </div>
                )}
              </label>
              <button type="submit">Guardar cambios</button>
              <button type="button" onClick={handleDelete}>
                Eliminar producto
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
