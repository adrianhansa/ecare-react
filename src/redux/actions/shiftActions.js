import axios from "axios";
import { URL } from "../constants/url";
import {
  ADD_SHIFT_FAIL,
  ADD_SHIFT_REQUEST,
  ADD_SHIFT_SUCCESS,
  DELETE_SHIFT_FAIL,
  DELETE_SHIFT_REQUEST,
  DELETE_SHIFT_SUCCESS,
  GET_SHIFTS_FAIL,
  GET_SHIFTS_REQUEST,
  GET_SHIFTS_SUCCESS,
  GET_SHIFT_FAIL,
  GET_SHIFT_REQUEST,
  GET_SHIFT_SUCCESS,
  UPDATE_SHIFT_FAIL,
  UPDATE_SHIFT_REQUEST,
  UPDATE_SHIFT_SUCCESS,
} from "../constants/shiftConstants";

export const getShifts = (service) => async (dispatch) => {
  try {
    dispatch({ type: GET_SHIFTS_REQUEST });
    const result = await axios.get(`${URL}/shifts/${service}`);
    dispatch({ type: GET_SHIFTS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_SHIFTS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addShift =
  (service, { name, startTime, endTime, present }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_SHIFT_REQUEST });
      const { data } = await axios.post(`${URL}/shifts/${service}`, {
        name,
        startTime,
        endTime,
        present,
      });
      dispatch({ type: ADD_SHIFT_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/shifts/${service}`);
      dispatch({ type: GET_SHIFTS_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: ADD_SHIFT_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateShift =
  (id, service, { name, startTime, endTime, present }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SHIFT_REQUEST });
      const { data } = await axios.put(`${URL}/shifts/${id}`, {
        name,
        startTime,
        endTime,
        present,
      });
      dispatch({ type: UPDATE_SHIFT_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/shifts/${service}`);
      dispatch({ type: GET_SHIFTS_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: UPDATE_SHIFT_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getShift = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SHIFT_REQUEST });
    const { data } = await axios.get(`${URL}/shifts/${id}`);
    dispatch({ type: GET_SHIFT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SHIFT_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteShift = (id, service) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SHIFT_REQUEST });
    const { data } = await axios.delete(`${URL}/shifts/${id}`);
    dispatch({ type: DELETE_SHIFT_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/shifts/${service}`);
    dispatch({ type: GET_SHIFTS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: DELETE_SHIFT_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
