import {
  ADD_ITEM_FAIL,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  DELETE_ITEM_FAIL,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  GET_ITEMS_FAIL,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEM_FAIL,
  GET_ITEM_REQUEST,
  GET_ITEM_SUCCESS,
  TOGGLE_ITEM_STATUS_FAIL,
  TOGGLE_ITEM_STATUS_REQUEST,
  TOGGLE_ITEM_STATUS_SUCCESS,
  UPDATE_ITEM_FAIL,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
} from "../constants/dailyObservationItemConstants";

export const dailyObservationItemReducer = (
  state = { dailyObservationItem: {} },
  action
) => {
  switch (action.type) {
    case ADD_ITEM_REQUEST:
      return { loading: true };
    case ADD_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
        dailyObservationItem: action.payload,
      };
    case ADD_ITEM_FAIL:
      return { loading: false, success: false, error: action.payload };
    case GET_ITEM_REQUEST:
      return { loading: true };
    case GET_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
        dailyObservationItem: action.payload,
      };
    case GET_ITEM_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DELETE_ITEM_REQUEST:
      return { loading: true };
    case DELETE_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
        dailyObservationItem: action.payload,
      };
    case DELETE_ITEM_FAIL:
      return { loading: false, success: false, error: action.payload };
    case UPDATE_ITEM_REQUEST:
      return { loading: true };
    case UPDATE_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
        dailyObservationItem: action.payload,
      };
    case UPDATE_ITEM_FAIL:
      return { loading: false, success: false, error: action.payload };
    case TOGGLE_ITEM_STATUS_REQUEST:
      return { loading: true };
    case TOGGLE_ITEM_STATUS_SUCCESS:
      return {
        loading: false,
        success: true,
        dailyObservationItem: action.payload,
      };
    case TOGGLE_ITEM_STATUS_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const dailyObservationItemsReducer = (
  state = { dailyObservationItems: [] },
  action
) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST:
      return { loading: true };
    case GET_ITEMS_SUCCESS:
      return {
        loading: false,
        success: true,
        dailyObservationItems: action.payload,
      };
    case GET_ITEMS_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
