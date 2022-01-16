import {
  ADD_SHIFT_FAIL,
  ADD_SHIFT_REQUEST,
  ADD_SHIFT_SUCCESS,
  DELETE_SHIFT_FAIL,
  DELETE_SHIFT_REQUEST,
  DELETE_SHIFT_SUCCESS,
  GET_SHIFTS_FAIL,
  GET_SHIFTS_REQUEST,
  GET_SHIFTS_SUCCESS,
  GET_SHIFT_FAIL,
  GET_SHIFT_REQUEST,
  GET_SHIFT_SUCCESS,
  UPDATE_SHIFT_FAIL,
  UPDATE_SHIFT_REQUEST,
  UPDATE_SHIFT_SUCCESS,
} from "../constants/shiftConstants";

export const shiftReducer = (state = { shift: {} }, action) => {
  switch (action.type) {
    case ADD_SHIFT_REQUEST:
      return { loading: true };
    case ADD_SHIFT_SUCCESS:
      return { loading: false, success: true, shift: action.payload };
    case ADD_SHIFT_FAIL:
      return { loading: false, error: action.payload };
    case GET_SHIFT_REQUEST:
      return { loading: true };
    case GET_SHIFT_SUCCESS:
      return { loading: false, shift: action.payload };
    case GET_SHIFT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SHIFT_REQUEST:
      return { loading: true };
    case UPDATE_SHIFT_SUCCESS:
      return { loading: false, success: true, shift: action.payload };
    case UPDATE_SHIFT_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_SHIFT_REQUEST:
      return { loading: true };
    case DELETE_SHIFT_SUCCESS:
      return { loading: false, shift: action.payload };
    case DELETE_SHIFT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const shiftsReducer = (state = { shifts: [] }, action) => {
  switch (action.type) {
    case GET_SHIFTS_REQUEST:
      return { loading: true };
    case GET_SHIFTS_SUCCESS:
      return { loading: false, shifts: action.payload };
    case GET_SHIFTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
