import axios from "axios";
import { URL } from "../constants/url";
import {
  ADD_SUPERVISION_REQUEST,
  ADD_SUPERVISION_SUCCESS,
  ADD_SUPERVISION_FAIL,
  GET_SUPERVISIONS_FAIL,
  UPDATE_SUPERVISION_SUCCESS,
  UPDATE_SUPERVISION_FAIL,
  UPDATE_SUPERVISION_REQUEST,
  GET_SUPERVISIONS_REQUEST,
  GET_SUPERVISIONS_SUCCESS,
  GET_SUPERVISION_FAIL,
  GET_SUPERVISION_REQUEST,
  GET_SUPERVISION_SUCCESS,
  DELETE_SUPERVISION_SUCCESS,
  DELETE_SUPERVISION_FAIL,
  DELETE_SUPERVISION_REQUEST,
  GET_LATEST_SUPERVISION_FAIL,
  GET_LATEST_SUPERVISION_REQUEST,
  GET_LATEST_SUPERVISION_SUCCESS,
} from "../constants/supervisionConstants";

export const addSupervision = (
  service,
  { date, plannedDate, supervisor, supervisee }
) => async (dispatch) => {
  try {
    dispatch({ type: ADD_SUPERVISION_REQUEST });
    const { data } = await axios.post(`${URL}/supervisions/${service}`, {
      plannedDate,
      date,
      supervisor,
      supervisee,
    });
    dispatch({ type: ADD_SUPERVISION_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/supervisions/${service}`);
    dispatch({ type: GET_SUPERVISIONS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: ADD_SUPERVISION_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSupervisions = (service) => async (dispatch) => {
  try {
    dispatch({ type: GET_SUPERVISIONS_REQUEST });
    const result = await axios.get(`${URL}/supervisions/${service}`);
    dispatch({ type: GET_SUPERVISIONS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_SUPERVISIONS_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSupervision = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SUPERVISION_REQUEST });
    const result = await axios.get(`${URL}/supervisions/${id}`);
    dispatch({ type: GET_SUPERVISION_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_SUPERVISION_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getLatestSupervision = (supervisee) => async (dispatch) => {
  try {
    dispatch({ type: GET_LATEST_SUPERVISION_REQUEST });
    const { data } = await axios.get(`${URL}/supervisions/${supervisee}`);
    dispatch({ type: GET_LATEST_SUPERVISION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LATEST_SUPERVISION_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSupervision = (
  service,
  id,
  { date, plannedDate, supervisor, supervisee }
) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SUPERVISION_REQUEST });
    const { data } = await axios.put(`${URL}/supervisions/${id}`, {
      plannedDate,
      date,
      supervisor,
      supervisee,
    });
    dispatch({ type: UPDATE_SUPERVISION_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/supervisions/${service}`);
    dispatch({ type: GET_SUPERVISIONS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: UPDATE_SUPERVISION_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSupervision = (service, id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SUPERVISION_REQUEST });
    const { data } = await axios.delete(`${URL}/supervisions/${id}`);
    dispatch({ type: DELETE_SUPERVISION_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/supervisions/${service}`);
    dispatch({ type: GET_SUPERVISIONS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: DELETE_SUPERVISION_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};
