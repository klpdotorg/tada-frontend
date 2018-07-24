import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';

import { CreateEntryRowView } from '../../components/AssessmentEntry';
import {
  onChangeAssessmentEntry,
  createAnswerGroup,
  fetchStudentsForAssessmentEntry,
  onChangeGroupValue,
  onChangeDateOfVisit,
  onChangeComments,
  infoNotification,
} from '../../actions';

class GetResources extends Component {
  constructor() {
    super();

    this.state = {
      defaultValueSet: false,
    };
  }

  componentDidMount() {
    const { id, questions } = this.props;

    if (Object.values(questions).length) {
      this.setDefaultValue([
        {
          id,
        },
      ]);
      this.setState({
        defaultValueSet: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { id, questions } = nextProps;

    if (!this.state.defaultValueSet) {
      if (Object.values(questions).length) {
        this.setDefaultValue([
          {
            id,
          },
        ]);
        this.setState({
          defaultValueSet: true,
        });
      }
    }
  }

  setDefaultValue() {
    this.props.onChangeDateOfVisit(this.props.boundaryId, new Date());
    this.props.onChangeGroupValue(this.props.boundaryId, '');
    this.props.onChangeComments(this.props.boundaryId, '');
  }

  render() {
    return <CreateEntryRowView {...this.props} />;
  }
}

GetResources.propTypes = {
  boundaryId: PropTypes.number,
  questions: PropTypes.object,
  onChange: PropTypes.func,
  onChangeDateOfVisit: PropTypes.func,
  onChangeGroupValue: PropTypes.func,
  surveyType: PropTypes.string,
  fetchStudents: PropTypes.func,
  students: PropTypes.array,
  name: PropTypes.string,
  id: PropTypes.any,
  boundaryInfo: PropTypes.object,
  onChangeComments: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { programs, selectedProgram } = state.programs;
  const { students, answers, groupValues, dateOfVisits, comments } = state.assessmentEntry;
  const boundary = state.assessmentEntry.students.find((student) => {
    return ownProps.boundaryId === student.id;
  });
  const program = get(programs, selectedProgram, {});
  const assessment = get(state.assessments.assessments, ownProps.assessmentId, {});

  return {
    questions: state.questions.questions,
    id: get(boundary, 'id', ''),
    name: `${get(boundary, 'first_name', '')} ${get(boundary, 'last_name', '')}`,
    answers,
    surveyType: program.survey_on,
    students,
    groupValue: get(groupValues, ownProps.boundaryId, ''),
    dateOfVisit: get(dateOfVisits, ownProps.boundaryId, new Date()),
    comment: get(comments, ownProps.boundaryId, ''),
    commentRequired: get(assessment, 'comments_required'),
    groupText: get(assessment, 'group_text'),
  };
};

const CreateEntryRow = connect(mapStateToProps, {
  onChange: onChangeAssessmentEntry,
  onSave: createAnswerGroup,
  fetchStudents: fetchStudentsForAssessmentEntry,
  onChangeGroupValue,
  onChangeDateOfVisit,
  infoNotification,
  onChangeComments,
})(GetResources);

export { CreateEntryRow };
