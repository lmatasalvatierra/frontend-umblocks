import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import owner from './owner'
import broker from './broker'

const Reducer = combineReducers({
  routing: routerReducer,
  owner: owner,
  broker: broker
})

export default Reducer
