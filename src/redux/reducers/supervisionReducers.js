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
} from "../constants/supervisionConstants";

export const supervisionReducer = (state = { supervision: {} }, action) => {
  switch (action.type) {
    case ADD_SUPERVISION_REQUEST:
      return { loading: true };
    case ADD_SUPERVISION_SUCCESS:
      return { loading: false, success: true, supervision: action.payload };
    case ADD_SUPERVISION_FAIL:
      return { loading: false, success: false, error: action.payload };
    case UPDATE_SUPERVISION_REQUEST:
      return { loading: true };
    case UPDATE_SUPERVISION_SUCCESS:
      return { loading: false, success: true, supervision: action.payload };
    case UPDATE_SUPERVISION_FAIL:
      return { loading: false, success: false, error: action.payload };
    case GET_SUPERVISION_REQUEST:
      return { loading: true };
    case GET_SUPERVISION_SUCCESS:
      return { loading: false, success: true, supervision: action.payload };
    case GET_SUPERVISION_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DELETE_SUPERVISION_REQUEST:
      return { loading: true };
    case DELETE_SUPERVISION_SUCCESS:
      return { loading: false, success: true, supervision: action.payload };
    case DELETE_SUPERVISION_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const supervisionsReducer = (state = { supervisions: [] }, action) => {
  switch (action.type) {
    case GET_SUPERVISIONS_REQUEST:
      return { loading: true };
    case GET_SUPERVISIONS_SUCCESS:
      return { loading: false, success: true, supervisions: action.payload };
    case GET_SUPERVISIONS_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
