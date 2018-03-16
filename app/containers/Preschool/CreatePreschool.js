import { connect } from 'react-redux';

import { CreateInstitutionForm } from '../common';
import {
  saveNewInstitution,
  enableSubmitForm,
  disableSubmitForm,
  toggleCreatePreschoolModal,
} from '../../actions';

const mapStateToProps = (state) => {
  return {
    title: 'Create New Preschool',
    isOpen: state.modal.createPreschool,
    canSubmit: state.appstate.enableSubmitForm,
    languages: state.languages.languages,
    managements: state.institution.managements,
    institutionCategories: state.institution.institutionCats,
    lastVerifiedYears: state.institution.lastVerifiedYears,
  };
};

const CreatePreschool = connect(mapStateToProps, {
  save: saveNewInstitution,
  enableSubmitForm,
  disableSubmitForm,
  closeConfirmModal: toggleCreatePreschoolModal,
})(CreateInstitutionForm);

export { CreatePreschool };
