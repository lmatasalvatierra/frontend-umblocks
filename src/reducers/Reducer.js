import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import owner from './owner'

const Reducer = combineReducers({
  routing: routerReducer,
  owner: owner
})

export default Reducer
