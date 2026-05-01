import { Router } from "express";
import { aiController } from "../controllers/aiController.js";

export const aiRoutes = Router();

aiRoutes.post("/detect", aiController.detect);
