import { Router } from "express";
import { myProfile } from "./user.controller";

const userRoutes = Router();

userRoutes.get("/profile", myProfile);

export { userRoutes };
