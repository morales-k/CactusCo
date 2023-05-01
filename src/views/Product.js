import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../viewmodel/productVM';

export default function Product(props) {
  const { product } = props;
  const [quantity, setQuantity] = useState(0);
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  function handleQuantity(action) {
    if (action === 'remove' && quantity > 0) {
      setQuantity(quantity - 1);
    } else if (action === 'add' && (quantity + 1) <= product.quantityAvailable) {
      setQuantity(quantity + 1);
    }
  }

  return (
    <div className="product-wrapper">
      <p className="name-cost"><span>{product.name}</span><span>${product.cost}</span></p>
      <div className="product">
        <img src={product.img} alt={product.alt} />
          {
            product.quantityAvailable === 0 ?
            <div className="product-buttons">
              <button disabled>-</button>
              <span>{quantity}</span>
              <button disabled>+</button>
              <button disabled>Sold Out</button>
            </div> :
            <div className="product-buttons">
              <button onClick={() => handleQuantity('remove')}>-</button>
              <span>{quantity} of {product.quantityAvailable}</span>
              <button onClick={() => handleQuantity('add')}>+</button>
              <button onClick={quantity === 0 ? null : () => {
                addProduct(product, {...state.cart}, dispatch, quantity);
                setQuantity(0);
              }}>Add to cart</button>
            </div>
          }
      </div>
    </div>
  )
}

