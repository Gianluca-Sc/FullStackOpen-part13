import express from "express";
import ReadingList from "../models/readingList.js";
import { tokenExtractor } from "../util/middleware.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const result = await ReadingList.create(req.body);
  res.json(result);
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const { id } = req.params;
  const { read } = req.body;

  const readingList = await ReadingList.findByPk(id);
  if (!readingList) return res.status(404).json({ error: "Not found" });
  if (readingList.userId !== req.decodedToken.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  readingList.read = read;
  await readingList.save();
  res.json(readingList);
});

export default router;
