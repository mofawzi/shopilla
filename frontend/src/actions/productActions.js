import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../constants/productConstants";

// Action creator --> get products list
export const listProducts = () => async (dispatch) => {
  try {
    // Dispatch the request action
    dispatch({ type: PRODUCT_LIST_REQUEST });

    // Fetch the data from backend
    const { data } = await axios.get("/api/products");

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
