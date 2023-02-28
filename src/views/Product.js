import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';

export default function Product(props) {
  const [quantity, setQuantity] = useState(0);
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  function handleQuantity(action) {
    if (action === 'remove' && quantity > 0) {
      setQuantity(quantity - 1);
    } else if (action === 'add' && (quantity + 1) <= props.product.quantityAvailable) {
      setQuantity(quantity + 1);
    }
  }
  
  function addProduct() {
    const updatedCart = {...state.cart};
    let updatedQuantity = false;

    // If product is already in cart, update quantity.
    updatedCart.addedItems.map(item => {
      if (item.id === props.product.id) {
        item.quantity += quantity;
        updatedQuantity = true;
      }
    });
    
    // Add product to cart if new.
    if (!updatedQuantity) {
      updatedCart.addedItems.push({
        id: props.product.id,
        name: props.product.name,
        cost: props.product.cost,
        quantity: quantity,
        img: props.product.img,
        alt: props.product.alt
      });
    }

    // addItem(updatedCart);
    dispatch({type: 'UPDATE_ITEMS', updatedCart});
    updateQuantities();
  }

  function updateQuantities() {
    const updatedProducts = [];

    state.products.allProducts.map(product => {
      if (product.id === props.product.id) {
        product.quantityAvailable -= quantity;
      }
      updatedProducts.push(product);
    });

    dispatch({type: 'UPDATE_PRODUCTS', updatedProducts});
    setQuantity(0); // Reset product quantity after adding to cart.
  }

  return (
    <div className="product-wrapper">
      <p className="name-cost"><span>{props.product.name}</span><span>${props.product.cost}</span></p>
      <div className="product">
        <img src={props.product.img} alt={props.product.alt} />
          {
            props.product.quantityAvailable === 0 ?
            <div className="product-buttons">
              <button disabled>-</button>
              <span>{quantity}</span>
              <button disabled>+</button>
              <button disabled>Sold Out</button>
            </div> :
            <div className="product-buttons">
              <button onClick={() => handleQuantity('remove')}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantity('add')}>+</button>
              <button onClick={quantity === 0 ? null : () => addProduct()}>Add to cart</button>
            </div>
          }
      </div>
    </div>
  )
}

