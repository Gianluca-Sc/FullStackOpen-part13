export const errorHandler = (error, req, res, next) => {
  let customError = {
    statusCode: error.statuscode || 500,
    msg: error.message,
  };

  if (error.name === "SequelizeValidationError") {
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
