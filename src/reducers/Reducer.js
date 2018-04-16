import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import owner from './owner'
import broker from './broker'
import carrier from './carrier'
import web3 from './web3'

const Reducer = combineReducers({
  routing: routerReducer,
  owner: owner,
  broker: broker,
  carrier: carrier,
  web3: web3
})

export default Reducer
