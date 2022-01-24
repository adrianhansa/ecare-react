import {
  ADD_DIARY_ENTRY_FAIL,
  ADD_DIARY_ENTRY_REQUEST,
  ADD_DIARY_ENTRY_SUCCESS,
  DELETE_DIARY_ENTRY_FAIL,
  DELETE_DIARY_ENTRY_REQUEST,
  DELETE_DIARY_ENTRY_SUCCESS,
  GET_DIARY_ENTRIES_FAIL,
  GET_DIARY_ENTRIES_REQUEST,
  GET_DIARY_ENTRIES_SUCCESS,
  GET_DIARY_ENTRY_FAIL,
  GET_DIARY_ENTRY_REQUEST,
  GET_DIARY_ENTRY_SUCCESS,
  UPDATE_DIARY_ENTRY_FAIL,
  UPDATE_DIARY_ENTRY_SUCCESS,
  UPDATE_DIARY_ENTRY_REQUEST,
} from "../constants/diaryEntryConstants";

export const diaryEntriesReducer = (state = { diaryEntries: [] }, action) => {
  switch (action.type) {
    case GET_DIARY_ENTRIES_REQUEST:
      return { loading: true };
    case GET_DIARY_ENTRIES_SUCCESS:
      return { loading: false, success: true, diaryEntries: action.payload };
    case GET_DIARY_ENTRIES_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const diaryEntryReducer = (state = { diaryEntry: {} }, action) => {
  switch (action.type) {
    case GET_DIARY_ENTRY_REQUEST:
      return { loading: true };
    case GET_DIARY_ENTRY_SUCCESS:
      return { loading: false, success: true, diaryEntry: action.payload };
    case GET_DIARY_ENTRY_FAIL:
      return { loading: false, success: false, error: action.payload };
    case ADD_DIARY_ENTRY_REQUEST:
      return { loading: true };
    case ADD_DIARY_ENTRY_SUCCESS:
      return { loading: false, success: true, diaryEntry: action.payload };
    case ADD_DIARY_ENTRY_FAIL:
      return { loading: false, success: false, error: action.payload };
    case UPDATE_DIARY_ENTRY_REQUEST:
      return { loading: true };
    case UPDATE_DIARY_ENTRY_SUCCESS:
      return { loading: false, success: true, diaryEntry: action.payload };
    case UPDATE_DIARY_ENTRY_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DELETE_DIARY_ENTRY_REQUEST:
      return { loading: true };
    case DELETE_DIARY_ENTRY_SUCCESS:
      return { loading: false, success: true, diaryEntry: action.payload };
    case DELETE_DIARY_ENTRY_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
