import axios from 'axios';
import {
  BASKET_ADD_ITEM,
  BASKET_REMOVE_ITEM,
  BASKET_SAVE_SHIPPING_ADDRESS,
  BASKET_SAVE_PAYMENT_METHOD,
  BASKET_REMOVE_ALL_ITEMS,
} from './actionTypes';

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

export const removeFromBasket = (id) => async (dispatch, getState) => {
  dispatch({ type: BASKET_REMOVE_ITEM, payload: id });

  localStorage.setItem(
    'basketItems',
    JSON.stringify(getState().basket.basketItems)
  );
};

export const resetBasket = () => (dispatch) => {
  dispatch({ type: BASKET_REMOVE_ALL_ITEMS });

  //   Remove all basket items from local storage
  localStorage.removeItem('basketItems');
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({ type: BASKET_SAVE_SHIPPING_ADDRESS, payload: data });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({ type: BASKET_SAVE_PAYMENT_METHOD, payload: data });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
