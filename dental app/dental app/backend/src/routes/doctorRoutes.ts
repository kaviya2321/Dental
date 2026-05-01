import { Router } from "express";
import { doctorController } from "../controllers/doctorController.js";

export const doctorRoutes = Router();

doctorRoutes.get("/", doctorController.listDoctors);
doctorRoutes.get("/me/dashboard", doctorController.ownDashboard);
doctorRoutes.get("/me/patients", doctorController.assignedPatients);
doctorRoutes.get("/:id", doctorController.doctorProfile);
