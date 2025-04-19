
import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import quoteRoutes from "./routes/quoteRoutes.js";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/quote", quoteRoutes);

export const api = functions.https.onRequest(app);
