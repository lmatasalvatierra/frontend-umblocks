import { store } from '../store/store'
import Web3 from 'web3'

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'
function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results
  }
}

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  var results
  const provider = new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545')
  const web3 = new Web3(provider)

  results = {
    web3Instance: web3
  }
  resolve(store.dispatch(web3Initialized(results)))
})

export default getWeb3
