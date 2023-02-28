import './styles/App.scss';
import Cart from './views/Cart';
import Nav from './views/Nav';
import ProductContainer from './views/ProductContainer';
import Checkout from './views/Checkout/Checkout';

function App() {

  return (
    <>
      <Nav />
      <ProductContainer />
      <Cart />
      <Checkout />
    </>
  );
}

export default App;
