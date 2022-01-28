import axios from "axios";
import {
  EMPLOYEE_LOGIN_FAIL,
  EMPLOYEE_LOGIN_REQUEST,
  EMPLOYEE_LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../constants/userConstants";
import { URL } from "../constants/url";

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const { data } = await axios.post(`${URL}/login`, { email, password });
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      localStorage.setItem("auth", JSON.stringify({ user: data }));
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const employeeLogin =
  ({ payrollNumber, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: EMPLOYEE_LOGIN_REQUEST });
      const { data } = await axios.post(`${URL}/employee-login`, {
        payrollNumber,
        password,
      });
      dispatch({ type: EMPLOYEE_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("auth", JSON.stringify({ user: data }));
    } catch (error) {
      dispatch({
        type: EMPLOYEE_LOGIN_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const register =
  ({ email, name, password, passwordVerify, companyName }) =>
  async (dispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });
      const { data } = await axios.post(`${URL}/register`, {
        email,
        name,
        password,
        passwordVerify,
        companyName,
      });
      dispatch({ type: REGISTER_SUCCESS, payload: data });
      localStorage.setItem("auth", JSON.stringify({ user: data }));
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
