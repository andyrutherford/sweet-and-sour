import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import bg from '../assets/img/landing.jpg';

const LandingPageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${bg});
  background-size: cover;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 0 clamp(5%, 5vw, 10%);
  padding-top: 30vh;

  h1 {
    font-size: clamp(3em, 5vw, 5.5em);
    color: #fff;
  }

  h3 {
    color: #fff;
    font-size: clamp(1em, 2vw, 2em);
    margin: 0 10vw;
  }
`;

const LandingPage = () => {
  return (
    <LandingPageWrapper>
      <h1 className='mb-4'>Sweet and Sour</h1>
      <h3>
        Discover desserts, cakes, and sweets from around the world, one bite at
        a time.
      </h3>
      <div className='my-3'>
        <Link className='btn btn-primary my-3' to='/'>
          Browse <i className='fas fa-angle-right'></i>
        </Link>{' '}
        <Link className='btn btn-outline-secondary my-3' to='/log-in'>
          Log in <i className='fas fa-sign-in-alt'></i>
        </Link>
      </div>
    </LandingPageWrapper>
  );
};

export default LandingPage;
