import React from 'react';

import styled, { css } from 'styled-components';

const Star = styled.i`
  margin: 1rem 0;
  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
`;

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating' color={color}>
      <span>
        <Star
          color={color}
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></Star>
      </span>
      <span>
        <Star
          color={color}
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></Star>
      </span>
      <span>
        <Star
          color={color}
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></Star>
      </span>
      <span>
        <Star
          color={color}
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></Star>
      </span>
      <span>
        <Star
          color={color}
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></Star>
      </span>
      <span> {text && ' ' + text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

export default Rating;
