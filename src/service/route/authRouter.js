import KoaRouter from 'koa-router';
import Web3 from 'web3';

const hexToUuid = require('hex-to-uuid');

const authRouter = new KoaRouter();

authRouter.post('/api/v1/login', async ctx => {
  try {
    const manager = await ctx.manager.deployed();
    const result = await manager.login(
      Web3.utils.asciiToHex(ctx.request.body.username),
      ctx.request.body.password
    );
    const type = result[1].toNumber();
    const uuid = hexToUuid(result[0]);
    switch (type) {
      case 0:
        ctx.body = {
          is_authenticated: true,
          user_type: 'owner',
          username: ctx.request.body.username,
          user_id: uuid,
          name: Web3.utils.hexToAscii(result[2]),
        };
        break;
      case 1:
        ctx.body = {
          is_authenticated: true,
          user_type: 'carrier',
          username: ctx.request.body.username,
          user_id: uuid,
          name: Web3.utils.hexToAscii(result[2]),
        };
        break;
      case 2:
        ctx.body = {
          is_authenticated: true,
          user_type: 'broker',
          username: ctx.request.body.username,
          user_id: uuid,
          name: Web3.utils.hexToAscii(result[2]),
        };
        break;
      default:
        ctx.response.status = 403;
    }
  } catch (err) {
    console.log(err);
    ctx.response.status = 403;
  }
});

export default authRouter;
