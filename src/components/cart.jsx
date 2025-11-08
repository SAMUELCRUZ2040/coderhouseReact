import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    isCartOpen,
    toggleCart
  } = useCart();

  // Si el carrito no está abierto, no renderizar nada
  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay oscuro de fondo */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        style={{ zIndex: 1040 }}
        onClick={toggleCart}
      />
      
      {/* Sidebar del carrito */}
      <div
        className="position-fixed top-0 end-0 h-100 bg-white shadow-lg"
        style={{
          zIndex: 1050,
          width: '400px',
          maxWidth: '90vw',
          overflowY: 'auto'
        }}
      >
        <div className="d-flex flex-column h-100">
          {/* Header del carrito */}
          <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-primary text-white">
            <h5 className="mb-0">Carrito de Compras</h5>
            <button
              onClick={toggleCart}
              className="btn btn-sm btn-light"
              style={{ borderRadius: '50%', width: '35px', height: '35px' }}
            >
              ✕
            </button>
          </div>

          {/* Contenido del carrito */}
          <div className="flex-grow-1 overflow-auto p-3">
            {cartItems.length === 0 ? (
              // Carrito vacío
              <div className="text-center py-5">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="64" 
                  height="64" 
                  fill="currentColor" 
                  className="bi bi-cart3 text-muted mb-3" 
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <p className="text-muted">Tu carrito está vacío</p>
              </div>
            ) : (
              // Lista de productos
              <div className="d-flex flex-column gap-3">
                {cartItems.map(item => (
                  <div key={item.id} className="card">
                    <div className="card-body">
                      <div className="d-flex gap-3">
                        {/* Imagen del producto */}
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                        
                        {/* Información del producto */}
                        <div className="flex-grow-1">
                          <h6 className="mb-1">{item.title}</h6>
                          <p className="text-success mb-2">
                            ${item.price.toFixed(2)}
                          </p>
                          
                          {/* Controles de cantidad */}
                          <div className="d-flex align-items-center gap-2">
                            {/* Botón disminuir */}
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="btn btn-sm btn-outline-secondary"
                              style={{ width: '30px', height: '30px', padding: 0 }}
                            >
                              -
                            </button>
                            
                            {/* Cantidad */}
                            <span className="fw-bold">{item.quantity}</span>
                            
                            {/* Botón aumentar */}
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="btn btn-sm btn-outline-secondary"
                              style={{ width: '30px', height: '30px', padding: 0 }}
                            >
                              +
                            </button>
                            
                            {/* Botón eliminar */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="btn btn-sm btn-outline-danger ms-auto"
                            >
                              🗑️
                            </button>
                          </div>
                          
                          {/* Subtotal del producto */}
                          <div className="mt-2">
                            <small className="text-muted">
                              Subtotal: <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer con total y botones */}
          {cartItems.length > 0 && (
            <div className="border-top p-3">
              <div className="d-flex justify-content-between mb-3">
                <h5>Total:</h5>
                <h5 className="text-success">${getTotalPrice().toFixed(2)}</h5>
              </div>
              
              <div className="d-grid gap-2">
                <button className="btn btn-primary">
                  Proceder al Pago
                </button>
                <button
                  onClick={clearCart}
                  className="btn btn-outline-danger"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;