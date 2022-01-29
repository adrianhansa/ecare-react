import {
  ADD_SERVICE_USER_FAIL,
  ADD_SERVICE_USER_REQUEST,
  ADD_SERVICE_USER_SUCCESS,
  DELETE_SERVICE_USER_FAIL,
  DELETE_SERVICE_USER_REQUEST,
  DELETE_SERVICE_USER_SUCCESS,
  GET_SERVICE_USERS_FAIL,
  GET_SERVICE_USERS_REQUEST,
  GET_SERVICE_USERS_SUCCESS,
  GET_SERVICE_USER_FAIL,
  GET_SERVICE_USER_REQUEST,
  GET_SERVICE_USER_SUCCESS,
  UPDATE_SERVICE_USER_FAIL,
  UPDATE_SERVICE_USER_REQUEST,
  UPDATE_SERVICE_USER_SUCCESS,
} from "../constants/serviceUserConstants";

export const serviceUserReducer = (state = { serviceUser: {} }, action) => {
  switch (action.type) {
    case GET_SERVICE_USER_REQUEST:
      return { loading: true };
    case GET_SERVICE_USER_SUCCESS:
      return { loading: false, sucess: true, serviceUser: action.payload };
    case GET_SERVICE_USER_FAIL:
      return { loading: false, success: false, error: action.payload };
    case ADD_SERVICE_USER_REQUEST:
      return { loading: true };
    case ADD_SERVICE_USER_SUCCESS:
      return { loading: false, success: true, serviceUser: action.payload };
    case ADD_SERVICE_USER_FAIL:
      return { loading: false, success: false, error: action.payload };
    case UPDATE_SERVICE_USER_REQUEST:
      return { loading: true };
    case UPDATE_SERVICE_USER_SUCCESS:
      return { loading: false, success: true, serviceUser: action.payload };
    case UPDATE_SERVICE_USER_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DELETE_SERVICE_USER_REQUEST:
      return { loading: true };
    case DELETE_SERVICE_USER_SUCCESS:
      return { loading: false, success: true, serviceUser: action.payload };
    case DELETE_SERVICE_USER_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const serviceUsersReducer = (state = { serviceUsers: [] }, action) => {
  switch (action.type) {
    case GET_SERVICE_USERS_REQUEST:
      return { loading: true };
    case GET_SERVICE_USERS_SUCCESS:
      return { loading: false, sucess: true, serviceUsers: action.payload };
    case GET_SERVICE_USERS_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
