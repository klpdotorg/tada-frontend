import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { DEFAULT_PROGRAM_NODE_ID } from 'config';

import { AssessmentEntryFormView } from '../../components/AssessmentEntry';
import {
  fetchAnswers,
  fetchAnswerGroups,
  fetchSelectedAssessmentQuestions,
  selectProgram,
} from '../../actions';

class FetchAnswersAndQuestions extends Component {
  componentDidMount() {
    const { boundary } = this.props;
    const { questionGroupId } = this.props.params;
    const { districtId, blockId, clusterId, programId } = this.props.params;
    const entities = [DEFAULT_PROGRAM_NODE_ID, districtId, blockId, clusterId].map((id, index) => {
      return {
        uniqueId: id,
        depth: index,
      };
    });
    this.props.fetchQuestions(questionGroupId, entities);
    this.props.selectProgram(programId);
    if (!isEmpty(boundary)) {
      this.props.fetchAnswerGroups(questionGroupId, 'studentgroup_id', boundary.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { questionGroupId } = this.props.params;
    const nextId = get(nextProps, ['boundary', 'id'], '');
    const currentId = get(this.props, ['boundary', 'id'], '');
    if (nextId !== currentId) {
      if (!isEmpty(nextProps.boundary)) {
        this.props.fetchAnswerGroups(questionGroupId, 'studentgroup_id', nextId);
      }
    }
  }

  render() {
    return <AssessmentEntryFormView {...this.props} />;
  }
}

FetchAnswersAndQuestions.propTypes = {
  params: PropTypes.object,
  boundary: PropTypes.object,
  fetchAnswerGroups: PropTypes.func,
  fetchQuestions: PropTypes.func,
  fetchBoundaries: PropTypes.func,
  fetchAnswers: PropTypes.func,
  selectProgram: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { studentGroupId } = ownProps.params;
  const { answersLoading } = state.assessmentEntry;
  const { answergroups, fetching } = state.answergroups;
  const answerFetching = state.answers.fetching;
  const studentGroup = get(state.programDetails.programDetails, studentGroupId, {});

  return {
    boundary: studentGroup,
    rows: Object.keys(answergroups),
    loading: answersLoading || fetching || answerFetching,
    uniqueId: studentGroupId,
  };
};

const StudentGroupAnswersSheet = connect(mapStateToProps, {
  selectProgram,
  fetchAnswers,
  fetchAnswerGroups,
  fetchQuestions: fetchSelectedAssessmentQuestions,
})(FetchAnswersAndQuestions);

export { StudentGroupAnswersSheet };
