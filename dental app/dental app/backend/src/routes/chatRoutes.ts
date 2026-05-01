import { Router } from "express";
import { chatController } from "../controllers/chatController.js";

export const chatRoutes = Router();

chatRoutes.get("/:chatId", chatController.history);
chatRoutes.post("/", chatController.send);
