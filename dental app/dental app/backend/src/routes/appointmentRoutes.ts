import { Router } from "express";
import { appointmentController } from "../controllers/appointmentController.js";

export const appointmentRoutes = Router();

appointmentRoutes.post("/", appointmentController.book);
appointmentRoutes.post("/create-patient", appointmentController.createPatientAndBook);
appointmentRoutes.get("/today", appointmentController.todaysByDoctor);
appointmentRoutes.patch("/:id/cancel", appointmentController.cancel);
appointmentRoutes.patch("/:id/status", appointmentController.updateStatus);
