import React from 'react';
import PropTypes from 'prop-types';

import { Loading, Message } from '../common';
import { Teacher } from '../../containers/Teachers';

const TeacherList = ({ teacherIds, showAddTeacherPopup, loading }) => {
  if (loading) {
    return <Loading />;
  }

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
      <hr style={{ width: '100%' }} />
      <div className="base-spacing-sm" />
      <div className="border-table">
        <table className="table table-striped" style={{ marginBottom: 0 }}>
          <thead>
            <tr className="info">
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>School ID</th>
              <th>Date of Join</th>
              <th>Gender</th>
              <th>Language</th>
              <th>Staff Type</th>
              <th>UID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teacherIds.map((id) => {
              return <Teacher id={id} key={id} />;
            })}
          </tbody>
        </table>
        {!teacherIds.length ? (
          <div className="base-spacing">
            <Message message="No Teachers Found!" />
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

TeacherList.propTypes = {
  loading: PropTypes.bool,
  showAddTeacherPopup: PropTypes.func,
  teacherIds: PropTypes.array,
};

export { TeacherList };
