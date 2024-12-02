import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./Components/Appbar";
import ImageCarousel from "./Components/ImageCarousel";
import "./Styles/AppBar.css";
import ShopPage from "./Components/ShopPage";
import { CartProvider } from "./Context/CartContext";
import Cart from "./Components/Cart";
import PaymentPage from "./Components/Payment"; // Importa el componente de pago

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div>
      <CartProvider>
        <Router>
          {/* Barra de navegación siempre visible */}
          <AppBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <Routes>
            {/* Página de inicio */}
            <Route
              path="/"
              element={
                <>
                  <ImageCarousel />
                  <ShopPage
                    searchTerm={searchTerm}
                    selectedCategory={selectedCategory}
                  />
                </>
              }
            />

            {/* Ruta para el carrito de compras */}
            <Route path="/cart" element={<Cart />} />

            {/* Ruta para la página de métodos de pago */}
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </Router>
      </CartProvider>

      {/* Footer siempre visible */}
      <footer className="footer">
        <p className="footer-text">
          &copy; 2024 Petshop. Todos los derechos reservados.
        </p>
        <ul>
          <li>
            <a className="footer-link" href="#terms">
              Términos de servicio
            </a>
          </li>
          <li>
            <a className="footer-link2" href="#contact">
              Contáctanos
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default App;
