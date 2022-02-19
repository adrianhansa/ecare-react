import axios from "axios";
import { URL } from "../constants/url";
import {
  ADD_EMPLOYEE_FAIL,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  GET_ALL_EMPLOYEES_FAIL,
  GET_ALL_EMPLOYEES_REQUEST,
  GET_ALL_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAIL,
  GET_EMPLOYEES_REQUEST,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEE_FAIL,
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
} from "../constants/employeeConstants";

export const addEmployee =
  (
    service,
    {
      name,
      email,
      payrollNumber,
      address,
      phone,
      contractHours,
      role,
      driver,
      accessLevel,
    }
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_EMPLOYEE_REQUEST });
      const { data } = await axios.post(`${URL}/employees/${service}`, {
        name,
        email,
        payrollNumber,
        service,
        address,
        phone,
        contractHours,
        role,
        driver,
        accessLevel,
      });
      dispatch({ type: ADD_EMPLOYEE_SUCCESS, payload: data });
      const response = await axios.get(`${URL}/employees/${service}`);
      dispatch({ type: GET_EMPLOYEES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: ADD_EMPLOYEE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateEmployee =
  (
    id,
    serviceId,
    {
      name,
      email,
      payrollNumber,
      service,
      address,
      phone,
      contractHours,
      role,
      driver,
      accessLevel,
    }
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_EMPLOYEE_REQUEST });
      const { data } = await axios.put(`${URL}/employees/${id}`, {
        name,
        email,
        payrollNumber,
        service,
        address,
        phone,
        contractHours,
        role,
        driver,
        accessLevel,
      });
      dispatch({ type: UPDATE_EMPLOYEE_SUCCESS, payload: data });
      const response = await axios.get(`${URL}/employees/${serviceId}`);
      dispatch({ type: GET_EMPLOYEES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: UPDATE_EMPLOYEE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getEmployee = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_EMPLOYEE_REQUEST });
    const { data } = await axios.get(`${URL}/employees/get-employee/${id}`);
    dispatch({ type: GET_EMPLOYEE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_EMPLOYEE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEmployees = (service) => async (dispatch) => {
  try {
    dispatch({ type: GET_EMPLOYEES_REQUEST });
    const response = await axios.get(`${URL}/employees/${service}`);
    dispatch({ type: GET_EMPLOYEES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_EMPLOYEES_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllEmployees = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EMPLOYEES_REQUEST });
    const response = await axios.get(`${URL}/employees/all`);
    dispatch({ type: GET_ALL_EMPLOYEES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EMPLOYEES_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteEmployee = (id, service) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EMPLOYEE_REQUEST });
    const { data } = await axios.delete(`${URL}/employees/${id}`);
    dispatch({ type: DELETE_EMPLOYEE_SUCCESS, payload: data });
    const response = await axios.get(`${URL}/employees/${service}`);
    dispatch({ type: GET_EMPLOYEES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: DELETE_EMPLOYEE_FAIL,
      payload:
        error.message && error.response.data.messge
          ? error.resposne.data.message
          : error.message,
    });
  }
};
