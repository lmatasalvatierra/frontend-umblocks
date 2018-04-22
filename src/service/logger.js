import bunyan from 'bunyan';

const streams = [
  {
    level: 'debug' || 'debug',
    stream: process.stdout,
  },
];

const logger = bunyan.createLogger({
  name: 'umblocks-frontend',
  streams,
});

export default logger;
