import React, { useEffect, useState } from 'react';
import { fetchProducts } from './productoService';

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  image?: string;
};

type ShopPageProps = {
  searchTerm: string;
  selectedCategory: string;
};

const ShopPage: React.FC<ShopPageProps> = ({ searchTerm, selectedCategory }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

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

  // Filtrar productos según el término de búsqueda y la categoría seleccionada
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} ha sido añadido al carrito`);
  };

  return (
    <div>
      {/* Mostrar productos filtrados */}
      <div>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            {product.image && <img src={product.image} alt={product.name} />}
            <h3>{product.name}</h3>
            <p className="price">Precio: ${product.price.toFixed(2)}</p>
            <p className="quantity">Cantidad: {product.quantity}</p>
            <button onClick={() => addToCart(product)}>Agregar al carrito</button>
          </div>
        ))}
      </div>

      {/* Carrito */}
      <h3>Carrito</h3>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
          ))}
        </ul>
      ) : (
        <p>El carrito está vacío</p>
      )}
    </div>
  );
};

export default ShopPage;
