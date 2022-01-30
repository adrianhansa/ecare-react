import axios from "axios";
import { URL } from "../constants/url";
import {
  ADD_ITEM_FAIL,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  DELETE_ITEM_FAIL,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  GET_ITEMS_FAIL,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEM_FAIL,
  GET_ITEM_REQUEST,
  GET_ITEM_SUCCESS,
  TOGGLE_ITEM_STATUS_FAIL,
  TOGGLE_ITEM_STATUS_REQUEST,
  TOGGLE_ITEM_STATUS_SUCCESS,
  UPDATE_ITEM_FAIL,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
} from "../constants/dailyObservationItemConstants";

export const addItem = (service, item) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ITEM_REQUEST });
    const { data } = await axios.post(
      `${URL}/daily-observation-items/${service}`,
      item
    );
    dispatch({ type: ADD_ITEM_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/daily-observation-items/${service}`);
    dispatch({ type: GET_ITEMS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateItem = (service, id, item) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ITEM_REQUEST });
    const { data } = await axios.put(
      `${URL}/daily-observation-items/${id}`,
      item
    );
    dispatch({ type: UPDATE_ITEM_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/daily-observation-items/${service}`);
    dispatch({ type: GET_ITEMS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: UPDATE_ITEM_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteItem = (service, id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ITEM_REQUEST });
    const { data } = await axios.delete(`${URL}/daily-observation-items/${id}`);
    dispatch({ type: DELETE_ITEM_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/daily-observation-items/${service}`);
    dispatch({ type: GET_ITEMS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: DELETE_ITEM_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const toggleStatus = (service, id) => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE_ITEM_STATUS_REQUEST });
    const { data } = await axios.get(
      `${URL}/daily-observation-items/toggle-status/${id}`
    );
    dispatch({ type: TOGGLE_ITEM_STATUS_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/daily-observation-items/${service}`);
    dispatch({ type: GET_ITEMS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: TOGGLE_ITEM_STATUS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ITEM_REQUEST });
    const result = await axios.get(`${URL}/daily-observation-items/${id}`);
    dispatch({ type: GET_ITEM_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_ITEM_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getItems = (service) => async (dispatch) => {
  try {
    dispatch({ type: GET_ITEMS_REQUEST });
    const result = await axios.get(`${URL}/daily-observation-items/${service}`);
    dispatch({ type: GET_ITEMS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_ITEMS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
