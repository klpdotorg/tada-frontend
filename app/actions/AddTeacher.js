import { SERVER_API_BASE as serverApiBase } from 'config';
import { checkStatus, post } from './requests';

import { teacherCreated, teacherNotCreated } from './notifications';

export const saveTeacher = (options) => {
  return (dispatch) => {
    post(`${serverApiBase}teacher/`, options)
      .then(checkStatus)
      .then((teacher) => {
        console.log(teacher);
        if (!teacher) {
          dispatch(Notifications.error(teacherNotCreated));
        }

        dispatch(Notifications.success(teacherCreated));
        dispatch(getTeachers(options.institution));
      });
  };
};
