import { SECRET } from "./config.js";
import jwt from "jsonwebtoken";

export const errorHandler = (error, req, res, next) => {
  let customError = {
    statusCode: error.statuscode || 500,
    msg: error.message,
  };

  console.log(error);

  if (error.name === "SequelizeValidationError") {
    customError.statusCode = 400;
    customError.msg = error.errors.map(({ message }) => message).join(", ");
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    customError.statusCode = 400;
    customError.msg = error.errors.map(({ message }) => message).join(", ");
  }

  return res.status(customError.statusCode).json({
    error: customError.msg,
  });
};

export const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

export const userFinder = async (req, res, next) => {
  const { username } = req.params;
  req.user = await User.findOne({
    where: { username },
  });

  if (!req.user) {
    return res.status(404).json({ error: "User not found" });
  }

  next();
};

export const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};
