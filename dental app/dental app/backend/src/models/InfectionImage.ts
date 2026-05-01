import { Schema, model } from "mongoose";

const infectionImageSchema = new Schema(
  {
    imageId: { type: String, required: true, unique: true },
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    imageUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const InfectionImageModel = model("InfectionImage", infectionImageSchema);
