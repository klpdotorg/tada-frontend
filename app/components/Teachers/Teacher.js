import React from 'react';
import PropTypes from 'prop-types';

const TeacherView = (props) => {
  const { teacher, languages, staffTypes } = props;
  const language = languages.find((lang) => {
    return lang.value === teacher.mt;
  });
  const staffType = staffTypes.find((type) => {
    return type.value === teacher.staff_type;
  });

  return (
    <tr key={teacher.id}>
      <td>{teacher.first_name}</td>
      <td>{teacher.middle_name}</td>
      <td>{teacher.last_name}</td>
      <td>{teacher.institution}</td>
      <td>{teacher.doj}</td>
      <td>{teacher.gender}</td>
      <td>{language.label}</td>
      <td>{staffType.label}</td>
      <td>{teacher.uid}</td>
      <td>
        <button
          onClick={() => {
            props.setEditTeacherId(teacher.id);
          }}
          className="btn btn-primary padded-btn"
          data-toggle="tooltip"
          title="Edit"
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
  staffTypes: PropTypes.array,
};

export { TeacherView };
