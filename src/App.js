import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./pages/auth/Login";
import EmployeeLogin from "./pages/auth/EmployeeLogin";
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
import Supervisions from "./pages/supervisions/Supervisions";
import Appraisals from "./pages/appraisals/Appraisals";
import Communications from "./pages/communications/Communications";
import DailyObservationItems from "./pages/dailyObservations/DailyObservationItems";
import Absences from "./pages/absences/Absences";
import ShiftPlans from "./pages/shiftPlans/ShiftPlans";
import HealthAndSafety from "./pages/healthAndSafety/HealthAndSafety";
import DailyBook from "./pages/residents/records/DailyBook";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceScreen />} />
          <Route path="/services/rota/:slug" element={<Rota />} />
          <Route path="/services/roles/:slug" element={<Roles />} />
          <Route path="/services/residents/:slug" element={<Residents />} />
          <Route
            path="/services/daily-observations/:slug"
            element={<DailyObservationItems />}
          />
          <Route path="/services/diary/:slug" element={<Diary />} />
          <Route path="/services/handover/:slug" element={<Handover />} />
          <Route path="/services/employees/:slug" element={<Employees />} />
          <Route path="/services/shifts/:slug" element={<Shifts />} />
          <Route path="/services/appraisals/:slug" element={<Appraisals />} />
          <Route
            path="/services/communications/:slug"
            element={<Communications />}
          />
          <Route
            path="/services/supervisions/:slug"
            element={<Supervisions />}
          />
          <Route
            path="/services/absence-management/:slug"
            element={<Absences />}
          />
          <Route path="/services/shift-plans/:slug" element={<ShiftPlans />} />
          <Route
            path="/services/health-and-safety/:slug"
            element={<HealthAndSafety />}
          />
          <Route
            path="/services/residents/daily-book/:slug/:resident"
            element={<DailyBook />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
