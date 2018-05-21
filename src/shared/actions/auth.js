import { history } from 'client/store';
import request from 'axios';
import UrlConstants from '../constant/url-constants';
import { USER_LOGGED_IN, USER_LOGOUT } from '../constant/ActionTypes';

const API_URL = UrlConstants(process.env.API_BASE_URL).LOGIN;

function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user,
  };
}

export function userLoggedOut() {
  document.cookie = 'user= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  return {
    type: USER_LOGOUT,
  };
}

export function loginUser(username, password, remember) {
  return async dispatch => {
    const result = await request.post(API_URL, { username, password });
    if(remember) {
      const date = new Date();
      date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
      const expires = `; expires=${date.toGMTString()}`;
      document.cookie = `user=${JSON.stringify(result.data)} ${expires}; path=/;`;
    }
    dispatch(userLoggedIn(result.data));
    history.push(`/${result.data.user_type}/${result.data.user_id}`);
  };
}
