import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ItemDetail from './itemDetail';

const ItemListContainer = ({ greeting }) => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Array de productos AMPLIADO a 16 elementos
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
    },
    {
      id: 7,
      title: "Samsung Galaxy S24 Ultra",
      description: "Smartphone con S Pen integrado, cámara de 200MP y pantalla AMOLED 6.8\"",
      price: 1299.99,
      image: "https://via.placeholder.com/280x200?text=Galaxy+S24",
      category: "Smartphones",
      stock: 22,
      featured: true
    },
    {
      id: 8,
      title: "Dell XPS 15",
      description: "Laptop profesional Intel i7, 16GB RAM, RTX 4050 y pantalla 4K OLED.",
      price: 1899.99,
      image: "https://via.placeholder.com/280x200?text=Dell+XPS",
      category: "Laptops",
      stock: 10,
      featured: false
    },
    {
      id: 9,
      title: "Bose QuietComfort 45",
      description: "Auriculares con cancelación de ruido líder y hasta 24 horas de batería.",
      price: 329.99,
      image: "https://via.placeholder.com/280x200?text=Bose+QC45",
      category: "Audio",
      stock: 30,
      featured: false
    },
    {
      id: 10,
      title: "iPad Air M1",
      description: "Tablet versátil con chip M1, soporte para Apple Pencil y Magic Keyboard.",
      price: 599.99,
      image: "https://via.placeholder.com/280x200?text=iPad+Air",
      category: "Tablets",
      stock: 18,
      featured: true
    },
    {
      id: 11,
      title: "Garmin Fenix 7",
      description: "Reloj deportivo GPS con mapas, monitor cardíaco y batería de 18 días.",
      price: 699.99,
      image: "https://via.placeholder.com/280x200?text=Garmin+Fenix",
      category: "Wearables",
      stock: 14,
      featured: false
    },
    {
      id: 12,
      title: "Google Pixel 8 Pro",
      description: "Smartphone con IA avanzada, cámara de 50MP y pantalla de 120Hz.",
      price: 999.99,
      image: "https://via.placeholder.com/280x200?text=Pixel+8",
      category: "Smartphones",
      stock: 16,
      featured: true
    },
    {
      id: 13,
      title: "ASUS ROG Strix G16",
      description: "Laptop gaming con Intel i9, RTX 4070, 32GB RAM y pantalla 240Hz.",
      price: 2299.99,
      image: "https://via.placeholder.com/280x200?text=ASUS+ROG",
      category: "Laptops",
      stock: 7,
      featured: true
    },
    {
      id: 14,
      title: "JBL Flip 6",
      description: "Altavoz Bluetooth portátil resistente al agua con sonido potente.",
      price: 129.99,
      image: "https://via.placeholder.com/280x200?text=JBL+Flip",
      category: "Audio",
      stock: 40,
      featured: false
    },
    {
      id: 15,
      title: "Samsung Galaxy Tab S9",
      description: "Tablet Android premium con S Pen, pantalla AMOLED y resistencia IP68.",
      price: 799.99,
      image: "https://via.placeholder.com/280x200?text=Galaxy+Tab",
      category: "Tablets",
      stock: 13,
      featured: false
    },
    {
      id: 16,
      title: "Fitbit Charge 6",
      description: "Pulsera fitness con GPS, monitor de frecuencia cardíaca y 7 días de batería.",
      price: 159.99,
      image: "https://via.placeholder.com/280x200?text=Fitbit",
      category: "Wearables",
      stock: 35,
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

  // Abrir modal de detalles
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  // Cerrar modal de detalles
  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container my-5">
      {/* Modal de detalles del producto */}
      {selectedProduct && (
        <ItemDetail 
          product={selectedProduct} 
          onClose={handleCloseDetails}
        />
      )}
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
            <div key={product.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="card h-100 shadow-sm position-relative">
                {product.featured && (
                  <div className="position-absolute top-0 start-0 m-2" style={{ zIndex: 1 }}>
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
                  <p className="card-text flex-grow-1" style={{ fontSize: '0.9rem' }}>
                    {product.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="text-success mb-0">${product.price.toLocaleString()}</h5>
                      <small className="text-muted">Stock: {product.stock}</small>
                    </div>
                    
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => handleViewDetails(product)}
                      >
                        👁️ Ver detalles
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? '❌ Sin stock' : '🛒 Agregar al carrito'}
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