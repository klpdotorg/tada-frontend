import React from 'react';
import PropTypes from 'prop-types';

const HeaderView = ({ path }) => {
  return (
    <div className="permission-header">
      <span className="header-text">You are at {path.join(' > ')}</span>
    </div>
  );
};

HeaderView.propTypes = {
  path: PropTypes.array,
};

export { HeaderView };
