-- Alpha Dent demo seed data
-- Run after schema.sql

INSERT INTO users (name, email, password_hash, role, profile_photo, phone_number)
VALUES
  ('Dr. Maya Nair', 'doc-001@dental.ai', 'Password@123', 'doctor', 'https://api.dicebear.com/8.x/notionists/svg?seed=Dr.%20Maya%20Nair', '+91 9000000001'),
  ('Dr. Arjun Rao', 'doc-002@dental.ai', 'Password@123', 'doctor', 'https://api.dicebear.com/8.x/notionists/svg?seed=Dr.%20Arjun%20Rao', '+91 9000000002'),
  ('Dr. Neha Iyer', 'doc-003@dental.ai', 'Password@123', 'doctor', 'https://api.dicebear.com/8.x/notionists/svg?seed=Dr.%20Neha%20Iyer', '+91 9000000003'),
  ('Patient 1', 'patient-001@dental.ai', 'Password@123', 'patient', '', '9000001000'),
  ('Patient 2', 'patient-002@dental.ai', 'Password@123', 'patient', '', '9000001001');

INSERT INTO doctors (user_id, doctor_code, name, profile_photo, specialization, experience, clinic_name, contact)
VALUES
  (1, 'DOC-001', 'Dr. Maya Nair', 'https://api.dicebear.com/8.x/notionists/svg?seed=Dr.%20Maya%20Nair', 'Orthodontist', '8 Years', 'SmileCraft Dental', '+91 9000000001'),
  (2, 'DOC-002', 'Dr. Arjun Rao', 'https://api.dicebear.com/8.x/notionists/svg?seed=Dr.%20Arjun%20Rao', 'Periodontist', '11 Years', 'GumCare Clinic', '+91 9000000002'),
  (3, 'DOC-003', 'Dr. Neha Iyer', 'https://api.dicebear.com/8.x/notionists/svg?seed=Dr.%20Neha%20Iyer', 'Endodontist', '10 Years', 'RootLine Dental', '+91 9000000003');

INSERT INTO doctor_available_time_slots (doctor_id, time_slot)
VALUES
  (1, '09:00 AM'),
  (1, '10:30 AM'),
  (1, '12:00 PM'),
  (2, '10:30 AM'),
  (2, '02:00 PM'),
  (3, '09:00 AM'),
  (3, '04:00 PM');

INSERT INTO patients (user_id, patient_code, name, age, gender, phone_number, dental_problem, assigned_doctor_id, infection_image, treatment_notes)
VALUES
  (4, 'PAT-001', 'Patient 1', 24, 'Male', '9000001000', 'Cavity pain', 1, 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80', 'Initial review pending.'),
  (5, 'PAT-002', 'Patient 2', 31, 'Female', '9000001001', 'Bleeding gums', 2, 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80', 'Scaling recommended after consultation.'),
  (NULL, 'PAT-003', 'Patient 3', 19, 'Male', '9000001002', 'Sensitivity', 1, '', 'Needs x-ray before treatment planning.');

INSERT INTO appointments (appointment_code, patient_id, doctor_id, appointment_date, time_slot, status, reason)
VALUES
  ('APT-PAT-001', 1, 1, '2026-04-12 09:00:00', '09:00 AM', 'pending', 'Cavity pain'),
  ('APT-PAT-002', 2, 2, '2026-04-12 10:30:00', '10:30 AM', 'accepted', 'Bleeding gums'),
  ('APT-PAT-003', 3, 1, '2026-04-13 12:00:00', '12:00 PM', 'completed', 'Sensitivity');

INSERT INTO messages (chat_id, sender_user_id, receiver_user_id, text)
VALUES
  ('chat-1-4', 4, 1, 'I have tooth pain on the left side.'),
  ('chat-1-4', 1, 4, 'Please avoid cold foods and come in for the morning slot.'),
  ('chat-2-5', 5, 2, 'My gums bleed while brushing.'),
  ('chat-2-5', 2, 5, 'We should examine your gums and clean the buildup if needed.');
