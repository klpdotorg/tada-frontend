import { SERVER_API_BASE as serverApiBase } from 'config';
import { get, post, patch } from './requests';
import {
  TEACHER_FETCHED,
  TOGGLE_MODAL,
  SET_EDIT_TEACHER_ID,
  SHOW_TEACHER_LOADING,
  CLOSE_TEACHER_LOADING,
} from './types';

export const showAddTeacherPopup = () => {
  return {
    type: TOGGLE_MODAL,
    value: 'createTeacher',
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
    get(`${serverApiBase}teachers/?institution=${institutionId}`).then((response) => {
      dispatch({
        type: TEACHER_FETCHED,
        value: response.results,
      });
      dispatch(closeTeacherLoading());
    });
  };
};

export const saveNewTeacher = (teacher) => {
  return (dispatch) => {
    dispatch(showTeacherLoading());

    const createTeacherURL = `${serverApiBase}teachers/`;
    post(createTeacherURL, teacher).then(() => {
      dispatch({
        type: TOGGLE_MODAL,
        modal: 'createTeacher',
      });
      dispatch(getTeachers(teacher.institution));
    });
  };
};

export const editTeacher = (teacher, Id) => {
  return (dispatch) => {
    dispatch(showTeacherLoading());

    const createTeacherURL = `${serverApiBase}teachers/${Id}/`;
    patch(createTeacherURL, teacher).then(() => {
      dispatch({
        type: TOGGLE_MODAL,
        modal: 'editTeacher',
      });
      dispatch(getTeachers(teacher.institution));
    });
  };
};
