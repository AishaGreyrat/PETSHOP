import { Product } from "@/Redux/types";

// Filtra productos por categoría
export const filterProductsByCategory = (products: Product[], category: string): Product[] => {
  return category ? products.filter((product) => product.category === category) : products;
};

// Busca productos por término de búsqueda
export const searchProducts = (products: Product[], searchTerm: string): Product[] => {
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
