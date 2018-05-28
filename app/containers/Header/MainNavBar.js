import { connect } from 'react-redux';
import { NavBar } from '../../components/Header';
import { selectPreschoolTree, selectPrimaryTree } from '../../actions';

const mapStateToProps = (state) => {
  return {
    primarySelected: state.schoolSelection.primarySchool,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPrimaryClick() {
      dispatch(selectPrimaryTree());
      // dispatch(fetchEntitiesFromServer());
    },
    onPreSchoolClick() {
      dispatch(selectPreschoolTree());
      // dispatch(fetchEntitiesFromServer());
    },
  };
};

const MainNavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export { MainNavBar };
