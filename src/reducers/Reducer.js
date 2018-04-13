import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const Reducer = combineReducers({
  routing: routerReducer
})

export default Reducer
