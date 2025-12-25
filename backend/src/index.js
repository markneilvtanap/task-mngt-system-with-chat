import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const app = express();

const __dirname = path.resolve();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("Hello World");
});

if (process.env.NODE_DEV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
