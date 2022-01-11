import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../constants/userConstants";
import { URL } from "../constants/url";

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post(`${URL}/login`, { email, password });
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    localStorage.setItem("auth", JSON.stringify({ user: data }));
    try {
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
