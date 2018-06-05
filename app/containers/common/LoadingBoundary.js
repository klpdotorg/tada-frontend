import { connect } from 'react-redux';
import { LoadingBoundaryView } from '../../components/common';

const mapStateToProps = (state) => {
  return {
    show: state.appstate.submitLoading,
  };
};

const LoadingBoundary = connect(mapStateToProps)(LoadingBoundaryView);

export { LoadingBoundary };
