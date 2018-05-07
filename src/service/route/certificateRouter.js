import KoaRouter from 'koa-router';
import Web3 from 'web3';
import logger from '../logger';

const moment = require('moment');

const certificateRouter = new KoaRouter();

const STATUS = ['Active', 'Cancelled', 'Expired'];

certificateRouter.post('/api/v1/certificate', async ctx => {
  try {
    const policies = ctx.request.body.policies.map(policy => +policy);
    const manager = await ctx.manager.deployed();
    const result = await manager.createCoi(
      Web3.utils.asciiToHex(ctx.request.body.owner_email),
      parseInt(ctx.request.body.effective_date, 10),
      parseInt(ctx.request.body.user_id, 10),
      policies
    );
    const certificate = {
      owner_email: Web3.utils.hexToAscii(result.logs[0].args.ownerEmail),
      owner_name: Web3.utils.hexToAscii(result.logs[0].args.ownerName),
      effective_date: moment(
        result.logs[0].args.effectiveDate.toNumber(),
        'X',
      ).format('DD/MM/YYYY'),
      certificate_number: result.logs[0].args.certificateNumber.toNumber(),
    };
    ctx.response.body = certificate;
  } catch (err) {
    console.log(err);
    ctx.throw('Generic Error', 500);
  }
});

certificateRouter.get('/api/v1/certificate/:id', async ctx => {
  try {
    const manager = await ctx.manager.deployed();
    const result = await manager.getCoi(ctx.params.id);
    const jsonPolicies = JSON.parse(result[4]);
    const policies = jsonPolicies.map(policy => {
      return {
        policy_number: policy.policy_number,
        insurance_type: policy.insurance_type,
        effective_date: moment(parseInt(policy.effective_date, 10), 'X').format(
          'DD/MM/YYYY',
        ),
        expiration_date: moment(
          parseInt(policy.expiration_date, 10),
          'X',
        ).format('DD/MM/YYYY'),
        status: STATUS[policy.status],
      };
    });
    const certificate = {
      certificate_number: result[0].toNumber(),
      owner_email: Web3.utils.hexToAscii(result[1]),
      owner_name: Web3.utils.hexToAscii(result[2]),
      effective_date: moment(result[3].toNumber(), 'X').format('DD/MM/YYYY'),
      policies,
    };
    ctx.response.body = certificate;
  } catch (err) {
    logger.debug(err);
    ctx.throw('Generic Error', 500);
  }
});

export default certificateRouter;
