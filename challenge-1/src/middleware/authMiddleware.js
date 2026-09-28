import jwt from "jsonwebtoken";

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authentication token is required"
    });
  }

  const headerParts = authHeader.split(" ");
  const tokenType = headerParts[0];
  const token = headerParts[1];

  if (tokenType !== "Bearer") {
    return res.status(401).json({
      message: "Authorization header must use the Bearer scheme"
    });
  }

  if (!token) {
    return res.status(401).json({
      message: "Authentication token is required"
    });
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }

  req.user = decodedToken;

  next();
}

export { authenticate };
