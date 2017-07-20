import React, { Component } from 'react';
import StudentEntity from './StudentEntity';
import UserEntity from './UserEntity';
import ProgramEntity from './ProgramEntity';
import AssessmentEntity from './AssessmentEntity';

class ShowSelectedEntity extends Component {
  render() {
    switch (this.props.selectedEntity) {
      case 'students':
        return <StudentEntity />;
      case 'users':
        return <UserEntity />;
      case 'prgrams':
        return <ProgramEntity />;
      case 'assessments':
        return <AssessmentEntity />;
      default:
        return <StudentEntity />;
    }
  }
}

export default ShowSelectedEntity;
