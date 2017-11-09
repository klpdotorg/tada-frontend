import React from 'react';
import PropTypes from 'prop-types';
import { dateParser } from '../../utils';

const StudentView = (props) => {
  const { student, selectedStudents } = props;
  const { id, first_name, last_name, uid, gender, dob, langVal } = student;
  const checked = selectedStudents.includes(id);
  return (
    <tr>
      <td>
        <input checked={checked} onChange={props.selectStudent} type="checkbox" />
      </td>
      <td>{id}</td>
      <td>
        {first_name} {last_name}
      </td>
      <td>{uid}</td>
      <td>{gender}</td>
      <td>{langVal}</td>
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
            // props.openModifyStudent({ ...props });
          }}
          className="btn btn-primary padded-btn"
          data-toggle="tooltip"
          title="Edit"
        >
          <i className="fa fa-pencil-square-o" />
        </button>
        <button
          onClick={() => {
            // props.deleteStudent({ ...props });
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

StudentView.propTypes = {
  student: PropTypes.object,
  selectedStudents: PropTypes.array,
  selectStudent: PropTypes.func,
};

export { StudentView };
