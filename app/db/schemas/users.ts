import { uuid, text, pgTable, uniqueIndex } from "drizzle-orm/pg-core";
import { eq, InferInsertModel } from "drizzle-orm";
import { db } from "../db";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
  },
  (users) => {
    return {
      uniqueIndex: uniqueIndex("unique_idx").on(users.email),
    };
  }
);

export type UserType = InferInsertModel<typeof users>;
