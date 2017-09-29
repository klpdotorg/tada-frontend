const INITIAL_STATE = {
  authenticated: false,
  isLoggingIn: false,
  error: false,
  token: '',
  id: '',
  groups: [],
  permissions: {},
  first_name: '',
  last_name: '',
};

const Login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...state,
        authenticated: false,
        isLoggingIn: true,
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        authenticated: action.authenticated,
        isLoggingIn: false,
        error: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authenticated: action.authenticated,
        token: action.auth_token,
        isLoggingIn: false,
        error: false,
        id: action.id,
      };
    case 'USER_DATA_FETCHED':
      return {
        ...state,
        username: action.username,
        email: action.email,
        first_name: action.first_name,
        last_name: action.last_name,
        id: action.id,
        groups: action.groups,
        permissions: action.permissions,
      };

    case 'SELF_MODIFIED':
      return {
        ...state,
        email: action.email,
        first_name: action.first_name,
        last_name: action.last_name,
      };
    case 'LOGOUT':
      return {
        authenticated: false,
        isLoggingIn: false,
        error: false,
        token: '',
        id: '',
      };
    default:
      return state;
  }
};

export { Login };
