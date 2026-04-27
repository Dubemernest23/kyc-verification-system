import { Router } from "express";
import { userRoutes } from "../modules";

const apiRoutes = Router();

apiRoutes.use("/user", userRoutes);

export default apiRoutes;
