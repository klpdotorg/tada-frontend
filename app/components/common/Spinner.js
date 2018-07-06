import React from 'react';
import PropTypes from 'prop-types';

const SpinnerView = (props, style) => {
  if (!props.show) {
    return <div />;
  }

  return (
    <div className="loading-spinner">
      <div style={style}>
        <i className="fa fa-cog fa-spin fa-lg fa-fw" />
        <span className="text-muted">{props.loadingText || 'Loading...'}</span>
      </div>
    </div>
  );
};

SpinnerView.propTypes = {
  loadingText: PropTypes.string,
  show: PropTypes.bool,
};

export { SpinnerView };
