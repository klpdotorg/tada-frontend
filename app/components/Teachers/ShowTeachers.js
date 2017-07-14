import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import CreateTeacher from '../Modals/CreateTeacher';
import ModifyTeacher from '../Modals/ModifyTeacher';
import DisplayPath from './DisplayPath';
import TeacherList from './TeacherList';
import { saveTeacher, updateTeacher } from '../../actions';

class Teachers extends Component {
  state = {
    showAddTeacherPopup: false,
    showEditTeacherPopup: false,
    editTeacherId: null,
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
      editTeacherId: id,
    });
  };

  saveTeacher = teacher => {
    this.props.dispatch(saveTeacher(teacher)).then(() => {
      this.setState({
        showAddTeacherPopup: false,
      });
    });
  };

  updateTeacher = teacher => {
    this.props.dispatch(updateTeacher(teacher, this.state.editTeacherId)).then(() => {
      this.setState({
        showEditTeacherPopup: false,
        editTeacherId: null,
      });
    });
  };

  deleteTeacher = id => {
    const teacher = this.getTeacher(id);
    teacher.active = 0;
    this.props.dispatch(updateTeacher(teacher, id, true)).then(() => {
      console.log('Deleted successfully.');
    });
  };

  getTeacher = id => {
    const teacher = _.find(this.props.teachers, teacher => {
      return teacher.id === id;
    });
    return teacher || {};
  };

  render() {
    const { boundaryDetails, params, teachers } = this.props;
    return (
      <div>
        <DisplayPath boundaryDetails={boundaryDetails} params={params} />
        <TeacherList
          teachers={teachers}
          showAddTeacherPopup={this.showAddTeacherPopup}
          showEditTeacherPopup={this.showEditTeacherPopup}
          deleteTeacher={this.deleteTeacher}
        />
        <CreateTeacher
          isOpen={this.state.showAddTeacherPopup}
          onCloseModal={this.closeAddTeacherPopup}
          onSubmit={this.saveTeacher}
          institution={params.institutionId}
        />
        <ModifyTeacher
          entity={this.getTeacher(this.state.editTeacherId)}
          isOpen={this.state.showEditTeacherPopup}
          onCloseModal={this.closeEditTeacherPopup}
          onSubmit={this.updateTeacher}
          institution={params.institutionId}
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
