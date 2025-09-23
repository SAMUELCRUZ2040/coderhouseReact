import React from 'react';

const CartWidget = () => {
  // Datos dinámicos para las cartas
  const products = [
    {
      id: 1,
      title: "Smartphone Pro Max",
      description: "El último modelo con cámara de 108MP, pantalla AMOLED de 6.7 pulgadas y batería de larga duración.",
      price: "$899.99",
      image: "https://via.placeholder.com/300x200?text=Smartphone",
      category: "Tecnología"
    },
    {
      id: 2,
      title: "Laptop Gaming RGB",
      description: "Potente laptop para gaming con procesador Intel i7, RTX 4060, 16GB RAM y SSD de 1TB.",
      price: "$1,299.99",
      image: "https://via.placeholder.com/300x200?text=Laptop",
      category: "Computadoras"
    },
    {
      id: 3,
      title: "Auriculares Bluetooth",
      description: "Auriculares inalámbricos con cancelación de ruido activa y hasta 30 horas de batería.",
      price: "$199.99",
      image: "https://via.placeholder.com/300x200?text=Auriculares",
      category: "Audio"
    }
  ];

  const handleAddToCart = (productId) => {
    console.log(`Producto ${productId} agregado al carrito`);
    // Aquí puedes agregar la lógica para añadir al carrito
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center mb-4">Productos Destacados</h2>
        </div>
      </div>
      
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-lg-4 col-md-6 col-sm-12">
            <div className="card h-100 shadow-sm">
              <img 
                src={product.image} 
                className="card-img-top" 
                alt={product.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <div className="mb-2">
                  <span className="badge bg-primary">{product.category}</span>
                </div>
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text flex-grow-1">{product.description}</p>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="text-success mb-0">{product.price}</h4>
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <i className="bi bi-cart-plus"></i> Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartWidget;