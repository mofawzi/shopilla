import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "./reducers/productReducers";

// Main Reducer
const reducer = combineReducers({
  productList: productListReducer,
});

const initialState = {};

// Middleware for async work
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
