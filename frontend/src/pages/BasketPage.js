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

  const removeFromBasketHandler = (id) => {};

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Basket</h1>
        {basketItems.length === 0 ? (
          <Message>
            Your basket is empty. <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {basketItems.map((i) => (
              <ListGroup.Item key={i.product}>
                <Row>
                  <Col md={2}>
                    <Image src={i.image} alt={i.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${i.product}`}>{i.name}</Link>
                  </Col>
                  <Col md={2}>${i.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={i.quantity}
                      onChange={(e) =>
                        dispatch(addToBasket(i.product, Number(e.target.value)))
                      }
                    >
                      {[...Array(i.countInStock).keys()].map((x, idx) => (
                        <option key={idx} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromBasketHandler(i.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal (
                {basketItems.reduce((acc, item) => acc + item.quantity, 0)})
                items
              </h2>
              $
              {basketItems
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={basketItems.length === 0}
                onClick={checkoutHandler}
              >
                Continue to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default BasketPage;
