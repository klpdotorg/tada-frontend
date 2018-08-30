import { SERVER_API_BASE as serverApiBase } from 'config';

import { get, post, patch, deleteRequest } from './requests';
import {
  SET_PROGRAMS,
  SET_PROGRAM,
  TOGGLE_MODAL,
  SELECT_PROGRAM,
  SHOW_PROGRAMS_LOADING,
  CLOSE_PROGRAMS_LOADING,
  DELETE_PROGRAM,
  CREATE_PROGRAM_ERROR,
} from './types';
import { closeConfirmModal } from './index';

export const toggleEditProgramModal = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'editProgram',
    });
    dispatch({
      type: CREATE_PROGRAM_ERROR,
      value: {},
    });
  };
};

export const toggleCreateProgramModal = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'createProgram',
    });
    dispatch({
      type: CREATE_PROGRAM_ERROR,
      value: {},
    });
  };
};

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

export const selectProgram = (value) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_PROGRAM,
      value,
    });
  };
};

export const setPrograms = (value, programId) => {
  return (dispatch) => {
    dispatch({
      type: SET_PROGRAMS,
      value,
    });
    if (value.length) {
      dispatch({
        type: SELECT_PROGRAM,
        value: programId || value[0].id,
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

export const fetchAllPrograms = (stateCode) => {
  const fetchProgramsUrl = `${serverApiBase}surveys/?state=${stateCode}`;

  return get(fetchProgramsUrl).then(({ data }) => {
    return data.results;
  });
};

export const getPrograms = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { state_code } = state.profile;
    dispatch(showProgramLoading());
    fetchAllPrograms(state_code).then((results) => {
      dispatch(setPrograms(results));
      dispatch(closeProgramLoading());
    });
  };
};

export const saveNewProgram = (options) => {
  return (dispatch, getState) => {
    const state = getState();
    const { state_code } = state.profile;

    const createProgramURL = `${serverApiBase}surveys/?state=${state_code}`;

    post(createProgramURL, options).then((response) => {
      if (response.status === 201) {
        dispatch(programCreated({ [response.data.id]: response.data }));
        dispatch(selectProgram(response.data.id));
        dispatch({
          type: TOGGLE_MODAL,
          modal: 'createProgram',
        });
        dispatch({
          type: CREATE_PROGRAM_ERROR,
          value: '',
        });
      } else {
        dispatch({
          type: CREATE_PROGRAM_ERROR,
          value: response.data,
        });
      }
    });
  };
};

export const saveProgram = (options) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(showProgramLoading());

    const { selectedProgram } = state.programs;
    const { state_code } = state.profile;
    const editProgramURL = `${serverApiBase}surveys/${selectedProgram}/?state=${state_code}`;

    patch(editProgramURL, options).then((response) => {
      if (response.status === 200) {
        dispatch(programCreated({ [response.data.id]: response.data }));
        dispatch({
          type: TOGGLE_MODAL,
          modal: 'editProgram',
        });
        dispatch(closeProgramLoading());
      } else {
        dispatch({
          type: CREATE_PROGRAM_ERROR,
          value: response.data,
        });
      }
    });
  };
};

export const deactivateProgram = (Id) => {
  return (dispatch, getState) => {
    dispatch(showProgramLoading());
    dispatch(closeConfirmModal());

    const state = getState();
    const { state_code } = state.profile;
    const program = state.programs.programs[Id];
    const newProgram = {
      name: program.name,
      status: 'IA',
    };

    const programURL = `${serverApiBase}surveys/${Id}/?state=${state_code}`;
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
    const { state_code } = state.profile;
    const url = `${serverApiBase}surveys/${Id}/?state=${state_code}`;

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
