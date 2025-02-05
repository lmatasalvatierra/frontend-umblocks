import KoaRouter from 'koa-router';
import Web3 from 'web3';
import logger from '../logger';

const moment = require('moment');
const uuidv4 = require('uuid/v4');
const uuidToHex = require('uuid-to-hex');
const hexToUuid = require('hex-to-uuid');

const certificateRouter = new KoaRouter();

const STATUS = ['Active', 'Cancelled', 'Expired'];

certificateRouter.post('/api/v1/certificate', async ctx => {
  try {
    const certificateUUID = uuidToHex(uuidv4(), true);
    const policies = ctx.request.body.policies.map(policy =>
      uuidToHex(policy, true)
    );
    const manager = await ctx.manager.deployed();
    const result = await manager.createCoi(
      Web3.utils.asciiToHex(ctx.request.body.owner_email),
      parseInt(ctx.request.body.effective_date, 10),
      uuidToHex(ctx.request.body.user_id, true),
      policies,
      certificateUUID
    );
    const certificate = {
      owner_email: Web3.utils.hexToAscii(result.logs[0].args.ownerEmail),
      owner_name: Web3.utils.hexToAscii(result.logs[0].args.ownerName),
      effective_date: moment(
        result.logs[0].args.effectiveDate.toNumber(),
        'X',
      ).format('DD/MM/YYYY'),
      certificate_number: hexToUuid(result.logs[0].args.certificateUUID),
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
    const uuid = uuidToHex(ctx.params.id, true);
    const result = await manager.getCoi(uuid);
    const jsonPolicies = JSON.parse(result[4]);
    const policies = jsonPolicies.map(policy => {
      return {
        policy_number: hexToUuid(policy.policy_uuid),
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
      certificate_number: hexToUuid(result[0]),
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
