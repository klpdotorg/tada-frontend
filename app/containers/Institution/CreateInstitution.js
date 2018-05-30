import { connect } from 'react-redux';

import { CreateInstitutionForm } from '../common';
import {
  saveNewInstitution,
  enableSubmitForm,
  disableSubmitForm,
  toggleCreateInstitutionModal,
} from '../../actions';

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

const CreateInstitution = connect(mapStateToProps, {
  save: saveNewInstitution,
  enableSubmitForm,
  disableSubmitForm,
  closeConfirmModal: toggleCreateInstitutionModal,
})(CreateInstitutionForm);

export { CreateInstitution };
