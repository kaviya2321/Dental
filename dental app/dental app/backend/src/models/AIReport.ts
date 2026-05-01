import { Schema, model } from "mongoose";

const aiReportSchema = new Schema(
  {
    reportId: { type: String, required: true, unique: true },
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    infectionName: { type: String, required: true },
    severity: { type: String, enum: ["Low", "Moderate", "High"], required: true },
    preventionTips: [{ type: String, required: true }],
    recommendedSpecialist: { type: String, required: true }
  },
  { timestamps: true }
);

export const AIReportModel = model("AIReport", aiReportSchema);
