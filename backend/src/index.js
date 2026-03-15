import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";
import messageRoutes from "./routes/message.route.js";
import connMessageRoutes from "./routes/connMessage.route.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import { io, app, server } from "./lib/socket.js";
import cors from "cors";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT;

// middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/connectMessage", connMessageRoutes);

// production handling
// if (process.env.NODE_DEV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.use((_, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
server.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port", PORT);
});
