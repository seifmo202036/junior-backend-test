import { validationResult } from "express-validator";

function handleValidationErrors(req, res, next) {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty() === false) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationErrors.array()
    });
  }

  next();
}

export { handleValidationErrors };
