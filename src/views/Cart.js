import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../viewmodel/productVM';

export default function Cart() {
  const [itemCount, setItemCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [messageItemID, setMessageItemID] = useState(null);
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.display.displayCart) { // Only run if cart is shown.
      let updatedCount = 0;
      let updatedTotal = 0;

      state.cart.addedItems.map(item => {
        updatedCount += item.quantity;
        updatedTotal += item.quantity * item.cost.toFixed(2);
      });
      
      setItemCount(updatedCount);
      setTotalCost(updatedTotal.toFixed(2));
    }
  }, [state]);

  function showCheckout() {
      const updatedDisplay = !state.display.displayCart;
      dispatch({type: 'DISPLAY_CHECKOUT', updatedDisplay});
  }

  const handleMessage = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 4000);
    setTimeout(() => setMessageItemID(null), 4000);
  };

  return (
    <div className={state.display.displayCart ? 'cart' : 'hidden'}>
      <h1>Cart</h1>
      {
        state.cart.addedItems ? 
        <ul>
          {
            itemCount <= 0 ? 
            <li>No items in cart.</li> : 
            <li>{`${itemCount} items in cart`}</li>
          }
          {
            state.cart.addedItems.map(item => {
              let currentItem = state.products.allProducts.filter(product => product.id === item.id);

              if (item.quantity > 0) {
                return <li key={item.id}>
                  <img className="cart-img" src={item.img} alt={item.alt} />
                  <span>{item.name}</span>
                  <span>${item.cost}</span>
                  <span className="cart-btns">
                    <button onClick={() => removeProduct(item, {...state.cart}, dispatch, 1)}>-</button>
                    <span>x{parseInt(item.quantity)}</span>
                    <button 
                    onClick={() => {
                          addProduct(item, {...state.cart}, dispatch, 1);
                          // Display message if there is no more of an item available.
                          if (currentItem[0].quantityAvailable <= 0) {
                            setMessageItemID(item.id);
                            handleMessage();
                          }
                        }
                      }
                    disabled={currentItem[0].quantityAvailable <= 0}>+</button>
                  </span>
                  {
                    showMessage && messageItemID === item.id ?
                    <span className="not-avail-msg">No additional product available</span> : 
                    null
                  }
                </li>
              }
            })
          }
          <li className="total">Total: ${totalCost}</li>
        </ul> : null
      }
      {
        itemCount > 0 ?
        <button className="color-btn" onClick={() => showCheckout()}>Checkout</button> :
        null
      }
    </div>
  )
}