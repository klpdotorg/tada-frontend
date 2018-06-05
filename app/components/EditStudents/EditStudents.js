import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import isEmpty from 'lodash.isempty';

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
    paths,
  } = props;

  if (isLoading || isEmpty(studentIds)) {
    return <Loading />;
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li>
          <Link to={paths[0]}>{district.name}</Link>
        </li>
        <li>
          <Link to={paths[1]}>{block.name}</Link>
        </li>
        <li>
          <Link to={paths[2]}>{cluster.name}</Link>
        </li>
        <li>
          <Link to={paths[3]}>{institution.name}</Link>
        </li>
        <li>
          <Link to={paths[4]}>{studentGroup.name}</Link>
        </li>
        <li className="active"> Edit Students</li>
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
  paths: PropTypes.array,
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
