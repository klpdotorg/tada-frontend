import React from 'react';
import PropTypes from 'prop-types';

const MainContentArea = ({ children }) => {
  return (
    <div id="main-content-wrapper" className="main__content">
      <div className="container-fluid">{React.cloneElement(children)}</div>
    </div>
  );
};

MainContentArea.propTypes = {
  children: PropTypes.element,
};

export { MainContentArea };
