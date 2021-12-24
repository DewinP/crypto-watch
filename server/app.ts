import config from "config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

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
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
