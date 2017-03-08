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

function processDeletedUser(deletedUserId, pages, currentPage)
{
  var copyOfPages = Object.assign({},pages);
  if(copyOfPages && _.size(copyOfPages) > 0)
  {  
    var userIdsInPage = copyOfPages[currentPage].ids;
    userIdsInPage.splice(userIdsInPage.indexOf(parseInt(deletedUserId)),1);
  }
  copyOfPages[currentPage]={ids:userIdsInPage,fetching:false};
  return copyOfPages;
}

function processPage(users, pages, page)
{
  var copyOfPages = Object.assign({},pages);
  var listOfUsers = [];
  if(users && users.length > 0)
  {  
    users.map(user => {
      listOfUsers.push(user.id);
    })
  }
  copyOfPages[page]={ids:listOfUsers,fetching:false};
  return copyOfPages;
}

function processNewUser(newUser, users, pages)
{
  var listOfUsers = [];
  var pageCount = _.size(pages);
  var lastPageIds = pages[pageCount];
  if(lastPageIds.length < 19)
  {
    lastPageIds.push(newUser.id);
    pages[pageCount] = lastPageIds;
  }
  else{
    listOfUsers.push(newUser.id);
    pages[pageCount + 1] = listOfUsers;
  }

}

export function users(state={
  usersById: [],
  userCount: 0,
  currentPage: 1,
  pages: []//pages: { 1: {ids:[23,45,45], fetched: true}}
}, action) {
  switch(action.type){
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.page
      }
    case 'USERS_FETCHED':
      const users = processUsers(action.users, state.usersById);
      const page = processPage(action.users, state.pages, action.page);
      return {
        ...state,
        ...users,
        pages: page,
        userCount: action.count     
      }
    case 'USER_CREATED':
       var copy = Object.assign({}, state.usersById);
        copy[action.user.id] = action.user;
        let pagination = processPage(Object.values(copy), state.pages, state.currentPage);
        var newState = Object.assign({}, 
                          {usersById: copy,
                          pages: pagination,
                          userCount: state.userCount + 1 });
        console.log("user created", newState);
        return newState;
  case 'USER_DELETED':
        var copyState = _.omit(state.usersById,action.id);
        let userPages = processDeletedUser(action.id, state.pages, state.currentPage);
        return {
          ...state,
          usersById: copyState,
          pages: userPages,
          userCount: state.userCount -1
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
