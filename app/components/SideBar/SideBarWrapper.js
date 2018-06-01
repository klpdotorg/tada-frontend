import React from 'react';
import PropTypes from 'prop-types';

const SideBarWrapper = ({ showSideBar, renderNavTree }) => {
  return (
    <div className="sidebar-wrapper" style={{ display: showSideBar ? 'block' : 'none' }}>
      <div id="treeview_side" className="treeview">
        {renderNavTree()}
      </div>
    </div>
  );
};

SideBarWrapper.propTypes = {
  showSideBar: PropTypes.bool,
  renderNavTree: PropTypes.func,
};

export { SideBarWrapper };
