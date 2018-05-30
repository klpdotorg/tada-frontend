import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message }) => {
  return (
    <div className="text-center">
      <span>{message}</span>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string,
};

export { Message };
