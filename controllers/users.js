import express from "express";
import { Blog, User } from "../models/index.js";
import bcrypt from "bcrypt";

const router = express.Router();

const userFinder = async (req, res, next) => {
  const { id } = req.params;
  req.user = await User.findByPk(id);

  if (!req.user) {
    return res.status(404).json({ error: "User not found" });
  }

  next();
};

router.get("/", async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
    include: { model: Blog, attributes: { exclude: ["userId"] } },
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const { password, name, username } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, username, password: hashedPassword });

  res.json({ user });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, {
    attributes: ["name", "username"],
    include: [
      {
        model: Blog,
        as: "readings",
        attributes: {
          exclude: ["userId", "createdAt", "updatedAt"],
        },
        through: {
          as: "readinglists",
          attributes: ["id", "read"],
        },
      },
    ],
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put("/:id", userFinder, async (req, res) => {
  const { newUsername } = req.body;
  const user = req.user;

  user.username = newUsername;
  await user.save();

  res.json(user);
});

export default router;
