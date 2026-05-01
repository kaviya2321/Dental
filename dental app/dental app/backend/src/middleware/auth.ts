import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthUserPayload } from "../types.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthUserPayload;
  }
}

export function requireAuth(secret: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

    if (!token) {
      return res.status(401).json({ message: "Missing token" });
    }

    try {
      req.user = jwt.verify(token, secret) as AuthUserPayload;
      next();
    } catch {
      res.status(401).json({ message: "Invalid token" });
    }
  };
}
