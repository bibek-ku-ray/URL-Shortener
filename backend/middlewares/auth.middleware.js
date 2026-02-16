import { validationUserToken } from "../utils/token.js";

export function authenticationMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) next()

  if (!authHeader.startsWith("Bearer")) {
    return res.status(400).json({
      error: "Authorization headers must starts with Bearer",
    });
  }

  const [_, token] = authHeader.split(" ");

  const payload = validationUserToken(token);

  req.user = payload;
  next();
}
