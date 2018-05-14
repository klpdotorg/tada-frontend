import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { isEmpty } from 'lodash';

import { EditStudentsForm } from '../../containers/EditStudents';
import { Loading } from '../common';

const EditStudentsView = (props) => {
  const {
    district,
    block,
    cluster,
    institution,
    studentGroup,
    isLoading,
    params,
    depth,
    studentIds,
    hasPermissions,
  } = props;

  if (isLoading || isEmpty(studentIds)) {
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
      <EditStudentsForm
        studentGroupNodeId={params.studentGroupNodeId}
        studentGroupId={studentGroup.id}
        institutionId={institution.id}
        depth={depth}
        hasPermissions={hasPermissions}
      />
    </div>
  );
};

EditStudentsView.propTypes = {
  district: PropTypes.object,
  block: PropTypes.object,
  cluster: PropTypes.object,
  institution: PropTypes.object,
  studentGroup: PropTypes.object,
  params: PropTypes.object,
  isLoading: PropTypes.bool,
  studentIds: PropTypes.array,
  depth: PropTypes.number,
  hasPermissions: PropTypes.bool,
};

export { EditStudentsView };
