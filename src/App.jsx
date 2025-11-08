import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Cart from './components/cart';  // ← ESTE IMPORT FALTABA
import ItemListContainer from './components/ItemListContainer';
import ServiceList from './pages/serviceList';
import ServiceDetail from './components/serviceDetail';
import Contact from './pages/contact';
import { CartProvider } from './context/cartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <NavBar />
          <Cart /> 
          
          <Routes>
            {/* Ruta principal - Home */}
            <Route 
              path="/" 
              element={<ItemListContainer greeting="Bienvenido a Mi Tienda" />} 
            />
            
            {/* Ruta de lista de servicios */}
            <Route 
              path="/services" 
              element={<ServiceList />} 
            />
            
            {/* Ruta de detalle de servicio */}
            <Route 
              path="/services/:id" 
              element={<ServiceDetail />} 
            />
            
            {/* Ruta de contacto */}
            <Route 
              path="/contact" 
              element={<Contact />} 
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;