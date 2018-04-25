import KoaRouter from 'koa-router';
import Web3 from 'web3';
import logger from '../logger';

const policyRouter = new KoaRouter();

policyRouter.get('/api/v1/policy/:id', async ctx => {
  try {
    const manager = await ctx.manager.deployed();
    const result = await manager.getPolicy(ctx.params.id);
    ctx.response.body = JSON.parse(result);
  } catch (err) {
    logger.debug(err);
    ctx.throw('Generic Error', 500);
  }
});

export default policyRouter;
