import { get } from "lodash";
import { FilterQuery } from "mongoose";
import { signJWT, verifyJWT } from "../utils/jwt.utils";
import { findUser } from "./user.service";
import config from 'config'
import SessionModel, { SessionDocument } from "../model/session.model";

export const createSession = async (userId: string)=> {
    const session = await SessionModel.create({ user: userId});
  
    return session.toJSON();
}

export const findSession = async (query: FilterQuery<SessionDocument>)=> {
  return SessionModel.findOne(query).lean()
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJWT(refreshToken);

  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJWT(
    { ...user, session: session._id },
    { expiresIn: config.get<string>('accessTokenTTL')}
  );

  return accessToken;
}

export async function deleteSessions(
  query: FilterQuery<SessionDocument>,
) {
  return SessionModel.deleteMany(query); 
}