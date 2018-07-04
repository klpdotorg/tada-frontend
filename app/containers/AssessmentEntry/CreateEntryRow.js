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

  setDefaultValue(rows) {
    const { questions } = this.props;
    const values = Object.values(questions);
    rows.forEach((row) => {
      values.forEach((question) => {
        const questionType = get(question, 'question_type');
        const options = get(question, 'options', []);
        if (questionType === 'CheckBox' || questionType === 'Radio') {
          // this.props.onChange(options[0], row.id, question.id);
        }
      });
      this.props.onChangeDateOfVisit(row.id, new Date().toISOString());
    });
  }

  render() {
    return <CreateEntryRowView {...this.props} />;
  }
}

GetResources.propTypes = {
  questions: PropTypes.object,
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
  const { students, answers, groupValues, dateOfVisits } = state.assessmentEntry;
  const boundary = get(state.programDetails.programDetails, ownProps.uniqueId, {});
  const program = get(programs, selectedProgram, {});

  return {
    questions: state.questions.questions,
    id: get(boundary, 'id', ''),
    name: get(boundary, 'name', ''),
    answers,
    surveyType: program.survey_on,
    students,
    groupValues,
    dateOfVisit: new Date(),
  };
};

const CreateEntryRow = connect(mapStateToProps, {
  onChange: onChangeAssessmentEntry,
  onSave: createAnswerGroup,
  fetchStudents: fetchStudentsForAssessmentEntry,
  onChangeGroupValue,
  onChangeDateOfVisit,
  infoNotification,
})(GetResources);

export { CreateEntryRow };
