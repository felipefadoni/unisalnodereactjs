import { Router } from 'express';

import auth from './app/middleware/auth';

import ServerController from './app/controllers/ServerController';
import AuthenticateController from './app/controllers/AuthenticateController';
import TodoListController from './app/controllers/TodoListController'

const routes = Router();

routes.get('/', ServerController.index);

routes.post('/authenticate', AuthenticateController.create);

routes.get('/todolist', auth, TodoListController.index);
routes.post('/todolist', auth, TodoListController.create);

export default routes;
