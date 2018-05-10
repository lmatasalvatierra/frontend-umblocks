import KoaRouter from 'koa-router';
import logger from '../logger';

const moment = require('moment');
const hexToUuid = require('hex-to-uuid');

const brokerRouter = new KoaRouter();

brokerRouter.get('/api/v1/broker/:id/certificates', async ctx => {
  try {
    const manager = await ctx.manager.deployed();
    const result = await manager.getCoisOfBroker(ctx.params.id);
    const json = JSON.parse(result);

    const certificates = json.map(certificate => {
      return {
        certificate_number: hexToUuid(certificate.certificate_uuid),
        effective_date: moment(
          parseInt(certificate.effective_date, 10),
          'X',
        ).format('DD/MM/YYYY'),
        email: certificate.user_email,
        owner: certificate.user_name,
      };
    });
    ctx.response.body = certificates;
  } catch (err) {
    logger.debug(err);
    ctx.throw('Generic Error', 500);
  }
});

export default brokerRouter;
