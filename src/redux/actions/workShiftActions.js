import axios from "axios";
import { URL } from "../constants/url";
import {
  ADD_WORKING_SHIFT_FAIL,
  ADD_WORKING_SHIFT_REQUEST,
  ADD_WORKING_SHIFT_SUCCESS,
  DELETE_WORKING_SHIFT_FAIL,
  DELETE_WORKING_SHIFT_REQUEST,
  DELETE_WORKING_SHIFT_SUCCESS,
  GET_WORKING_SHIFTS_BY_EMPLOYEE_BY_DAY_FAIL,
  GET_WORKING_SHIFTS_BY_EMPLOYEE_BY_DAY_REQUEST,
  GET_WORKING_SHIFTS_BY_EMPLOYEE_BY_DAY_SUCCESS,
  GET_WORKING_SHIFTS_BY_INTERVAL_FAIL,
  GET_WORKING_SHIFTS_BY_INTERVAL_REQUEST,
  GET_WORKING_SHIFTS_BY_INTERVAL_SUCCESS,
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

export const getWorkShiftsByInterval =
  (service, start, end) => async (dispatch) => {
    try {
      dispatch({ type: GET_WORKING_SHIFTS_BY_INTERVAL_REQUEST });
      const result = await axios.get(
        `${URL}/work-shifts/${service}/${start}/${end}`
      );
      dispatch({
        type: GET_WORKING_SHIFTS_BY_INTERVAL_SUCCESS,
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: GET_WORKING_SHIFTS_BY_INTERVAL_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getWorkShiftsByEmployeeByDay =
  (service, employee, day) => async (dispatch) => {
    try {
      dispatch({ type: GET_WORKING_SHIFTS_BY_EMPLOYEE_BY_DAY_REQUEST });
      const { data } = await axios.get(
        `${URL}/work-shifts/${service}/${employee}/${day}`
      );
      dispatch({
        type: GET_WORKING_SHIFTS_BY_EMPLOYEE_BY_DAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_WORKING_SHIFTS_BY_EMPLOYEE_BY_DAY_FAIL,
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

export const deleteWorkShift = (id, slug) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_WORKING_SHIFT_REQUEST });
    const { data } = await axios.delete(`${URL}/work-shifts/${slug}/${id}`);
    dispatch({ type: DELETE_WORKING_SHIFT_SUCCESS, payload: data });
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
  (
    service,
    employee,
    { date, shift, startTime, endTime, notes, allocatedTo }
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_WORKING_SHIFT_REQUEST });
      const { data } = await axios.post(`${URL}/work-shifts/${service}`, {
        date,
        employee,
        shift,
        startTime,
        endTime,
        notes,
        service,
        allocatedTo,
      });
      dispatch({ type: ADD_WORKING_SHIFT_SUCCESS, payload: data });
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
    { date, employee, shift, startTime, endTime, notes, allocatedTo }
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
        allocatedTo,
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
