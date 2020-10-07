import axios from 'axios';
import { BASKET_ADD_ITEM, BASKET_REMOVE_ITEM } from './actionTypes';

export const addToBasket = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: BASKET_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity,
    },
  });

  //   Save basket items in local storage
  localStorage.setItem(
    'basketItems',
    JSON.stringify(getState().basket.basketItems)
  );
};
