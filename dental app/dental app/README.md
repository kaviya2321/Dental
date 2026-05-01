# Dental Care AI Workspace

This workspace now contains:

- `src/`: the existing Vite web prototype
- `backend/`: Express + MongoDB + JWT + Socket.io API scaffold
- `mobile-app/`: Expo / React Native mobile scaffold

## Backend features scaffolded

- JWT authentication with signup/login
- MongoDB models for Doctors, Patients, Appointments, Messages, InfectionImages, AIReports
- Dummy data seeder for 5 doctors and 50 patients
- Appointment APIs
- Doctor and patient role APIs
- Mock AI dental infection detection
- Socket.io room-based chat bootstrap

## Mobile features scaffolded

- Expo Router project structure
- Auth flow screens
- Patient dashboard
- Doctor dashboard
- Shared theme and API client

## Backend run steps

1. Copy `backend/.env.example` to `backend/.env`
2. Set `MONGODB_URI` and `JWT_SECRET`
3. Install dependencies in `backend/`
4. Run `npm run seed`
5. Run `npm run dev`

## Mobile run steps

1. Install dependencies in `mobile-app/`
2. Run `npm run start`
3. Open in Expo Go or an emulator

## Notes

- Image upload currently uses a mock uploader service in `backend/src/services/uploadService.ts`.
- AI detection currently uses a mock model in `backend/src/services/mockAi.ts`.
- Socket events are wired in `backend/src/app.ts` and are ready for the Expo app to connect.
