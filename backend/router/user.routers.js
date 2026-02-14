import e, { Router } from "express";
import { SignupPostRequestBodySchema } from "../validation/request.validation.js";
import { treeifyError } from "zod";
import { hashPasswordWithSalt } from "../utils/hash.js";
import { createUser, getUserByEmail } from "../service/user.service.js";

export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  // data validation using zod
  const validationResult = await SignupPostRequestBodySchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res.status(400).json({
      error: treeifyError(validationResult.error),
    });
  }

  const { firstname, lastname, email, password } = validationResult.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({
      error: "User already exist with email: " + email,
    });
  }

  const { salt, hashedPassword } = hashPasswordWithSalt(password);

  const user = await createUser(
    firstname,
    lastname,
    email,
    salt,
    hashedPassword,
  );

  return res.status(201).json({
    data: { userId: user.id },
    message: "User created successfully.",
  });
});
