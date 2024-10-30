import {
  pgTable,
  text,
  timestamp,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";
import { InferInsertModel } from "drizzle-orm";
import { users } from "./users";

export const OrganisationTable = pgTable("businesses", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  logo: text("logo"),
  owner: uuid("owner")
    .notNull()
    .references(() => users.id),
  isDisabled: boolean("isDisabled").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt"),
  deletedAt: timestamp("deletedAt"),
});

export type OrganisationType = InferInsertModel<typeof OrganisationTable>;
