import axios from "axios";
import { ADD_TO_CART, REMOVE_CART_ITEM } from "../constants/cartConstants";

export const putItemInCart = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/game/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      item: data.item._id,
      name: data.item.name,
      price: data.item.price,
      image: data.item.images[0].url,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemInCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
