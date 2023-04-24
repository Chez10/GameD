import { ADD_TO_CART, REMOVE_CART_ITEM } from "../constants/cartConstants";

export const cartReducers = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const product = action.payload;

      const isProductExist = state.cartItems.find(
        (i) => i.item === product.item
      );

      if (isProductExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.item === isProductExist.item ? product : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, product],
        };
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.item !== action.payload),
      };

    default:
      return state;
  }
};
