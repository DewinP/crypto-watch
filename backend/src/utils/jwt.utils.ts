import jwt from 'jsonwebtoken';
import config from 'config'


const privateKey = Buffer.from(
  config.get<string>("privateKey"),
  "base64"
).toString("ascii").replace(/\n\s+/g, "\n")
const publicKey = Buffer.from(
  config.get<string>("publicKey"),
  "base64"
).toString("ascii").replace(/\n\s+/g, "\n")


export function signJWT(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, privateKey, {
      ...(options && options),
      algorithm: "RS256",
    });
  }

export function verifyJWT(token: string) {
    try {
      const decoded = jwt.verify(token, publicKey);
      return {
        valid: true,
        expired: false,
        decoded,
      };
    } catch (e: any) {
      return {
        valid: false,
        expired: e.message === "jwt expired",
        decoded: null,
      };
    }
  }