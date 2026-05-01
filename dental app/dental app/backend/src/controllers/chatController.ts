import { Request, Response } from "express";
import { MessageModel } from "../models/Message.js";

export const chatController = {
  history: async (req: Request, res: Response) => {
    const messages = await MessageModel.find({ chatId: req.params.chatId }).sort({ createdAt: 1 }).lean();
    res.json(messages);
  },
  send: async (req: Request, res: Response) => {
    const message = await MessageModel.create(req.body);
    res.status(201).json(message);
  }
};
