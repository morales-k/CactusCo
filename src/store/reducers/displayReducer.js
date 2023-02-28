const initState = {
  displayCart: false,
  displayProductContainer: true,
  displayCheckout: false,
};

export const displayReducer = (state = initState, action) => {
  switch (action.type) {
    case "DISPLAY_CART":
        state.displayCart = true;
        state.displayProductContainer = false;
        state.displayCheckout = false;
        return {...state}
    case "DISPLAY_PRODUCT_CONTAINER":
        state.displayCart = false;
        state.displayProductContainer = true;
        state.displayCheckout = false;
        return {...state}
    case "DISPLAY_CHECKOUT":
        state.displayCart = false;
        state.displayProductContainer = false;
        state.displayCheckout = true;
    default:
        return {...state}
  };
}