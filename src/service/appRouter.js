import KoaRouter from 'koa-router';
import logger from './logger';

const appRouter = new KoaRouter();

appRouter.post('/api/test', async ctx => {
  ctx.body = {
    data: 'Api test successful',
  };
  logger.debug('Saving service', ctx.request.body)
});

export default appRouter;
