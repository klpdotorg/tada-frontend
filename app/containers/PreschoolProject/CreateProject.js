import { connect } from 'react-redux';
import { saveNewProject, closeCreateProjectModal } from '../../actions';

import { CreateBoundary } from '../../components/Modals';

const mapStateToProps = (state) => {
  return {
    placeHolder: 'Project Name',
    title: 'Create New Project',
    isOpen: state.modal.createProject,
    error: state.boundaries.createError,
  };
};

const CreateProject = connect(mapStateToProps, {
  onCloseModal: closeCreateProjectModal,
  save: saveNewProject,
})(CreateBoundary);

export { CreateProject };
