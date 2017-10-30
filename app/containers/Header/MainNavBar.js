import { connect } from 'react-redux';
import { NavBar } from '../../components/Header';
import { selectPreschoolTree, selectPrimaryTree } from '../../actions';

const mapStateToProps = state => ({
  primarySelected: state.schoolSelection.primarySchool,
});

const mapDispatchToProps = dispatch => ({
  onPrimaryClick() {
    dispatch(selectPrimaryTree());
    // dispatch(fetchEntitiesFromServer());
  },
  onPreSchoolClick() {
    dispatch(selectPreschoolTree());
    // dispatch(fetchEntitiesFromServer());
  },
});

const MainNavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export { MainNavBar };
