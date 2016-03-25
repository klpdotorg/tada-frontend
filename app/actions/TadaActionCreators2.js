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

export function loginSuccess(data){
	return {
		type: 'LOGIN_SUCCESS',
		authenticated: true,
		auth_token: data.auth_token
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
	return function(dispatch){
		return $.ajax({
	        type: "POST",
	        url: "http://tadadev.klp.org.in/auth/login/",
	        data: {username:email, password: pass},
	        success: function(data)
	        {
	        	dispatch(loginSuccess(data));
	          
	        },
	        error: function(data){
	          dispatch(loginError());
	        }
	      });
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



