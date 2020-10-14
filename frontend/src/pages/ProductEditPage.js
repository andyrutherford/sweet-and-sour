import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../actions/actionTypes';

const ProductEditPage = ({ match, history }) => {
  const productId = match.params.id;

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const {
    loading: detailsLoading,
    error: detailsError,
    product,
  } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { error: updateError, success: updateSuccess } = productUpdate;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (updateSuccess) {
      setTimeout(() => {
        history.push('/admin/products');
      }, 3000);
    }

    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product, productId, dispatch, updateSuccess, history]);

  // Cleanup
  useEffect(() => {
    return () => {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage('');
    if (
      name === '' ||
      price.length === 0 ||
      image === '' ||
      brand === '' ||
      category === '' ||
      description === '' ||
      countInStock.length === 0
    ) {
      setMessage('All form fields are required.');
    }
    dispatch(
      updateProduct(productId, {
        name,
        price: Number(price),
        image,
        brand,
        category,
        description,
        countInStock: Number(countInStock),
      })
    );
  };

  return (
    <>
      <Link to='/admin/products' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {updateError && <Message variant='danger'>{updateError}</Message>}
        {updateSuccess && (
          <Message variant='success'>Product saved successfully.</Message>
        )}
        {detailsLoading ? (
          <Loader />
        ) : detailsError ? (
          <Message variant='danger'>{detailsError}</Message>
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
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder=''
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder=''
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder=''
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder=''
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                type='number'
                placeholder=''
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
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

export default ProductEditPage;
