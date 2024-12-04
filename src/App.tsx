import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./Components/AppBar/Appbar";
import ImageCarousel from "./Components/ImageCarousel/ImageCarousel";
import ShopPage from "./Pages/ShopPage";
import { CartProvider } from "./Contexts/CartContext";
import Cart from "./Pages/Cart";
import PaymentPage from "./Pages/Payment";
import Footer from "./Components/Footer/Footer";  // Asegúrate de importar el footer
import "./Styles/AppBar.css";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="app-container"> {/* Contenedor principal */}
      <CartProvider>
        <Router>
          {/* Barra de navegación siempre visible */}
          <AppBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="main-content"> {/* Contenido principal */}
            <Routes>
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
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Routes>
          </div>

          {/* Footer siempre visible */}
          <Footer />
        </Router>
      </CartProvider>
    </div>
  );
};

export default App;
