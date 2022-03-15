import axios from 'axios';
import { URL } from '../constants/url';
import {
  ADD_DAILY_OBSERVATION_FAIL,
  ADD_DAILY_OBSERVATION_REQUEST,
  ADD_DAILY_OBSERVATION_SUCCESS,
  DELETE_DAILY_OBSERVATION_FAIL,
  DELETE_DAILY_OBSERVATION_REQUEST,
  DELETE_DAILY_OBSERVATION_SUCCESS,
  GET_DAILY_OBSERVATIONS_BY_DATE_FAIL,
  GET_DAILY_OBSERVATIONS_BY_DATE_REQUEST,
  GET_DAILY_OBSERVATIONS_BY_DATE_SUCCESS,
  GET_DAILY_OBSERVATIONS_BY_INTERVAL_FAIL,
  GET_DAILY_OBSERVATIONS_BY_INTERVAL_REQUEST,
  GET_DAILY_OBSERVATIONS_BY_INTERVAL_SUCCESS,
  GET_DAILY_OBSERVATION_FAIL,
  GET_DAILY_OBSERVATION_REQUEST,
  GET_DAILY_OBSERVATION_SUCCESS,
  UPDATE_DAILY_OBSERVATION_FAIL,
  UPDATE_DAILY_OBSERVATION_REQUEST,
  UPDATE_DAILY_OBSERVATION_SUCCESS,
  FIND_RECORD_REQUEST,
  FIND_RECORD_SUCCESS,
  FIND_RECORD_FAIL,
  CLEAR_EXISTING_RECORD,
  GET_RECORDS_BY_RESIDENT_FAIL,
  GET_RECORDS_BY_RESIDENT_REQUEST,
  GET_RECORDS_BY_RESIDENT_SUCCESS,
} from '../constants/dailyObservationConstants';

export const findRecord = (service, { date, shift, serviceUser }) => async (
  dispatch
) => {
  try {
    dispatch({ type: FIND_RECORD_REQUEST });
    const { data } = await axios(
      `${URL}/daily-observations/${service}/${date}/${shift}/${serviceUser}`
    );
    dispatch({ type: FIND_RECORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_RECORD_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearRecord = () => async (dispatch) => {
  dispatch({ type: CLEAR_EXISTING_RECORD, payload: {} });
};

export const addRecord = (
  service,
  { date, shift, serviceUser, records }
) => async (dispatch) => {
  try {
    dispatch({ type: ADD_DAILY_OBSERVATION_REQUEST });
    const { data } = await axios.post(`${URL}/daily-observations/${service}`, {
      date,
      shift,
      serviceUser,
      records,
    });
    dispatch({ type: ADD_DAILY_OBSERVATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_DAILY_OBSERVATION_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateRecord = (id, { date, shift, records }) => async (
  dispatch
) => {
  try {
    dispatch({ type: UPDATE_DAILY_OBSERVATION_REQUEST });
    const { data } = await axios.put(`${URL}/daily-observations/${id}`, {
      date,
      shift,
      records,
    });
    dispatch({ type: UPDATE_DAILY_OBSERVATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_DAILY_OBSERVATION_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteRecord = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DAILY_OBSERVATION_REQUEST });
    const { data } = await axios.delete(`${URL}/daily-observations/${id}`);
    dispatch({ type: DELETE_DAILY_OBSERVATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_DAILY_OBSERVATION_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRecord = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_DAILY_OBSERVATION_REQUEST });
    const { data } = await axios.get(`${URL}/daily-observations/${id}`);
    dispatch({ type: GET_DAILY_OBSERVATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_DAILY_OBSERVATION_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRecordsByDate = (service, date) => async (dispatch) => {
  try {
    dispatch({ type: GET_DAILY_OBSERVATIONS_BY_DATE_REQUEST });
    const { data } = await axios.get(
      `${URL}/daily-observations/${service}/${date}`
    );
    dispatch({ type: GET_DAILY_OBSERVATIONS_BY_DATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_DAILY_OBSERVATIONS_BY_DATE_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRecordsByInterval = (service, startDate, endDate) => async (
  dispatch
) => {
  try {
    dispatch({ type: GET_DAILY_OBSERVATIONS_BY_INTERVAL_REQUEST });
    const { data } = await axios.get(
      `${URL}/daily-observations/${service}/${startDate}/${endDate}`
    );
    dispatch({
      type: GET_DAILY_OBSERVATIONS_BY_INTERVAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DAILY_OBSERVATIONS_BY_INTERVAL_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRecordsByResident = (serviceUser) => async (dispatch) => {
  try {
    dispatch({ type: GET_RECORDS_BY_RESIDENT_REQUEST });
    const { data } = await axios.get(
      `${URL}/daily-observations/${serviceUser}`
    );
    dispatch({ type: GET_RECORDS_BY_RESIDENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_RECORDS_BY_RESIDENT_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};
