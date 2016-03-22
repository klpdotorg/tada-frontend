import fetch from 'isomorphic-fetch';

module.exports = {
	
	selectPrimarySchool: function(){
		return {
			type: 'PRIMARY_SELECTED'
		}
	},

	showPrimarySchoolHierarchy: function(){
		return function(dispatch){
			dispatch(selectPrimarySchool)
			return dispatch(fetchEntities(1,1))
		}
		
	},
	showPreschoolHierarchy: function() {
		return {
			type: 'PRESCHOOL_SELECTED'
		}
	},
	requestEntities: function() {
		return {
			type: 'REQUEST_ENTITIES',
			isFetching: true
		}
	},
	receiveEntities: function (resp){
		console.log("Received entities");
		return {
			type: 'RECEIVE_ENTITIES',
			entities: resp
		}
	},

	fetchEntities:function(entityId, entityType) {

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

		    return fetch(`http://www.google.com`)
		      .then(

		        // We can dispatch many times!
		        // Here, we update the app state with the results of the API call.

		        dispatch(receiveEntities(response))
		      )

		      // In a real world app, you also want to
		      // catch any error in the network call.
		  }
	}

}

