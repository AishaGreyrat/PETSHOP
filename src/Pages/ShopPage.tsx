import React, { useEffect, useState } from "react";
import { fetchProducts } from "../Services/productoService";
import { useCart } from "../Contexts/CartContext";
import "../Styles/ProductGrid.css";
import { Product, ShopPageProps } from "../Types/types";

const ShopPage: React.FC<ShopPageProps> = ({
  searchTerm,
  selectedCategory,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { dispatch } = useCart();

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
