import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';

import { AssessmentEntryFormView } from '../../components/AssessmentEntry';
import { fetchAnswers } from '../../actions';

class FetchAnswersAndQuestions extends Component {
  componentDidMount() {
    const { studentgroup } = this.props;
    const { questionGroupId } = this.props.params;
    this.props.fetchSelectedAssessmentQuestions(questionGroupId);

    if (!isEmpty(studentgroup)) {
      this.props.fetchAnswerGroups(questionGroupId, 'studentgroup_id', studentgroup.id);
    }
  }

  render() {
    return <AssessmentEntryFormView {...this.props} />;
  }
}

FetchAnswersAndQuestions.propTypes = {
  params: PropTypes.object,
  studentgroup: PropTypes.object,
  fetchSelectedAssessmentQuestions: PropTypes.func,
  fetchAnswerGroups: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { studentgroupId } = ownProps.params;

  const { answersLoading } = state.assessmentEntry;
  const { answergroups, fetching } = state.answergroups;
  const answereFetching = state.answers.fetching;
  const studentgroup = get(state.programDetails.programDetails, studentgroupId, {});

  return {
    rows: Object.keys(answergroups),
    studentgroup,
    loading: answersLoading || fetching || answereFetching,
    uniqueId: studentgroupId,
  };
};

const StudentsAnswersSheet = connect(mapStateToProps, {
  fetchAnswers,
})(FetchAnswersAndQuestions);

export { StudentsAnswersSheet };
