import axios from "axios";
import { URL } from "../constants/url";
import {
  ADD_HANDOVER_FAIL,
  ADD_HANDOVER_REQUEST,
  ADD_HANDOVER_SUCCESS,
  DELETE_HANDOVER_FAIL,
  DELETE_HANDOVER_REQUEST,
  DELETE_HANDOVER_SUCCESS,
  GET_HANDOVERS_FAIL,
  GET_HANDOVERS_REQUEST,
  GET_HANDOVERS_SUCCESS,
  GET_HANDOVER_FAIL,
  GET_HANDOVER_REQUEST,
  GET_HANDOVER_SUCCESS,
  UPDATE_HANDOVER_FAIL,
  UPDATE_HANDOVER_REQUEST,
  UPDATE_HANDOVER_SUCCESS,
} from "../constants/handoverConstants";

export const addHandover =
  (service, { date, time, notes }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_HANDOVER_REQUEST });
      const { data } = await axios.post(`${URL}/handover/${service}`, {
        date,
        time,
        notes,
      });
      dispatch({ type: ADD_HANDOVER_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/handover/${service}`);
      dispatch({ type: GET_HANDOVERS_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: ADD_HANDOVER_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateHandover =
  (id, { date, time, notes }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_HANDOVER_REQUEST });
      const { data } = await axios.put(`${URL}/handover/${id}`, {
        date,
        time,
        notes,
      });
      dispatch({ type: UPDATE_HANDOVER_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/handover/${service}`);
      dispatch({ type: GET_HANDOVERS_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: UPDATE_HANDOVER_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteHandover = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_HANDOVER_REQUEST });
    const { data } = await axios.put(`${URL}/handover/${id}`);
    dispatch({ type: DELETE_HANDOVER_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/handover/${id}`);
    dispatch({ type: GET_HANDOVERS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: DELETE_HANDOVER_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getHandover = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_HANDOVER_REQUEST });
    const { data } = await axios.get(`${URL}/handover/${id}`);
    dispatch({ type: GET_HANDOVER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_HANDOVER_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getHandovers = (service) => async (dispatch) => {
  try {
    dispatch({ type: GET_HANDOVERS_REQUEST });
    const result = await axios.get(`${URL}/handover/${service}`);
    dispatch({ type: GET_HANDOVERS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_HANDOVERS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
