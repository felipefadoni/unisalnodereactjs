import { Router } from 'express';

import auth from './app/middleware/auth';

import ServerController from './app/controllers/ServerController';
import AuthenticateController from './app/controllers/AuthenticateController';

const routes = Router();

routes.get('/', ServerController.index);

routes.post('/authenticate', auth, AuthenticateController.create);

export default routes;
