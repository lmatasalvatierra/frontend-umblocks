import COIManagerContract from '../contracts/COIManager.json';
import logger from '../logger';

const contract = require('truffle-contract');
var manager;

class ManagerProvider {
  getManager(web3Instance) {
    if (typeof web3Instance !== 'undefined') {
      manager = contract(COIManagerContract);
      manager.setProvider(web3Instance.currentProvider);
      if (typeof manager.currentProvider.sendAsync !== 'function') {
        manager.currentProvider.sendAsync = function sendAsync() {
          return manager.currentProvider.send.apply(
            manager.currentProvider,
            arguments,
          );
        };
      }
      manager.defaults({ from: process.env.ACCOUNT });
      console.log('managerproviderinhere', manager)
    } else {
      logger.debug('Web3 is not initialized.');
    }
    return manager;
  }
}

module.exports = new ManagerProvider();
