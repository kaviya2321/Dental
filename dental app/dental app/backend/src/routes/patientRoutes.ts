import { Router } from "express";
import { patientController } from "../controllers/patientController.js";

export const patientRoutes = Router();

patientRoutes.get("/me", patientController.myProfile);
patientRoutes.get("/me/appointments", patientController.appointmentHistory);
patientRoutes.get("/browse-doctors", patientController.browseDoctors);
