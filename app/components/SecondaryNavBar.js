/*
* Secondary navigation bar for filtering/search etc..
*/
import React, { Component } from 'react';
import CreateDistrict from './Modals/CreateBoundary'

export default class SecondaryNavBar extends React.Component {

  constructor(props)
  {
    super(props);
  }

  managePrograms()
  {
    this.props.redirectTo('/programs');
  }
  
  manageProgramFilter=()=>{
    this.props.redirectTo('/FilterByProgram');
  }

  goHome()
  {
    this.props.redirectTo('/dashboard');
  }

  manageUsers()
  {
    this.props.redirectTo('/users');
  }

  managePermissions()
  {
    this.props.redirectTo('/permissions');
  }

  render() {
    var Displayelement;
    if(sessionStorage.getItem('isAdmin')) {
      Displayelement = (props) => {
         return (<div className="pull-right">
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip" onClick={this.managePrograms.bind(this)}><span className="fa fa-pencil-square-o"></span> Manage Programs</button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" onClick={ this.props.toggleDistrictModal } data-toggle="tooltip" data-placement="bottom" title="Create District"><span className="fa fa-globe"></span></button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip" data-placement="bottom" title="Manage Permissions" onClick={this.managePermissions.bind(this)}><span className="fa fa-key"></span></button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip" data-placement="bottom" title="Manage Users" onClick={this.manageUsers.bind(this)}><span className="fa fa-users"></span></button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip" data-placement="bottom" title="Map Assessments"><span className="fa fa-database"></span></button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip" data-placement="bottom" title="View DEO Report"><span className="fa fa-bar-chart"></span></button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip" data-placement="bottom" title="Revert Entity State"><span className="fa fa-undo"></span></button>
          <button type="button" className="btn btn-primary navbar-btn all-padded-btn" onClick={this.manageProgramFilter}><span className="glyphicon glyphicon-filter"></span> Filter by Programs</button>
        </div>);
      };
    }
    else {
      Displayelement = (props) => {
        return (<div></div>);
      };
    }
    return (
      <div className="container-fluid">
        <button type="button" className="btn btn-primary navbar-btn all-padded-btn pull-left" onClick={this.goHome.bind(this)}><span className="glyphicon glyphicon-home"></span></button>
        <form className="navbar-form navbar-left" role="search">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Enter KLP ID" />
          </div>
          <button type="submit" className="btn btn-default padded-btn">Search</button>
        </form>
        <Displayelement {...this.props}/>
        <CreateDistrict placeHolder='District Name' title='Create New District' isOpen={ this.props.districtModalIsOpen } onCloseModal={ this.props.toggleDistrictModal } save={ this.props.saveNewDistrict } />
      </div>
      );
  }
}
