import {Request, Response} from 'express'
import _ from 'lodash'
import {IUser} from '../interfaces'
import { CreateUserInputType } from '../schema/user.schema'
import { createUser } from '../service/user.service'


export async function createUserHandler(
    req: Request<{}, {}, CreateUserInputType["body"]>,
    res: Response) {
  try {
      const user = await createUser({email: req.body.email, username: req.body.username, password: req.body.password});
      return res.status(201).json(user)
  } catch (error) {
      return res.status(409).send(error.message)
  }
}

export async function getCurrentUserHandler(_:Request,res:Response){
    const user:IUser = res.locals.user;
  
    return res.send(user)
}