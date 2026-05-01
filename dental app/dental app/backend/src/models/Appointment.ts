import { Schema, model } from "mongoose";

const appointmentSchema = new Schema(
  {
    appointmentId: { type: String, required: true, unique: true },
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    appointmentDate: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected", "cancelled", "completed"], default: "pending" },
    reason: { type: String, default: "" }
  },
  { timestamps: true }
);

export const AppointmentModel = model("Appointment", appointmentSchema);
