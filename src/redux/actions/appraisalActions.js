import axios from "axios";
import { URL } from "../constants/url";
import {
  ADD_APPRAISAL_REQUEST,
  ADD_APPRAISAL_SUCCESS,
  ADD_APPRAISAL_FAIL,
  GET_APPRAISALS_FAIL,
  UPDATE_APPRAISAL_SUCCESS,
  UPDATE_APPRAISAL_FAIL,
  UPDATE_APPRAISAL_REQUEST,
  GET_APPRAISALS_REQUEST,
  GET_APPRAISALS_SUCCESS,
  GET_APPRAISAL_FAIL,
  GET_APPRAISAL_REQUEST,
  GET_APPRAISAL_SUCCESS,
  DELETE_APPRAISAL_SUCCESS,
  DELETE_APPRAISAL_FAIL,
  DELETE_APPRAISAL_REQUEST,
} from "../constants/appraisalConstants";

export const addAppraisal =
  (service, { employee, date }) =>
  async (dispatch) => {
    try {
      dispatch({ ADD_APPRAISAL_REQUEST });
      const { data } = await axios.post(`${URL}/appraisals/${service}`, {
        employee,
        date,
      });
      dispatch({ type: ADD_APPRAISAL_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/appraisals/${service}`);
      dispatch({ type: GET_APPRAISALS_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: ADD_APPRAISAL_FAIL,
        payload:
          error.response.data.message && error.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAppraisals = (service) => async (dispatch) => {
  try {
    dispatch({ type: GET_APPRAISALS_REQUEST });
    const result = await axios.get(`${URL}/appraisals/${service}`);
    dispatch({ type: GET_APPRAISALS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_APPRAISALS_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAppraisal = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_APPRAISAL_REQUEST });
    const result = await axios.get(`${URL}/appraisals/${id}`);
    dispatch({ type: GET_APPRAISAL_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_APPRAISAL_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAppraisal =
  (id, { date }) =>
  async (dispatch) => {
    try {
      dispatch({ UPDATE_APPRAISAL_REQUEST });
      const { data } = await axios.put(`${URL}/appraisals/${id}`, {
        date,
      });
      dispatch({ type: UPDATE_APPRAISAL_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/appraisals/${service}`);
      dispatch({ type: GET_APPRAISALS_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: UPDATE_APPRAISAL_FAIL,
        payload:
          error.response.data.message && error.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteAppraisal = (id) => async (dispatch) => {
  try {
    dispatch({ DELETE_APPRAISAL_REQUEST });
    const { data } = await axios.delete(`${URL}/appraisals/${id}`);
    dispatch({ type: DELETE_APPRAISAL_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/appraisals/${service}`);
    dispatch({ type: GET_APPRAISALS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: DELETE_APPRAISAL_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};
