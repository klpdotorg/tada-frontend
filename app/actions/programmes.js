import { SERVER_API_BASE as serverApiBase } from 'config';

import { get, post, patch } from './requests';
import {
  SET_PROGRAMS,
  SET_PROGRAM,
  TOGGLE_MODAL,
  SELECT_PROGRAM,
  SHOW_PROGRAMS_LOADING,
  CLOSE_PROGRAMS_LOADING,
} from './types';

export const showProgramLoading = () => {
  return {
    type: SHOW_PROGRAMS_LOADING,
  };
};

export const closeProgramLoading = () => {
  return {
    type: CLOSE_PROGRAMS_LOADING,
  };
};

export const openEditProgramModal = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'editProgram',
    });
  };
};

export const openCreateProgramModal = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'createProgram',
    });
  };
};

export const selectProgram = (value) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_PROGRAM,
      value,
    });
  };
};

export const setPrograms = (value) => {
  return {
    type: SET_PROGRAMS,
    value,
  };
};

export const programCreated = (value) => {
  return {
    type: SET_PROGRAM,
    value,
  };
};

export const fetchAllPrograms = () => {
  return (dispatch) => {
    dispatch(showProgramLoading());

    const fetchProgramsUrl = `${serverApiBase}surveys/`;

    get(fetchProgramsUrl).then((response) => {
      const { results } = response;
      dispatch(setPrograms(results));
      if (results.length) {
        dispatch(selectProgram(results[0].id));
      }
      dispatch(closeProgramLoading());
    });
  };
};

export const saveNewProgram = (options) => {
  return (dispatch) => {
    dispatch(showProgramLoading());
    const createProgramURL = `${serverApiBase}surveys/`;

    post(createProgramURL, options).then((response) => {
      dispatch(programCreated({ [response.id]: response }));
      dispatch({
        type: TOGGLE_MODAL,
        modal: 'createProgram',
      });
      dispatch(closeProgramLoading());
    });
  };
};

export const saveProgram = (options) => {
  return (dispatch, getState) => {
    dispatch(showProgramLoading());

    const { selectedProgram } = getState().programs;
    const editProgramURL = `${serverApiBase}surveys/${selectedProgram}/`;

    patch(editProgramURL, options).then((response) => {
      dispatch(programCreated({ [response.id]: response }));
      dispatch({
        type: TOGGLE_MODAL,
        modal: 'editProgram',
      });
      dispatch(closeProgramLoading());
    });
  };
};
