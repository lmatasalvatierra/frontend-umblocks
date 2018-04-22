import Web3 from 'web3';
import logger from '../logger';

// const getWeb3 = new Promise((resolve, reject) => {
//   // Wait for loading completion to avoid race conditions with web3 injection timing.
//   const provider = new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545');
//   const web3 = new Web3(provider);
//   const results = {
//     web3Instance: web3,
//   };
//   resolve(results);
// });

class Web3Provider {
  get() {
    try {
      const provider = new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545');
      const web3 = new Web3(provider);
      console.log(web3.currentProvider)
      logger.debug('Web3 initialized!');
      return web3;
    } catch (err) {
      logger.debug(err);
      return false;
    }
  }
}

module.exports = new Web3Provider();
