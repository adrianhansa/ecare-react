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
} from "../constants/dailyObservationConstants";

export const dailyObservationReducer = (
  state = { dailyObservation: {} },
  action
) => {
  switch (action.type) {
    case ADD_DAILY_OBSERVATION_REQUEST:
      return { loading: true };
    case ADD_DAILY_OBSERVATION_SUCCESS:
      return {
        loading: false,
        success: true,
        dailyObservation: action.payload,
      };
    case ADD_DAILY_OBSERVATION_FAIL:
      return { loading: false, success: false, error: action.payload };
    case UPDATE_DAILY_OBSERVATION_REQUEST:
      return { loading: true };
    case UPDATE_DAILY_OBSERVATION_SUCCESS:
      return {
        loading: false,
        success: true,
        dailyObservation: action.payload,
      };
    case UPDATE_DAILY_OBSERVATION_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DELETE_DAILY_OBSERVATION_REQUEST:
      return { loading: true };
    case DELETE_DAILY_OBSERVATION_SUCCESS:
      return {
        loading: false,
        success: true,
        dailyObservation: action.payload,
      };
    case DELETE_DAILY_OBSERVATION_FAIL:
      return { loading: false, success: false, error: action.payload };
    case GET_DAILY_OBSERVATION_REQUEST:
      return { loading: true };
    case GET_DAILY_OBSERVATION_SUCCESS:
      return {
        loading: false,
        success: true,
        dailyObservation: action.payload,
      };
    case GET_DAILY_OBSERVATION_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const dailyObservationsReducer = (
  state = { dailyObservations: [] },
  action
) => {
  switch (action.type) {
    case GET_DAILY_OBSERVATIONS_BY_DATE_REQUEST:
      return { loading: true };
    case GET_DAILY_OBSERVATIONS_BY_DATE_SUCCESS:
      return {
        loading: false,
        success: true,
        dailyObservations: action.payload,
      };
    case GET_DAILY_OBSERVATIONS_BY_DATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case GET_DAILY_OBSERVATIONS_BY_INTERVAL_REQUEST:
      return { loading: true };
    case GET_DAILY_OBSERVATIONS_BY_INTERVAL_SUCCESS:
      return {
        loading: false,
        success: true,
        dailyObservations: action.payload,
      };
    case GET_DAILY_OBSERVATIONS_BY_INTERVAL_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
