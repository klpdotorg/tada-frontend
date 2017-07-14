import _ from 'lodash';
import Notifications from 'react-notification-system-redux';
import { SERVER_API_BASE as serverApiBase } from 'config';
import { checkStatus } from './utils';
import {
  teacherCreated,
  teacherUpdated,
  teacherDeleted,
  teacherNotDeleted,
  teacherNotUpdated,
  teacherNotCreated,
} from './notifications';

export const getTeachers = institutionId =>
  function (dispatch) {
    return fetch(`${serverApiBase}teacher/?institution=${institutionId}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${sessionStorage.token}`,
      },
    })
      .then(response => response.json())
      .then(res => {
        dispatch({
          type: 'TEACHER_FETCHED',
          payload: { [institutionId]: res },
        });
      });
  };

export const fetchingTeachers = () => ({
  type: 'FECHING_TEACHERS',
});

export const saveTeacher = options => dispatch => {
  return fetch(`${serverApiBase}teacher/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${sessionStorage.token}`,
    },
    body: JSON.stringify(options),
  })
    .then(checkStatus)
    .then(teacher => {
      console.log(teacher);
      if (!teacher) {
        dispatch(Notifications.error(teacherNotCreated));
      }

      dispatch(Notifications.success(teacherCreated));
      dispatch(getTeachers(options.institution));
    });
};

export const updateTeacher = (teacher, id, deleteRequest) => dispatch => {
  return fetch(`${serverApiBase}teacher/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${sessionStorage.token}`,
    },
    body: JSON.stringify(teacher),
  })
    .then(checkStatus)
    .then(res => {
      if (!res) {
        if (deleteRequest) {
          dispatch(Notifications.error(teacherNotDeleted));
        } else {
          dispatch(Notifications.error(teacherNotUpdated));
        }
      }
      if (deleteRequest) {
        dispatch(Notifications.success(teacherDeleted));
      } else {
        dispatch(Notifications.success(teacherUpdated));
      }
      dispatch(getTeachers(teacher.institution));
    });
};
