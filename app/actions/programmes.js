import { SERVER_API_BASE as serverApiBase } from 'config';

import { get, post, patch } from './requests';
import { SET_PROGRAMS, SET_PROGRAM, TOGGLE_MODAL, SELECT_PROGRAM } from './types';

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
    const fetchProgramsUrl = `${serverApiBase}surveys/`;

    get(fetchProgramsUrl).then((response) => {
      const { results } = response;
      dispatch(setPrograms(results));
      if (results.length) {
        dispatch(selectProgram(results[0].id));
      }
    });
  };
};

export const saveNewProgram = (options) => {
  return (dispatch) => {
    const createProgramURL = `${serverApiBase}surveys/`;

    post(createProgramURL, options).then((response) => {
      dispatch(programCreated({ [response.id]: response }));
      dispatch({
        type: TOGGLE_MODAL,
        modal: 'createProgram',
      });
    });
  };
};

export const saveProgram = (options) => {
  return (dispatch, getState) => {
    const { selectedProgram } = getState().programs;
    const editProgramURL = `${serverApiBase}surveys/${selectedProgram}/`;

    patch(editProgramURL, options).then((response) => {
      console.log(response);
      dispatch(programCreated({ [response.id]: response }));
      dispatch({
        type: TOGGLE_MODAL,
        modal: 'editProgram',
      });
    });
  };
};
