import Web3 from 'web3';
import logger from '../logger';

const Web3Provider = {
  web3: null,
  get instance() {
    if (!this.web3) {
      try {
        const provider = new Web3.providers.WebsocketProvider(
          'ws://127.0.0.1:7545',
        );
        const web3 = new Web3(provider);
        logger.debug('Web3 initialized!');
        this.web3 = web3;
      } catch (err) {
        logger.debug(err);
        return false;
      }
    }
    return this.web3;
  },
};

export default Web3Provider;
