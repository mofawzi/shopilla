import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from "../constants/userConstants";
import { ORDER_MY_LIST_RESET } from "../constants/orderConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    // Dispatch request action
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

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
  dispatch({
    type: USER_DETAILS_RESET,
  });
  dispatch({
    type: ORDER_MY_LIST_RESET,
  });
  dispatch({
    type: USER_LIST_RESET,
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

// Get user Profile
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    // Dispatch request action
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    // Get user token from state (from logged in user object)
    const {
      userLogin: { userInfo },
    } = getState();

    // Send content type and the  token in the headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make get profile request and destructure the data
    const { data } = await axios.get(`/api/users/${id}`, config);

    // Dispatch the success details action
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      // First check for the error message in the backend
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update user Profile
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    // Dispatch request action
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    // Get user info from state (logged in user object)
    const {
      userLogin: { userInfo },
    } = getState();

    // Send content type and the  token in the headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make put request and destructure the data after updating
    const { data } = await axios.put(`/api/users/profile`, user, config);

    // Dispatch the success update action
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      // First check for the error message in the backend
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get Users List
export const listUsers = () => async (dispatch, getState) => {
  try {
    // Dispatch request action
    dispatch({
      type: USER_LIST_REQUEST,
    });

    // Get user info from state (logged in user object)
    const {
      userLogin: { userInfo },
    } = getState();

    // Send content type and the  token in the headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users`, config);

    // Dispatch the success update action
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      // First check for the error message in the backend
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete user
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    // Dispatch request action
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    // Get user info from state (logged in user object)
    const {
      userLogin: { userInfo },
    } = getState();

    // Send content type and the  token in the headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/users/${id}`, config);

    // Dispatch the success update action
    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      // First check for the error message in the backend
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
