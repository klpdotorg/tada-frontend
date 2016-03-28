import fetch from 'isomorphic-fetch';
	
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
export function requestEntities() {
	return {
		type: 'REQUEST_ENTITIES',
		isFetching: true
	}
}

export function receiveEntities(resp){
	console.log("Received entities");
	return {
		type: 'RECEIVE_ENTITIES',
		entities: resp
	}
}

export function requestLogin(username){
	return {
		type: 'LOGIN_REQUESTED',
		username
	}
}

export function loginSuccess(authtoken){
	sessionStorage.setItem('token', authtoken);
	return {
		type: 'LOGIN_SUCCESS',
		authenticated: true,
		auth_token: authtoken
	}
}

export function loginError()
{
	return {
		type: 'LOGIN_FAILED',
		error: true,
		authenticated: false
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
	    .catch(error => { console.log('request failed', error)})
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



