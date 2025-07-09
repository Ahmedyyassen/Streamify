import { statusCode } from "../utils/statusCode.js";

export const errorHandler = (err, req, res, next) => {
  return res
    .status(err.code || 500)
    .json({
      status: err.status || statusCode["500"],
      message: err.message || "Internal Server Error",
      data: null,
    });
};

export const notFoundHandler = (req, res, next) => {
  return res
    .status(404)
    .json({ status: statusCode["404"], message: "This source is not found" });
}
