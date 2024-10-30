import { defineConfig } from "drizzle-kit";

const dbUrl = process.env.POSTGRES_URL;// || "default_database_url";

if(!dbUrl){
  throw new Error("POSTGRES_URL is not defined");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./app/db/schemas",
  out: "./app/db/migrations",
  dbCredentials: {
    url: dbUrl,
  },
});
