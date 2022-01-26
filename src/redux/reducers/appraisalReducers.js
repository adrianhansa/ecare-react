import {
  ADD_APPRAISAL_REQUEST,
  ADD_APPRAISAL_SUCCESS,
  ADD_APPRAISAL_FAIL,
  GET_APPRAISALS_FAIL,
  UPDATE_APPRAISAL_SUCCESS,
  UPDATE_APPRAISAL_FAIL,
  UPDATE_APPRAISAL_REQUEST,
  GET_APPRAISALS_REQUEST,
  GET_APPRAISALS_SUCCESS,
  GET_APPRAISAL_FAIL,
  GET_APPRAISAL_REQUEST,
  GET_APPRAISAL_SUCCESS,
  DELETE_APPRAISAL_SUCCESS,
  DELETE_APPRAISAL_FAIL,
  DELETE_APPRAISAL_REQUEST,
} from "../constants/appraisalConstants";

export const appraisalReducer = (state = { appraisal: {} }, action) => {
  switch (action.type) {
    case ADD_APPRAISAL_REQUEST:
      return { loading: true };
    case ADD_APPRAISAL_SUCCESS:
      return { loading: false, success: true, appraisal: action.payload };
    case ADD_APPRAISAL_FAIL:
      return { loading: false, success: false, error: action.payload };
    case UPDATE_APPRAISAL_REQUEST:
      return { loading: true };
    case UPDATE_APPRAISAL_SUCCESS:
      return { loading: false, success: true, appraisal: action.payload };
    case UPDATE_APPRAISAL_FAIL:
      return { loading: false, success: false, error: action.payload };
    case GET_APPRAISAL_REQUEST:
      return { loading: true };
    case GET_APPRAISAL_SUCCESS:
      return { loading: false, success: true, appraisal: action.payload };
    case GET_APPRAISAL_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DELETE_APPRAISAL_REQUEST:
      return { loading: true };
    case DELETE_APPRAISAL_SUCCESS:
      return { loading: false, success: true, appraisal: action.payload };
    case DELETE_APPRAISAL_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const appraisalsReducer = (state = { appraisals: [] }, action) => {
  switch (action.type) {
    case GET_APPRAISALS_REQUEST:
      return { loading: true };
    case GET_APPRAISALS_SUCCESS:
      return { loading: false, success: true, appraisals: action.payload };
    case GET_APPRAISALS_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
