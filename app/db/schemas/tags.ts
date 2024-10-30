import {
  pgTable,
  text,
  timestamp,
  boolean,
  real,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { db } from "../db";
import { eq, sql as drSql, InferInsertModel } from "drizzle-orm";
import { BusinessTable } from "./business";

export const TagsTable = pgTable(
  "tags",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    name: text("name").notNull(),
    businessId: uuid("businessId")
      .notNull()
      .references(() => BusinessTable.id),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt"),
    deletedAt: timestamp("deletedAt"),
  },
  (tags) => {
    return {
      uniqueIndex: uniqueIndex("unique_idx").on(tags.name),
    };
  }
);

export type TagsType = InferInsertModel<typeof TagsTable>;
