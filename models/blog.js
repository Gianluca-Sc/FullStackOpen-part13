import { DataTypes, Model } from "sequelize";
import { sequelize } from "../util/db.js";

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Url is required",
        },
      },
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title is required",
        },
      },
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,

      allowNull: false,
      validate: {
        min: 1991,
        max: new Date().getFullYear(),
        isInt: true,
      },
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "blog",
  }
);

export default Blog;
