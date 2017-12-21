import React from 'react';
import PropTypes from 'prop-types';

import { Student } from '../../containers/ViewStudents';

const StudentList = ({ studentIds }) => {
  if (!studentIds.length) {
    return <div>No Students Found!</div>;
  }

  return <tbody>{studentIds.map((id, i) => { return <Student id={id} key={i} />; })}</tbody>;
};

StudentList.propTypes = {
  studentIds: PropTypes.array,
};

export { StudentList };
