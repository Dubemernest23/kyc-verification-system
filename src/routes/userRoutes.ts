import { Router } from "express";
import { myProfile } from "../controllers/userController";

export const userRoutes = Router();

userRoutes.get("/user/profile", myProfile);
