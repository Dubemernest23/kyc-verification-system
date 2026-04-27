import { Request, Response } from "express";
import { sendSuccess } from "../../utils/response";
import { userService } from "./user.service";

export const myProfile = async (_req: Request, res: Response): Promise<void> => {
  const profile = await userService.getProfile();

  sendSuccess(res, 200, "Profile fetched successfully", profile);
};
