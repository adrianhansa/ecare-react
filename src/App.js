import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./pages/Login";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>e-Care</h1>
        <Login />
      </div>
    </Provider>
  );
};

export default App;
