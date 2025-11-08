import  { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import ItemDetail from './itemDetail';
import { db } from '../data/firebase';
import { useCart } from '../context/cartContext';

const ItemListContainer = ({ greeting }) => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para filtros
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFeatured, setShowFeatured] = useState(false);

  // Obtener productos desde Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => ({
          id: doc.id, // ID de Firebase
          ...doc.data()
        }));
        
        setProducts(productsList);
        setFilteredProducts(productsList);
        setLoading(false);
        console.log('Productos cargados desde Firebase:', productsList);
      } catch (error) {
        console.error('Error al obtener productos:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  // Mostrar loading mientras carga
  if (loading) {
    return (
      <div className="container my-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando productos desde Firebase...</p>
        </div>
      </div>
    );
  }

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
              <small className="text-muted">
                🔥 Productos cargados desde Firebase Firestore
              </small>
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
                        Ver detalles
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