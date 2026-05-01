import { Request, Response } from "express";
import { UserModel } from "../models/User.js";
import { comparePassword, hashPassword, signToken } from "../utils/auth.js";

export function createAuthController(jwtSecret: string) {
  return {
    signup: async (req: Request, res: Response) => {
      const { name, email, password, role, phoneNumber } = req.body;
      const existing = await UserModel.findOne({ email });

      if (existing) {
        return res.status(409).json({ message: "Email already exists" });
      }

      const user = await UserModel.create({
        name,
        email,
        role,
        phoneNumber,
        passwordHash: await hashPassword(password)
      });

      const token = signToken({ id: String(user._id), email: user.email, role: user.role }, jwtSecret);
      res.status(201).json({ token, user });
    },
    login: async (req: Request, res: Response) => {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });

      if (!user || !(await comparePassword(password, user.passwordHash))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = signToken({ id: String(user._id), email: user.email, role: user.role }, jwtSecret);
      res.json({ token, user });
    }
  };
}
