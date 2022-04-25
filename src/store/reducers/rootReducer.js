import { combineReducers } from "@reduxjs/toolkit";
import { displayReducer } from "./displayReducer";
import { productReducer } from '../reducers/productReducer';
import { cartReducer } from '../reducers/cartReducer';

export const rootReducer = combineReducers({
  display: displayReducer,
  products: productReducer,
  cart: cartReducer
});