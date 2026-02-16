import { createHmac, randomBytes } from "node:crypto";

export function hashPasswordWithSalt(password, userSalt = undefined) {
  // Generating salt
  const salt = userSalt ?? randomBytes(32).toString("hex");

  // Generating hashed password
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  return { salt, hashedPassword };
}
