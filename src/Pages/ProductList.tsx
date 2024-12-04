import React, { useEffect, useState } from 'react';
import { fetchProducts } from '@/Services/productoService';

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  image?: string;
};

type ProductListProps = {
  searchTerm: string;
  selectedCategory: string;
};

const ProductList: React.FC<ProductListProps> = ({ searchTerm, selectedCategory }) => {
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <div>
      {/* Mostrar productos filtrados */}
      {filteredProducts.map((product) => (
        <div key={product.id}>
          {product.image && <img src={product.image} alt={product.name} />}
          <h3>{product.name}</h3>
          <p>Precio: ${product.price.toFixed(2)}</p>
          <p>Cantidad: {product.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
