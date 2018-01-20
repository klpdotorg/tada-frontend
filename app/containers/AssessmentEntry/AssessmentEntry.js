import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { keys } from 'lodash';

import { fetchStudentsAndPrograms, fetchAnswersAndQuestion } from '../../actions';
import { AnswersSheet } from '../../components/AssessmentEntry';

class GetAnswerSheet extends Component {
  componentDidMount() {
    const { entityId, entityType } = this.props.params;

    if (entityId) {
      this.props.fetchStudentsAndPrograms(entityId, entityType);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { entityId, selectedProgram } = this.props.params;

    if (entityId !== nextProps.params.entityId) {
      this.props.fetchStudentsAndPrograms(nextProps.params.entityId, nextProps.params.entityType);
    }

    if (selectedProgram !== nextProps.selectedProgram && selectedProgram) {
      this.props.fetchAnswersAndQuestion(nextProps.selectedProgram);
    }
  }

  render() {
    return <AnswersSheet {...this.props} />;
  }
}

GetAnswerSheet.propTypes = {
  params: PropTypes.object,
  selectedProgram: PropTypes.string,
  fetchStudents: PropTypes.func,
  fetchAnswersAndQuestion: PropTypes.func,
  fetchStudentsAndPrograms: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    studentIds: state.assessmentEntry.students.map((student) => {
      return student.id;
    }),
    selectedProgram: state.programs.selectedProgram,
  };
};

const AssessmentEntry = connect(mapStateToProps, {
  fetchStudentsAndPrograms,
  fetchAnswersAndQuestion,
})(GetAnswerSheet);

export { AssessmentEntry };
