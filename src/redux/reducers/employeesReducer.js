import {
  ADD_EMPLOYEE_FAIL,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  GET_ALL_EMPLOYEES_FAIL,
  GET_ALL_EMPLOYEES_REQUEST,
  GET_ALL_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAIL,
  GET_EMPLOYEES_REQUEST,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEE_FAIL,
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
} from "../constants/employeeConstants";

export const employeesReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_REQUEST:
      return { loading: true };
    case GET_EMPLOYEES_SUCCESS:
      return { loading: false, employees: action.payload };
    case GET_EMPLOYEES_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_EMPLOYEES_REQUEST:
      return { loading: true };
    case GET_ALL_EMPLOYEES_SUCCESS:
      return { loading: false, employees: action.payload };
    case GET_ALL_EMPLOYEES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const employeeReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_REQUEST:
      return { loading: true };
    case GET_EMPLOYEE_SUCCESS:
      return { loading: false, employee: action.payload };
    case GET_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_EMPLOYEE_REQUEST:
      return { loading: true };
    case UPDATE_EMPLOYEE_SUCCESS:
      return { loading: false, employee: action.payload };
    case UPDATE_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_EMPLOYEE_REQUEST:
      return { loading: true };
    case DELETE_EMPLOYEE_SUCCESS:
      return { loading: false, employee: action.payload };
    case DELETE_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    case ADD_EMPLOYEE_REQUEST:
      return { loading: true };
    case ADD_EMPLOYEE_SUCCESS:
      return { loading: false, employee: action.payload };
    case ADD_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
