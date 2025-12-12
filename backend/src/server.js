import express from "express";
import router from "./routes/taskRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5003;
const __dirname = path.resolve();

connectDb();
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}
app.use("/api/tasks", router);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen("5003", () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
