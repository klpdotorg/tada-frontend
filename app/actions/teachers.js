import { SERVER_API_BASE as serverApiBase } from 'config';
import { get, post, patch, deleteRequest } from './requests';
import {
  TEACHER_FETCHED,
  TOGGLE_MODAL,
  SET_EDIT_TEACHER_ID,
  SHOW_TEACHER_LOADING,
  CLOSE_TEACHER_LOADING,
  SET_TEACHER,
  DELETE_TEACHER,
} from './types';

export const showAddTeacherPopup = () => {
  return {
    type: TOGGLE_MODAL,
    modal: 'createTeacher',
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
        value: response.results.reduce((soFar, value) => {
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
    dispatch(showTeacherLoading());

    const createTeacherURL = `${serverApiBase}teachers/`;
    post(createTeacherURL, teacher).then((response) => {
      dispatch({
        type: TOGGLE_MODAL,
        modal: 'createTeacher',
      });
      dispatch({
        type: SET_TEACHER,
        value: {
          [response.id]: response,
        },
      });
      dispatch(closeTeacherLoading());
    });
  };
};

export const editTeacher = (teacher, Id) => {
  return (dispatch) => {
    dispatch(showTeacherLoading());

    const createTeacherURL = `${serverApiBase}teachers/${Id}/`;
    patch(createTeacherURL, teacher).then((response) => {
      dispatch({
        type: TOGGLE_MODAL,
        modal: 'editTeacher',
      });
      dispatch({
        type: SET_TEACHER,
        value: {
          [Id]: response,
        },
      });
      dispatch(getTeachers(teacher.institution));
      dispatch(closeTeacherLoading());
    });
  };
};

export const deleteTeacher = (Id) => {
  return (dispatch) => {
    dispatch(showTeacherLoading());

    const createTeacherURL = `${serverApiBase}teachers/${Id}/`;

    deleteRequest(createTeacherURL).then(() => {
      dispatch({
        type: DELETE_TEACHER,
        value: Id,
      });
      dispatch(closeTeacherLoading());
    });
  };
};
