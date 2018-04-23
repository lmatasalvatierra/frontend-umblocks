import mongoose from 'mongoose';
import Koa from 'koa';
import cors from 'kcors';
import koaStatic from 'koa-static';
import send from 'koa-send';
import koaPassport from 'koa-passport';
import Auth0Strategy from 'passport-auth0';
import bodyParser from 'koa-bodyparser';
import xmlParser from 'koa-xml-body';
import session from 'koa-generic-session';
import redisStore from 'koa-redis';
import redis from 'redis';
import dotenv from 'dotenv';
import Web3Provider from './service/web3-service';
import appRouter from './appRouter';

dotenv.config();

const app = new Koa();

// Initialize routes
app.use(appRouter.routes());
// app.use(authRouter.routes());
// Initialize Web3
const web3Instance = Web3Provider.instance;

app.use(async ctx => {
  await send(ctx, './build/index.html');
});

const port = 3408;
app.listen(port, () => {
  console.log(`Service started on port ${port}`); // eslint-disable-line no-console
});
