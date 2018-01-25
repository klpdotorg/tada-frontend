import { connect } from 'react-redux';
import { ShowProgramsView } from '../../components/MapAssessments';

const mapStateToProps = () => {
  return {
    programs: [],
    selectedProgram: null,
  };
};

const ShowPrograms = connect(mapStateToProps, {
  changeProgram: () => {},
})(ShowProgramsView);

export { ShowPrograms };
