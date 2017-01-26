import {SERVER_API_BASE as serverApiBase,
 SERVER_AUTH_BASE as authApiBase} from 'config';

export const urls = {
	PROGRAMMES: serverApiBase + "programmes/",
	LOGIN: authApiBase + "auth/login/",
	LOGOUT: authApiBase + "auth/logout/",
	REGISTER: authApiBase + "auth/register/",
	USER_PROFILE: authApiBase + "auth/me/"
}

