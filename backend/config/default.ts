
import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT,
    dbUri: process.env.DB_URI,
    origin: process.env.ORIGIN || "http://localhost:3000",
    privateKey: process.env.JWT_PRIVATE_KEY || "",
    publicKey: process.env.JWT_PUBLIC_KEY || "",
    accessTokenTTL: "2h",
    refreshTokenTTL: "1y",
  };
  