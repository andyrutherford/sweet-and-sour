import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { login } from '../actions/userActions';

const LoginPage = ({ location, history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirect = location.search ? location.search.split('=')[1] : '/';
  // If user is logged in, redirect to hom
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const testUserHandler = () => {
    setEmail('cliff@gmail.com');
    setPassword('123456');

    setTimeout(() => {
      dispatch(login('cliff@gmail.com', '123456'));
    }, 1000);
  };

  const testAdminHandler = () => {
    setEmail('sherry@gmail.com');
    setPassword('123456');

    setTimeout(() => {
      dispatch(login('sherry@gmail.com', '123456'));
    }, 1000);
  };

  return (
    <FormContainer>
      <h1>
        Log in{' '}
        <Button variant='primary' onClick={testUserHandler}>
          Test user
        </Button>
        <Button variant='primary' className='ml-2' onClick={testAdminHandler}>
          Test admin
        </Button>
      </h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder=''
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder=''
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Log in
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New customer?{' '}
          <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>
            Sign up
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
