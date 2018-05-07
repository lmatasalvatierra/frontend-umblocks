import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import certificates from './certificates';
import policies from './policies';

const Reducer = combineReducers({
  routing: routerReducer,
  auth,
  certificates,
  policies,
});

export default Reducer;
