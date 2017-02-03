export function userregistration(state = {
  error: false, 
  registered: false
}, action) {
  switch(action.type) {
    case 'USER_REGISTERED_SUCCESS':
    return {
      registered:true,
      error:false
    }

    default:
    return state;

  }
}

export function users(state={
  usersById: []
}, action) {
  switch(action.type){
    case 'USERS_FETCHED':
      const users = processUsers(action.users, state.usersById);
      return {
        ...state,
        ...users
      }
    case 'USER_CREATED':
       var copy = Object.assign({}, state.usersById);
        copy[action.user.id] = action.user;
        return Object.assign({}, {usersById: copy});

    default:
      return state;

  }
}

function processUsers(data, existingUsersById)
{
   var newUsersById = {};
  if(data && data.length > 0 )
  {
    data.map(user => {
      newUsersById[user.id] = user;
    })
  } 
  //Merge existing program details with new info from server. This will eliminate dupes.
  var mergedUserDetails = {}
  Object.assign(mergedUserDetails, existingUsersById, newUsersById);
  return {
    usersById: mergedUserDetails
  };
}
