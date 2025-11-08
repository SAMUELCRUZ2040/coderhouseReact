import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import servicios from '../data/servicios.json';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [servicio, setServicio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        // Simulamos un retardo de red
        await new Promise(resolve => setTimeout(resolve, 300));
        
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
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando detalles del servicio...</p>
        </div>
      </div>
    );
  }

  if (!servicio) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="alert alert-warning shadow" role="alert">
              <h4 className="alert-heading">⚠️ Servicio no encontrado</h4>
              <p>Lo sentimos, el servicio que buscas no existe o ha sido eliminado.</p>
              <hr />
              <Link to="/services" className="btn btn-primary">
                ← Volver a Servicios
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/services">Servicios</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {servicio.nombre}
          </li>
        </ol>
      </nav>

      {/* Detalle del servicio */}
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-lg border-0">
            {/* Header del servicio */}
            <div className="card-header bg-primary text-white py-4">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="mb-0 h2">
                  <i className="bi bi-gear-fill me-2"></i>
                  {servicio.nombre}
                </h1>
                <span className="badge bg-light text-primary fs-6">
                  ID: {servicio.id}
                </span>
              </div>
            </div>

            {/* Cuerpo del servicio */}
            <div className="card-body p-4 p-md-5">
              {/* Descripción */}
              <div className="mb-5">
                <h3 className="mb-3 text-secondary">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  Descripción del Servicio
                </h3>
                <p className="lead text-muted" style={{ lineHeight: '1.8' }}>
                  {servicio.descripcion}
                </p>
              </div>

              {/* Características destacadas */}
              <div className="mb-5">
                <h4 className="mb-4 text-secondary">
                  <i className="bi bi-star-fill me-2"></i>
                  Características Destacadas
                </h4>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <i className="bi bi-check-circle-fill text-success fs-4 me-3"></i>
                      <span>Servicio profesional garantizado</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <i className="bi bi-check-circle-fill text-success fs-4 me-3"></i>
                      <span>Atención personalizada</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <i className="bi bi-check-circle-fill text-success fs-4 me-3"></i>
                      <span>Soporte técnico incluido</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <i className="bi bi-check-circle-fill text-success fs-4 me-3"></i>
                      <span>Precios competitivos</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información adicional */}
              <div className="alert alert-info mb-4">
                <h5 className="alert-heading">
                  <i className="bi bi-lightbulb-fill me-2"></i>
                  ¿Necesitas más información?
                </h5>
                <p className="mb-0">
                  Contáctanos para obtener una cotización personalizada o resolver cualquier duda sobre este servicio.
                </p>
              </div>

              {/* Botones de acción */}
              <div className="d-flex flex-wrap gap-3 mt-4">
                <button 
                  onClick={() => navigate('/services')}
                  className="btn btn-outline-secondary btn-lg"
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Volver a Servicios
                </button>
                <Link 
                  to="/contact" 
                  className="btn btn-primary btn-lg"
                >
                  <i className="bi bi-envelope-fill me-2"></i>
                  Solicitar Información
                </Link>
              </div>
            </div>

            {/* Footer del card */}
            <div className="card-footer bg-light text-muted py-3">
              <small>
                <i className="bi bi-clock-fill me-2"></i>
                Disponible 24/7 - Respuesta garantizada en 24 horas
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Servicios relacionados */}
      <div className="row mt-5">
        <div className="col-12">
          <h3 className="mb-4">Otros Servicios</h3>
          <div className="row g-3">
            {servicios
              .filter(s => s.id !== servicio.id)
              .slice(0, 3)
              .map(otroServicio => (
                <div key={otroServicio.id} className="col-md-4">
                  <Link 
                    to={`/services/${otroServicio.id}`}
                    className="text-decoration-none"
                  >
                    <div className="card h-100 shadow-sm hover-card">
                      <div className="card-body">
                        <h5 className="card-title text-primary">
                          {otroServicio.nombre}
                        </h5>
                        <p className="card-text text-muted small">
                          {otroServicio.descripcion.substring(0, 80)}...
                        </p>
                        <span className="btn btn-sm btn-outline-primary">
                          Ver más →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;