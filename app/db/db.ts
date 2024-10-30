// import "./config";
import { drizzle } from "drizzle-orm/vercel-postgres";

import { sql } from "@vercel/postgres";
import { users, UserType } from "./schemas/users";
// import * as schema from "./schema";

export const db = drizzle(sql, { schema: { users } });
