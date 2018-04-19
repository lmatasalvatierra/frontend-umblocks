import logger from '../logger';
import dbRefresh from './dbRefresh';

export default function*(collectionsString) {
  logger.info('Connected.*g loaders');

  let collections = null;
  if (collectionsString) {
    collections = collectionsString.split(',');
  }

  yield dbRefresh(collections);

  logger.info('Finished load data.');
}
