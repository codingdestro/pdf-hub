import { Router } from "express";
import { login, signin } from "../controllers/users/auth";

const route = Router();

route.post("/auth/login", login);
route.post("/auth/signin", signin);

export default route;
