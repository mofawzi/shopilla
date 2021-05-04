import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} from "../constants/orderConstants";

// Action creator --> Create order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    // Dispatch request action
    dispatch({
      type: ORDER_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/orders`, order, config);

    // Dispatch the success update action
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      // First check for the error message in the backend
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action creator --> GET order details
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    // Dispatch request action
    dispatch({
      type: ORDER_DETAILS_REQUEST,
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

    const { data } = await axios.get(`/api/orders/${id}`, config);

    // Dispatch the success update action
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      // First check for the error message in the backend
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
