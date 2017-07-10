import React, { Component } from 'react';

const DATA = {
  first_name: 'Pankaj',
  middle_name: '',
  last_name: 'Thakur',
  contact_no: '8627019381',
  qualification: '10th',
  total_work_experience_years: 3,
  total_work_experience_months: 12,
  subject: 'Math',
  school_id: 12,
  address: 'Benglore',
  area: 'Sundernager',
  pincode: '175036',
};

class TeacherList extends Component {
  renderItem = (item = DATA) => {
    return (
      <tr>
        <td>
          {item.first_name}
        </td>
        <td>
          {item.middle_name}
        </td>
        <td>
          {item.last_name}
        </td>
        <td>
          {item.contact_no}
        </td>
        <td>
          {item.qualification}
        </td>
        <td>
          {item.total_work_experience_years}
        </td>
        <td>
          {item.total_work_experience_months}
        </td>
        <td>
          {item.subject}
        </td>
        <td>
          {item.school_id}
        </td>
        <td>
          {item.address}
        </td>
        <td>
          {item.area}
        </td>
        <td>
          {item.pincode}
        </td>
        <td>
          <button
            onClick={() => {
              this.props.showEditTeacherPopup(item.id);
            }}
            className="btn btn-primary padded-btn"
            data-toggle="tooltip"
            title="Edit"
          >
            <i className="fa fa-pencil-square-o" />
          </button>
          <button
            onClick={() => {
              this.props.deleteTeacher(item.id);
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

  render() {
    return (
      <div className="table-responsive">
        <div className="row">
          <div className="col-md-8">
            <h4 className="text-primary">Teacher Details</h4>
          </div>
          <div className="col-md-4 text-right">
            <button
              className="btn btn-orange"
              onClick={this.props.showAddTeacherPopup}
              title="Add Teacher"
            >
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
            {this.renderItem()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TeacherList;
