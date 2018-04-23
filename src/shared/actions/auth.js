import { history } from 'client/store';

function userLoggedIn(user) {
  return {
    type: 'USER_LOGGED_IN',
    payload: user,
  };
}

export default function loginUser(username, password) {
  return function(dispatch){
    switch (0) {
      case 0:
        dispatch(
          userLoggedIn({
            username,
            is_authenticated: true,
            user_type: 'owner',
          }),
        );
        history.push('/owner');
        break;
      case 1:
        dispatch(
          userLoggedIn({
            username,
            is_authenticated: true,
            user_type: 'carrier',
          }),
        );
        history.push('/carrier');
        break;
      case 2:
        dispatch(
          userLoggedIn({
            username,
            is_authenticated: true,
            user_type: 'broker',
          }),
        );
        history.push('/broker');
        break;
      default:
        break;
    }
  }
}
