/*
* Secondary navigation bar for filtering/search etc..
*/
import React from 'react';
import PropTypes from 'prop-types';
// import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead';
import { CreateDistrict } from '../../containers/Header';
import { checkPermissions } from '../../checkPermissions';

// const AsyncTypeahead = asyncContainer(Typeahead);

const SecondaryNavBar = (props) => {
  const {
    // suggestionResults,
    handleSubmit,
    // onSearch,
    managePrograms,
    toggleDistrictModal,
    managePermissions,
    manageUsers,
    manageReports,
    // manageRevertEntity,
    manageProgramFilter,
    goHome,
    mapAssessments,
    isAdmin,
    groups,
  } = props;
  const showPrograms = checkPermissions(groups, 'programs');
  const map_assessments = checkPermissions(groups, 'mapAssessments');
  const showPermissions = checkPermissions(groups, 'permissions');
  const showRevertEntity = checkPermissions(groups, 'revertEntity');
  const showUsers = checkPermissions(groups, 'users');

  // if (sessionStorage.getItem('isAdmin')) {
  const displayelement = (
    <div className="pull-right">
      {isAdmin || showPrograms ? (
        <button
          type="button"
          className="btn btn-info navbar-btn all-padded-btn"
          data-toggle="tooltip"
          onClick={managePrograms}
        >
          <span className="fa fa-pencil-square-o" /> Manage Surveys
        </button>
      ) : (
        <span />
      )}
      {isAdmin ? (
        <button
          type="button"
          className="btn btn-info navbar-btn all-padded-btn"
          onClick={toggleDistrictModal}
          data-toggle="tooltip"
          data-placement="bottom"
          title="Create District"
        >
          <span className="fa fa-globe" />
        </button>
      ) : (
        <span />
      )}
      {isAdmin || showPermissions ? (
        <button
          type="button"
          className="btn btn-info navbar-btn all-padded-btn"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Manage Permissions"
          onClick={managePermissions}
        >
          <span className="fa fa-key" />
        </button>
      ) : (
        <span />
      )}
      {isAdmin || showUsers ? (
        <button
          type="button"
          className="btn btn-info navbar-btn all-padded-btn"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Manage Users"
          onClick={manageUsers}
        >
          <span className="fa fa-users" />
        </button>
      ) : (
        <span />
      )}
      {isAdmin || map_assessments ? (
        <button
          type="button"
          className="btn btn-info navbar-btn all-padded-btn"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Map Assessments"
          onClick={mapAssessments}
        >
          <span className="fa fa-database" />
        </button>
      ) : (
        <span />
      )}
      {/* { isAdmin || showUsers ? (
        <button
          type="button"
          className="btn btn-info navbar-btn all-padded-btn"
          data-toggle="tooltip"
          data-placement="bottom"
          title="View DEO Report"
          onClick={manageReports}
        >
          <span className="fa fa-bar-chart" />
        </button>
      ) :
        <span />
      } */}
      {/* {isAdmin || showRevertEntity ? (
        <button
          type="button"
          className="btn btn-info navbar-btn all-padded-btn"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Revert Entity State"
          onClick={manageRevertEntity}
        >
          <span className="fa fa-undo" />
        </button>
      ) : (
        <span />
      )} */}
      <button
        type="button"
        className="btn btn-primary navbar-btn all-padded-btn"
        onClick={manageProgramFilter}
      >
        <span className="glyphicon glyphicon-filter" /> Filter by Programs
      </button>
    </div>
  );
  // } else {
  //   displayelement = <div />;
  // }

  return (
    <div className="container-fluid">
      <button
        type="button"
        className="btn btn-primary navbar-btn all-padded-btn pull-left"
        onClick={goHome}
      >
        <span className="glyphicon glyphicon-home" />
      </button>
      <form className="navbar-form navbar-left" role="search" onSubmit={handleSubmit}>
        <div className="form-group">
          {/* <AsyncTypeahead
            placeholder="Start typing KLP ID"
            onSearch={onSearch}
            onChange={handleSubmit}
            options={suggestionResults}
          /> */}
        </div>
      </form>
      {displayelement}
      <CreateDistrict />
    </div>
  );
};

SecondaryNavBar.propTypes = {
  isAdmin: PropTypes.bool,
  // suggestionResults: PropTypes.array,
  handleSubmit: PropTypes.func,
  // onSearch: PropTypes.func,
  managePrograms: PropTypes.func,
  toggleDistrictModal: PropTypes.func,
  managePermissions: PropTypes.func,
  manageUsers: PropTypes.func,
  manageReports: PropTypes.func,
  // manageRevertEntity: PropTypes.func,
  manageProgramFilter: PropTypes.func,
  goHome: PropTypes.func,
  mapAssessments: PropTypes.func,
  groups: PropTypes.array,
};

export { SecondaryNavBar };
