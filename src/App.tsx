import React from 'react';
import AppBar from './Components/Appbar';
import ProductForm from './Components/ProductForm';
import ProductList from './Components/ProductList';
import { CartProvider } from './Context/CartContext';
import Cart from './Components/Cart';
import './Styles/App.css';

/* El App llamamos a los demas componentes para ser usados en la pagina */

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="App">
        <AppBar />
        <ProductForm />
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
};


export default App
