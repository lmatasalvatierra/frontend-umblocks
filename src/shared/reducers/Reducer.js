import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import certificates from './certificates';
import policies from './policies';

const appReducer = combineReducers({
  routing: routerReducer,
  auth,
  certificates,
  policies,
});

const Reducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default Reducer;
