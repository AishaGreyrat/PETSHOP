import React from 'react';
import styles from './SearchBar.module.css';

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => {
  return (
    <div className={styles.navbarsearch}>
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filtro por categoría */}
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
        className={styles.categorydropdown}>
        <option value="">Todas las categorías</option>
        <option value="Alimentación">Alimentación</option>
        <option value="Salud e Higiene">Salud e Higiene</option>
        <option value="Juguetes">Juguetes</option>
        <option value="Camas y Descanso">Camas y Descanso</option>
        <option value="Ropa y Accesorios">Ropa y Accesorios</option>
        <option value="Transporte">Transporte</option>
        <option value="Entrenamiento">Entrenamiento</option>
        <option value="Seguridad">Seguridad</option>
        <option value="Cuidado dental">Cuidado dental</option>
        <option value="Limpieza y Desinfección">Limpieza y Desinfección</option>
      </select>
    </div>
  );
};

export default SearchBar;
