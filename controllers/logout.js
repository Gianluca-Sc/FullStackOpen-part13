import express from "express";
import { tokenExtractor } from "../util/middleware.js";
import Session from "../models/session.js";

const router = express.Router();

router.delete("/", tokenExtractor, async (req, res) => {
  const { id } = req.decodedToken;

  await Session.destroy({
    where: {
      userId: id,
    },
  });

  res.status(204).end();
});

export default router;
