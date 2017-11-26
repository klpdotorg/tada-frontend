import { connect } from 'react-redux';
import { get } from 'lodash';
import Teachers from '../components/Teachers';

const mapStateToProps = (state, ownProps) => {
  return {
    teachers: _.get(state.teachers, `teachers[${ownProps.params.institutionId}]`),
  };
};

const TeacherContainer = connect(mapStateToProps)(Teachers);

export default TeacherContainer;
