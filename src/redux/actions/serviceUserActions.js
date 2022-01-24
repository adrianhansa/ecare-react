import axios from "axios";
import { URL } from "../constants/url";
import {
  ADD_SERVICE_USER_FAIL,
  ADD_SERVICE_USER_REQUEST,
  ADD_SERVICE_USER_SUCCESS,
  DELETE_SERVICE_USER_FAIL,
  DELETE_SERVICE_USER_REQUEST,
  DELETE_SERVICE_USER_SUCCESS,
  GET_SERVICE_USERS_FAIL,
  GET_SERVICE_USERS_REQUEST,
  GET_SERVICE_USERS_SUCCESS,
  GET_SERVICE_USER_FAIL,
  GET_SERVICE_USER_REQUEST,
  GET_SERVICE_USER_SUCCESS,
  UPDATE_SERVICE_USER_FAIL,
  UPDATE_SERVICE_USER_REQUEST,
  UPDATE_SERVICE_USER_SUCCESS,
} from "../constants/serviceUserConstants";

export const getServiceUsers = (service) => async (dispatch) => {
  try {
    dispatch({ type: GET_SERVICE_USERS_REQUEST });
    const result = await axios.get(`${URL}/service-users/${service}`);
    dispatch({ type: GET_SERVICE_USERS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_SERVICE_USERS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addServiceUser =
  (service, { name, dob, picture }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_SERVICE_USER_REQUEST });
      const { data } = await axios.post(`${URL}/service-users/${service}`, {
        name,
        dob,
        picture,
      });
      dispatch({ type: ADD_SERVICE_USER_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/service-users/${service}`);
      dispatch({ type: GET_SERVICE_USERS_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: ADD_SERVICE_USER_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateServiceUser =
  (service, id, { name, dob, picture, active }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SERVICE_USER_REQUEST });
      const { data } = await axios.put(
        `${URL}/service-users/${service}/${id}`,
        { name, dob, picture, active }
      );
      dispatch({ type: UPDATE_SERVICE_USER_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/service-users/${service}`);
      dispatch({ type: GET_SERVICE_USERS_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: UPDATE_SERVICE_USER_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteServiceUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SERVICE_USER_REQUEST });
    const { data } = await axios.delete(`${URL}/service-users/${id}`);
    dispatch({ type: DELETE_SERVICE_USER_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/service-users/${service}`);
    dispatch({ type: GET_SERVICE_USERS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: DELETE_SERVICE_USER_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getServiceUser = (service, id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SERVICE_USER_REQUEST });
    const { data } = await axios.get(`${URL}/service-users/${service}/${id}`);
    dispatch({ type: GET_SERVICE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SERVICE_USER_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
