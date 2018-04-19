import mongoose from 'mongoose';
import co from 'co';
import { argv } from 'yargs';
import logger from '../logger';
import dbRefresh from './dbRefresh';

const dbReady = () => {
  co(function*() {
    let collections = null;
    if (argv.collections) {
      collections = argv.collections.split(',');
    }

    yield dbRefresh(collections);

    logger.info('Finished load data.');
    process.exit(0);
  });
};

logger.debug('Connecting to mongodb');

const mongoUri =
  process.env.MONGODB_URI ||
  process.env.MONGOLAB_URI ||
  'mongodb://localhost:27017/payments-frontend';

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, dbReady);
