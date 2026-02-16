import jwt from "jsonwebtoken";
import { UserTokenSchema } from "../validation/token.validation.js";
import { treeifyError } from "zod";

const JWT_SECRET = process.env.JWT_SECRET;

export async function CreateUserToken(payload) {
  const validationResult = await UserTokenSchema.safeParseAsync(payload);

  if (validationResult.error) {
    throw new Error(treeifyError(validationResult.error));
  }

  const payloadValidatedData = validationResult.data;

  const token = jwt.sign(payloadValidatedData, JWT_SECRET);

  return token;
}

export function validationUserToken(token) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    console.log("verify token payload: ", payload);
    return payload;
  } catch (error) {
    return null;
  }
}
