import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { getUserDetails, updateUser } from '../actions/userActions';

const UserEditPage = ({ match, history }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading: detailsLoading, error: detailsError, user } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: updateLoading, error: updateError, success } = userUpdate;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user, userId, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (name === '' || email === '') {
      return setMessage('The name and email cannot be blank.');
    } else {
      dispatch(updateUser(userId, { name, email, isAdmin }));
    }
  };

  return (
    <>
      <Link to='/admin/users' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit User </h1>
        {message && <Message variant='danger'>{message}</Message>}
        {success && (
          <Message variant='success'>User updated successfully.</Message>
        )}
        {updateLoading || detailsLoading ? (
          <Loader />
        ) : detailsError ? (
          <Message variant='danger'>{detailsError}</Message>
        ) : updateError ? (
          <Message variant='danger'>{updateError}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder=''
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder=''
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Is admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditPage;
