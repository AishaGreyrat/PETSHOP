import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import styles from "./SearchBar.module.css";
import useMediaQuery from "@/Hooks/useMediaQuery";

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const categories = [
  "Alimentación",
  "Salud e Higiene",
  "Juguetes",
  "Camas y Descanso",
  "Ropa y Accesorios",
  "Transporte",
  "Entrenamiento",
  "Seguridad",
  "Cuidado dental",
  "Limpieza y Desinfección",
];

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Detectar si la pantalla es mayor o igual a 768px
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");

  return (
    <div className={styles.navbarsearch}>
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles["search-input"]}
      />

      {/* Botón de categorías visible solo en pantallas grandes */}
      {isAboveMediumScreens && (
        <div className={styles["dropdown-container"]}>
          <button
            className={styles["dropdown-button"]}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedCategory || "Categorías"}
            <ChevronDownIcon className={styles["dropdown-icon"]} />
          </button>

          {isDropdownOpen && (
            <ul className={styles["dropdown-menu"]}>
              <li
                onClick={() => {
                  setSelectedCategory("");
                  setIsDropdownOpen(false);
                }}
              >
                Todas las categorías
              </li>
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsDropdownOpen(false);
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
