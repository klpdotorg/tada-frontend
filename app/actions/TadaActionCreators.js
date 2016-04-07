import fetch from 'isomorphic-fetch';
import config from '../config.js';

const serverApiBase = config.PROD_SERVER_API_BASE;

export function selectPrimarySchool(){
	return {
		type: 'PRIMARY_SELECTED'
	}
}

export function showPrimarySchoolHierarchy(){
	return function(dispatch){
		dispatch(selectPrimarySchool)
		return dispatch(fetchEntities(1,1))
	}
	
}
export function showPreschoolHierarchy() {
	console.log("show preschool hierarchy action creator")
	return {
		type: 'PRESCHOOL_SELECTED'
	}
}
function requestDataFromServer() {
	return {
		type: 'REQUEST_SENT',
		isFetching: true
	}
}

function responseReceivedFromServer(resp){
	console.log("Received entities");
	return {
		type: 'RESPONSE_RECEIVED',
		isFetching: false,
		data: resp.results
	}
}

function requestFailed(error)
{
	return {
		type: 'REQUEST_FAILED',
		statusCode: error.response.status,
		statusText: error.response.statusText,
		error: error.response
	}
}

export function requestLogin(username){
	return {
		type: 'LOGIN_REQUESTED',
		username
	}
}

function loginSuccess(authtoken){
	//This belongs in the reducer?
	sessionStorage.setItem('token', authtoken);
	return {
		type: 'LOGIN_SUCCESS',
		authenticated: true,
		auth_token: authtoken
	}
}

function loginError()
{
	return {
		type: 'LOGIN_FAILED',
		error: true,
		authenticated: false
	}
}

function requestLogout(username){
	return {
		type: 'LOGOUT_REQUESTED',
		username
	}
}

export function logoutUser(username){
	return function(dispatch, getState){
		dispatch(requestLogout(username));
		sessionStorage.delete('token');
	}
}



function userDataFetched(data)
{
	return {
		type: 'USER_DATA_FETCHED',
		username: data.username
	}
}



export function fetchBoundaryDetails(parentBoundaryId)
{
	return function(dispatch, getState)
	{
		
		var requestBody = {}
		var boundaryType = -1;
		if(getState().schools.schoolTypeSelection == "PRIMARY_SELECTED")
			boundaryType = 1
		else
			boundaryType = 2;
		requestBody = {parent: parentBoundaryId, boundary_type: boundaryType}
	   	//Send info about the whole request so we can track failure
	    //dispatch(requestDataFromServer())
	    return fetch(serverApiBase + 'boundaries/?parent=' + parentBoundaryId + '&boundary_type='+boundaryType, {
				      	method: 'GET',
				      	headers: {
				      		'Content-Type': 'application/json',
				      		'Authorization': 'Token ' + sessionStorage.token
				      	}
	    			}). then(checkStatus). then(data => {
	    				dispatch(responseReceivedFromServer(data))
	    			}). catch(error => {
	    				dispatch(requestFailed(error))
	    			})       
    }   
}

  //Method fetches institutions belonging to a particular Id from the institutions endpoint
  function fetchInstitutionDetails(parentBoundaryId)
  {
  	return function(dispatch, getState)
  	{
  		var institutionsUrl = "http://tadadev.klp.org.in/api/v1/institutions/?";
  		return fetch(institutionsUrl+'boundary='+parentBoundaryId,{
  			method: 'GET',
  			headers: {
  				'Content-Type': 'application/json',
  				'Authorization': 'Token ' + sessionStorage.token
  			}
  		}). then(checkStatus). then(data=> {
  			dispatch(responseReceivedFromServer(data))
  		}). catch(error => {
  			dispatch(requestFailed(error))
  		})
  	}
  }

/*
This function decides whether we need to go to the boundaries endpoint or the institutions endpoint for data
*/
export function fetchEntitiesFromServer(parentBoundaryId)
{
	return function(dispatch, getState)
	{
	  	var parentId=-1;
	    //Set it to 1 if there's no parent passed in.
	  	if(!parentBoundaryId)
	  	{
	  		parentId = 1;
	  	}
	  	else
	  	{
	  		parentId=parentBoundaryId;
	  	}
	  	//Initialize to the primary's district category (10)
	  	var parentBoundaryCat = 10;
		if(getState().schools.schoolTypeSelection == "PRESCHOOL_SELECTED")
	      parentBoundaryCat = 13;
	  	//If we have boundary details already and this is not the root district, then we retrieve the parent boundary category
	  	// from the boundary itself. We need to identify whether this is an institution or a boundary and call the appropriate endpoint
	    if(getState().entities.boundaryDetails.length >0 && parentId!=1)
	    {
	      parentBoundaryCat = getState().entities.boundaryDetails[parentId].boundary_category;
	    }
	    //If boundary type is a circle (preschool, 15) or a cluster (primary, 11), then fetch from the institutions endpoint
	    if(parentBoundaryCat == 11 || parentBoundaryCat == 15)
	    {
	      dispatch(fetchInstitutionDetails(parentId));
	    }
	    else
	    {
	      dispatch(fetchBoundaryDetails(parentId));
	    }
	}	
}

export function fetchUserData(token)
 {
      return function(dispatch) {
      	return fetch('http://tadadev.klp.org.in/auth/me/',{
        method: "GET",
        headers: {
        	'Authorization':'Token ' + token,
    		'Content-Type': 'application/json'
    	},        
      }). then(checkStatus(response))
      . then(data => {
      	dispatch(userDataFetched(data))
      . catch(error => { dispatch(requestFailed(error));
	    	console.log('request failed', error)})
      })
  }
 }

function checkStatus(response)
{
	if( response.status>=200 && response.status<300){
	    		return response.json();
	}
	else {
		const error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
}

export function sendLoginToServer(email, pass)
{
	return function(dispatch, getState){
		
		return fetch('http://tadadev.klp.org.in/auth/login/', {
	        method: "POST",
	        headers: {
    			'Content-Type': 'application/json'
  			},
	        body: JSON.stringify({username:email, password: pass})
	    }) . then(response =>{
	    	if( response.status>=200 && response.status<300){
	    		return response.json();
	    	}
	    	else {
	    		const error = new Error(response.statusText);
	    		error.response = response;
	    		dispatch(loginError(error));
	    		throw error;
	    	}
	    })
	    . then(data =>{
	    	 	dispatch(loginSuccess(data.auth_token))
	    })
	    .catch(error => { dispatch(loginError(error));
	    	console.log('request failed', error)})
	}
}

export function fetchEntities(entityId, entityType) {

	  // Thunk middleware knows how to handle functions.
	  // It passes the dispatch method as an argument to the function,
	  // thus making it able to dispatch actions itself.

	  return function (dispatch) {

	    // First dispatch: the app state is updated to inform
	    // that the API call is starting.

	    dispatch(requestEntities(entityId))

	    // The function called by the thunk middleware can return a value,
	    // that is passed on as the return value of the dispatch method.

	    // In this case, we return a promise to wait for.
	    // This is not required by thunk middleware, but it is convenient for us.

	    return fetch(`http://tadadev.klp.org.in/api/docs`)
	      .then(

	        // We can dispatch many times!
	        // Here, we update the app state with the results of the API call.

	        dispatch(receiveEntities('got resp'))
	      )

	      // In a real world app, you also want to
	      // catch any error in the network call.
	  }
}



