import CartWidget from '../components/CartWidget';
import ItemListContainer from '../components/ItemListContainer';

const Home = () => {
  return (
    <div className="container">
      <div className="text-center mt-5">
        <h1 className="display-4">Bienvenido a Mi Tienda</h1>
        <p className="lead mt-4">
          Explora nuestro catálogo completo de productos
        </p>
        <a href="/catalogo" className="btn btn-primary btn-lg mt-4">
          Ir al Catálogo
        </a>
      </div>
      <CartWidget />
      <ItemListContainer />
    </div>
  );
};

export default Home;