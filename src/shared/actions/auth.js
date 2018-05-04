import { history } from 'client/store';
import request from 'axios';
import UrlConstants from '../constant/url-constants';

const API_URL = UrlConstants(process.env.API_BASE_URL).LOGIN;

function userLoggedIn(user) {
  return {
    type: 'USER_LOGGED_IN',
    payload: user,
  };
}

export default function loginUser(username, password) {
  return async function(dispatch) {
    const result = await request.post(API_URL, { username, password });
    dispatch(userLoggedIn(result.data));
    history.replace(`/${result.data.user_type}/${result.data.user_id}`);
  };
}
