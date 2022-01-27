import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, employeeLogin } from "../redux/actions/userActions";

const Login = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(employeeLogin({ payrollNumber: "1008789", password: "helmed" }));
  }, [dispatch]);
  return <div>LOGIN</div>;
};

export default Login;
