import express from "express";
import axios from "axios";
import https from "https";
const router = express.Router();

router.get("/random", async (_req, res) => {
  try {
    const response = await axios.get("http://api.quotable.io/quotes/random");
    if (response.data && response.data.length > 0) {
      res.json(response.data[0]);
    } else {
      res.status(404).json({ error: "No quotes found" });
    }
  } catch (error) {
    console.error("Error fetching quote:", error.message);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

export default router;
