import { Schema, model } from "mongoose";

const doctorSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    profilePhoto: { type: String, default: "" },
    specialization: { type: String, required: true },
    experience: { type: String, required: true },
    clinicName: { type: String, required: true },
    contact: { type: String, required: true },
    availableTimeSlots: [{ type: String, required: true }]
  },
  { timestamps: true }
);

export const DoctorModel = model("Doctor", doctorSchema);
