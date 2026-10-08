import {
  mysqlTable,
  serial,
  varchar,
  boolean,
  bigint,
  int,
  timestamp,
  index,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 320 }).notNull().unique(),
    passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
    displayName: varchar("displayName", { length: 120 }),
    verified: boolean("verified").notNull().default(false),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => ({ emailIdx: index("users_email_idx").on(t.email) }),
);

export const otps = mysqlTable(
  "otps",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 320 }).notNull(),
    codeHash: varchar("codeHash", { length: 64 }).notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
    attempts: int("attempts").notNull().default(0),
    consumed: boolean("consumed").notNull().default(false),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => ({ emailIdx: index("otps_email_idx").on(t.email) }),
);

export const sessions = mysqlTable(
  "sessions",
  {
    id: serial("id").primaryKey(),
    tokenHash: varchar("tokenHash", { length: 64 }).notNull().unique(),
    userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => ({ userIdx: index("sessions_user_idx").on(t.userId) }),
);

export const attempts = mysqlTable(
  "attempts",
  {
    id: serial("id").primaryKey(),
    userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
    subjectId: varchar("subjectId", { length: 32 }).notNull(),
    notionTitle: varchar("notionTitle", { length: 255 }).notNull(),
    exerciseTitle: varchar("exerciseTitle", { length: 255 }).notNull(),
    score: int("score").notNull(), // /20
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => ({
    userIdx: index("attempts_user_idx").on(t.userId),
    subjIdx: index("attempts_subject_idx").on(t.userId, t.subjectId),
  }),
);

export const loginLogs = mysqlTable(
  "login_logs",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 320 }).notNull(),
    success: boolean("success").notNull(),
    reason: varchar("reason", { length: 120 }),
    ip: varchar("ip", { length: 64 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => ({ emailIdx: index("login_logs_email_idx").on(t.email) }),
);

export type User = typeof users.$inferSelect;
export type Attempt = typeof attempts.$inferSelect;
