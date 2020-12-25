import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    // Dispatch request action
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    // Send content type in the header
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Make login request and destructure the data
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    // Dispatch the success login action
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // Save user data to local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // Failed to login
    dispatch({
      type: USER_LOGIN_FAIL,
      // First check for the error message in the backend
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  // Remove user from localStorage
  localStorage.removeItem("userInfo");

  dispatch({
    type: USER_LOGOUT,
  });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    // Dispatch request action
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    // Send content type in the header
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Make register request and destructure the data
    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    // Dispatch the success register action
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    // Auto login after a successful registeration
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // Save user data to local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // Failed to login
    dispatch({
      type: USER_REGISTER_FAIL,
      // First check for the error message in the backend
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
