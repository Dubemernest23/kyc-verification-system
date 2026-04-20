import { Response } from "express"
// import { asyncHandler } from "../utils/asyncWrapper"

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    };
}

export const myProfile = async(req: AuthRequest, res: Response): Promise<void> =>{
    console.log(req.method)
    console.log(req.url)

    return 
};

