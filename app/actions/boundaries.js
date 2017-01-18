import {SERVER_API_BASE as serverApiBase} from 'config';
import {checkStatus} from './utils'
import {fetchEntitiesFromServer} from './actions'
import {push} from 'react-router-redux'

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