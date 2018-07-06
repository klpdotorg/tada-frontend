import { connect } from 'react-redux';
import { SpinnerView } from '../../components/common';

const mapStateToProps = (state) => {
  return {
    show: state.appstate.showSpinner,
  };
};

const Spinner = connect(mapStateToProps)(SpinnerView);

export { Spinner };
