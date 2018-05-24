import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';
import { Link } from 'react-router';

import { NoPermissionView, StudentGroupActions } from './index';
import { EditStudentGroup } from '../../containers/StudentGroup';
import { Loading } from '../common';

const StudentGroupView = (props) => {
  const {
    isPrimary,
    isLoading,
    district,
    block,
    cluster,
    institution,
    studentGroup,
    params,
    depth,
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
        <li>
          <Link className="active">{studentGroup.name}</Link>
        </li>
      </ol>
      <NoPermissionView hasPermissions={hasPermissions} />
      <div className="row">
        <div className="col-md-8">
          <h4 className="text-primary">{!hasPermissions ? 'Modify Details' : 'View Details'}</h4>
        </div>
        <StudentGroupActions
          isPrimary={isPrimary}
          hasPermissions={hasPermissions}
          viewStudent={() => {
            return props.viewStudent(params.studentGroupNodeId, depth);
          }}
          showBulkAdd={() => {
            return props.showBulkAdd(params.studentGroupNodeId, depth);
          }}
        />
      </div>
      <div className="base-spacing-mid border-base" />
      <EditStudentGroup
        institutionId={institution.id}
        institutionNodeId={params.institutionNodeId}
        studentGroupNodeId={params.studentGroupNodeId}
        hasPermissions={hasPermissions}
      />
    </div>
  );
};

StudentGroupView.propTypes = {
  isLoading: PropTypes.bool,
  isPrimary: PropTypes.bool,
  district: PropTypes.object,
  block: PropTypes.object,
  cluster: PropTypes.object,
  institution: PropTypes.object,
  studentGroup: PropTypes.object,
  showBulkAdd: PropTypes.func,
  viewStudent: PropTypes.func,
  hasPermissions: PropTypes.bool,
  params: PropTypes.object,
  depth: PropTypes.number,
};

export { StudentGroupView };
