import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../util/config.js";
import Session from "../models/session.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user)
    return res.status(401).json({
      error: "invalid username or password",
    });

  if (user.disabled) {
    return res.status(401).json({ error: "User disabled" });
  }

  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!passwordCorrect) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET, { expiresIn: "7d" });

  await Session.create({
    userId: user.id,
    token: token,
  });

  res.status(200).send({ token, username: user.username, name: user.name });
});

export default router;
