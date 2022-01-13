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

export const workingStatusReducer = (state = { status: {} }, action) => {
  switch (action.type) {
    case ADD_WORKING_STATUS_REQUEST:
      return { loading: true };
    case ADD_WORKING_STATUS_SUCCESS:
      return { loading: false, status: action.payload };
    case ADD_WORKING_STATUS_FAIL:
      return { loading: false, error: action.payload };
    case GET_WORKING_STATUS_REQUEST:
      return { loading: true };
    case GET_WORKING_STATUS_SUCCESS:
      return { loading: false, status: action.payload };
    case GET_WORKING_STATUS_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_WORKING_STATUS_REQUEST:
      return { loading: true };
    case UPDATE_WORKING_STATUS_SUCCESS:
      return { loading: false, status: action.payload };
    case UPDATE_WORKING_STATUS_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_WORKING_STATUS_REQUEST:
      return { loading: true };
    case DELETE_WORKING_STATUS_SUCCESS:
      return { loading: false, status: action.payload };
    case DELETE_WORKING_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const workingStatusesReducer = (state = { statuses: [] }, action) => {
  switch (action.type) {
    case GET_WORKING_STATUSES_REQUEST:
      return { loading: true };
    case GET_WORKING_STATUSES_SUCCESS:
      return { loading: false, statuses: action.payload };
    case GET_WORKING_STATUSES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
