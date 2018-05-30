import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import isEmpty from 'lodash.isempty';

import { Loading } from '../common';
import { StudentList } from '../../containers/ViewStudents';
import { EditStudent } from '../../containers/EditStudent';

const ViewStudentsCont = (props) => {
  const {
    district,
    block,
    cluster,
    institution,
    studentGroup,
    params,
    canEdit,
    centers,
    isLoading,
    selectedCenter,
    canMapStudents,
    hasPermissions,
  } = props;

  if (isLoading || isEmpty(studentGroup)) {
    return <Loading />;
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li>
          <Link to={district.path}>{district.name}</Link>
        </li>
        <li>
          <Link to={block.path}>{block.name}</Link>
        </li>
        <li>
          <Link to={cluster.path}>{cluster.name}</Link>
        </li>
        <li>
          <Link to={institution.path}>{institution.name}</Link>
        </li>
        <li>{studentGroup.name}</li>
      </ol>
      <div className="row">
        <h4 className="text-primary col-md-10">Student Details</h4>
        <div className="col-md-2 text-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              props.openEditStudentsForm(params.studentGroupNodeId);
            }}
            disabled={canEdit && !hasPermissions}
          >
            Edit Students
          </button>
        </div>
      </div>
      <div className="base-spacing-sm" />
      <div className="table-responsive add-students-table">
        <table className="table table-condensed table-fixedwidth">
          <thead>
            <tr className="text-primary text-uppercase">
              <th className="add-students-header-text">Select</th>
              <th className="add-students-header-text">ID</th>
              <th className="add-students-header-text">Name</th>
              <th className="add-students-header-text">Government student ID</th>
              <th className="add-students-header-text">Gender</th>
              <th className="add-students-header-text">Mother Tongue</th>
              <th className="add-students-header-text">Date of Birth</th>
              <th className="add-students-header-text">Father's Name</th>
              <th className="add-students-header-text">Mother's Name</th>
              <th />
            </tr>
          </thead>
          <StudentList
            studentGroupNodeId={params.studentGroupNodeId}
            institutionId={institution.id}
            hasPermissions={hasPermissions}
          />
        </table>
      </div>
      <div className="row base-spacing-mid">
        <div className="col-md-4 centers-select-box">
          <h5 className="text-primary" htmlFor="sel1">
            Centers:
          </h5>
          <select
            className="form-control"
            id="sel1"
            onChange={(e) => {
              props.selectCenter(e.target.value);
            }}
            value={selectedCenter}
          >
            {centers.map((center, i) => {
              return (
                <option key={i} value={center.value}>
                  {center.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-md-4">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!canMapStudents}
            onClick={props.mapStudentsWithCenter}
          >
            Map to Center
          </button>
        </div>
      </div>
      <EditStudent studentGroupNodeId={params.studentGroupNodeId} hasPermissions={hasPermissions} />
    </div>
  );
};

ViewStudentsCont.propTypes = {
  hasPermissions: PropTypes.bool,
  district: PropTypes.object,
  block: PropTypes.object,
  cluster: PropTypes.object,
  institution: PropTypes.object,
  studentGroup: PropTypes.object,
  canEdit: PropTypes.bool,
  openEditStudentsForm: PropTypes.func,
  params: PropTypes.object,
  centers: PropTypes.array,
  selectedCenter: PropTypes.any,
  selectCenter: PropTypes.func,
  isLoading: PropTypes.bool,
  canMapStudents: PropTypes.bool,
  mapStudentsWithCenter: PropTypes.func,
};

export { ViewStudentsCont };
