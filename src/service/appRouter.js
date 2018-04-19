import KoaRouter from 'koa-router';

const appRouter = new KoaRouter();

appRouter.get('test', '/api/test', async ctx => {
  ctx.body = {
    data: 'Api test successful',
  };
});

export default appRouter;
