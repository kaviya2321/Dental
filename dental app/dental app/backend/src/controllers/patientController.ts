import { Request, Response } from "express";
import { AppointmentModel } from "../models/Appointment.js";
import { DoctorModel } from "../models/Doctor.js";
import { PatientModel } from "../models/Patient.js";

export const patientController = {
  myProfile: async (req: Request, res: Response) => {
    const patient = await PatientModel.findOne({ userId: req.user?.id }).populate("assignedDoctorId");
    res.json(patient);
  },
  appointmentHistory: async (req: Request, res: Response) => {
    const patient = await PatientModel.findOne({ userId: req.user?.id });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const appointments = await AppointmentModel.find({ patientId: patient._id }).sort({ appointmentDate: -1 }).lean();
    res.json(appointments);
  },
  browseDoctors: async (_req: Request, res: Response) => {
    const doctors = await DoctorModel.find().lean();
    res.json(doctors);
  }
};
