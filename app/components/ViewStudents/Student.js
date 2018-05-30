import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';
import includes from 'lodash.includes';
import get from 'lodash.get';

import { dateParser } from '../../utils';

const StudentView = (props) => {
  const { student, selectedStudents, hasPermissions, canDelete, languages } = props;
  const { id, first_name, last_name, uid, gender, dob, mt } = student;
  const langVal = languages.find((lan) => {
    return lan.value === mt;
  });
  const checked = includes(selectedStudents, props.studentNodeId);

  if (isEmpty(student)) {
    return <div />;
  }

  return (
    <tr>
      <td>
        <input
          checked={checked}
          onChange={() => {
            props.selectStudent(props.studentNodeId);
          }}
          type="checkbox"
        />
      </td>
      <td>{id}</td>
      <td>
        {first_name} {last_name}
      </td>
      <td>{uid}</td>
      <td>{gender}</td>
      <td>{get(langVal, 'label', '')}</td>
      <td>{dateParser(dob)}</td>
      <td>
        ___
        {/* displayFullName(get(relations, 'Father[0]')) */}
      </td>
      <td>
        ___
        {/* displayFullName(get(relations, 'Mother[0]')) */}
      </td>
      <td>
        <button
          onClick={() => {
            props.openEditStudentModal(props.studentNodeId);
          }}
          className="btn btn-primary padded-btn"
          data-toggle="tooltip"
          title="Edit"
          disabled={!hasPermissions}
        >
          <i className="fa fa-pencil-square-o" />
        </button>
        <button
          onClick={() => {
            const params = {
              boundaryNodeId: props.studentNodeId,
              boundaryId: student.id,
              parentId: props.studentGroupNodeId,
            };
            props.deleteStudent(params);
          }}
          className="btn btn-primary"
          data-toggle="tooltip"
          title="Delete"
          disabled={!canDelete}
        >
          <i className="fa fa-trash-o" />
        </button>
      </td>
    </tr>
  );
};

StudentView.propTypes = {
  languages: PropTypes.array,
  hasPermissions: PropTypes.bool,
  canDelete: PropTypes.bool,
  student: PropTypes.object,
  selectedStudents: PropTypes.array,
  openEditStudentModal: PropTypes.func,
  selectStudent: PropTypes.func,
  deleteStudent: PropTypes.func,
  studentGroupNodeId: PropTypes.string,
  studentNodeId: PropTypes.string,
};

export { StudentView };
