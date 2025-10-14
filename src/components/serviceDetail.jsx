import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import servicios from '../data/servicios.json';

const ServiceDetail = () => {
  const { id } = useParams();
  const [servicio, setServicio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        // Simulamos un retardo de red
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Aquí iría: const response = await fetch(`TU_API_URL/${id}`);
        // const data = await response.json();
        
        // Buscamos el servicio por ID
        const servicioEncontrado = servicios.find(
          s => s.id === parseInt(id)
        );
        
        setServicio(servicioEncontrado);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar el servicio:', error);
        setLoading(false);
      }
    };

    fetchServiceDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <p>Cargando detalles...</p>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!servicio) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Servicio no encontrado</h4>
          <p>El servicio que buscas no existe.</p>
          <Link to="/services" className="btn btn-primary mt-3">
            Volver a Servicios
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-primary mb-4">
                {servicio.nombre}
              </h1>
              
              <div className="card-text mb-4">
                <h5>Descripción</h5>
                <p className="lead">
                  {servicio.descripcion}
                </p>
              </div>

              <div className="d-flex gap-3">
                <Link 
                  to="/services" 
                  className="btn btn-outline-secondary"
                >
                  ← Volver a Servicios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;