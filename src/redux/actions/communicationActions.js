import axios from "axios";
import { URL } from "../constants/url";
import {
  ADD_COMMUNICATION_REQUEST,
  ADD_COMMUNICATION_SUCCESS,
  ADD_COMMUNICATION_FAIL,
  GET_COMMUNICATIONS_FAIL,
  UPDATE_COMMUNICATION_SUCCESS,
  UPDATE_COMMUNICATION_FAIL,
  UPDATE_COMMUNICATION_REQUEST,
  GET_COMMUNICATIONS_REQUEST,
  GET_COMMUNICATIONS_SUCCESS,
  GET_COMMUNICATION_FAIL,
  GET_COMMUNICATION_REQUEST,
  GET_COMMUNICATION_SUCCESS,
  DELETE_COMMUNICATION_SUCCESS,
  DELETE_COMMUNICATION_FAIL,
  DELETE_COMMUNICATION_REQUEST,
} from "../constants/communicationConstants";

export const addCommunication =
  (service, { date, content }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_COMMUNICATION_REQUEST });
      const { data } = await axios.post(`${URL}/communications/${service}`, {
        date,
        content,
      });
      dispatch({ type: ADD_COMMUNICATION_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/communications/${service}`);
      dispatch({ type: GET_COMMUNICATIONS_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: ADD_COMMUNICATION_FAIL,
        payload:
          error.response.data.message && error.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCommunications = (service) => async (dispatch) => {
  try {
    dispatch({ type: GET_COMMUNICATIONS_REQUEST });
    const result = await axios.get(`${URL}/communications/${service}`);
    dispatch({ type: GET_COMMUNICATIONS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_COMMUNICATIONS_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCommunication = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_COMMUNICATION_REQUEST });
    const result = await axios.get(`${URL}/communications/${id}`);
    dispatch({ type: GET_COMMUNICATION_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_COMMUNICATION_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCommunication =
  (service, id, { date, content }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_COMMUNICATION_REQUEST });
      const { data } = await axios.put(`${URL}/communications/${id}`, {
        date,
        content,
      });
      dispatch({ type: UPDATE_COMMUNICATION_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/communications/${service}`);
      dispatch({ type: GET_COMMUNICATIONS_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: UPDATE_COMMUNICATION_FAIL,
        payload:
          error.response.data.message && error.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteCommunication = (service, id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COMMUNICATION_REQUEST });
    const { data } = await axios.delete(`${URL}/communications/${id}`);
    dispatch({ type: DELETE_COMMUNICATION_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/communications/${service}`);
    dispatch({ type: GET_COMMUNICATIONS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: DELETE_COMMUNICATION_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};
