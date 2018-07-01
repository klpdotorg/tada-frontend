import { SERVER_API_BASE as serverApiBase } from 'config';
import Notifications from 'react-notification-system-redux';

import { get, post, patch, deleteRequest } from './requests';
import {
  TEACHER_FETCHED,
  TOGGLE_MODAL,
  SET_EDIT_TEACHER_ID,
  SHOW_TEACHER_LOADING,
  CLOSE_TEACHER_LOADING,
  SET_TEACHER,
  DELETE_TEACHER,
  SET_TEACHER_ERROR,
} from './types';
import { showSuccessMessage, errorNotification } from './notifications';

const showTeacherError = (value) => {
  return {
    type: SET_TEACHER_ERROR,
    value,
  };
};

export const resetTeacherError = () => {
  return {
    type: SET_TEACHER_ERROR,
    value: {},
  };
};

export const showAddTeacherPopup = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'createTeacher',
    });
    dispatch(resetTeacherError());
  };
};

export const showTeacherLoading = () => {
  return {
    type: SHOW_TEACHER_LOADING,
  };
};

export const closeTeacherLoading = () => {
  return {
    type: CLOSE_TEACHER_LOADING,
  };
};

export const setEditTeacherId = (value) => {
  return (dispatch) => {
    dispatch(resetTeacherError());
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
    dispatch(showTeacherLoading());
    get(`${serverApiBase}teachers/?institution=${institutionId}`).then(({ data }) => {
      dispatch({
        type: TEACHER_FETCHED,
        value: data.results.reduce((soFar, value) => {
          const result = soFar;

          result[value.id] = value;
          return result;
        }, {}),
      });
      dispatch(closeTeacherLoading());
    });
  };
};

export const saveNewTeacher = (teacher) => {
  return (dispatch) => {
    const createTeacherURL = `${serverApiBase}teachers/`;
    post(createTeacherURL, teacher).then((response) => {
      if (response.status === 201) {
        const { data } = response;
        dispatch({
          type: TOGGLE_MODAL,
          modal: 'createTeacher',
        });
        dispatch({
          type: SET_TEACHER,
          value: {
            [data.id]: data,
          },
        });
        dispatch(resetTeacherError());
        dispatch(Notifications.success(showSuccessMessage('Teacher created!', 'Teacher successfully created.')));
      } else {
        dispatch(showTeacherError(response.data));
        dispatch(Notifications.error(errorNotification('Error', 'Teacher not created!')));
      }
    });
  };
};

export const editTeacher = (teacher, Id) => {
  return (dispatch) => {
    const createTeacherURL = `${serverApiBase}teachers/${Id}/`;
    patch(createTeacherURL, teacher).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        dispatch({
          type: TOGGLE_MODAL,
          modal: 'editTeacher',
        });
        dispatch({
          type: SET_TEACHER,
          value: {
            [Id]: data,
          },
        });
        dispatch(resetTeacherError());
        dispatch(Notifications.success(showSuccessMessage('Teacher modified!', 'Teacher successfully modified.')));
      } else {
        dispatch(showTeacherError(response.data));
        dispatch(Notifications.error(showSuccessMessage('Error!', 'Teacher not modified.')));
      }
    });
  };
};

export const deleteTeacher = (Id) => {
  return (dispatch) => {
    dispatch(showTeacherLoading());

    const createTeacherURL = `${serverApiBase}teachers/${Id}/`;

    deleteRequest(createTeacherURL).then((response) => {
      if (response.status === 204) {
        dispatch({
          type: DELETE_TEACHER,
          value: Id,
        });
        dispatch(Notifications.success(showSuccessMessage('Teacher Deleted!', 'Teacher deleted successfully.')));
      } else {
        dispatch(Notifications.error(errorNotification('Error', 'Teacher not deleted!')));
      }
      dispatch(closeTeacherLoading());
    });
  };
};
