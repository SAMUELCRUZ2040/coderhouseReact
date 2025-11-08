import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ItemListContainer from './components/ItemListContainer';
import NavBar from './components/navbar';
import Cart from './components/cart';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-vh-100 bg-light">
          {/* Barra de navegación con el CartWidget */}
          <NavBar />
          
          {/* Carrito lateral (se muestra cuando isCartOpen es true) */}
          <Cart />
          
          {/* Contenido principal */}
          <ItemListContainer greeting="Bienvenido a Mi Tienda" />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;