import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "../constants/productConstants";

// Action creator --> get products list
export const listProducts =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      // Dispatch the request action for loading
      dispatch({ type: PRODUCT_LIST_REQUEST });

      // Fetch the data from backend
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      // Send data to the reducer through the payload
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        // First check for the error message in the backend
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Action creator --> get product details
export const listProductDetails = (id) => async (dispatch) => {
  try {
    // Dispatch the request action for loading
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    // Fetch the data from backend
    const { data } = await axios.get(`/api/products/${id}`);

    // Send data to the reducer through the payload
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      // First check for the error message in the backend
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action creator --> Delete Product
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    // Dispatch request action
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
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

    await axios.delete(`/api/products/${id}`, config);

    // Dispatch the success update action
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      // First check for the error message in the backend
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action creator --> Create Product
export const createProduct = () => async (dispatch, getState) => {
  try {
    // Dispatch request action
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/products`, {}, config);

    // Dispatch the success update action
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      // First check for the error message in the backend
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action creator --> Update Product
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    // Dispatch request action
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
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

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    // Dispatch the success update action
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      // First check for the error message in the backend
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action creator --> Create Product Review
export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      // Dispatch request action
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
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

      await axios.post(`/api/products/${productId}/reviews`, review, config);

      // Dispatch the success update action
      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        // First check for the error message in the backend
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Action creator --> Get top rated products
export const listTopProducts = () => async (dispatch) => {
  try {
    // Dispatch the request action for loading
    dispatch({ type: PRODUCT_TOP_REQUEST });

    // Fetch the data from backend
    const { data } = await axios.get(`/api/products/top`);

    // Send data to the reducer through the payload
    dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      // First check for the error message in the backend
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
