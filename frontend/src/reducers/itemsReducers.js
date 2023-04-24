import {
  ALL_ITEMS_REQUEST,
  ALL_ITEMS_SUCCESS,
  ALL_ITEMS_FAIL,
  CLEAR_ERRORS,
  GAME_INFO_REQUEST,
  GAME_INFO_SUCCESS,
  GAME_INFO_FAIL,
  REVIEW_FAIL,
  REVIEW_REQUEST,
  REVIEW_RESET,
  REVIEW_SUCCESS
} from "../constants/itemConstants";

export const itemsReducers = (state = { items: [] }, action) => {
  switch (action.type) {
    case ALL_ITEMS_REQUEST:
      return {
        loading: true,
        items: []
      };
    case ALL_ITEMS_SUCCESS:
      return {
        loading: false,
        items: action.payload.items,
        gameCount: action.payload.gameCount,
        gamesPerPage: action.payload.gamesPerPage,
        filteredGamesCount: action.payload.filteredGamesCount
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

export const newReviewReducers = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case REVIEW_RESET:
      return{
        ...state,
        success:false
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
