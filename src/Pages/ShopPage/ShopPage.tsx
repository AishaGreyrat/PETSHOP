import React, { useEffect } from "react";
import  useAppSelector from "@/Hooks/UseAppSelector";
import styles from "./ShopPage.module.css";
import useAppDispatch from "@/Hooks/useAppDispatch";
import fetchProducts from "@/Services/productService";

const ShopPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  if (loading) return <p className={styles.loading}>Cargando productos...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <div className={styles.shopPage}>
      <h1 className={styles.title}>Tienda</h1>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
            <h2>{product.name}</h2>
            <p>Precio: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
