import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import cors from "cors";
import quoteRoutes from "./routes/quoteRoutes.js";
import { createServer } from "http";

const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: "http://localhost:5176" }));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.join(__dirname, "../../client/build");
app.use(express.static(buildPath));

app.use("/quote", quoteRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});


const server = createServer(app);
export default server;