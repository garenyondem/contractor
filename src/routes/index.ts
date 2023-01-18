import { Router } from 'express';
import { getProfile } from '../middleware/getProfile';
import { routes as contractsHandler } from '../handlers/contract.handler';
import { routes as jobHandler } from '../handlers/job.handler';
import { routes as balancesHandler } from '../handlers/balance.handler';
import { routes as adminHandler } from '../handlers/admin.handler';

export const routes = Router();

routes.use('/contracts', getProfile, contractsHandler);
routes.use('/jobs', getProfile, jobHandler);
routes.use('/balances', getProfile, balancesHandler);
routes.use('/admin', getProfile, adminHandler);
