import { Schema, model } from "mongoose";

const patientSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    patientId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dentalProblem: { type: String, required: true },
    assignedDoctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    infectionImage: { type: String, default: "" },
    treatmentNotes: { type: String, default: "" }
  },
  { timestamps: true }
);

export const PatientModel = model("Patient", patientSchema);
