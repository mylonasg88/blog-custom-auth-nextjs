import {
  pgTable,
  text,
  timestamp,
  boolean,
  real,
  uuid,
} from "drizzle-orm/pg-core";
import { db } from "../db";
import { eq, sql as drSql, InferInsertModel, desc } from "drizzle-orm";

// Use this object to send drizzle queries to your DB
// export const db = drizzle(sql);

export const DishesTable = pgTable("dishes", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price"),
  image: text("image"),
  tag: text("tag"),
  isDisabled: boolean("isDisabled").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt"),
  disabledAt: timestamp("disabledAt"),
  deletedAt: timestamp("deletedAt"),
});

export type DishesType = InferInsertModel<typeof DishesTable>;

// export const createDish = async (name: string, description: string, price: string, image: string, tag: string) => {
//     return db.insert(DishesTable).values({ name, description, price, image, tag }).returning();
// }

export const insertDish = async ({
  name,
  description,
  price,
  image,
  tag,
  isDisabled,
}: {
  name: string;
  description: string;
  price: number | undefined;
  image: string | undefined;
  tag: string | undefined;
  isDisabled: boolean | undefined;
}) => {
  const dish = await db
    .insert(DishesTable)
    .values({
      name,
      description,
      price,
      image,
      tag,
      isDisabled,
    })
    .returning();
};

export const findAll = async () => {
  try{
    return await db.select().from(DishesTable).orderBy(desc(DishesTable.createdAt));
  } catch(error) {
    console.log("Error:", error);
    return [];
  }
};

export const findById = async (id: string) => {
  const dish = await db.select().from(DishesTable)
}

export const findDishByName = async (name: string) => {
  // const user = await db.query.users.findMany({
  //   where: () => {}
  // })

  return (await db.select().from(DishesTable).where(drSql`${DishesTable.name} = ${name}`));

  // return (await db.select().from(DishesTable).where(eq(DishesTable.name, name))).flat();
}

export const findByTag = async (tag: string) => {
  try {
    return (await db.select().from(DishesTable).where(drSql`${DishesTable.tag} = ${tag}`));
  } catch(error) {
    console.log("Error:", error);
    return [];
  }
}
