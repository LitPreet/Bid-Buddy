import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const bids = pgTable("bb_bids",{
    id: serial('id').primaryKey(),
})

// amount: integer("amount").notNull(),
// itemId: serial("itemId")
//   .notNull(),
//   // .references(() => items.id, { onDelete: "cascade" }),
// userId: text("userId")
//   .notNull(),
//   // .references(() => users.id, { onDelete: "cascade" }),
// timestamp: timestamp("timestamp", { mode: "date" }).notNull(),