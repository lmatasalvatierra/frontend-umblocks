import KoaRouter from 'koa-router';
import Web3 from 'web3';
import logger from '../logger';

const moment = require('moment');

const Status = ['Active', 'Cancelled', 'Expired'];

const policyRouter = new KoaRouter();

policyRouter.get('/api/v1/policy/:id', async ctx => {
  try {
    const manager = await ctx.manager.deployed();
    const result = await manager.getPolicy(ctx.params.id);
    const json = JSON.parse(result);
    const policy = {
      policy_number: json.policy_number,
      insurance_type: json.insurance_type,
      effective_date: moment(parseInt(json.effective_date, 10), 'X').format(
        'DD/MM/YYYY',
      ),
      expiration_date: moment(parseInt(json.expiration_date, 10), 'X').format(
        'DD/MM/YYYY',
      ),
      status: Status[json.status],
      owner_email: json.user_email,
      owner_name: json.owner_name,
      owner_address: json.address,
    };
    ctx.response.body = policy;
  } catch (err) {
    logger.debug(err);
    ctx.throw('Generic Error', 500);
  }
});

policyRouter.put('/api/v1/policy/:id', async ctx => {
  try {
    const manager = await ctx.manager.deployed();
    const result = await manager.cancelPolicy(ctx.params.id);
    const response = {
      policy_number: result.logs[0].args.policyNumber.toNumber(),
      status: Status[result.logs[0].args.status],
    };
    ctx.response.body = response;
  } catch (err) {
    logger.debug(err);
    ctx.throw('Generic Error', 500);
  }
});

policyRouter.post('/api/v1/policy', async ctx => {
  try {
    const manager = await ctx.manager.deployed();
    const result = await manager.createPolicy(
      Web3.utils.asciiToHex(ctx.request.body.owner_email),
      Web3.utils.asciiToHex(ctx.request.body.insurance_type),
      parseInt(ctx.request.body.effective_date, 10),
      parseInt(ctx.request.body.expiration_date, 10),
      parseInt(ctx.request.body.user_id, 10)
    );
    const policy = {
      owner_email: Web3.utils.hexToAscii(result.logs[0].args.ownerEmail),
      effective_date: moment(
        result.logs[0].args.effectiveDate.toNumber(),
        'X',
      ).format('DD/MM/YYYY'),
      expiration_date: moment(
        result.logs[0].args.expirationDate.toNumber(),
        'X',
      ).format('DD/MM/YYYY'),
      insurance_type: Web3.utils.hexToAscii(result.logs[0].args.insuranceType),
      status: Status[result.logs[0].args.status],
      policy_number: result.logs[0].args.policyNumber.toNumber(),
    };
    ctx.response.body = policy;
  } catch (err) {
    console.log(err);
    ctx.throw('Generic Error', 500);
  }
});

export default policyRouter;
