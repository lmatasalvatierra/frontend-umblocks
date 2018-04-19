import fs from 'fs';
import { argv } from 'yargs';
import logger from '../logger';

const path = __dirname;

const checkExecLoad = (loader, collections) => {
  for (let i = 0, length = collections.length; i < length; i += 1) {
    if (loader.startsWith(collections[i])) {
      return true;
    }
  }
  return false;
};

module.exports = function *(collections) {
  // How many previous versions we want to store
  let versions = 2;
  if (argv.versions) {
    versions = parseInt(argv.versions, 10);
  }
  try {
    const routesFiles = fs.readdirSync(`${path}/loaders`);
    for (let i = 0, length = routesFiles.length; i < length; i +=1) {
      const globalRefresh =
        !collections && routesFiles[i].endsWith('Loader.js');
      const specificCollectionRefresh =
        collections && checkExecLoad(routesFiles[i], collections);
      try {
        if (globalRefresh || specificCollectionRefresh) {
          const loader = require(`${path}/loaders/${routesFiles[i]}`);
          if (argv.reset) {
            yield loader.reset();
          } else {
            yield loader.cleanOld(versions);
            yield loader.load();
          }
        }
      } catch (e) {
        logger.error(e);
      }
    }
  } catch (e) {
    logger.error(e);
  }
};
