import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import orderBy from 'lodash.orderby';

import { CreateEntryRowView } from '../../components/AssessmentEntry';
import {
  onChangeAssessmentEntry,
  createAnswerGroup,
  fetchStudentsForAssessmentEntry,
  onChangeGroupValue,
  onChangeComments,
  onChangeDateOfVisit,
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

    if (questions.length) {
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
      if (questions.length) {
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

  setDefaultValue(rows) {
    rows.forEach((row) => {
      this.props.onChangeDateOfVisit(row.id, new Date().toISOString());
    });
  }

  render() {
    return <CreateEntryRowView {...this.props} />;
  }
}

GetResources.propTypes = {
  questions: PropTypes.array,
  onChange: PropTypes.func,
  onChangeDateOfVisit: PropTypes.func,
  surveyType: PropTypes.string,
  fetchStudents: PropTypes.func,
  students: PropTypes.array,
  name: PropTypes.string,
  id: PropTypes.any,
  boundaryInfo: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const { programs, selectedProgram } = state.programs;
  const { students, answers, groupValues, dateOfVisits, comments } = state.assessmentEntry;
  const boundary = get(state.programDetails.programDetails, ownProps.uniqueId, {});
  const program = get(programs, selectedProgram, {});
  const assessment = get(state.assessments.assessments, ownProps.assessmentId, {});
  const id = get(boundary, 'id', '');
  const questionValues = Object.values(state.questions.questions);
  const questions = orderBy(questionValues, ['sequence'], ['asc']);

  return {
    questions,
    id,
    name: get(boundary, 'name', ''),
    answers,
    surveyType: program.survey_on,
    students,
    groupValues,
    dateOfVisit: get(dateOfVisits, id, ''),
    comments,
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
