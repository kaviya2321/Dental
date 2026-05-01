export type UserRole = "patient" | "doctor";

export interface AuthUserPayload {
  id: string;
  role: UserRole;
  email: string;
}

export interface MockDetectionResult {
  infectionName: string;
  severity: "Low" | "Moderate" | "High";
  preventionTips: string[];
  recommendedSpecialist: string;
}
