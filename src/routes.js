import { Router } from 'express';

import auth from './app/middleware/auth';

import ServerController from './app/controllers/ServerController';
import AuthenticateController from './app/controllers/AuthenticateController';
import TodoListController from './app/controllers/TodoListController';
import TasksController from './app/controllers/TasksController';

const routes = Router();

routes.get('/', ServerController.index);

routes.post('/authenticate', AuthenticateController.create);

routes.get('/todolist', auth, TodoListController.index);
routes.post('/todolist', auth, TodoListController.create);
routes.delete('/todolist/:id', auth, TodoListController.delete);

routes.get('/tasks/:todo_list_id', auth, TasksController.index);
routes.post('/tasks/:todo_list_id', auth, TasksController.create);
routes.put('/tasks/:id', auth, TasksController.update);
routes.delete('/tasks/:id', auth, TasksController.delete);

export default routes;
