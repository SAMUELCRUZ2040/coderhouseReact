import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AboutUs from './pages/about';
import './stylesheets/global.css';
import Home from './pages/home';
import Contact from './pages/contact';
import { Services } from './pages/service';
import ServicesList from './components/serviceList';
import ServiceDetail from './components/serviceDetail';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="app-container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<ServicesList />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;