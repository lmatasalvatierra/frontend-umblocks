import mongoose from 'mongoose';
import Koa from 'koa';
import cors from 'kcors';
import koaStatic from 'koa-static';
import send from 'koa-send';
import koaPassport from 'koa-passport';
import bodyParser from 'koa-bodyparser';
import xmlParser from 'koa-xml-body';
import session from 'koa-generic-session';
import redisStore from 'koa-redis';
import redis from 'redis';
import dotenv from 'dotenv';
import Web3Provider from './service/web3-service';
import ManagerProvider from './service/manager-service';
import appRouter from './appRouter';
import authRouter from './route/authRouter';
import policyRouter from './route/policyRouter';
import certificateRouter from './route/certificateRouter';
import carrierRouter from './route/carrierRouter';
import brokerRouter from './route/brokerRouter';
import ownerRouter from './route/ownerRouter';

dotenv.config();

const app = new Koa();

app.use(bodyParser());

// Initialize Web3
const web3Instance = Web3Provider.instance;

// Initialize Manager
const managerInstance = ManagerProvider.instance(web3Instance);

app.context.manager = managerInstance;

// Initialize routes
app.use(appRouter.routes());
app.use(authRouter.routes());
app.use(policyRouter.routes());
app.use(certificateRouter.routes());
app.use(carrierRouter.routes());
app.use(brokerRouter.routes());
app.use(ownerRouter.routes());

const port = 3408;
app.listen(port, () => {
  console.log(`Service started on port ${port}`); // eslint-disable-line no-console
});
