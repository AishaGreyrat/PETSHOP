import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AppBar.css';

/* Se añadieoron las rutas con el plugin de react-router-dom */

const AppBar: React.FC = () => {
  return (
    <header className="full-width-bar">
      <h1>My E-commerce - PetShop</h1>
      <p>¡Los mejores productos para mascotas disponibles!</p>
      <nav>
        <ul>
          <li>
            <Link to="/add-product">Añadir Producto</Link>
          </li>
          <li>
            <Link to="/products">Productos Disponibles</Link>
          </li>
          <li>
            <Link to="/cart">Tu Carrito</Link>
          </li>
          <li>
            <Link to="/login">Iniciar sesion</Link>
          </li>
          <Link to="/register">Registrar</Link>
        </ul>
      </nav>
    </header>
    
  );
};

export default AppBar;

