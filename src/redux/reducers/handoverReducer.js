import {
  ADD_HANDOVER_FAIL,
  ADD_HANDOVER_REQUEST,
  ADD_HANDOVER_SUCCESS,
  DELETE_HANDOVER_FAIL,
  DELETE_HANDOVER_REQUEST,
  DELETE_HANDOVER_SUCCESS,
  GET_HANDOVERS_FAIL,
  GET_HANDOVERS_REQUEST,
  GET_HANDOVERS_SUCCESS,
  GET_HANDOVER_FAIL,
  GET_HANDOVER_REQUEST,
  GET_HANDOVER_SUCCESS,
  UPDATE_HANDOVER_FAIL,
  UPDATE_HANDOVER_REQUEST,
  UPDATE_HANDOVER_SUCCESS,
} from "../constants/handoverConstants";

export const handoverReducer = (state = { handover: {} }, action) => {
  switch (action.type) {
    case ADD_HANDOVER_REQUEST:
      return { loading: true };
    case ADD_HANDOVER_SUCCESS:
      return { loading: false, success: true, handover: action.payload };
    case ADD_HANDOVER_FAIL:
      return { loading: false, success: false, error: action.payload };
    case GET_HANDOVER_REQUEST:
      return { loading: true };
    case GET_HANDOVER_SUCCESS:
      return { loading: false, success: true, handover: action.payload };
    case GET_HANDOVER_FAIL:
      return { loading: false, success: false, error: action.payload };
    case UPDATE_HANDOVER_REQUEST:
      return { loading: true };
    case UPDATE_HANDOVER_SUCCESS:
      return { loading: false, success: true, handover: action.payload };
    case UPDATE_HANDOVER_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DELETE_HANDOVER_REQUEST:
      return { loading: true };
    case DELETE_HANDOVER_SUCCESS:
      return { loading: false, success: true, handover: action.payload };
    case DELETE_HANDOVER_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const handoversReducer = (state = { handovers: [] }, action) => {
  switch (action.type) {
    case GET_HANDOVERS_REQUEST:
      return { loading: true };
    case GET_HANDOVERS_SUCCESS:
      return { loading: false, success: true, handovers: action.payload };
    case GET_HANDOVERS_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
