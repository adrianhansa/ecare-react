import {
  ADD_COMMUNICATION_FAIL,
  ADD_COMMUNICATION_REQUEST,
  ADD_COMMUNICATION_SUCCESS,
  DELETE_COMMUNICATION_FAIL,
  DELETE_COMMUNICATION_REQUEST,
  DELETE_COMMUNICATION_SUCCESS,
  GET_COMMUNICATIONS_FAIL,
  GET_COMMUNICATIONS_REQUEST,
  GET_COMMUNICATIONS_SUCCESS,
  GET_COMMUNICATION_FAIL,
  GET_COMMUNICATION_REQUEST,
  GET_COMMUNICATION_SUCCESS,
  UPDATE_COMMUNICATION_FAIL,
  UPDATE_COMMUNICATION_REQUEST,
  UPDATE_COMMUNICATION_SUCCESS,
} from "../constants/communicationConstants";

export const communicationReducer = (state = { communication: {} }, action) => {
  switch (action.type) {
    case ADD_COMMUNICATION_REQUEST:
      return { loading: true };
    case ADD_COMMUNICATION_SUCCESS:
      return { loading: false, success: true, communication: action.payload };
    case ADD_COMMUNICATION_FAIL:
      return { loading: false, success: false, error: action.payload };
    case GET_COMMUNICATION_REQUEST:
      return { loading: true };
    case GET_COMMUNICATION_SUCCESS:
      return { loading: false, success: true, communication: action.payload };
    case GET_COMMUNICATION_FAIL:
      return { loading: false, success: false, error: action.payload };
    case UPDATE_COMMUNICATION_REQUEST:
      return { loading: true };
    case UPDATE_COMMUNICATION_SUCCESS:
      return { loading: false, success: true, communication: action.payload };
    case UPDATE_COMMUNICATION_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DELETE_COMMUNICATION_REQUEST:
      return { loading: true };
    case DELETE_COMMUNICATION_SUCCESS:
      return { loading: false, success: true, communication: action.payload };
    case DELETE_COMMUNICATION_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const communicationsReducer = (
  state = { communications: [] },
  action
) => {
  switch (action.type) {
    case GET_COMMUNICATIONS_REQUEST:
      return { loading: true };
    case GET_COMMUNICATIONS_SUCCESS:
      return { loading: false, success: true, communications: action.payload };
    case GET_COMMUNICATIONS_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
