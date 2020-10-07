import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { addToBasket } from '../actions/basketActions';
import Message from '../components/Message';

const BasketPage = ({ match, location, history }) => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket);
  const { basketItems } = basket;

  const productId = match.params.id;
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToBasket(productId, quantity));
    }
  }, [productId, dispatch, quantity]);

  return <div>Basket</div>;
};

export default BasketPage;
