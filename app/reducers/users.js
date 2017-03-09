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

function processPage(users, pages, page)
{
  var listOfUsers = [];
  if(users && _.size(users) > 0)
  {  
   users.map(user => {
      listOfUsers.push(user.id);
    })
  }
 var result =  Object.assign({}, pages, {[page]: {
     ids: listOfUsers,
    fetching: false
  }});
  return result;
}


export function users(state={
  usersById: [],
  userCount: 0,
  currentPage: 1,
  pages: []//pages: { 1: {ids:[23,45,45], fetched: true}}
}, action) {
  switch(action.type){
    case 'USERS_FETCHED':
      const users = processUsers(action.users, state.usersById);
      const page = processPage(action.users, state.pages, action.page);
      //var final = Object.assign {{}, state, users, {pages: page}, {userCount: action.count}};
      return final;
    case 'USER_CREATED':
       var copy = Object.assign({}, state.usersById);
        copy[action.user.id] = action.user;
        return {
            ...state, 
            usersById: copy, 
            userCount: state.userCount + 1 
          };
    case 'USER_MODIFIED':
        var copy = Object.assign({}, state.usersById);
        copy[action.user.id] = action.user;
        
        return {
          ...state, 
          usersById: copy
        };
    case 'USER_DELETED':
        var copyState = _.omit(state.usersById,action.id);
        let userPages = processPage(copyState, state.pages, state.currentPage);
        return {
          ...state,
          usersById: copyState,
          pages: userPages
        }
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
