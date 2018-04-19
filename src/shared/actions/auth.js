import Web3 from 'web3';
import { store, history } from 'client/store';

function userLoggedIn(user) {
  return {
    type: 'USER_LOGGED_IN',
    payload: user,
  };
}

export function loginUser(username, password) {
  const manager = store.getState().web3.managerInstance;
  return function(dispatch) {
    manager.deployed().then(instance => {
      // Attempt to sign up user.
      instance.login
        .call(Web3.utils.asciiToHex(username), Web3.utils.asciiToHex(password))
        .then(result => {
          switch (result.toNumber()) {
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
        })
        .catch(result => {
          alert('Username does not exist');
        });
    });
  };
}