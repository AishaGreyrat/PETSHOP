// Routes/ReactRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductForm from '../Components/ProductForm';
import ProductList from '../Components/ProductList';
import Cart from '../Components/Cart';
import AppBar from '../Components/Appbar';
import Login from '../Components/Login';
import Register from '../Components/Register';
import PaymentPage from '../Components/Payment'; // Importa PaymentPage

interface ReactRouterProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ReactRouter: React.FC<ReactRouterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <Router>
      <AppBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Routes>
        <Route path="/add-product" element={<ProductForm />} />
        <Route
          path="/products"
          element={
            <ProductList
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
            />
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<PaymentPage />} /> {/* Nueva ruta para la página de pago */}
      </Routes>
    </Router>
  );
};

export default ReactRouter;
