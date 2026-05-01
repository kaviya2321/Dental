export const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "04:00 PM"];

export const dummyDoctors = [
  { doctorId: "DOC-001", name: "Dr. Maya Nair", specialization: "Orthodontist", experience: "8 Years", clinicName: "SmileCraft Dental", contact: "+91 9000000001" },
  { doctorId: "DOC-002", name: "Dr. Arjun Rao", specialization: "Periodontist", experience: "11 Years", clinicName: "GumCare Clinic", contact: "+91 9000000002" },
  { doctorId: "DOC-003", name: "Dr. Neha Iyer", specialization: "Endodontist", experience: "10 Years", clinicName: "RootLine Dental", contact: "+91 9000000003" },
  { doctorId: "DOC-004", name: "Dr. Vikram Shah", specialization: "Pediatric Dentist", experience: "7 Years", clinicName: "Tiny Teeth Center", contact: "+91 9000000004" },
  { doctorId: "DOC-005", name: "Dr. Sara Thomas", specialization: "Oral Surgeon", experience: "13 Years", clinicName: "Precision Oral Care", contact: "+91 9000000005" }
];

const problems = ["Cavity pain", "Bleeding gums", "Braces review", "Wisdom tooth pain", "Sensitivity"];
const genders = ["Male", "Female"];

export function buildDummyPatients() {
  return Array.from({ length: 50 }, (_, index) => ({
    patientId: `PAT-${String(index + 1).padStart(3, "0")}`,
    name: `Patient ${index + 1}`,
    age: 18 + (index % 42),
    gender: genders[index % genders.length],
    phoneNumber: `900000${String(index + 1000).slice(-4)}`,
    dentalProblem: problems[index % problems.length],
    infectionImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    treatmentNotes: "Initial review pending.",
    assignedDoctorIndex: index % 5
  }));
}
