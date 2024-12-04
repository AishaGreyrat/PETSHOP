import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from '../Pages/ProductList';
import Cart from '../Pages/Cart';
import AppBar from '../Components/AppBar/Appbar';
import AddProductForm from '../Components/Forms/AddProduct/AddProductForm';
import LoginForm from '../Components/Forms/Login/LoginForm';
import RegisterForm from '../Components/Forms/Register/RegisterForm';
import PaymentPage from '../Pages/Payment'; // Importa PaymentPage
import Footer from '../Components/Footer/Footer'; // Asegúrate de que el import sea correcto

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
        <Route path="/add-product" element={<AddProductForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/products"
          element={
            <ProductList searchTerm={searchTerm} selectedCategory={selectedCategory} />
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
      
      {/* Footer siempre visible */}
      <Footer /> {/* El footer se debería ver al final de la página */}
    </Router>
  );
};

export default ReactRouter;
