import { connect } from 'react-redux';
import { get } from 'lodash';

import { ProgramDetailsView } from '../../components/Questions';

const mapStateToProps = (state, ownProps) => {
  console.log(state.programs.programs);
  return {
    program: get(state.programs.programs, ownProps.programId, {}),
    assessment: get(state.assessments.assessments, ownProps.assessmentId, {}),
  };
};

const ProgramDetails = connect(mapStateToProps)(ProgramDetailsView);

export { ProgramDetails };
