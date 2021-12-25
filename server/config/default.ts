
import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT || 3000,
    dbUri: process.env.DB_URI || "",
    origin: process.env.ORIGIN || "http://localhost:3000",
  };
  