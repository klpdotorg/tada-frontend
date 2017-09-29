import { connect } from 'react-redux';
import { saveNewProject } from '../../actions';

import CreateBoundary from '../../components/Modals/CreateBoundary';

const mapStateToProps = state => ({
  placeHolder: 'Project Name',
  title: 'Create New Project',
  isOpen: state.modal.createProject,
});

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => {
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createProject',
    });
  },
  save: (name, districtId) => {
    const options = {
      name,
      parent: districtId,
      boundary_type: 2,
      boundary_category: 14,
    };
    dispatch(saveNewProject(options));
  },
});

const CreateProject = connect(mapStateToProps, mapDispatchToProps)(CreateBoundary);

export { CreateProject };
