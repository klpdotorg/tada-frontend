import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import {checkStatus, get} from './utils'
import {SERVER_API_BASE as serverApiBase,
 SERVER_AUTH_BASE as authApiBase} from 'config';
import { urls as Urls} from '../constants';
import _ from 'lodash';

export function sendFullReport(email) {
 return function (dispatch, getState){
   console.log("inside send full report");
   let url = Urls.REPORTS +"?to_email="+email;
   return sendReport(url);
}
}

export const sendFilteredReport = (from, to, email) => (dispatch, getState) => {
    let url = Urls.REPORTS +"?from=" + from + "&to=" + to + "&to_email="+email;
    return sendReport(url);

}

function sendReport(url) {
    return fetch(url,
     {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + sessionStorage.token
        }
      })
      .then(checkStatus); 
}