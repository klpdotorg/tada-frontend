import { connect } from 'react-redux';
import { Header } from '../../components/Header';

const mapStateToProps = state => ({
  username: state.login.username,
});

const MainHeader = connect(mapStateToProps)(Header);

export { MainHeader };
