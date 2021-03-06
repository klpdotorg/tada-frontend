import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import { StaffTypes } from '../../Data/StaffTypes';

const TeacherView = (props) => {
  const { teacher, languages, hasPermissions, canDelete } = props;
  const language = languages.find((lang) => {
    return lang.value === teacher.mt;
  });

  const staffType = StaffTypes.find((type) => {
    return type.id === teacher.staff_type;
  });

  return (
    <tr key={teacher.id}>
      <td>{teacher.first_name}</td>
      <td>{teacher.middle_name}</td>
      <td>{teacher.last_name}</td>
      <td>{teacher.institution}</td>
      <td>{teacher.doj}</td>
      <td>{teacher.gender}</td>
      <td>{get(language, 'label')}</td>
      <td>{get(staffType, 'staff_type')}</td>
      <td>{teacher.uid}</td>
      <td>
        <button
          onClick={() => {
            props.setEditTeacherId(teacher.id);
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
            props.deleteTeacher(teacher.id);
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

TeacherView.propTypes = {
  setEditTeacherId: PropTypes.func,
  deleteTeacher: PropTypes.func,
  teacher: PropTypes.object,
  languages: PropTypes.array,
  hasPermissions: PropTypes.bool,
  canDelete: PropTypes.bool,
};

export { TeacherView };
