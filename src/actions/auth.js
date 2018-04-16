import { store, history } from '../store/store'
import COIManagerContract from '../build/contracts/COIManager.json'
const contract = require('truffle-contract')

export function loginUser(username, password) {
  let web3 = store.getState().web3.web3Instance

  if (typeof web3 !== 'undefined') {
    return function(dispatch) {
      const manager = contract(COIManagerContract)
      manager.setProvider(web3.currentProvider)

      manager.deployed().then(function(instance) {
        // Attempt to sign up user.
        instance.loginOwner.call(web3.fromAscii(username), web3.fromAscii(password)).then(function(result) {
          if(result === true) {
            history.push(`/owner`)
          }
        }).catch(function(result) {
          alert('Username does not exist');
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
