import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from '../reducers/cartReducer';

import {
  productListReducer,
  productDetailReducer
} from '../reducers/productReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer
});

const cartItemsFromStorage =
  JSON.parse(localStorage.getItem('cartItems')) ?? [];

const initialState = { cart: { cartItemsFromStorage } };
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
