import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from '../reducers/cartReducer';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer
} from '../reducers/userReducer';

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListReducer
} from '../reducers/orderReducers';

import {
  productListReducer,
  productDetailReducer
} from '../reducers/productReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderList: orderListReducer
});

const cartItemsFromStorage =
  JSON.parse(localStorage.getItem('cartItems')) ?? [];

const userInfoFromStorage =
  JSON.parse(localStorage.getItem('userInfo')) ?? null;

const shippingAddressFromStorage =
  JSON.parse(localStorage.getItem('shippingAddress')) ?? {};

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
  shippingAddress: shippingAddressFromStorage
};
// const initialState = {};
const middleware = [thunk];
console.log('INITIAL STATE: ', initialState);
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
