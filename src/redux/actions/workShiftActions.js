import axios from "axios";
import { URL } from "../constants/url";
import {
  ADD_WORKING_SHIFT_FAIL,
  ADD_WORKING_SHIFT_REQUEST,
  ADD_WORKING_SHIFT_SUCCESS,
  DELETE_WORKING_SHIFT_FAIL,
  DELETE_WORKING_SHIFT_REQUEST,
  DELETE_WORKING_SHIFT_SUCCESS,
  GET_WORKING_SHIFTS_FAIL,
  GET_WORKING_SHIFTS_REQUEST,
  GET_WORKING_SHIFTS_SUCCESS,
  GET_WORKING_SHIFT_FAIL,
  GET_WORKING_SHIFT_REQUEST,
  GET_WORKING_SHIFT_SUCCESS,
  UPDATE_WORKING_SHIFT_FAIL,
  UPDATE_WORKING_SHIFT_REQUEST,
  UPDATE_WORKING_SHIFT_SUCCESS,
} from "../constants/workShiftConstants";

export const getWorkShifts = (day) => async (dispatch) => {
  try {
    dispatch({ type: GET_WORKING_SHIFTS_REQUEST });
    const result = await axios.get(`${URL}/work-shifts/${day}`);
    dispatch({ type: GET_WORKING_SHIFTS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_WORKING_SHIFTS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getWorkShift = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_WORKING_SHIFT_REQUEST });
    const { data } = await axios.get(`${URL}/work-shifts/${id}`);
    dispatch({ type: GET_WORKING_SHIFT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_WORKING_SHIFT_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteWorkShift = (id, day) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_WORKING_SHIFT_REQUEST });
    const { data } = await axios.delete(`${URL}/work-shifts/${id}`);
    dispatch({ type: DELETE_WORKING_SHIFT_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/work-shifts/${day}`);
    dispatch({ type: GET_WORKING_SHIFTS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: DELETE_WORKING_SHIFT_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addWorkShift =
  (day, service, employee, { date, shift, startTime, endTime, notes }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_WORKING_SHIFT_REQUEST });
      const { data } = await axios.post(`${URL}/work-shifts`, {
        date,
        employee,
        shift,
        startTime,
        endTime,
        notes,
        service,
      });
      dispatch({ type: ADD_WORKING_SHIFT_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/work-shifts/${day}`);
      dispatch({ type: GET_WORKING_SHIFTS_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: ADD_WORKING_SHIFT_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateWorkShift =
  (
    id,
    day,
    { date, employee, shift, startTime, endTime, notes, workingStatus }
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_WORKING_SHIFT_REQUEST });
      const { data } = await axios.put(`${URL}/work-shifts/${id}`, {
        date,
        employee,
        shift,
        startTime,
        endTime,
        notes,
        workingStatus,
      });
      dispatch({ type: UPDATE_WORKING_SHIFT_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/work-shifts/${day}`);
      dispatch({ type: GET_WORKING_SHIFTS_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: UPDATE_WORKING_SHIFT_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
