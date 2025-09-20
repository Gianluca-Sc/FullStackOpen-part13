import express from "express";
import { Blog } from "../models/index.js";

const router = express.Router();

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);

  if (!req.blog) {
    return res.status(404).json({ error: "Blog not found" });
  }

  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.get("/:id", blogFinder, async (req, res) => {
  res.json(req.blog);
});

router.post("/", async (req, res) => {
  const blog = await Blog.create(req.body);
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

router.delete("/:id", blogFinder, async (req, res) => {
  await req.blog.destroy();
  res.status(204).end();
});

export default router;
