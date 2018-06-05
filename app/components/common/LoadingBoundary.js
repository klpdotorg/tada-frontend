import React from 'react';
import PropTypes from 'prop-types';

const LoadingBoundaryView = ({ show }) => {
  if (!show) {
    return <div />;
  }

  return (
    <div className="loader-cont">
      <div className="loader" />
    </div>
  );
};

LoadingBoundaryView.propTypes = {
  show: PropTypes.bool,
};

export { LoadingBoundaryView };
