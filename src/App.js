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
import Rota from "./pages/rota/Rota";
import Residents from "./pages/residents/Residents";
import Handover from "./pages/handover/Handover";
import Diary from "./pages/diary/Diary";
import Roles from "./pages/roles/Roles";
import DailyObservations from "./pages/dailyObservations/DailyObservations";

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
          <Route path="/services/rota/:slug" element={<Rota />} />
          <Route path="/services/roles/:slug" element={<Roles />} />
          <Route path="/services/residents/:slug" element={<Residents />} />
          <Route
            path="/services/daily-observations/:slug"
            element={<DailyObservations />}
          />
          <Route path="/services/diary/:slug" element={<Diary />} />
          <Route path="/services/handover/:slug" element={<Handover />} />
          <Route path="/services/employees/:slug" element={<Employees />} />
          <Route path="/services/shifts/:slug" element={<Shifts />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
