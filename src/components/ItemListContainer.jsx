import React, { useState } from 'react';

const ItemListContainer = ({ greeting }) => {
  // Array de productos más extenso
  const products = [
    {
      id: 1,
      title: "iPhone 15 Pro",
      description: "El iPhone más avanzado con chip A17 Pro, cámara de 48MP y titanio.",
      price: 1199.99,
      image: "https://via.placeholder.com/280x200?text=iPhone+15",
      category: "Smartphones",
      stock: 15,
      featured: true
    },
    {
      id: 2,
      title: "MacBook Air M2",
      description: "Ultraligera con chip M2, pantalla Liquid Retina de 13.6 pulgadas.",
      price: 1099.99,
      image: "https://via.placeholder.com/280x200?text=MacBook+Air",
      category: "Laptops",
      stock: 8,
      featured: false
    },
    {
      id: 3,
      title: "AirPods Pro 2",
      description: "Auriculares con cancelación de ruido adaptativa y audio espacial.",
      price: 249.99,
      image: "https://via.placeholder.com/280x200?text=AirPods+Pro",
      category: "Audio",
      stock: 25,
      featured: true
    },
    {
      id: 4,
      title: "iPad Pro 12.9",
      description: "Tablet profesional con chip M2 y pantalla Liquid Retina XDR.",
      price: 1099.99,
      image: "https://via.placeholder.com/280x200?text=iPad+Pro",
      category: "Tablets",
      stock: 12,
      featured: false
    },
    {
      id: 5,
      title: "Apple Watch Ultra",
      description: "El Apple Watch más resistente con GPS dual y batería de 36 horas.",
      price: 799.99,
      image: "https://via.placeholder.com/280x200?text=Watch+Ultra",
      category: "Wearables",
      stock: 20,
      featured: true
    },
    {
      id: 6,
      title: "Sony WH-1000XM4",
      description: "Auriculares premium con la mejor cancelación de ruido del mercado.",
      price: 349.99,
      image: "https://via.placeholder.com/280x200?text=Sony+WH1000XM4",
      category: "Audio",
      stock: 18,
      featured: false
    }
  ];

  // Estados para filtros
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFeatured, setShowFeatured] = useState(false);

  // Obtener categorías únicas
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Función para filtrar productos
  const filterProducts = (category, featured) => {
    let filtered = products;

    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }

    if (featured) {
      filtered = filtered.filter(product => product.featured);
    }

    setFilteredProducts(filtered);
  };

  // Manejar cambio de categoría
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(category, showFeatured);
  };

  // Manejar filtro de destacados
  const handleFeaturedToggle = () => {
    const newFeatured = !showFeatured;
    setShowFeatured(newFeatured);
    filterProducts(selectedCategory, newFeatured);
  };

  // Función para agregar al carrito
  const handleAddToCart = (product) => {
    console.log(`Agregando ${product.title} al carrito`);
    // Aquí iría tu lógica del carrito
  };

  return (
    <div className="container my-5">
      {/* Saludo personalizado */}
      {greeting && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="alert alert-info text-center">
              <h3>{greeting}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h4 className="mb-3">Filtrar por categoría:</h4>
          <div className="btn-group flex-wrap" role="group">
            {categories.map(category => (
              <button
                key={category}
                type="button"
                className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'} mb-2`}
                onClick={() => handleCategoryChange(category)}
              >
                {category === 'all' ? 'Todos' : category}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <h4 className="mb-3">Opciones:</h4>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="featuredCheck"
              checked={showFeatured}
              onChange={handleFeaturedToggle}
            />
            <label className="form-check-label" htmlFor="featuredCheck">
              Solo productos destacados
            </label>
          </div>
        </div>
      </div>

      {/* Contador de productos */}
      <div className="row mb-3">
        <div className="col-12">
          <p className="text-muted">
            Mostrando {filteredProducts.length} de {products.length} productos
          </p>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
              <div className="card h-100 shadow-sm position-relative">
                {product.featured && (
                  <div className="position-absolute top-0 start-0 m-2">
                    <span className="badge bg-warning text-dark">⭐ Destacado</span>
                  </div>
                )}
                
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                
                <div className="card-body d-flex flex-column">
                  <div className="mb-2">
                    <span className="badge bg-secondary">{product.category}</span>
                  </div>
                  
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text flex-grow-1">{product.description}</p>
                  
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h4 className="text-success mb-0">${product.price.toLocaleString()}</h4>
                      <small className="text-muted">Stock: {product.stock}</small>
                    </div>
                    
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button
                        className="btn btn-outline-info btn-sm me-md-2"
                        onClick={() => console.log(`Ver detalles de ${product.title}`)}
                      >
                        Ver detalles
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning text-center">
              <h4>No se encontraron productos</h4>
              <p>Intenta cambiar los filtros para ver más productos.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;