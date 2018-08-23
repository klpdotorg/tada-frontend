import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';
import get from 'lodash.get';
import { DDMMYYYYFormat } from '../../utils';

const StudentView = (props) => {
  const { student, hasPermissions, canDelete, languages } = props;
  const {
    id,
    first_name,
    last_name,
    uid,
    gender,
    dob,
    mt,
    mother_name,
    father_name,
    middle_name,
  } = student;
  const langVal = languages.find((lan) => {
    return lan.value === mt;
  });
  // const checked = includes(selectedStudents, props.studentNodeId);

  if (isEmpty(student)) {
    return <tr />;
  }
  return (
    <tr>
      {/* <td>
        <input
          checked={checked}
          onChange={() => {
            props.selectStudent(props.studentNodeId);
          }}
          type="checkbox"
        />
      </td> */}
      <td>
        <span>{id}</span>
      </td>
      <td>
        <span>
          {first_name} {middle_name} {last_name}
        </span>
      </td>
      <td>
        <span>{uid}</span>
      </td>
      <td>
        <span>{gender}</span>
      </td>
      <td>
        <span>{get(langVal, 'label', '')}</span>
      </td>
      <td>
        <span>{DDMMYYYYFormat(dob)}</span>
      </td>
      <td>
        <span>{father_name}</span>
      </td>
      <td>
        <span>{mother_name}</span>
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
      </td>
      <td>
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
  openEditStudentModal: PropTypes.func,
  deleteStudent: PropTypes.func,
  studentGroupNodeId: PropTypes.string,
  studentNodeId: PropTypes.string,
};

export { StudentView };
