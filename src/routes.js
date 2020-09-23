import { Router } from "express";

import ServerController from "./app/controllers/ServerController";
import AuthenticateController from "./app/controllers/AuthenticateController";

const routes = Router();

routes.get("/", ServerController.index);

routes.post("/authenticate", AuthenticateController.create);

export default routes;
