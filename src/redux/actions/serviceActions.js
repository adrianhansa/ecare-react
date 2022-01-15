import axios from "axios";
import {
  ADD_SERVICE_FAIL,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_SUCCESS,
  DELETE_SERVICE_FAIL,
  DELETE_SERVICE_REQUEST,
  DELETE_SERVICE_SUCCESS,
  GET_SERVICES_FAIL,
  GET_SERVICES_REQUEST,
  GET_SERVICES_SUCCESS,
  GET_SERVICE_FAIL,
  GET_SERVICE_REQUEST,
  GET_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAIL,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS,
} from "../constants/serviceConstants";
import { URL } from "../constants/url";

export const addService =
  ({ name, address, phone }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_SERVICE_REQUEST });
      const { data } = await axios.post(`${URL}/services`, {
        name,
        address,
        phone,
      });
      dispatch({ type: ADD_SERVICE_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/services`);
      dispatch({ type: GET_SERVICES_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: ADD_SERVICE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getServices = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SERVICES_REQUEST });
    const result = await axios.get(`${URL}/services`);
    dispatch({ type: GET_SERVICES_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_SERVICES_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getService = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_SERVICE_REQUEST });
    const { data } = await axios.get(`${URL}/services/${slug}`);
    dispatch({ type: GET_SERVICE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SERVICE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteService = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SERVICE_REQUEST });
    const { data } = await axios.delete(`${URL}/services/${id}`);
    dispatch({ type: DELETE_SERVICE_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/services`);
    dispatch({ type: GET_SERVICES_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: DELETE_SERVICE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateService =
  (id, { name, address, phone }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SERVICE_REQUEST });
      const { data } = await axios.put(`${URL}/services/${id}`, {
        name,
        address,
        phone,
      });
      dispatch({ type: UPDATE_SERVICE_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/services`);
      dispatch({ type: GET_SERVICES_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: UPDATE_SERVICE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
