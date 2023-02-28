import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Product from './Product';

export default function ProductContainer() {
  const [allProducts, setProducts] = useState([]);
  const state = useSelector(state => state);

  useEffect(() => {
    if (state.display.displayProductContainer) {
      setProducts(state.products.allProducts);
    }
  }, [state.display.displayProductContainer]);

  return (
    <div className={state.display.displayProductContainer ? "products-container" : "hidden"}>
      {
        allProducts && allProducts.map(product => {
          return (
            <Product key={product.id} product={product} />
          );
        })
      }
    </div>
  )
}

