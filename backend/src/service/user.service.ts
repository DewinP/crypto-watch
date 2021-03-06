import { omit } from "lodash";
import { FilterQuery } from "mongoose";
import UserModel, { UserDocument, UserInput } from "../model/user.model";

export async function createUser(input: UserInput){
    try {
        const user = await UserModel.create(input);
        return omit(user.toJSON(), "password");
    } catch (error:any) {
        throw new Error(error);
    }
}

export async function validatePassword({username,password}:{username:string, password:string}){
        const user = await UserModel.findOne({username});

        if(!user) return false

        const isValid = await user.comparePassword(password);

        if(!isValid) return false

        return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}