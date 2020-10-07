import { BASKET_ADD_ITEM, BASKET_REMOVE_ITEM } from '../actions/actionTypes';

export const basketReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case BASKET_ADD_ITEM:
      const item = action.payload;
      const itemExists = state.cartItems.find(
        (x) => x.produdct === item.product
      );
      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === itemExists.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;
  }
};
