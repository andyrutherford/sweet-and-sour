import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Sweet and Sour',
  description: 'Delicious treats from around the world',
};

export default Meta;
