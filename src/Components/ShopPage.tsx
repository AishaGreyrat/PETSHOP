import React, { useEffect, useState } from 'react';
import { fetchProducts } from './ProductService';

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]); // Estado del carrito

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

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} ha sido añadido al carrito`);
  };

  return (
    <div>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            {product.image && <img src={product.image} alt={product.name} />}
            <h3>{product.name}</h3>
            <p>Precio: ${product.price.toFixed(2)}</p>
            <p>Cantidad: {product.quantity}</p>
            <button onClick={() => addToCart(product)}>Agregar al carrito</button>
          </div>
        ))}
      </div>

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
