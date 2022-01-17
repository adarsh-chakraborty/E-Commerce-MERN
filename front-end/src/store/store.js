import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from '../reducers/cartReducer';
import { userLoginReducer, userRegisterReducer } from '../reducers/userReducer';

import {
  productListReducer,
  productDetailReducer
} from '../reducers/productReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer
});

const cartItemsFromStorage =
  JSON.parse(localStorage.getItem('cartItems')) ?? [];

const userInfoFromStorage =
  JSON.parse(localStorage.getItem('userInfo')) ?? null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage }
};
// const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
