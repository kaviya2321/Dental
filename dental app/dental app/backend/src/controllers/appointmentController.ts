import { Request, Response } from "express";
import { AppointmentModel } from "../models/Appointment.js";
import { DoctorModel } from "../models/Doctor.js";
import { PatientModel } from "../models/Patient.js";

export const appointmentController = {
  book: async (req: Request, res: Response) => {
    const { doctorId, patientId, appointmentDate, timeSlot, reason } = req.body;

    const appointment = await AppointmentModel.create({
      appointmentId: `APT-${Date.now()}`,
      doctorId,
      patientId,
      appointmentDate,
      timeSlot,
      reason,
      status: "pending"
    });

    res.status(201).json(appointment);
  },
  createPatientAndBook: async (req: Request, res: Response) => {
    const { doctorMongoId, name, age, gender, phoneNumber, dentalProblem, appointmentDate, timeSlot } = req.body;

    const patient = await PatientModel.create({
      patientId: `PAT-${Date.now()}`,
      name,
      age,
      gender,
      phoneNumber,
      dentalProblem,
      assignedDoctorId: doctorMongoId
    });

    const appointment = await AppointmentModel.create({
      appointmentId: `APT-${Date.now() + 1}`,
      doctorId: doctorMongoId,
      patientId: patient._id,
      appointmentDate,
      timeSlot,
      status: "pending",
      reason: dentalProblem
    });

    res.status(201).json({ patient, appointment });
  },
  cancel: async (req: Request, res: Response) => {
    const appointment = await AppointmentModel.findOneAndUpdate(
      { appointmentId: req.params.id },
      { status: "cancelled" },
      { new: true }
    );

    res.json(appointment);
  },
  updateStatus: async (req: Request, res: Response) => {
    const appointment = await AppointmentModel.findOneAndUpdate(
      { appointmentId: req.params.id },
      { status: req.body.status },
      { new: true }
    );

    res.json(appointment);
  },
  todaysByDoctor: async (req: Request, res: Response) => {
    const doctor = await DoctorModel.findOne({ userId: req.user?.id });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const appointments = await AppointmentModel.find({
      doctorId: doctor._id,
      appointmentDate: { $gte: start, $lte: end }
    }).populate("patientId");

    res.json(appointments);
  }
};
