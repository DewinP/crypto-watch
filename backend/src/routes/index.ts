import { Express } from "express";
import {
  createUserHandler,
  getCurrentUserHandler,
} from "../controller/user.controller";
import meQueryCheck from "../middleware/meQueryCheck";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";
import {
  createFavoriteHandler,
  deleteFavoriteHandler,
  findAllFavoritesByUser,
} from "../controller/favorite.controller";
import { createFavoriteSchema } from "../schema/favorite.schema";
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
    "/api/session",
    validateResource(createSessionSchema),
    createSessionHandler
  );
  app.get("/api/session", requireUser, getUserSessionsHandler);
  app.delete("/api/session", requireUser, deleteSessionHandler);

  //User

  app.post(
    "/api/users/signup",
    validateResource(createUserSchema),
    createUserHandler
  );
  app.get("api/me", meQueryCheck, getCurrentUserHandler);

  //Favorties

  app.get("/api/favorites", requireUser, findAllFavoritesByUser);
  app.post(
    "/api/favorites",
    requireUser,
    validateResource(createFavoriteSchema),
    createFavoriteHandler
  );
  app.delete("/api/favorites/:coin_id", requireUser, deleteFavoriteHandler);
};

export default routes;
