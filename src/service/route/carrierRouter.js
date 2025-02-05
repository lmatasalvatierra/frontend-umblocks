import KoaRouter from 'koa-router';
import logger from '../logger';

const moment = require('moment');
const uuidToHex = require('uuid-to-hex');
const hexToUuid = require('hex-to-uuid');

const Status = ['Active', 'Cancelled', 'Expired'];

const carrierRouter = new KoaRouter();

carrierRouter.get('/api/v1/carrier/:id/policies', async ctx => {
  try {
    const manager = await ctx.manager.deployed();
    const result = await manager.getPoliciesOfCarrier(
      uuidToHex(ctx.params.id, true)
    );
    const json = JSON.parse(result);

    const policies = json.map(policy => {
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
        status: Status[policy.status],
        email: policy.user_email,
      };
    });
    ctx.response.body = policies;
  } catch (err) {
    logger.debug(err);
    ctx.throw('Generic Error', 500);
  }
});

export default carrierRouter;
