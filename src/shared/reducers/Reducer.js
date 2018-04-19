import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import owner from './owner';
import broker from './broker';
import carrier from './carrier';
import web3 from './web3';

const Reducer = combineReducers({
  routing: routerReducer,
  auth,
  owner,
  broker,
  carrier,
  web3,
});

export default Reducer;