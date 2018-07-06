import React from 'react';
import PropTypes from 'prop-types';

const LoadingBoundaryView = ({ show, style }) => {
  if (!show) {
    return <div />;
  }

  return (
    <div className="loader-cont" style={style}>
      <div className="loader" />
    </div>
  );
};

LoadingBoundaryView.propTypes = {
  show: PropTypes.bool,
  style: PropTypes.any,
};

export { LoadingBoundaryView };
