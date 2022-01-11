import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/userActions";

const Login = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(login({ email: "adrian.hansa@yahoo.com", password: "111111" }));
  }, [dispatch]);
  return <div>LOGIN</div>;
};

export default Login;
