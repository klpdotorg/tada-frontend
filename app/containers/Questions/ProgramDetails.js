import { connect } from 'react-redux';
import { ProgramDetailsView } from '../../components/Questions';

const mapStateToProps = (state, ownProps) => {
  return {
    program: state.programs.programs[ownProps.programId],
    assessment: state.assessments.assessments[ownProps.assessmentId],
  };
};

const ProgramDetails = connect(mapStateToProps)(ProgramDetailsView);

export { ProgramDetails };
