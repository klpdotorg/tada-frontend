/*
* Main navigation bar - PrimarySchool/PreSchool selector
*/

import React, { Component } from 'react';
import classNames from 'classnames'
import TadaActionCreators from '../actions/';

var bottomMargin = {
  marginBottom: '0px'
}

//Main Navbar with the PrimarySchool/PreSchool navigation tabs
export default class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let primarySchool = classNames({
      'grey-mist-bg': !this.props.primarySelected,
      'brand-green-bg': this.props.primarySelected
    })

    let preSchool = classNames({
      'grey-mist-bg': this.props.primarySelected,
      'brand-green-bg': !this.props.primarySelected
    })

    return (
      <div id="navbar" className="main__navbar">
        <div className="nav nav-pills">
          <div className="col-lg-12 inst-tabs">
            <ul className="nav nav-tabs" id="myTab" style={ bottomMargin }>
              <li><a href='#' data-toggle="tab" className={ primarySchool } onClick={ this.props.onPrimaryClick }>Primary School</a></li>
              <li><a href='#' data-toggle="tab" className={ preSchool } onClick={ this.props.onPreSchoolClick }> Preschool</a></li>
            </ul>
          </div>
        </div>
      </div>
      );
  }
}

