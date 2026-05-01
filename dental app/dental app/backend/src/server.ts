import dotenv from "dotenv";
import { createApp } from "./app.js";
import { connectDatabase } from "./config/db.js";

dotenv.config();

const port = Number(process.env.PORT || 5000);
const mongoUri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET || "development-secret";

if (!mongoUri) {
  throw new Error("MONGODB_URI is missing");
}

await connectDatabase(mongoUri);

const { httpServer } = createApp(jwtSecret);

httpServer.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
