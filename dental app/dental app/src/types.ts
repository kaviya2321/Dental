
export type Role = 'patient' | 'doctor';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  mobile?: string;
  lastVisit: string;
  infectionHistory: InfectionRecord[];
  treatmentHistory: Treatment[];
  messages: Message[];
  healthMetrics: HealthMetric[];
  appointments: Appointment[];
}

export interface Treatment {
  id: string;
  date: string;
  title: string;
  doctorName: string;
  notes: string;
  cost: string;
  prescriptions?: string[];
  followUpDate?: string;
}

export interface HealthMetric {
  id: string;
  label: string;
  value: string;
  status: 'good' | 'average' | 'poor';
  date: string;
}

export interface InfectionRecord {
  id: string;
  date: string;
  imageUrl: string;
  detection: string;
  prevention: string[];
  status: 'pending' | 'reviewed';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  readStatus?: 'sent' | 'delivered' | 'read';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: 'completed' | 'upcoming' | 'cancelled';
  imageUrl?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  bio: string;
  clinicName: string;
  patients: Patient[];
  appointments: Appointment[];
  avatar: string;
  coordinates: { lat: number; lng: number };
  timings: string;
  studiedIn: string;
  availableSlots: string[];
  gender: 'Male' | 'Female';
}
