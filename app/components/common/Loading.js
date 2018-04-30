import React from 'react';
import PropTypes from 'prop-types';

const Loading = (props) => {
  return (
    <div>
      <i className="fa fa-cog fa-spin fa-lg fa-fw" />
      <span className="text-muted">{props.loadingText || 'Loading...'}</span>
    </div>
  );
};

Loading.propTypes = {
  loadingText: PropTypes.string,
};

export { Loading };
