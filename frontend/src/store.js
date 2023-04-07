import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { itemsReducers, gameInfoReducers } from "./reducers/itemsReducers";

const reducer = combineReducers({
  items: itemsReducers,
  gameInfo: gameInfoReducers,
});

let initialState = {};

const middlware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
