import {
  ADD_WORKING_SHIFT_FAIL,
  ADD_WORKING_SHIFT_REQUEST,
  ADD_WORKING_SHIFT_SUCCESS,
  DELETE_WORKING_SHIFT_FAIL,
  DELETE_WORKING_SHIFT_REQUEST,
  DELETE_WORKING_SHIFT_SUCCESS,
  GET_WORKING_SHIFTS_FAIL,
  GET_WORKING_SHIFTS_REQUEST,
  GET_WORKING_SHIFTS_SUCCESS,
  GET_WORKING_SHIFT_FAIL,
  GET_WORKING_SHIFT_REQUEST,
  GET_WORKING_SHIFT_SUCCESS,
  UPDATE_WORKING_SHIFT_FAIL,
  UPDATE_WORKING_SHIFT_REQUEST,
  UPDATE_WORKING_SHIFT_SUCCESS,
} from "../constants/workShiftConstants";

export const workShiftReducer = (state = { workShift: {} }, action) => {
  switch (action.type) {
    case ADD_WORKING_SHIFT_REQUEST:
      return { loading: true };
    case ADD_WORKING_SHIFT_SUCCESS:
      return { loading: false, service: action.payload };
    case ADD_WORKING_SHIFT_FAIL:
      return { loading: false, error: action.payload };
    case GET_WORKING_SHIFT_REQUEST:
      return { loading: true };
    case GET_WORKING_SHIFT_SUCCESS:
      return { loading: false, service: action.payload };
    case GET_WORKING_SHIFT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_WORKING_SHIFT_REQUEST:
      return { loading: true };
    case UPDATE_WORKING_SHIFT_SUCCESS:
      return { loading: false, service: action.payload };
    case UPDATE_WORKING_SHIFT_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_WORKING_SHIFT_REQUEST:
      return { loading: true };
    case DELETE_WORKING_SHIFT_SUCCESS:
      return { loading: false, service: action.payload };
    case DELETE_WORKING_SHIFT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const workShiftsReducer = (state = { workShifts: [] }, action) => {
  switch (action.type) {
    case GET_WORKING_SHIFTS_REQUEST:
      return { loading: true };
    case GET_WORKING_SHIFTS_SUCCESS:
      return { loading: false, services: action.payload };
    case GET_WORKING_SHIFTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
