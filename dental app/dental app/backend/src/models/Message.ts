import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    chatId: { type: String, required: true, index: true },
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const MessageModel = model("Message", messageSchema);
