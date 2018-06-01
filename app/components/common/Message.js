import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message, style }) => {
  return (
    <div className="text-center" style={style}>
      <span>{message}</span>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string,
  style: PropTypes.object,
};

export { Message };
