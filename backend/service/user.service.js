import { eq } from "drizzle-orm";
import db from "../src/db/index.js";
import { usersTable } from "../src/db/models/index.js";

export async function getUserByEmail(email) {
  const [existingUser] = await db
    .select({
      id: usersTable.id,
      firstname: usersTable.firstname,
      lastname: usersTable.lastname,
      email: usersTable.email,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return existingUser;
}

export async function createUser(firstname, lastname, email, salt, password) {
  const [user] = await db
    .insert(usersTable)
    .values({
      firstname,
      lastname,
      email,
      salt,
      password,
    })
    .returning({ id: usersTable.id });

  return user;
}
