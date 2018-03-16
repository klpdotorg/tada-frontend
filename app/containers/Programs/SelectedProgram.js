import { connect } from 'react-redux';
import { get } from 'lodash';

import { ViewSelectedProgram } from '../../components/Programs';
import {
  openEditProgramModal,
  deactivateProgram,
  openDeactivateProgramModal,
  openDeleteProgramModal,
  deleteProgram,
} from '../../actions';

const mapStateToProps = (state) => {
  const selectedProgramId = state.programs.selectedProgram;
  return {
    selectedProgram: get(state.programs.programs, selectedProgramId, {}),
  };
};

const SelectedProgram = connect(mapStateToProps, {
  openEditProgramModal,
  showDeactivateModal: openDeactivateProgramModal,
  deactivateProgram,
  deleteProgram,
  showDeleteModal: openDeleteProgramModal,
})(ViewSelectedProgram);

export { SelectedProgram };
