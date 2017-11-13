import { connect } from 'react-redux';
import { TeacherView } from '../../components/Teachers';
import { setEditTeacherId, deleteTeacher } from '../../actions';

const Teacher = connect(null, { setEditTeacherId, deleteTeacher })(TeacherView);

export { Teacher };
