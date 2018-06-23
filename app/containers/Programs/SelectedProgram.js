import { connect } from 'react-redux';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';

import { ViewSelectedProgram } from '../../components/Programs';
import {
  toggleEditProgramModal,
  deactivateProgram,
  openDeactivateProgramModal,
  openDeleteProgramModal,
  deleteProgram,
} from '../../actions';

const mapStateToProps = (state) => {
  const selectedProgramId = state.programs.selectedProgram;
  const { isAdmin, groups } = state.profile;
  return {
    selectedProgram: get(state.programs.programs, selectedProgramId, {}),
    canDelete: isEmpty(state.assessments.assessments),
    groups,
    isAdmin,
  };
};

const SelectedProgram = connect(mapStateToProps, {
  openEditProgramModal: toggleEditProgramModal,
  showDeactivateModal: openDeactivateProgramModal,
  deactivateProgram,
  deleteProgram,
  showDeleteModal: openDeleteProgramModal,
})(ViewSelectedProgram);

export { SelectedProgram };
