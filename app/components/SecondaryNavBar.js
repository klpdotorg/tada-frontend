/*
* Secondary navigation bar for filtering/search etc..
*/
import React, { Component } from 'react';
import CreateDistrict from './Modals/CreateBoundary'

export default class SecondaryNavBar extends React.Component {

  constructor(props)
  {
    super(props);
    this.handleProgramClick = this.handleProgramClick.bind(this);
    this.handleHomeButtonClick = this.handleHomeButtonClick.bind(this);
    this.handleManageUsersBtnClick = this.handleManageUsersBtnClick.bind(this);
  }

  handleProgramClick()
  {
    this.props.redirectTo('/programs');
  }

  handleHomeButtonClick()
  {
    this.props.redirectTo('/dashboard');
  }

  handleManageUsersBtnClick()
  {
    this.props.redirectTo('/users');
  }

  render() {  
    return (
      <div className="container-fluid">
        <button type="button" className="btn btn-primary navbar-btn all-padded-btn pull-left" onClick={this.handleHomeButtonClick}><span className="glyphicon glyphicon-home"></span></button>
        <form className="navbar-form navbar-left" role="search">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Enter KLP ID" />
          </div>
          <button type="submit" className="btn btn-default padded-btn">Search</button>
        </form>
        <p className="pull-right">
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip" onClick={this.handleProgramClick}><span className="fa fa-pencil-square-o"></span> Manage Programs</button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" onClick={ this.props.toggleDistrictModal } data-toggle="tooltip" data-placement="bottom" title="Create District"><span className="fa fa-globe"></span></button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip" data-placement="bottom" title="Manage Permissions"><span className="fa fa-key"></span></button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip" data-placement="bottom" title="Manage Users" onClick={this.handleManageUsersBtnClick}><span className="fa fa-users"></span></button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip" data-placement="bottom" title="Map Assessments"><span className="fa fa-database"></span></button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip" data-placement="bottom" title="View DEO Report"><span className="fa fa-bar-chart"></span></button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip" data-placement="bottom" title="Revert Entity State"><span className="fa fa-undo"></span></button>
          <button type="button" className="btn btn-primary navbar-btn all-padded-btn"><span className="glyphicon glyphicon-filter"></span> Filter by Programs</button>
        </p>

        <CreateDistrict placeHolder='District Name' title='Create New District' isOpen={ this.props.districtModalIsOpen } onCloseModal={ this.props.toggleDistrictModal } closeModal={ this.props.toggleDistrictModal } save={ this.props.saveNewDistrict } />
      </div>
      );
  }
}
