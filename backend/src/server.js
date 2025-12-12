import express from "express";
import router from "./routes/taskRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5003;
connectDb();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/tasks", router);

app.listen("5003", () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
