import React from 'react';

const Teacher = (props) => {
  const { teacher } = props;
  return (
    <tr key={teacher.id}>
      <td>{teacher.first_name}</td>
      <td>{teacher.middle_name}</td>
      <td>{teacher.last_name}</td>
      <td>{teacher.contact_no}</td>
      <td>{teacher.qualification}</td>
      <td>{teacher.total_work_experience_years}</td>
      <td>{teacher.total_work_experience_months}</td>
      <td>{teacher.subject}</td>
      <td>{teacher.school_id}</td>
      <td>{teacher.address}</td>
      <td>{teacher.area}</td>
      <td>{teacher.pincode}</td>
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
