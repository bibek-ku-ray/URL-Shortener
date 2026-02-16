import { validationUserToken } from "../utils/token.js";

export function authenticationMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next();
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(400).json({
      error: "Authorization header must start with 'Bearer '",
    });
  }

  const [_, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({
      error: "Token missing",
    });
  }

  try {
    const payload = validationUserToken(token);

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
}

export function ensureAuthenticated(req, res, next) {
  if (!req.user || !req.user.id) {
    console.log("req.user", req.user);
    return res.status(401).json({
      error: "You must be logged in to access this resource",
    });
  }
  next();
}
