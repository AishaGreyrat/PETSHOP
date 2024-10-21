import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductForm from '../Components/ProductForm';
import ProductList from '../Components/ProductList';
import Cart from '../Components/Cart';
import AppBar from '../Components/Appbar';

/* Se creo un archivo para las rutas */

const ReactRouter: React.FC = () => {
    return (
      <Router>
        <AppBar />
        <Routes>
          <Route path="/add-product" element={<ProductForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    );
  };

export default ReactRouter;
