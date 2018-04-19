import bunyan from 'bunyan';

const streams = [
  {
    level: 'debug' || 'debug',
    stream: process.stdout,
  },
];

const logger = bunyan.createLogger({
  name: 'payments-frontend-dev',
  streams,
});

export default logger;
