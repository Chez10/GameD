import {
  ALL_ITEMS_REQUEST,
  ALL_ITEMS_SUCCESS,
  ALL_ITEMS_FAIL,
  CLEAR_ERRORS,
  GAME_INFO_REQUEST,
  GAME_INFO_SUCCESS,
  GAME_INFO_FAIL,
} from "../constants/itemConstants";

export const itemsReducers = (state = { items: [] }, action) => {
  switch (action.type) {
    case ALL_ITEMS_REQUEST:
      return {
        loading: true,
        items: [],
      };
    case ALL_ITEMS_SUCCESS:
      return {
        loading: false,
        items: action.payload.items,
        gameCount: action.payload.gameCount,
      };
    case ALL_ITEMS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const gameInfoReducers = (state = { item: {} }, action) => {
  switch (action.type) {
    case GAME_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GAME_INFO_SUCCESS:
      return {
        loading: false,
        item: action.payload,
      };
    case GAME_INFO_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
