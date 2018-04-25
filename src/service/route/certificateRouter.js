import KoaRouter from 'koa-router';
import logger from '../logger';

const certificateRouter = new KoaRouter();

certificateRouter.get('/api/v1/certificate/:id', async ctx => {
  try {
    const manager = await ctx.manager.deployed();
    const result = await manager.getPoliciesOfCoi(ctx.params.id);
    const policies = JSON.parse(result);
    if (policies.length > 0) {
      ctx.response.body = policies;
    } else {
      ctx.throw('Generic Error', 500);
    }
  } catch (err) {
    logger.debug(err);
    ctx.throw('Generic Error', 500);
  }
});

export default certificateRouter;
