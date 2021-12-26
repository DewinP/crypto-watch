import { Express } from "express";
import {
  createUserHandler,
  getCurrentUserHandler,
} from "../controller/user.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";
import {
  createFavoriteHandler,
  deleteFavoriteHandler,
  findFavorites,
} from "../controller/favorite.controller";
import { createSessionSchema } from "../schema/session.schema";
import {
  createSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "../controller/session.controller";

const routes = (app: Express) => {

  // Health Check
  app.get("/", (req, res) => {
    return res.json("Hello World!");
  });

  //Session
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  //User
  app.post(
    "/api/users/signup",
    validateResource(createUserSchema),
    createUserHandler
  );
  app.get("/api/me", requireUser, getCurrentUserHandler);

  //Favorties

  app.get("/api/favorites",  findFavorites);
  app.post(
    "/api/favorites/:coin_id",
    requireUser,
    createFavoriteHandler
  );
  app.delete("/api/favorites/:coin_id", requireUser, deleteFavoriteHandler);
};

export default routes;
