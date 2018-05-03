import KoaRouter from 'koa-router';
import Web3 from 'web3';
import logger from '../logger';

const moment = require('moment');

const certificateRouter = new KoaRouter();

certificateRouter.post('/api/v1/certificate', async ctx => {
  try {
    const policies = ctx.request.body.policies.map(policy => +policy);
    const manager = await ctx.manager.deployed();
    const result = await manager.createCoi(
      Web3.utils.asciiToHex(ctx.request.body.owner_email),
      parseInt(ctx.request.body.effective_date, 10),
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

export default certificateRouter;
