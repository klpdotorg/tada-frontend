import React from 'react';
import PropTypes from 'prop-types';

import { Teacher } from '../../containers/Teachers';

// const DATA = {
//   first_name: 'Pankaj',
//   middle_name: '',
//   last_name: 'Thakur',
//   contact_no: '8627019381',
//   qualification: '10th',
//   total_work_experience_years: 3,
//   total_work_experience_months: 12,
//   subject: 'Math',
//   school_id: 12,
//   address: 'Benglore',
//   area: 'Sundernager',
//   pincode: '175036',
// };

const TeacherList = ({ teacherIds, showAddTeacherPopup }) => {
  return (
    <div className="table-responsive">
      <div className="row">
        <div className="col-md-8">
          <h4 className="text-primary">Teacher Details</h4>
        </div>
        <div className="col-md-4 text-right">
          <button className="btn btn-orange" onClick={showAddTeacherPopup} title="Add Teacher">
            Add Teacher
          </button>
        </div>
      </div>
      <div className="border-base" />
      <div className="base-spacing-sm" />
      <table className="table table-condensed table-fixedwidth">
        <thead>
          <tr className="text-primary text-uppercase">
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Contact No</th>
            <th>Qualification</th>
            <th>Total Work Experience Years</th>
            <th>Total Work Experience Months</th>
            <th>Subject</th>
            <th>School ID</th>
            <th>Address</th>
            <th>Area</th>
            <th>Pincode</th>
          </tr>
        </thead>
        <tbody>
          {teacherIds.map((id) => {
            return <Teacher id={id} key={id} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

TeacherList.propTypes = {
  showAddTeacherPopup: PropTypes.func,
  teacherIds: PropTypes.array,
};

export { TeacherList };
