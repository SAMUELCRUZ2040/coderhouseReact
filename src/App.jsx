import CartWidget from './components/CartWidget'
import ItemListContainer from './components/ItemListContainer'
import NavBar from './components/navbar'
import './stylesheets/global.css'

function App() {

  return (
    <>
    <div className="App">
      <NavBar />
      <div className="container mt-4">
        <h1 className="text-center">Mi E-commerce</h1>
        <p className="text-center">Contenido de tu aplicación aquí...</p>
      </div>
       <CartWidget />
        <ItemListContainer greeting="¡Explora nuestro catálogo completo de productos!" />
    </div>
    </>
  )
}

export default App