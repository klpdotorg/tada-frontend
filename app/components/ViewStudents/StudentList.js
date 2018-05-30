import React from 'react';
import PropTypes from 'prop-types';

import { Loading } from '../common';
import { Student } from '../../containers/ViewStudents';

const StudentListView = ({ loading, studentIds, studentGroupNodeId, hasPermissions }) => {
  if (loading) {
    return <Loading />;
  }

  if (!studentIds.length) {
    return <div>No Students Found!</div>;
  }

  return (
    <tbody>
      {studentIds.map((id) => {
        return (
          <Student
            studentNodeId={id}
            key={id}
            studentGroupNodeId={studentGroupNodeId}
            hasPermissions={hasPermissions}
          />
        );
      })}
    </tbody>
  );
};

StudentListView.propTypes = {
  studentIds: PropTypes.array,
  studentGroupNodeId: PropTypes.string,
  loading: PropTypes.bool,
  hasPermissions: PropTypes.bool,
};

export { StudentListView };
