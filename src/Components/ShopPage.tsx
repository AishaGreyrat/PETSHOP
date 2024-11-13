import React, { useEffect, useState } from 'react';
import { fetchProducts } from './productoService';
import { useCart } from '../Context/CartContext';

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
  const { dispatch } = useCart();

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
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    alert(`${product.name} ha sido añadido al carrito`);
  };

  return (
    <div>
      <div>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            {product.image && <img src={product.image} alt={product.name} />}
            <h3>{product.name}</h3>
            <p>Precio: ${product.price.toFixed(2)}</p>
            <p>Cantidad: {product.quantity}</p>
            <button onClick={() => addToCart(product)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;