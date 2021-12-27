import { NextFunction, Request, Response } from "express";



const currentUserCheck = (_:Request, res:Response, next:NextFunction)=>{
    const user = res.locals.user;
    if(!user){
        return res.json({})
    }
    return next();
}

export default currentUserCheck;