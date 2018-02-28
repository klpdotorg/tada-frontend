import { connect } from 'react-redux';
import { get } from 'lodash';

import { ProgramDetailsView } from '../../components/Questions';
import { toggleCreateQuestionModal } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    program: get(state.programs.programs, ownProps.programId, {}),
    assessment: get(state.assessments.assessments, ownProps.assessmentId, {}),
  };
};

const ProgramDetails = connect(mapStateToProps, { toggleCreateQuestionModal })(ProgramDetailsView);

export { ProgramDetails };
