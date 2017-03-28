import {checkStatus} from '../actions/utils';
import {SERVER_API_BASE as serverApiBase} from 'config';
import {mapValues} from 'lodash'
export const getManagement = () => {
    return fetch(serverApiBase + 'institutionmanagements/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      }
    }).then(checkStatus).catch(error => {
      console.log('request failed', error)
    })
  }

export const getLanguages = () => {
    return fetch(serverApiBase + 'languages/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      }
    }).then(checkStatus).catch(error => {
      console.log('request failed', error)
    })
  }

export const getInstitutionCategories = () => {
    return fetch(serverApiBase + 'institutioncategories/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      }
    }).then(checkStatus).catch(error => {
      console.log('request failed', error)
    })
  }

export const replaceNull = (obj) => {
  return mapValues(obj, (val) => val ? val : '')
}

export const displayFullName = (person) => {
  return `${person.first_name || ''} ${person.middle_name || ''} ${person.last_name || ''}`
}
