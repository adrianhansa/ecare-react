import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/userReducers";
import { serviceReducer, servicesReducer } from "./reducers/serviceReducers";

const authFromLocalStorage = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : {};

const initialState = {
  auth: authFromLocalStorage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  serviceDetails: serviceReducer,
  serviceList: servicesReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
