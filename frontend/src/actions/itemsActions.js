import axios from "axios";
import {
  ALL_ITEMS_REQUEST,
  ALL_ITEMS_SUCCESS,
  ALL_ITEMS_FAIL,
  CLEAR_ERRORS,
  GAME_INFO_REQUEST,
  GAME_INFO_SUCCESS,
  GAME_INFO_FAIL,
} from "../constants/itemConstants";

export const getItems = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_ITEMS_REQUEST,
    });

    const { data } = await axios.get("/api/v1/games");

    dispatch({
      type: ALL_ITEMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ITEMS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getItemsInfo = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GAME_INFO_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/game/${id}`);

    dispatch({
      type: GAME_INFO_SUCCESS,
      payload: data.item,
    });
  } catch (error) {
    dispatch({
      type: GAME_INFO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
