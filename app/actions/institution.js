import { push } from 'react-router-redux';
import Notifications from 'react-notification-system-redux';

import { SERVER_API_BASE as serverApiBase } from 'config';
import { get, post, deleteRequest, patch } from './requests';
import { getPath, getEntityDepth, convertEntitiesToObject, getEntityType } from '../utils';
import {
  SET_INSTITUTION_CATS,
  SET_INSTITUTION_MANAGEMENTS,
  TOGGLE_MODAL,
  SET_BOUNDARIES,
} from './types';
import {
  responseReceivedFromServer,
  requestFailed,
  toggleModal,
  getEntities,
  closeBoundaryLoading,
  removeEntity,
  openEntity,
  showBoundaryLoading,
  closeConfirmModal,
  showCreateBoundaryError,
  resetCreateBoundaryError,
  showEditBoundaryError,
  resetEditBoundaryError,
  toggleSpinner,
} from './index';
import { showSuccessMessage, errorNotification } from './notifications';

export const toggleCreateInstitutionModal = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'createInstitution',
    });
    dispatch(resetCreateBoundaryError());
  };
};

export const toggleClassModal = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'createClass',
    });
    dispatch(resetCreateBoundaryError());
  };
};

export const openTeachers = (id, depth) => {
  return (dispatch, getState) => {
    const state = getState();
    const path = getPath(state, id, depth);

    dispatch(push(`${path}/teachers/`));
  };
};

export const setInstitutionCats = (value) => {
  return {
    type: SET_INSTITUTION_CATS,
    value,
  };
};

export const setInstitutionManagements = (value) => {
  return {
    type: SET_INSTITUTION_MANAGEMENTS,
    value,
  };
};

export const fetchInstitutionDetails = (parentBoundaryId, moreIds) => {
  return (dispatch) => {
    const institutionsUrl = `${serverApiBase}institutions/?`;
    return get(`${institutionsUrl}admin3=${parentBoundaryId}`)
      .then(({ data }) => {
        dispatch(responseReceivedFromServer(data));
        if (moreIds && moreIds.length) {
          dispatch(getEntities(moreIds));
        } else {
          dispatch(closeBoundaryLoading());
        }
      })
      .catch((error) => {
        dispatch(requestFailed(error));
      });
  };
};

export const getManagements = () => {
  return (dispatch) => {
    get(`${serverApiBase}institution/managements`)
      .then(({ data }) => {
        const mnmts = data.results.map((management) => {
          return {
            value: management.id,
            label: management.name,
          };
        });
        dispatch(setInstitutionManagements(mnmts));
      })
      .catch((error) => {
        console.log('request failed', error);
      });
  };
};

export const getInstitutionCategories = () => {
  return (dispatch) => {
    get(`${serverApiBase}institution/categories`)
      .then(({ data }) => {
        const filterCats = data.results
          .filter((cat) => {
            return cat.type.id === 'primary';
          })
          .map((category) => {
            return {
              value: category.id,
              label: category.name,
            };
          });
        dispatch(setInstitutionCats(filterCats));
      })
      .catch((error) => {
        console.log('request failed', error);
      });
  };
};

export const modifyInstitution = (id, options) => {
  return (dispatch, getState) => {
    dispatch(toggleSpinner(true));
    const boundaryType = getState().schoolSelection.primarySchool ? 'primary' : 'pre';
    const newOptions = { ...options, institution_type: boundaryType };

    patch(`${serverApiBase}institutions/${id}/`, newOptions).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        const entities = convertEntitiesToObject([data]);

        dispatch({
          type: SET_BOUNDARIES,
          boundaryDetails: entities,
        });
        dispatch(resetEditBoundaryError());
        dispatch(Notifications.success(showSuccessMessage('Institution Modified!', 'Institution modified successfully.')));
      } else {
        dispatch(showEditBoundaryError(response.data));
      }

      dispatch(toggleSpinner(false));
    });
  };
};

export const saveNewInstitution = (options) => {
  return (dispatch, getState) => {
    const state = getState();
    const boundaryType = state.schoolSelection.primarySchool ? 'primary' : 'pre';
    const newOptions = { ...options, institution_type: boundaryType };
    post(`${serverApiBase}institutions/`, newOptions).then((response) => {
      if (response.status === 201) {
        const { data } = response;
        const entities = convertEntitiesToObject([data]);
        dispatch({
          type: SET_BOUNDARIES,
          boundaryDetails: entities,
        });
        dispatch(toggleModal('createInstitution'));

        const type = getEntityType(data);
        const depth = getEntityDepth(data);
        const path = getPath(state, { uniqueId: `${data.id}${type}`, type }, depth);

        dispatch(openEntity({ depth, uniqueId: `${data.id}${type}` }));
        dispatch(resetCreateBoundaryError());
        dispatch(Notifications.success(showSuccessMessage('Institution Created!', 'Institution created successfully.')));
        dispatch(push(path));
      } else {
        dispatch(showCreateBoundaryError(response.data));
      }
    });
  };
};

export const deleteInstitution = (params) => {
  return (dispatch) => {
    dispatch(showBoundaryLoading());
    dispatch(closeConfirmModal());

    return deleteRequest(`${serverApiBase}institutions/${params.boundaryId}/`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          dispatch(removeEntity(params));
          dispatch(Notifications.success(showSuccessMessage('Institution Deleted!', 'Institution successfully deleted!')));
        } else {
          dispatch(Notifications.error(errorNotification('Error!', 'Institution not deleted!')));
        }
      })
      .catch((error) => {
        console.log('request failed', error);
      });
  };
};
