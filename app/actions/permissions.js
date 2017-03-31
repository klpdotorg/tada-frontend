import { checkStatus } from './actions';
import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import {SERVER_API_BASE as serverApiBase,
 SERVER_AUTH_BASE as authApiBase} from 'config';
import { urls as URLs } from '../constants';

export const assignPermsToUser = (options, user) => {

    return function(dispatch, getState) {
        var url = URLs.USERS + `${user}/permissions/`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + sessionStorage.token,
            },
            body: JSON.stringify(options), 
        }).then(checkStatus);
    }

}
