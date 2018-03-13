import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { Loading } from '../common';
import { StudentList } from '../../containers/ViewStudents';
import { EditStudent } from '../../containers/EditStudent';

const ViewStudentsCont = (props) => {
  const { district, block, cluster, institution, studentGroup, params, canEdit, isLoading } = props;

  if (isLoading) {
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
      <div className="table-responsive">
        <div className="row">
          <h4 className="text-primary col-md-10">Student Details</h4>
          <div className="col-md-2 text-center">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                props.openEditStudentsForm(params.studentGroupNodeId);
              }}
              disabled={canEdit}
            >
              Edit Students
            </button>
          </div>
        </div>
        <div className="base-spacing-mid border-base" />
        <div className="base-spacing-sm" />
        <table className="table table-condensed table-fixedwidth">
          <thead>
            <tr className="text-primary text-uppercase">
              <th>Select</th>
              <th>ID</th>
              <th>Name</th>
              <th>Government student ID</th>
              <th>Gender</th>
              <th>Mother Tongue</th>
              <th>Date of Birth</th>
              <th>Father's Name</th>
              <th>Mother's Name</th>
              <th />
            </tr>
          </thead>
          <StudentList studentGroupNodeId={params.studentGroupNodeId} />
        </table>
        <div className="row base-spacing-mid">
          <div className="col-md-8">
            <button type="submit" className="btn btn-primary">
              Map to Center
            </button>
          </div>
        </div>
      </div>
      <EditStudent studentGroupNodeId={params.studentGroupNodeId} />
    </div>
  );
};

ViewStudentsCont.propTypes = {
  district: PropTypes.object,
  block: PropTypes.object,
  cluster: PropTypes.object,
  institution: PropTypes.object,
  studentGroup: PropTypes.object,
  canEdit: PropTypes.bool,
  openEditStudentsForm: PropTypes.func,
  params: PropTypes.object,
  isLoading: PropTypes.bool,
};

export { ViewStudentsCont };
