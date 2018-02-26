import { connect } from 'react-redux';

import { CreateInstitutionForm } from '../common';
import { saveNewInstitution, enableSubmitForm, disableSubmitForm, openNode } from '../../actions';

const mapStateToProps = (state) => {
  return {
    title: 'Create New Institution',
    isOpen: state.modal.createInstitution,
    canSubmit: state.appstate.enableSubmitForm,
    languages: state.languages.languages,
    managements: state.institution.managements,
    institutionCategories: state.institution.institutionCats,
    lastVerifiedYears: state.institution.lastVerifiedYears,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save: (clusterNodeId, form) => {
      dispatch(openNode(clusterNodeId));
      dispatch(saveNewInstitution(form));
    },
    enableSubmitForm: () => {
      dispatch(enableSubmitForm());
    },
    disableSubmitForm: () => {
      dispatch(disableSubmitForm());
    },
    closeConfirmModal: () => {
      dispatch({
        type: 'TOGGLE_MODAL',
        modal: 'createInstitution',
      });
    },
  };
};

const CreateInstitution = connect(mapStateToProps, mapDispatchToProps)(CreateInstitutionForm);

export { CreateInstitution };
