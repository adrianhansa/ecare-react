import axios from "axios";
import { URL } from "../constants/url";
import {
  ADD_WORKING_STATUS_FAIL,
  ADD_WORKING_STATUS_REQUEST,
  ADD_WORKING_STATUS_SUCCESS,
  DELETE_WORKING_STATUS_FAIL,
  DELETE_WORKING_STATUS_REQUEST,
  DELETE_WORKING_STATUS_SUCCESS,
  GET_WORKING_STATUSES_FAIL,
  GET_WORKING_STATUSES_REQUEST,
  GET_WORKING_STATUSES_SUCCESS,
  GET_WORKING_STATUS_FAIL,
  GET_WORKING_STATUS_REQUEST,
  GET_WORKING_STATUS_SUCCESS,
  UPDATE_WORKING_STATUS_FAIL,
  UPDATE_WORKING_STATUS_REQUEST,
  UPDATE_WORKING_STATUS_SUCCESS,
} from "../constants/workingStatusConstants";

export const getWorkingStatuses = () => async (dispatch) => {
  try {
    dispatch({ type: GET_WORKING_STATUSES_REQUEST });
    const result = await axios.get(`${URL}/working-status`);
    dispatch({ type: GET_WORKING_STATUSES_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_WORKING_STATUSES_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addWorkingStatus =
  ({ presence, description }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_WORKING_STATUS_REQUEST });
      const { data } = await axios.post(`${URL}/working-status`, {
        presence,
        description,
      });
      dispatch({ type: ADD_WORKING_STATUS_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/working-status`);
      dispatch({ type: GET_WORKING_STATUSES_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: ADD_WORKING_STATUS_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateWorkingStatus =
  (id, { presence, description }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_WORKING_STATUS_REQUEST });
      const { data } = await axios.put(`${URL}/working-status/${id}`, {
        presence,
        description,
      });
      dispatch({ type: UPDATE_WORKING_STATUS_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/working-status`);
      dispatch({ type: GET_WORKING_STATUSES_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: UPDATE_WORKING_STATUS_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getWorkingStatus = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_WORKING_STATUS_REQUEST });
    const { data } = await axios.get(`${URL}/working-status/${id}`);
    dispatch({ type: GET_WORKING_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_WORKING_STATUS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteWorkingStatus = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_WORKING_STATUS_REQUEST });
    const { data } = await axios.delete(`${URL}/working-status/${id}`);
    dispatch({ type: DELETE_WORKING_STATUS_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/working-status`);
    dispatch({ type: GET_WORKING_STATUSES_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: DELETE_WORKING_STATUS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
