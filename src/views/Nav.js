import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/images/cactus.svg';

export default function Nav() {
  const [itemCount, setItemCount] = useState(0);
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state) {
      let updatedCount = 0;

      state.cart.addedItems.map(item => {
          updatedCount += parseInt(item.quantity);
      });
      
      setItemCount(updatedCount);
    }
  }, [state]);

  function showCart() {
    const updatedDisplay = !state.display.displayCart;
    dispatch({type: 'DISPLAY_CART', updatedDisplay});
  }

  function showProducts() {
    const updatedDisplay = !state.display.displayProducts;
    dispatch({type: 'DISPLAY_PRODUCT_CONTAINER', updatedDisplay});
  }

  return (
      <nav>
        <button className="color-btn" onClick={() => showProducts()}>Shop</button>
        <img className="logo" src={logo} alt="Cactus Co. logo featuring a simplistic cactus with a flower." />
        <div className="cart-container" onClick={() => showCart()}>
          <FontAwesomeIcon className="cart-icon" icon={faShoppingCart} />
          <span className="cart-item-count">{itemCount}</span>
        </div>
      </nav>
  )
}