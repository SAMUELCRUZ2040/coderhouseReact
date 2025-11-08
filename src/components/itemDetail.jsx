import React from 'react';
import { useCart } from '../context/CartContext';

const ItemDetail = ({ product, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    // Opcional: cerrar el modal después de agregar
    // onClose();
  };

  return (
    <>
      {/* Overlay oscuro */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        style={{ zIndex: 1055 }}
        onClick={onClose}
      />

      {/* Modal de detalles */}
      <div
        className="position-fixed top-50 start-50 translate-middle bg-white rounded shadow-lg"
        style={{
          zIndex: 1060,
          maxWidth: '900px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Header del modal */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-primary text-white">
          <h4 className="mb-0">Detalles del Producto</h4>
          <button
            onClick={onClose}
            className="btn btn-sm btn-light"
            style={{ borderRadius: '50%', width: '35px', height: '35px' }}
          >
            ✕
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="p-4">
          <div className="row">
            {/* Imagen del producto */}
            <div className="col-md-5">
              <img
                src={product.image}
                alt={product.title}
                className="img-fluid rounded shadow-sm"
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
              />

              {/* Badges */}
              <div className="mt-3 d-flex gap-2 flex-wrap">
                <span className="badge bg-secondary fs-6">{product.category}</span>
                {product.featured && (
                  <span className="badge bg-warning text-dark fs-6">⭐ Destacado</span>
                )}
                {product.stock > 0 ? (
                  <span className="badge bg-success fs-6">✓ Disponible</span>
                ) : (
                  <span className="badge bg-danger fs-6">✗ Agotado</span>
                )}
              </div>
            </div>

            {/* Información del producto */}
            <div className="col-md-7">
              <h2 className="mb-3">{product.title}</h2>

              {/* Precio */}
              <div className="mb-4">
                <h3 className="text-success mb-0">${product.price.toLocaleString()}</h3>
                <small className="text-muted">Precio incluye impuestos</small>
              </div>

              {/* Descripción */}
              <div className="mb-4">
                <h5 className="mb-2">Descripción</h5>
                <p className="text-muted">{product.description}</p>
              </div>

              {/* Especificaciones */}
              <div className="mb-4">
                <h5 className="mb-3">Especificaciones</h5>
                <table className="table table-sm table-bordered">
                  <tbody>
                    <tr>
                      <td className="fw-bold" style={{ width: '40%' }}>Categoría</td>
                      <td>{product.category}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Stock Disponible</td>
                      <td>
                        {product.stock > 0 ? (
                          <span className="text-success">{product.stock} unidades</span>
                        ) : (
                          <span className="text-danger">Sin stock</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Precio</td>
                      <td className="text-success fw-bold">${product.price.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Estado</td>
                      <td>
                        {product.featured ? (
                          <span className="badge bg-warning text-dark">Producto Destacado</span>
                        ) : (
                          <span className="badge bg-secondary">Producto Regular</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Características adicionales */}
              <div className="mb-4">
                <h5 className="mb-3">Características</h5>
                <ul className="list-group">
                  <li className="list-group-item">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Garantía de 1 año
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Envío gratis en pedidos superiores a $500
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Devoluciones en 30 días
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Soporte técnico 24/7
                  </li>
                </ul>
              </div>

              {/* Botones de acción */}
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? (
                    <>
                      <i className="bi bi-x-circle me-2"></i>
                      Sin stock
                    </>
                  ) : (
                    <>
                      <i className="bi bi-cart-plus me-2"></i>
                      Agregar al carrito
                    </>
                  )}
                </button>
                <button className="btn btn-outline-secondary" onClick={onClose}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetail;