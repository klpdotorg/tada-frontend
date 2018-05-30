/*
* Main navigation bar - PrimarySchool/PreSchool selector
*/

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const NavBar = ({ primarySelected, onPrimaryClick, onPreSchoolClick }) => {
  let primarySchool = classNames({
    'primary-school-tab grey-mist-bg': !primarySelected,
    'primary-school-tab-active': primarySelected,
  });

  let preSchool = classNames({
    'preschool-tab grey-mist-bg': primarySelected,
    'preschool-tab-active brand-green-bg': !primarySelected,
  });

  return (
    <div id="navbar" className="main__navbar">
      <div className="nav nav-pills">
        <div className="col-lg-12 inst-tabs">
          <ul className="nav nav-tabs" id="myTab" style={{ marginBottom: 0 }}>
            <li>
              <a href="#" data-toggle="tab" className={primarySchool} onClick={onPrimaryClick}>
                Primary School
              </a>
            </li>
            <li>
              <a href="#" data-toggle="tab" className={preSchool} onClick={onPreSchoolClick}>
                Preschool
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  primarySelected: PropTypes.bool,
  onPrimaryClick: PropTypes.func,
  onPreSchoolClick: PropTypes.func,
};

export { NavBar };
