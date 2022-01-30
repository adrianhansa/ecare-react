import {
  DELETE_ABSENCE_FAIL,
  ADD_ABSENCE_FAIL,
  ADD_ABSENCE_REQUEST,
  ADD_ABSENCE_SUCCESS,
  DELETE_ABSENCE_REQUEST,
  DELETE_ABSENCE_SUCCESS,
  GET_ABSENCES_BY_DATES_REQUEST,
  GET_ABSENCES_BY_DATES_SUCCESS,
  GET_ABSENCES_BY_DATES_FAIL,
  GET_ABSENCES_BY_EMPLOYEE_FAIL,
  GET_ABSENCES_BY_EMPLOYEE_REQUEST,
  GET_ABSENCES_BY_EMPLOYEE_SUCCESS,
  GET_ABSENCE_FAIL,
  GET_ABSENCE_REQUEST,
  GET_ABSENCE_SUCCESS,
  UPDATE_ABSENCE_REQUEST,
  UPDATE_ABSENCE_SUCCESS,
  UPDATE_ABSENCE_FAIL,
} from "../constants/absenceContants";

export const absenceReducer = (state = { absence: {} }, action) => {
  switch (action.type) {
    case ADD_ABSENCE_REQUEST:
      return { loading: true };
    case ADD_ABSENCE_SUCCESS:
      return { loading: false, success: true, absence: action.payload };
    case ADD_ABSENCE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case GET_ABSENCE_REQUEST:
      return { loading: true };
    case GET_ABSENCE_SUCCESS:
      return { loading: false, success: true, absence: action.payload };
    case GET_ABSENCE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DELETE_ABSENCE_REQUEST:
      return { loading: true };
    case DELETE_ABSENCE_SUCCESS:
      return { loading: false, success: true, absence: action.payload };
    case DELETE_ABSENCE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case UPDATE_ABSENCE_REQUEST:
      return { loading: true };
    case UPDATE_ABSENCE_SUCCESS:
      return { loading: false, success: true, absence: action.payload };
    case UPDATE_ABSENCE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const absencesReducer = (state = { absences: [] }, action) => {
  switch (action.type) {
    case GET_ABSENCES_BY_DATES_REQUEST:
      return { loading: true };
    case GET_ABSENCES_BY_DATES_SUCCESS:
      return { loading: false, success: true, absence: action.payload };
    case GET_ABSENCES_BY_DATES_FAIL:
      return { loading: false, success: false, error: action.payload };
    case GET_ABSENCES_BY_EMPLOYEE_REQUEST:
      return { loading: true };
    case GET_ABSENCES_BY_EMPLOYEE_SUCCESS:
      return { loading: false, success: true, absence: action.payload };
    case GET_ABSENCES_BY_EMPLOYEE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
