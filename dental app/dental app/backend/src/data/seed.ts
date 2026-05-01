import dotenv from "dotenv";
import { connectDatabase } from "../config/db.js";
import { dummyDoctors, buildDummyPatients, timeSlots } from "./seedData.js";
import { UserModel } from "../models/User.js";
import { DoctorModel } from "../models/Doctor.js";
import { PatientModel } from "../models/Patient.js";
import { AppointmentModel } from "../models/Appointment.js";
import { hashPassword } from "../utils/auth.js";

dotenv.config();

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required");

  await connectDatabase(uri);

  await Promise.all([
    UserModel.deleteMany({}),
    DoctorModel.deleteMany({}),
    PatientModel.deleteMany({}),
    AppointmentModel.deleteMany({})
  ]);

  const doctorDocs = [];

  for (const doctor of dummyDoctors) {
    const user = await UserModel.create({
      name: doctor.name,
      email: `${doctor.doctorId.toLowerCase()}@dental.ai`,
      passwordHash: await hashPassword("Password@123"),
      role: "doctor",
      phoneNumber: doctor.contact,
      profilePhoto: `https://api.dicebear.com/8.x/notionists/svg?seed=${encodeURIComponent(doctor.name)}`
    });

    const doctorDoc = await DoctorModel.create({
      ...doctor,
      userId: user._id,
      profilePhoto: user.profilePhoto,
      availableTimeSlots: timeSlots
    });

    doctorDocs.push(doctorDoc);
  }

  for (const patient of buildDummyPatients()) {
    const doctor = doctorDocs[patient.assignedDoctorIndex];
    const patientDoc = await PatientModel.create({
      patientId: patient.patientId,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phoneNumber: patient.phoneNumber,
      dentalProblem: patient.dentalProblem,
      assignedDoctorId: doctor._id,
      infectionImage: patient.infectionImage,
      treatmentNotes: patient.treatmentNotes
    });

    await AppointmentModel.create({
      appointmentId: `APT-${patient.patientId}`,
      patientId: patientDoc._id,
      doctorId: doctor._id,
      appointmentDate: new Date(),
      timeSlot: timeSlots[patient.age % timeSlots.length],
      status: "pending",
      reason: patient.dentalProblem
    });
  }

  console.log("Seed complete: 5 doctors and 50 patients created.");
  process.exit(0);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
