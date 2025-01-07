import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/Redux/store";
import { UserProvider } from "@/Contexts/UserContext"; // Contexto del usuario
import { ThemeProvider } from "@/Contexts/ThemeContext"; // Contexto del tema
import AppBar from "./Components/AppBar";
import ShopPage from "./Pages/ShopPage/ShopPage";
import Cart from "./Pages/Cart/Cart";
import PaymentPage from "./Pages/Payment/Payment";
import Footer from "./Components/Footer/Footer";
import ImageCarousel from "./Components/ImageCarousel";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <Provider store={store}>
      <ThemeProvider>
        <UserProvider>
          <Router>
            <AppBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <div className="main-content">
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
            <Footer />
          </Router>
        </UserProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
