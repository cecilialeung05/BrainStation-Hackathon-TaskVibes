import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import cors from "cors";
import quoteRoutes from "./routes/quoteRoutes.js";

const app = express();
const PORT = process.env.PORT || 8082;

app.use(cors({ origin: "http://localhost:5176" }));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.join(__dirname, "../client");
app.use(express.static(buildPath));

// API routes
app.use("/quote", quoteRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
