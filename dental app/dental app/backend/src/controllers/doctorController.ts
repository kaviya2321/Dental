import { Request, Response } from "express";
import { AIReportModel } from "../models/AIReport.js";
import { AppointmentModel } from "../models/Appointment.js";
import { DoctorModel } from "../models/Doctor.js";
import { InfectionImageModel } from "../models/InfectionImage.js";
import { MessageModel } from "../models/Message.js";
import { PatientModel } from "../models/Patient.js";

export const doctorController = {
  listDoctors: async (_req: Request, res: Response) => {
    const doctors = await DoctorModel.find().lean();
    res.json(doctors);
  },
  doctorProfile: async (req: Request, res: Response) => {
    const doctor = await DoctorModel.findById(req.params.id).lean();
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const totalPatients = await PatientModel.countDocuments({ assignedDoctorId: doctor._id });
    res.json({ ...doctor, totalPatients });
  },
  ownDashboard: async (req: Request, res: Response) => {
    const doctor = await DoctorModel.findOne({ userId: req.user?.id });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const [totalPatients, todaysAppointments, pendingMessages, uploadedImages, detectedCases] = await Promise.all([
      PatientModel.countDocuments({ assignedDoctorId: doctor._id }),
      AppointmentModel.countDocuments({
        doctorId: doctor._id,
        appointmentDate: { $gte: start }
      }),
      MessageModel.countDocuments({ receiverId: doctor.doctorId }),
      InfectionImageModel.countDocuments({ doctorId: doctor._id }),
      AIReportModel.countDocuments({ doctorId: doctor._id })
    ]);

    res.json({ totalPatients, todaysAppointments, pendingMessages, uploadedImages, detectedCases });
  },
  assignedPatients: async (req: Request, res: Response) => {
    const doctor = await DoctorModel.findOne({ userId: req.user?.id });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const patients = await PatientModel.find({ assignedDoctorId: doctor._id }).lean();
    res.json(patients);
  }
};
