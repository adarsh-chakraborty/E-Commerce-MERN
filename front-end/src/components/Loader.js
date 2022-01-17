import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ small, grow }) => {
  const style = small
    ? {
        margin: '50px',
        width: '50px',
        height: '50px',
        display: 'block'
      }
    : {
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block'
      };

  return (
    <Spinner animation={grow ? 'grow' : 'border'} role="status" style={style}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loader;
