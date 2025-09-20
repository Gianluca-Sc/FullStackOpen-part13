import express from "express";
import Blog from "../models/blog.js";
import { sequelize } from "../util/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    group: "author",
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("author")), "article"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    order: [["likes", "DESC"]],
  });
  res.json(authors);
});

export default router;
