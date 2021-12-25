import config from "config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import routes from "./routes";
import connect from './utils/connect.utils';
import deserializeUser from './middleware/deserializeUser';

const PORT = config.get<number>("port");

const app = express();

app.use(
  cors({
    origin: config.get<string>("origin"),
  })
);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(deserializeUser);

app.listen(PORT, async ()=>{
  await connect();
  console.log(`Server is listening on port http://localhost:${PORT}/api`)
  routes(app);
});