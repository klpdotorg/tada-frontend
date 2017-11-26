import React from 'react';
import PropTypes from 'prop-types';

const TeacherView = (props) => {
  const { teacher, languages } = props;
  const language = languages.find((lang) => {
    return lang.value === teacher.mt;
  });

  return (
    <tr key={teacher.id}>
      <td>{teacher.first_name}</td>
      <td>{teacher.middle_name}</td>
      <td>{teacher.last_name}</td>
      <td>{teacher.institution}</td>
      <td>{teacher.gender}</td>
      <td>{language.label}</td>
      <td>{teacher.staff_type}</td>
      <td>{teacher.uid}</td>
      <td>
        <button
          onClick={() => {
            props.showEditTeacherPopup(teacher.id);
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
  showEditTeacherPopup: PropTypes.func,
  deleteTeacher: PropTypes.func,
  teacher: PropTypes.object,
  languages: PropTypes.array,
};

export { TeacherView };
