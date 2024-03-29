import { allProducts } from "../../assets/products";

const initState = {
  allProducts: allProducts,
};

export const productReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_PRODUCTS":
        return {
          ...state,
          allProducts: action.updatedProducts
        }
    default:
        return {...state}
  };
}