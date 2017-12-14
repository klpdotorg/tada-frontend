import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { QuestionScreen } from '../../components/Questions';
import { getQuestionParentEntities, getQuestions } from '../../actions';

class GetQuestions extends Component {
  componentDidMount() {
    const { params, fetchPrograms } = this.props;
    const { programId, assessmentId } = params;
    if (fetchPrograms) {
      this.props.getQuestionParentEntities(programId, assessmentId);
    } else {
      this.props.getQuestions(programId, assessmentId);
    }
  }

  render() {
    return <QuestionScreen {...this.props} />;
  }
}

GetQuestions.propTypes = {
  params: PropTypes.object,
  fetchPrograms: PropTypes.bool,
  getQuestions: PropTypes.func,
  getQuestionParentEntities: PropTypes.func,
  questions: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    fetchPrograms: isEmpty(state.programs.programs),
    loading: state.questions.loading,
  };
};

const Questions = connect(mapStateToProps, {
  getQuestionParentEntities,
  getQuestions,
})(GetQuestions);

export { Questions };
