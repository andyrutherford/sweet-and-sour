import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutProcess from '../components/CheckoutProcess';
import formatPrice from '../utils/formatPrice';
import { createOrder } from '../actions/orderActions';

const PlaceOrderPage = ({ history }) => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket);

  basket.itemsPrice = formatPrice(
    basket.basketItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
  );

  basket.shippingPrice =
    basket.itemsPrice > 20 ? formatPrice(4.5) : formatPrice(3.0);

  basket.taxPrice = formatPrice(basket.itemsPrice * 0.075);

  basket.totalPrice =
    Number(basket.itemsPrice) +
    Number(basket.shippingPrice) +
    Number(basket.taxPrice);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    console.log(order);
    // console.log(order._id);
  }, [order]);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    //eslint-disable-next-line
  }, [success, history]);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: basket.basketItems,
        shippingAddress: basket.shippingAddress,
        paymentMethod: basket.paymentMethod,
        itemsPrice: basket.itemsPrice,
        shippingPrice: basket.shippingPrice,
        taxPrice: basket.taxPrice,
        totalPrice: basket.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutProcess s1 s2 s3 s4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {basket.shippingAddress.address}, {basket.shippingAddress.city}
                {basket.shippingAddress.postCode},{' '}
                {basket.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Method: </strong>
                {basket.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Items</h2>
              {basket.basketItems.length === 0 ? (
                <Message>Your basket is empty.</Message>
              ) : (
                <ListGroup variant='flush'>
                  {basket.basketItems.map((item, idx) => (
                    <ListGroup.Item key={idx}>
                      <Row className='align-items-center'>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} × ${item.price} = $
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${basket.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${basket.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${basket.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${basket.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={basket.basketItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
