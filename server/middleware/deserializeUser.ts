import { NextFunction, Request, Response } from "express";
import { get } from 'lodash';
import { reIssueAccessToken } from '../service/sesison.service';
import { verifyJWT } from './../utils/jwt.utils';


const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const accessToken:string =  get(req, "headers.x-access-token", "");
    const refreshToken:string =  get(req, "headers.x-refresh-token", "");
    if (!accessToken) {
      return next();
    }
    const { decoded, expired } = verifyJWT(accessToken as string);

    
    if (decoded) {
      res.locals.user = decoded;
      return next();
    }
  
    if (expired && refreshToken) {
      const newAccessToken = await reIssueAccessToken({ refreshToken });
  
      if (newAccessToken) {
        res.setHeader("x-access-token", newAccessToken);
        res.cookie("accessToken", newAccessToken,{
          maxAge: 900000,
          httpOnly: true,
          path: '/',
          sameSite: 'strict',
          secure: false
      })
      }
  
      const result = verifyJWT(newAccessToken as string);
  
      res.locals.user = result.decoded;
      return next();
    }
  
    return next();
  };

export default deserializeUser;