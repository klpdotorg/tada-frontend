/*
* Secondary navigation bar for filtering/search etc..
*/
import React, { Component } from 'react';
import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead';
import { SERVER_API_BASE as serverApiBase } from 'config';
import { push, replace } from 'react-router-redux';

import { capitalize } from '../utils';
import CreateDistrict from './Modals/CreateBoundary';

const API = `${serverApiBase}searchklp/?klp_id=`;

const AsyncTypeahead = asyncContainer(Typeahead);

export default class SecondaryNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
    };
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

  filterSearchData = data => {
    const institutions = _.map(data.institutions, item => ({
      label: `${'Institution'} - ${item.id} - ${capitalize(item.name)}`,
      value: item.id,
      type: 'institution',
      boundaryDetails: item.boundary_details,
    }));

    const students = _.map(data.students, item => {
      const name = capitalize(`${item.first_name} ${item.last_name}`);

      return {
        label: `${'Student'} - ${item.id} - ${name}`,
        value: item.id,
        type: 'student',
        boundaryDetails: item.boundary_details,
      };
    });

    return [...institutions, ...students];
  };

  handleSubmit = entities => {
    const data = entities[0];
    if (data) {
      const url = `/district/${data.boundaryDetails.district}/block/${data.boundaryDetails
        .block}/cluster/${data.boundaryDetails.cluster}/institution/${data.value}`;
      if (data.type === 'institution') {
        this.props.redirectTo(url);
      } else {
        this.props.redirectTo(
          `/district/${data.boundaryDetails.district}/block/${data.boundaryDetails
            .block}/cluster/${data.boundaryDetails.cluster}/institution/${data.boundaryDetails
            .institution}/studentgroups/${data.boundaryDetails
            .student_group}/students/${data.value}`,
        );
      }
    }
  };

  onSearch = query => {
    fetch(`${API}${query}`).then(resp => resp.json()).then(json => {
      this.setState({
        options: this.filterSearchData(json),
      });
    });
  };

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
        <form className="navbar-form navbar-left" role="search" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <AsyncTypeahead
              placeholder="Start typing KLP ID"
              onSearch={this.onSearch}
              onChange={this.handleSubmit}
              options={this.state.options}
            />
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
