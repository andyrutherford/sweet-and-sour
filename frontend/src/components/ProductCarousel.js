import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';

import { listTopRatedProducts } from '../actions/productActions';

const CarouselWrapper = styled.div`
  .carousel-item-next,
  .carousel-item-prev,
  .carousel-item.active {
    display: flex;
  }
  .carousel-caption {
    position: absolute;
    top: 0;
  }

  .carousel-caption h2 {
    color: #fff;
  }

  .carousel img {
    height: 300px;
    padding: 30px;
    margin: 40px;
    border-radius: 50%;
  }
  .carousel a {
    margin: 0 auto;
  }
`;

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopRatedProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <CarouselWrapper>
      <Carousel pause='hover' className='bg-dark'>
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />
              <Carousel.Caption className='carousel-caption'>
                <h2>{product.name}</h2> {product.price}
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>{' '}
    </CarouselWrapper>
  );
};

export default ProductCarousel;
