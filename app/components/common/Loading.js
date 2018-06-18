import React from 'react';
import PropTypes from 'prop-types';

const Loading = (props, style) => {
  return (
    <div style={style}>
      <i className="fa fa-cog fa-spin fa-lg fa-fw" />
      <span className="text-muted">{props.loadingText || 'Loading...'}</span>
    </div>
  );
};

Loading.propTypes = {
  loadingText: PropTypes.string,
};

export { Loading };
