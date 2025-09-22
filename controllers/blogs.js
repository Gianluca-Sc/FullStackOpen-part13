import express from "express";
import { Blog, User } from "../models/index.js";
import { checkSession, tokenExtractor } from "../util/middleware.js";
import { Op } from "sequelize";

const router = express.Router();

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);

  if (!req.blog) {
    return res.status(404).json({ error: "Blog not found" });
  }

  next();
};

router.get("/", async (req, res) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${req.query.search}%` } },
      { author: { [Op.iLike]: `%${req.query.search}%` } },
    ];
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: { model: User, attributes: ["name"] },
    where,
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});

router.get("/:id", blogFinder, async (req, res) => {
  res.json(req.blog);
});

router.post("/", tokenExtractor, checkSession, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id });
  res.json(blog);
});

router.put("/:id", blogFinder, async (req, res) => {
  const { likes } = req.body;

  if (!likes) {
    return res.status(400).json({ error: "Missing required field" });
  }

  req.blog.likes = likes;
  await req.blog.save();
  res.json(req.blog);
});

router.delete(
  "/:id",
  tokenExtractor,
  checkSession,
  blogFinder,
  async (req, res) => {
    if (req.blog.userId !== req.decodedToken.id)
      return res.status(401).json({ error: "Unauthorized" });

    await req.blog.destroy();
    res.status(204).end();
  }
);

export default router;
