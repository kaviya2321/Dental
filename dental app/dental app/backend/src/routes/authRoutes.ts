import { Router } from "express";
import { createAuthController } from "../controllers/authController.js";

export function createAuthRoutes(jwtSecret: string) {
  const router = Router();
  const controller = createAuthController(jwtSecret);

  router.post("/signup", controller.signup);
  router.post("/login", controller.login);

  return router;
}
