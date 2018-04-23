import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import owner from './owner';
import broker from './broker';
import carrier from './carrier';

const Reducer = combineReducers({
  routing: routerReducer,
  auth,
  owner,
  broker,
  carrier,
});

export default Reducer;
