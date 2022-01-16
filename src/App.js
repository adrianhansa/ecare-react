import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./pages/Login";
import AppNavbar from "./components/AppNavbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/services/Services";
import ServiceScreen from "./pages/services/ServiceScreen";
import Employees from "./pages/employees/Employees";
import Shifts from "./pages/shifts/Shifts";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceScreen />} />
          <Route path="/services/employees/:slug" element={<Employees />} />
          <Route path="/services/shifts/:slug" element={<Shifts />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
