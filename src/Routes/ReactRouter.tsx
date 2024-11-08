import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductForm from '../Components/ProductForm';
import ProductList from '../Components/ProductList';
import Cart from '../Components/Cart';
import AppBar from '../Components/Appbar';
import Login from '../Components/Login';
import Register from '../Components/Register';

/* Se creo un archivo para las rutas */
/*volver modal el loig y la parte de agregar producto tiene que tener su propio modal*/
const ReactRouter: React.FC = () => {
    return (
      <Router>
        <AppBar />
        <Routes>
          <Route path="/add-product" element={<ProductForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </Router>
    );
  };

export default ReactRouter;
