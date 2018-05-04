import { connect } from 'react-redux';
import { ActionsView } from '../../components/Permissions';

const mapStateToProps = () => {
  return {
    disabledBoundary: false,
    disabledAssessment: false,
  };
};

const Actions = connect(mapStateToProps)(ActionsView);

export { Actions };
