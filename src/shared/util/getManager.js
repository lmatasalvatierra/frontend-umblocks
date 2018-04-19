import { store } from 'client/store';
import COIManagerContract from '../build/contracts/COIManager.json';

const contract = require('truffle-contract');

function managerInitialized(results) {
  return {
    type: 'MANAGER_INITIALIZED',
    payload: results,
  };
}

function getManager() {
  let results;
  const web3 = store.getState().web3.web3Instance;

  if (typeof web3 !== 'undefined') {
    const manager = contract(COIManagerContract);
    manager.setProvider(web3.currentProvider);
    if (typeof manager.currentProvider.sendAsync !== 'function') {
      manager.currentProvider.sendAsync = function() {
        return manager.currentProvider.send.apply(
          manager.currentProvider,
          arguments,
        );
      };
    }
    results = {
      managerInstance: manager,
    };
    store.dispatch(managerInitialized(results));
  } else {
    console.error('Web3 is not initialized.');
  }
}

export default getManager;
