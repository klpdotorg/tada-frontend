import { SERVER_API_BASE as serverApiBase, PER_PAGE } from 'config';

import { get, post, patch, deleteRequest } from './requests';
import {
  SET_PROGRAMS,
  SET_PROGRAM,
  TOGGLE_MODAL,
  SELECT_PROGRAM,
  SHOW_PROGRAMS_LOADING,
  CLOSE_PROGRAMS_LOADING,
  DELETE_PROGRAM,
} from './types';
import { closeConfirmModal } from './index';

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
  return (dispatch) => {
    dispatch({
      type: SET_PROGRAMS,
      value,
    });
    if (value.length) {
      dispatch({
        type: SELECT_PROGRAM,
        value: value[0].id,
      });
    }
  };
};

export const programCreated = (value) => {
  return {
    type: SET_PROGRAM,
    value,
  };
};

export const fetchAllPrograms = () => {
  const fetchProgramsUrl = `${serverApiBase}surveys/?per_page=${PER_PAGE}`;

  return get(fetchProgramsUrl).then((response) => {
    return response.results;
  });
};

export const getPrograms = () => {
  return (dispatch) => {
    dispatch(showProgramLoading());
    fetchAllPrograms().then((results) => {
      dispatch(setPrograms(results));
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
      dispatch(selectProgram(response.id));
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

export const deactivateProgram = (Id) => {
  return (dispatch, getState) => {
    dispatch(showProgramLoading());
    dispatch(closeConfirmModal());

    const state = getState();
    const program = state.programs.programs[Id];
    const newProgram = {
      name: program.name,
      status: 'IA',
    };

    const programURL = `${serverApiBase}surveys/${Id}/`;
    patch(programURL, newProgram)
      .then(() => {
        dispatch(getPrograms());
      })
      .catch(() => {
        dispatch(closeProgramLoading());
      });
  };
};

export const deleteProgram = (Id) => {
  return (dispatch, getState) => {
    dispatch(showProgramLoading());
    dispatch(closeConfirmModal());

    const state = getState();
    const url = `${serverApiBase}surveys/${Id}/`;

    deleteRequest(url).then(() => {
      dispatch({
        type: DELETE_PROGRAM,
        value: Id,
      });
      const values = Object.values(state.programs.programs);
      dispatch(selectProgram(values[0].id));
      dispatch(closeProgramLoading());
    });
  };
};
