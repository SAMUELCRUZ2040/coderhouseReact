import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import servicios from '../data/servicios.json';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulamos una llamada asincrónica con fetch
  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Simulamos un retardo de red
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Aquí iría: const response = await fetch('TU_API_URL');
        // const data = await response.json();
        
        setServices(servicios);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los servicios:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <p>Cargando servicios...</p>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Nuestros Servicios</h1>
      <div className="row">
        {services.map((servicio) => (
          <div key={servicio.id} className="col-md-6 col-lg-4 mb-4">
            <Link 
              to={`/services/${servicio.id}`} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="card h-100 shadow-sm hover-card">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    {servicio.nombre}
                  </h5>
                  <p className="card-text text-muted">
                    {servicio.descripcion.substring(0, 100)}...
                  </p>
                  <button className="btn btn-outline-primary btn-sm">
                    Ver Detalles
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;