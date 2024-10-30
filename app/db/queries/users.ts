import { eq } from "drizzle-orm";
import { db } from "../db";
import { users, UserType } from "../schemas/users";

export const findUserByEmail = async (email: string) => {
  return await db.select().from(users).where(eq(users.email, email));
};

export type CreateUserType = {
  email: string;
  name: string;
  password: string;
};

export const insertUser = async ({ email, name, password }: CreateUserType): Promise<UserType[]> => {
  return await db.insert(users).values({ email, name, password }).returning();
};
