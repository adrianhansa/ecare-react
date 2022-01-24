import axios from "axios";
import { URL } from "../constants/url";
import {
  ADD_DIARY_ENTRY_FAIL,
  ADD_DIARY_ENTRY_REQUEST,
  ADD_DIARY_ENTRY_SUCCESS,
  DELETE_DIARY_ENTRY_FAIL,
  DELETE_DIARY_ENTRY_REQUEST,
  DELETE_DIARY_ENTRY_SUCCESS,
  GET_DIARY_ENTRIES_FAIL,
  GET_DIARY_ENTRIES_REQUEST,
  GET_DIARY_ENTRIES_SUCCESS,
  GET_DIARY_ENTRY_FAIL,
  GET_DIARY_ENTRY_REQUEST,
  GET_DIARY_ENTRY_SUCCESS,
  UPDATE_DIARY_ENTRY_FAIL,
  UPDATE_DIARY_ENTRY_REQUEST,
  UPDATE_DIARY_ENTRY_SUCCESS,
} from "../constants/diaryEntryConstants";

export const getDiaryEntries = (service) => async (dispatch) => {
  try {
    dispatch({ type: GET_DIARY_ENTRIES_REQUEST });
    const result = await axios.get(`${URL}/diary/${service}`);
    dispatch({ type: GET_DIARY_ENTRIES_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_DIARY_ENTRIES_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addDiaryEntry =
  (service, { date, time, content }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_DIARY_ENTRY_REQUEST });
      const { data } = await axios.post(`${URL}/diary/${service}`, {
        date,
        time,
        content,
      });
      dispatch({ type: ADD_DIARY_ENTRY_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/diary/${service}`);
      dispatch({ type: GET_DIARY_ENTRIES_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: ADD_DIARY_ENTRY_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateDiaryEntry =
  (service, id, { date, time, content }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_DIARY_ENTRY_REQUEST });
      const { data } = await axios.put(`${URL}/diary/${service}/${id}`, {
        date,
        time,
        content,
      });
      dispatch({ type: UPDATE_DIARY_ENTRY_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/diary/${service}`);
      dispatch({ type: GET_DIARY_ENTRIES_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: UPDATE_DIARY_ENTRY_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getDiaryEntry = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_DIARY_ENTRY_REQUEST });
    const { data } = await axios.get(`${URL}/diary/${id}`);
    dispatch({ type: GET_DIARY_ENTRY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_DIARY_ENTRY_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteDiaryEntry = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DIARY_ENTRY_REQUEST });
    const { data } = await axios.delete(`${URL}/diary/${id}`);
    dispatch({ type: DELETE_DIARY_ENTRY_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/diary/${service}`);
    dispatch({ type: GET_DIARY_ENTRIES_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: DELETE_DIARY_ENTRY_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
