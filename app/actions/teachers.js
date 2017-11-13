import Notifications from 'react-notification-system-redux';
import { SERVER_API_BASE as serverApiBase } from 'config';
import { checkStatus, get } from './requests';
import {
  teacherUpdated,
  teacherDeleted,
  teacherNotDeleted,
  teacherNotUpdated,
} from './notifications';
import { TEACHER_FETCHED, TOGGLE_MODAL, SET_EDIT_TEACHER_ID } from './types';

export const setEditTeacherId = (value) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'editTeacher',
    });
    dispatch({
      type: SET_EDIT_TEACHER_ID,
      value,
    });
  };
};

export const getTeachers = (institutionId) => {
  return (dispatch) => {
    get(`${serverApiBase}teacher/?institution=${institutionId}`).then((response) => {
      dispatch({
        type: TEACHER_FETCHED,
        payload: { [institutionId]: response },
      });
    });
  };
};

export const updateTeacher = (teacher, id, deleteRequest) => {
  return (dispatch) => {
    return fetch(`${serverApiBase}teacher/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.token}`,
      },
      body: JSON.stringify(teacher),
    })
      .then(checkStatus)
      .then((res) => {
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
};
