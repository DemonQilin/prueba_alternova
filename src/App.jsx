import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { Navbar, ModalMsg, Cart } from './components'
import { Home } from './pages'
import { loadProducts } from './store/slices/products.slice';

function App() {
  // Permite usar las acciones que modifican el estado global creado con Redux
  const dispatch = useDispatch();
  // Mensaje para modal de avisos
  const [msg, setMsg] = useState(null);
  const [visibleCart, setVisibleCart] = useState(false);

  // Solicitud de datos cuando se renderiza la pagina
  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  useEffect(() => {
  }, [msg]);

  return (
    <div className="App">
      <Navbar visibleCart={visibleCart} setVisibleCart={setVisibleCart} />
      <main>
        <Home setMsg={setMsg} />
        {visibleCart && <Cart visibleCart={visibleCart} setVisibleCart={setVisibleCart} setMsg={setMsg} />}
      </main>
      {msg && <ModalMsg msg={msg} />}
    </div>
  )
}

export default App
