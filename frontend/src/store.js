import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { itemsReducers, gameInfoReducers,newReviewReducers } from "./reducers/itemsReducers";
import { cartReducers } from "./reducers/cartReducers";
import { authReducer, userReducer,passwordForgotReducer } from "./reducers/userReducers";
import { newOrderReducer, myOrdersReducer,detailOrderReducer } from "./reducers/orderReducers";

const reducer = combineReducers({
  items: itemsReducers,
  gameInfo: gameInfoReducers,
  cart: cartReducers,
  auth: authReducer,
  user: userReducer,
  passwordForgot: passwordForgotReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  detailOrder:detailOrderReducer,
  newReview: newReviewReducers
});

let initialState = {
  cart:{
    cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems'))
    :[]
  }
};

const middlware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
