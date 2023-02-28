import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

export default function Cart() {
  const [itemCount, setItemCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [editing, toggleEditing] = useState(false);
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

  // Get listItems and check if quantities were updated.
  function editCart() {
    if (editing) {
      const updatedCart = {...state.cart};
      const updatedProducts = {...state.products}
      const listItems = document.getElementsByClassName('item-amt');

      // Get all input data attributes and their values.
      Object.keys(listItems).map(listItem => {
        const productId = listItems[listItem].attributes.data.nodeValue;
        const updatedQuantity = listItems[listItem].value;
        let previousQuantity = 0;

        // If quantity updated, get productId & original amount from cart.
        if (updatedQuantity !== "") {
          updatedCart.addedItems.map(addedItem => {
            if (addedItem.id === productId) {
              previousQuantity = addedItem.quantity;
              addedItem.quantity = updatedQuantity;

              // Update available products.
              updatedProducts.allProducts.map(updatedProduct => {
                if (updatedProduct.id === productId) {
                   if (updatedQuantity < previousQuantity) {
                     // If items removed from cart:
                      updatedProduct.quantityAvailable += (previousQuantity - updatedQuantity);
                  } else if (updatedQuantity > previousQuantity) {
                    // If items added to cart:
                      updatedProduct.quantityAvailable -= (updatedQuantity - previousQuantity);
                  }
                }
              });
              dispatch({type: 'UPDATE_PRODUCTS', updatedProducts});
            }
          });
          dispatch({type: 'UPDATE_ITEMS', updatedCart});
        }

      });
    }
    toggleEditing(!editing);
  }

  // Verifies inputs contain only digits & are <= to available quantity.
  function verifyInput(e) {
    const currentProduct = e.target.attributes.data.nodeValue;
    const currentValue = parseInt(e.target.value);
    const previousValue = parseInt(e.target.attributes.placeholder.nodeValue);
    const isNum = new RegExp(/^\d+$/);

    if (!isNum.test(e.target.value)) {
      e.target.value = '';
      return;
    } else {
      if (currentValue > previousValue) {
        // Check available quantity.
        state.products.allProducts.map(product => {
          if (product.id === currentProduct && 
              product.quantityAvailable + previousValue < currentValue) {
            e.target.value = '';
          }
        });
      }
    }
  }

  function showCheckout() {
      const updatedDisplay = !state.display.displayCart;
      dispatch({type: 'DISPLAY_CHECKOUT', updatedDisplay});
  }

  return (
    <div className={state.display.displayCart ? 'cart' : 'hidden'}>
      <h1>Cart</h1>
      {
        state.cart.addedItems ? 
        <ul>
          {
            itemCount <= 0 ? 
            <li>No items in cart.</li> : 
            <li>
              <button className="outline-btn edit-btn" onClick={() => editCart()}>
                {
                  editing ? "Update" : "Edit Cart"
                }
              </button>
            </li>
          }
          {
            state.cart.addedItems.map(item => {
              if (item.quantity > 0) {
                return <li key={item.id}>
                  <img className="cart-img" src={item.img} alt={item.alt} />
                  <span>{item.name}</span>
                  <span>${item.cost}</span>
                  {
                    editing ? 
                    <input data={item.id} className="item-amt" type="text" placeholder={parseInt(item.quantity)} onChange={(e) => verifyInput(e)} /> :
                    <span>x{parseInt(item.quantity)}</span>
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