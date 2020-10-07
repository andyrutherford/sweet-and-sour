import { BASKET_ADD_ITEM, BASKET_REMOVE_ITEM } from '../actions/actionTypes';

export const basketReducer = (state = { basketItems: [] }, action) => {
  switch (action.type) {
    case BASKET_ADD_ITEM:
      const item = action.payload;
      const itemExists = state.basketItems.find(
        (x) => x.product === item.product
      );
      if (itemExists) {
        return {
          ...state,
          basketItems: state.basketItems.map((i) =>
            i.product === itemExists.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          basketItems: [...state.basketItems, item],
        };
      }
    case BASKET_REMOVE_ITEM:
      const id = action.payload;
      return {
        ...state,
        basketItems: state.basketItems.filter((i) => i.product !== id),
      };
    default:
      return state;
  }
};
