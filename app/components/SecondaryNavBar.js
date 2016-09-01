/*
* Secondary navigation bar for filtering/search etc..
*/
import React, { Component } from 'react';
import CreateDistrict from './Modals/CreateDistrict'

export default class SecondaryNavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      districtModalOpen: false
    }
  }

  openModal(modalType) {
    this.setState({
      [modalType]: true
    })
  }

  closeModal(modalType) {
    this.setState({
      [modalType]: false
    })
  }

  render() {
  
    return (
      <div className="container-fluid">
        <button type="button" className="btn btn-primary navbar-btn all-padded-btn pull-left"><span className="glyphicon glyphicon-home"></span></button>
        <form className="navbar-form navbar-left" role="search">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Enter KLP ID" />
          </div>
          <button type="submit" className="btn btn-default padded-btn">Search</button>
        </form>
        <p className="pull-right">
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip"><span className="fa fa-pencil-square-o"></span> Make Admin</button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip"><span className="fa fa-pencil-square-o"></span> Manage Programs</button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" onClick={ this.props.toggleDistrictModal } data-toggle="tooltip" data-placement="bottom" title="Create District"><span className="fa fa-globe"></span></button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip" data-placement="bottom" title="Manage Permissions"><span className="fa fa-key"></span></button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip" data-placement="bottom" title="Add User"><span className="fa fa-user-plus"></span></button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip" data-placement="bottom" title="Map Assessments"><span className="fa fa-database"></span></button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip" data-placement="bottom" title="View DEO Report"><span className="fa fa-bar-chart"></span></button>
          <button type="button" className="btn btn-info navbar-btn all-padded-btn" data-toggle="tooltip" data-placement="bottom" title="Revert Entity State"><span className="fa fa-undo"></span></button>
          <button type="button" className="btn btn-primary navbar-btn all-padded-btn"><span className="glyphicon glyphicon-filter"></span> Filter by Programs</button>
        </p>

        <CreateDistrict isOpen={ this.props.districtModalIsOpen } onCloseModal={ this.props.toggleDistrictModal } closeModal={ this.props.toggleDistrictModal } save={ this.props.saveNewDistrict } />
      </div>
      );
  }
}
