# SQL backend files

These files provide a SQL version of the backend storage model for Alpha Dent.

Files:

- `schema.sql`: creates tables for `users`, `doctors`, `patients`, `doctor_available_time_slots`, `appointments`, and `messages`
- `seed.sql`: inserts a few demo doctors, patients, appointments, and chat messages

Main storage tables:

- `doctors`: doctor profile and clinic details
- `patients`: patient details, dental problem, assigned doctor, infection image, and treatment notes

Assumptions:

- The SQL is written to be SQLite-compatible
- `users` is kept because doctors and patients are tied to login accounts in the existing backend design
- Demo passwords in `seed.sql` are placeholder values and should be hashed if you wire this into real authentication
