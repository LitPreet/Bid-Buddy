import { env } from "@/app/env";
import * as schema from "./schema";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

declare global {
  // eslint-disable-next-line no-var -- only var works here
  var database: PostgresJsDatabase<typeof schema> | undefined;
}

let database: PostgresJsDatabase<typeof schema>;
let pg: ReturnType<typeof postgres>;
// const client = postgres(process.env.DATABASE_URL!);
// export const db = drizzle(client);

if (env.DATABASE_URL) {
  pg = postgres(env.DATABASE_URL);

  if (!global.database) {
    global.database = drizzle(pg, { schema });
  }

  database = global.database;
} else {
  throw new Error("DATABASE_URL is not defined in environment variables.");
}

export { database, pg };

// if (env.NODE_ENV === "production") {
//   pg = postgres(env.DATABASE_URL);
//   database = drizzle(pg, { schema });
// } else {
//   if (!global.database) {
//     pg = postgres(env.DATABASE_URL);
//     global.database = drizzle(pg, { schema });
//   }
//   database = global.database;
// }

// export { database, pg };