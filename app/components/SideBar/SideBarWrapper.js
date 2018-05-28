import React from 'react';
import PropTypes from 'prop-types';

const SideBarWrapper = ({ toggleTree, renderNavTree }) => {
  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-toggler">
        <a
          href="#menu-toggle"
          className="btn btn-primary btn-xs"
          id="menu-toggle"
          onClick={toggleTree}
        >
          <span id="toggler-icon" className="glyphicon glyphicon-resize-horizontal" />
        </a>
      </div>
      <div id="treeview_side" className="treeview">
        {renderNavTree()}
      </div>
    </div>
  );
};

SideBarWrapper.propTypes = {
  toggleTree: PropTypes.func,
  renderNavTree: PropTypes.func,
};

export { SideBarWrapper };
