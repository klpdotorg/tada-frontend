import {SERVER_API_BASE as serverApiBase} from 'config';
import {checkStatus} from './utils'
import {fetchEntitiesFromServer, removeBoundary} from './actions'
import {push} from 'react-router-redux'


export function deleteInstitution(parentId, instiId){  
  return function(dispatch, getState) {
    return fetch(serverApiBase + 'institutions/'+ instiId +'/',{
      method: 'DELETE',
      headers: {
        'Authorization' : 'Token ' + sessionStorage.token
      }
    }).then(response => {
     if (response.status >= 200 && response.status < 300) {
      dispatch(removeBoundary(instiId, parentId))      
        //Route the user to the home dashboard page since the page they were on will be deleted
        dispatch(push('/'));        
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }).catch(error => {
      console.log('request failed', error)
    })
  }
}

const newInstitutionFetch = (options) => {
  return fetch(serverApiBase + 'institutions/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + sessionStorage.token
    },
    body: JSON.stringify(options)
  }).catch(error => {
    console.log('request failed', error)
  })
}

export const saveNewInstitution = options => dispatch => {
  return newInstitutionFetch(options).then(checkStatus).then(response => {    
    dispatch(fetchEntitiesFromServer(1))
    dispatch(push('/'));
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createInstitution'
    })
  })
}