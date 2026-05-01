import { MockDetectionResult } from "../types.js";

const mappings: Array<{ keyword: string; result: MockDetectionResult }> = [
  {
    keyword: "cavity",
    result: {
      infectionName: "Dental Cavity",
      severity: "Moderate",
      preventionTips: ["Brush twice daily", "Avoid sugary foods", "Use fluoride toothpaste"],
      recommendedSpecialist: "Endodontist"
    }
  },
  {
    keyword: "gum",
    result: {
      infectionName: "Gum Infection",
      severity: "Moderate",
      preventionTips: ["Maintain oral hygiene", "Use antiseptic mouthwash", "Regular dental checkups"],
      recommendedSpecialist: "Periodontist"
    }
  },
  {
    keyword: "aligned",
    result: {
      infectionName: "Misaligned Teeth",
      severity: "Low",
      preventionTips: ["Get an orthodontic assessment", "Wear aligners as prescribed", "Keep braces clean"],
      recommendedSpecialist: "Orthodontist"
    }
  },
  {
    keyword: "wisdom",
    result: {
      infectionName: "Wisdom Tooth Pain",
      severity: "High",
      preventionTips: ["Avoid chewing on the painful side", "Rinse gently with warm salt water", "Seek prompt dental review"],
      recommendedSpecialist: "Oral Surgeon"
    }
  }
];

export function runMockDentalDetection(label: string): MockDetectionResult {
  const normalized = label.toLowerCase();
  const match = mappings.find((entry) => normalized.includes(entry.keyword));
  return match?.result ?? {
    infectionName: "General Dental Infection",
    severity: "Low",
    preventionTips: ["Brush carefully twice a day", "Stay hydrated", "Book a checkup if symptoms persist"],
    recommendedSpecialist: "Pediatric Dentist"
  };
}
