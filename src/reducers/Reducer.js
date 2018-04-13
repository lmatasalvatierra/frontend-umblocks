import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import owner from './owner'
import broker from './broker'
import carrier from './carrier'

const Reducer = combineReducers({
  routing: routerReducer,
  owner: owner,
  broker: broker,
  carrier: carrier
})

export default Reducer
