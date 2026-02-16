import crypto from "node:crypto";

import { Router } from "express";
import {
  LoginPostRequestBodySchema,
  SignupPostRequestBodySchema,
} from "../validation/request.validation.js";
import { treeifyError } from "zod";
import { hashPasswordWithSalt } from "../utils/hash.js";
import { createUser, getUserByEmail } from "../service/user.service.js";
import { CreateUserToken } from "../utils/token.js";

export const userRouter = Router();

// Signup route
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

// Login route
userRouter.post("/login", async (req, res) => {
  const validationResult = await LoginPostRequestBodySchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res.status(400).json({
      error: treeifyError(validationResult.error),
    });
  }

  const { email, password } = validationResult.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(404).json({
      error: `User with email: ${email} doesn't exist`,
    });
  }

  const { hashedPassword } = hashPasswordWithSalt(password, user.salt);

  const passwordMatch = crypto.timingSafeEqual(
    Buffer.from(hashedPassword),
    Buffer.from(user.password),
  );

  if (!passwordMatch) {
    return res.status(401).json({
      error: "Invalid Credentials",
    });
  }

  const token = await CreateUserToken({ id: user.id });

  return res.status(200).json({ token });
});
