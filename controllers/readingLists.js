import express from "express";
import ReadingList from "../models/readingList.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const result = await ReadingList.create(req.body);
  res.json(result);
});

export default router;
