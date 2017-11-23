import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { QuestionScreen } from '../../components/Questions';

class GetQuestions extends Component {
  componentDidMount() {
    const { params, questions } = this.props;
    const { programId, assessmentId } = params;

    if (isEmpty(questions)) {
      this.props.getQuestions(programId, assessmentId);
    }
  }

  render() {
    return <QuestionScreen {...this.props} />;
  }
}

GetQuestions.propTypes = {
  params: PropTypes.object,
  getQuestions: PropTypes.func,
  questions: PropTypes.array,
};

const Questions = connect()(QuestionScreen);

export { Questions };
