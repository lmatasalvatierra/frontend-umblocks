import KoaRouter from 'koa-router';
import Web3 from 'web3';
import logger from '../logger';

const moment = require('moment');
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

policyRouter.post('/api/v1/policy', async ctx => {
  try {
    const manager = await ctx.manager.deployed();
    const result = await manager.createPolicy(
      1,
      Web3.utils.asciiToHex(ctx.request.body.insurance_type),
      parseInt(ctx.request.body.effective_date, 10),
      parseInt(ctx.request.body.expiration_date, 10),
      parseInt(ctx.request.body.user_id, 10)
    );
    const policy = {
      effective_date: moment(result.logs[0].args.effectiveDate.toNumber(), 'X').format('DD/MM/YYYY'),
      expiration_date: moment(result.logs[0].args.expirationDate.toNumber(), 'X').format('DD/MM/YYYY'),
      insurance_type: Web3.utils.hexToAscii(result.logs[0].args.insuranceType),
      status: result.logs[0].args.status.toNumber(),
      policy_number: result.logs[0].args.policyNumber.toNumber(),
    }
    ctx.response.body = policy;
  } catch (err) {
    console.log(err);
    ctx.throw('Generic Error', 500);
  }
});

export default policyRouter;
