import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthUserPayload } from "../types.js";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export function signToken(payload: AuthUserPayload, secret: string) {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}
