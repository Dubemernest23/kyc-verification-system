import { Response } from "express";
import { AppError } from "../types/error";

/**
 * 
 * @param res 
 * @param statusCode 
 * @param msg 
 * @param error 
 * @returns 
 */

// sendError function
export const sendError = (res: Response, statusCode: number, msg: string, error?: any) =>{
    return res.status(statusCode).json({
        success: false,
        msg, 
        error
    })
}

// sendSuccess function
export const sendSuccess = (res: Response, statusCode: number, msg: string  , data?: any) =>{
    return res.status(statusCode).json({
        success:true,
        msg,
        data
    })
}


export const handleControllerError = (res: Response, error: unknown, fallbackmsg: string): void =>{
    if (error instanceof AppError){
        sendError(res, error.statusCode, error.message)
        return
    }

    if (error instanceof Error){
        sendError(res, 500, error.message || fallbackmsg)
        return
    }
    
    sendError(res, 500, fallbackmsg)
}