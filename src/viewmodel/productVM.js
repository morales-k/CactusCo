import { allProducts } from "../assets/products";

export function addProduct(product, cartState, dispatch, quantity) {
  const updatedCart = cartState;
  let updatedQuantity = false;
  const selectedProduct = allProducts.filter(allProduct => allProduct.id === product.id);

  // Do not add product if no more are available.
  if (selectedProduct[0].quantityAvailable <= 0) {
    return;
  }

  // If product is already in cart, update quantity.
  updatedCart.addedItems.map(item => {
    if (item.id === product.id) {
      item.quantity += quantity;
      updatedQuantity = true;
    }
  });
  
  // Add product to cart if new.
  if (!updatedQuantity) {
    updatedCart.addedItems.push({
      id: product.id,
      name: product.name,
      cost: product.cost,
      quantity: quantity,
      img: product.img,
      alt: product.alt,
      quantityAvailable: product.quantityAvailable
    });
  }

  dispatch({type: 'UPDATE_ITEMS', updatedCart});
  updateQuantities(product, quantity, dispatch, "remove");
}


export function removeProduct(product, cartState, dispatch, quantity) {
  const updatedCart = cartState;
  const selectedProduct = updatedCart.addedItems.filter(cartItems => cartItems.id === product.id);

  // Do not remove product if none are in the cart.
  if (selectedProduct.length <= 0) {
    return;
  }

  // If product is already in cart, update quantity.
  updatedCart.addedItems.map(item => {
    if (item.id === product.id) {
      item.quantity -= quantity;
    }
  });

  // Remove any items from the cart state when
  updatedCart.addedItems = updatedCart.addedItems.filter(cartItems => cartItems.quantity > 0);

  dispatch({type: 'UPDATE_ITEMS', updatedCart});
  updateQuantities(product, quantity, dispatch, "add");
}

function updateQuantities(item, quantity, dispatch, task) {
  let updatedProducts = [...allProducts];

  allProducts.map(product => {
    if (item.id === product.id) {
      if (task === "remove") {
        product.quantityAvailable -= quantity;
      } else if (task === "add") {
        product.quantityAvailable += quantity;
      }
    }
  });

  dispatch({type: 'UPDATE_PRODUCTS', updatedProducts});
}