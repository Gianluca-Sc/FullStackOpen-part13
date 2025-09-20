import { DataTypes, Model } from "sequelize";
import { sequelize } from "../util/db.js";
import bcrypt from "bcrypt";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required",
        },
      },
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Username is required",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required",
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "user",
  }
);

export default User;
