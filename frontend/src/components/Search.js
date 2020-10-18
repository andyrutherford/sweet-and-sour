import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const Search = () => {
  const history = useHistory();
  const [query, setQuery] = useState('');

  const submitHandler = (e) => {
    e.preventDefault(0);
    if (query.trim()) {
      history.push(`/search/${query}`);
    } else {
      history.push('/');
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit'>Search</Button>
    </Form>
  );
};

export default Search;
