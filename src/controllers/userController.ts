import { Request, Response } from "express";
import { sendSuccess } from "../utils/response";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const myProfile = async (req: Request, res: Response): Promise<void> => {
  sendSuccess(res, 200, "Profile fetched successfully", {
    id: "12345",
    email: "user@example.com",
    name: "John Doe"
  });
};

