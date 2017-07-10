import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateTeacher from '../Modals/CreateTeacher';
import ModifyTeacher from '../Modals/ModifyTeacher';
import DisplayPath from './DisplayPath';
import TeacherList from './TeacherList';

class Teachers extends Component {
  state = {
    showAddTeacherPopup: false,
    showEditTeacherPopup: false,
    editStudentId: null,
  };

  showAddTeacherPopup = () => {
    this.setState({
      showAddTeacherPopup: true,
    });
  };

  closeAddTeacherPopup = () => {
    this.setState({
      showAddTeacherPopup: false,
    });
  };

  closeEditTeacherPopup = () => {
    this.setState({
      showEditTeacherPopup: false,
    });
  };

  showEditTeacherPopup = id => {
    this.setState({
      showEditTeacherPopup: true,
      editStudentId: id,
    });
  };

  saveTeacher = teacher => {
    // console.log(teacher)
  };

  deleteTeacher = () => {
    //console.log()
  };

  render() {
    const { boundaryDetails, params } = this.props;

    return (
      <div>
        <DisplayPath boundaryDetails={boundaryDetails} params={params} />
        <TeacherList
          showAddTeacherPopup={this.showAddTeacherPopup}
          showEditTeacherPopup={this.showEditTeacherPopup}
          deleteTeacher={this.deleteTeacher}
        />
        <CreateTeacher
          isOpen={this.state.showAddTeacherPopup}
          onCloseModal={this.closeAddTeacherPopup}
          onSubmit={this.saveTeacher}
        />
        <ModifyTeacher
          isOpen={this.state.showEditTeacherPopup}
          onCloseModal={this.closeEditTeacherPopup}
          onSubmit={this.updateTeacher}
        />
      </div>
    );
  }
}

Teachers.propTypes = {
  boundaryDetails: PropTypes.object,
  params: PropTypes.object,
};

export default Teachers;
