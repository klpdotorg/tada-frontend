/*
* Secondary navigation bar for filtering/search etc..
*/
import React, { Component } from 'react';
import CreateDistrict from './Modals/CreateBoundary';

export default class SecondaryNavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  managePrograms() {
    this.props.redirectTo('/programs');
  }

  manageProgramFilter = () => {
    this.props.redirectTo('/filterprograms');
  };

  goHome() {
    this.props.redirectTo('/dashboard');
  }

  manageUsers() {
    this.props.redirectTo('/users');
  }

  managePermissions() {
    this.props.redirectTo('/permissions');
  }

  mapAssessments() {
    this.props.redirectTo('/mapassessments');
  }

  render() {
    var Displayelement;
    if (sessionStorage.getItem('isAdmin')) {
      Displayelement = props => {
        return (
          <div className="pull-right">
            <button
              type="button"
              className="btn btn-info navbar-btn all-padded-btn"
              data-toggle="tooltip"
              onClick={this.managePrograms.bind(this)}
            >
              <span className="fa fa-pencil-square-o" /> Manage Programs
            </button>
            <button
              type="button"
              className="btn btn-info navbar-btn all-padded-btn"
              onClick={this.props.toggleDistrictModal}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Create District"
            >
              <span className="fa fa-globe" />
            </button>
            <button
              type="button"
              className="btn btn-info navbar-btn all-padded-btn"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Manage Permissions"
              onClick={this.managePermissions.bind(this)}
            >
              <span className="fa fa-key" />
            </button>
            <button
              type="button"
              className="btn btn-info navbar-btn all-padded-btn"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Manage Users"
              onClick={this.manageUsers.bind(this)}
            >
              <span className="fa fa-users" />
            </button>
            <button
              type="button"
              className="btn btn-info navbar-btn all-padded-btn"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Map Assessments"
              onClick={this.mapAssessments.bind(this)}
            >
              <span className="fa fa-database" />
            </button>
            <button
              type="button"
              className="btn btn-info navbar-btn all-padded-btn"
              data-toggle="tooltip"
              data-placement="bottom"
              title="View DEO Report"
              onClick={() => {
                this.props.redirectTo('/reports');
              }}
            >
              <span className="fa fa-bar-chart" />
            </button>
            <button
              type="button"
              className="btn btn-info navbar-btn all-padded-btn"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Revert Entity State"
            >
              <span className="fa fa-undo" />
            </button>
            <button
              type="button"
              className="btn btn-primary navbar-btn all-padded-btn"
              onClick={this.manageProgramFilter}
            >
              <span className="glyphicon glyphicon-filter" /> Filter by Programs
            </button>
          </div>
        );
      };
    } else {
      Displayelement = props => {
        return <div />;
      };
    }
    return (
      <div className="container-fluid">
        <button
          type="button"
          className="btn btn-primary navbar-btn all-padded-btn pull-left"
          onClick={this.goHome.bind(this)}
        >
          <span className="glyphicon glyphicon-home" />
        </button>
        <form className="navbar-form navbar-left" role="search">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Enter KLP ID" />
            <button type="submit" className="btn btn-primary padded-btn">Search</button>
          </div>
        </form>
        <Displayelement {...this.props} />
        <CreateDistrict
          placeHolder="District Name"
          title="Create New District"
          isOpen={this.props.districtModalIsOpen}
          onCloseModal={this.props.toggleDistrictModal}
          save={this.props.saveNewDistrict}
        />
      </div>
    );
  }
}
