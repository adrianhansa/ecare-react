import axios from "axios";
import { URL } from "../constants/url";
import {
  DELETE_ABSENCE_FAIL,
  ADD_ABSENCE_FAIL,
  ADD_ABSENCE_REQUEST,
  ADD_ABSENCE_SUCCESS,
  DELETE_ABSENCE_REQUEST,
  DELETE_ABSENCE_SUCCESS,
  GET_ABSENCES_BY_DATES_REQUEST,
  GET_ABSENCES_BY_DATES_SUCCESS,
  GET_ABSENCES_BY_DATES_FAIL,
  GET_ABSENCES_BY_EMPLOYEE_FAIL,
  GET_ABSENCES_BY_EMPLOYEE_REQUEST,
  GET_ABSENCES_BY_EMPLOYEE_SUCCESS,
  GET_ABSENCE_FAIL,
  GET_ABSENCE_REQUEST,
  GET_ABSENCE_SUCCESS,
  UPDATE_ABSENCE_REQUEST,
  UPDATE_ABSENCE_SUCCESS,
  UPDATE_ABSENCE_FAIL,
} from "../constants/absenceContants";

export const addAbsence = (service, absence) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ABSENCE_REQUEST });
    const { data } = await axios.post(`${URL}/absences/${service}`, absence);
    dispatch({ type: ADD_ABSENCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_ABSENCE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAbsence = (id, absence) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ABSENCE_REQUEST });
    const { data } = await axios.put(`${URL}/absences/${id}`, absence);
    dispatch({ type: UPDATE_ABSENCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_ABSENCE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAbsence = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ABSENCE_REQUEST });
    const { data } = await axios.get(`${URL}/absences/${id}`);
    dispatch({ type: GET_ABSENCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ABSENCE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAbsence = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ABSENCE_REQUEST });
    const { data } = await axios.delete(`${URL}/absences/${id}`);
    dispatch({ type: DELETE_ABSENCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_ABSENCE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAbsencesByDates =
  (service, startDate, endDate) => async (dispatch) => {
    try {
      dispatch({ type: GET_ABSENCES_BY_DATES_REQUEST });
      const { data } = await axios.get(
        `${URL}/absences/${service}/${startDate}/${endDate}`
      );
      dispatch({ type: GET_ABSENCES_BY_DATES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ABSENCES_BY_DATES_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAbsencesByEmployee =
  (employee, startDate, endDate) => async (dispatch) => {
    try {
      dispatch({ type: GET_ABSENCES_BY_EMPLOYEE_REQUEST });
      const { data } = await axios.get(
        `${URL}/absences/by-employee/${employee}/${startDate}/${endDate}`
      );
      dispatch({ type: GET_ABSENCES_BY_EMPLOYEE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ABSENCES_BY_EMPLOYEE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
