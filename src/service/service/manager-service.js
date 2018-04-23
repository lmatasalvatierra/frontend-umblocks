import COIManagerContract from '../contracts/COIManager.json';
import logger from '../logger';

const contract = require('truffle-contract');

const ManagerProvider = {
  manager: null,
  instance(web3Instance) {
    if (!this.manager) {
      if (typeof web3Instance !== 'undefined') {
        let managerContract = contract(COIManagerContract);
        managerContract.setProvider(web3Instance.currentProvider);
        if (typeof managerContract.currentProvider.sendAsync !== 'function') {
          managerContract.currentProvider.sendAsync = function sendAsync() {
            return managerContract.currentProvider.send.apply(
              managerContract.currentProvider,
              arguments,
            );
          };
        }
        managerContract.defaults({ from: process.env.ACCOUNT });
        this.manager = managerContract;
      } else {
        logger.debug('Web3 is not initialized.');
      }
    }
    return this.manager;
  }
};

export default ManagerProvider;
