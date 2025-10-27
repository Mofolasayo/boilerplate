import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const planTierEnum = pgEnum("plan_tier", ["free", "growth", "scale"]);
export const tenantStatusEnum = pgEnum("tenant_status", ["active", "trial", "suspended"]);
export const memberRoleEnum = pgEnum("member_role", ["owner", "admin", "analyst", "viewer"]);

export const tenants = pgTable("tenant_tenants", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  status: tenantStatusEnum("status").notNull().default("trial"),
  plan: planTierEnum("plan").notNull().default("free"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const tenantMembers = pgTable("tenant_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull(),
  email: text("email").notNull(),
  role: memberRoleEnum("role").notNull().default("viewer"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
});

export const accounts = pgTable("tenant_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  currency: text("currency").notNull().default("USD"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
});

export const tenantSubscriptions = pgTable("tenant_subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  plan: planTierEnum("plan").notNull().default("free"),
  status: tenantStatusEnum("status").notNull().default("trial"),
  renewAt: timestamp("renew_at", { mode: "string" }),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
});

export const tenantMembershipRelations = relations(tenantMembers, ({ one }) => ({
  tenant: one(tenants, {
    fields: [tenantMembers.tenantId],
    references: [tenants.id],
  }),
}));

export const tenantRelations = relations(tenants, ({ many }) => ({
  members: many(tenantMembers),
  accounts: many(accounts),
  subscriptions: many(tenantSubscriptions),
}));

export const accountRelations = relations(accounts, ({ one }) => ({
  tenant: one(tenants, {
    fields: [accounts.tenantId],
    references: [tenants.id],
  }),
}));

export const subscriptionRelations = relations(tenantSubscriptions, ({ one }) => ({
  tenant: one(tenants, {
    fields: [tenantSubscriptions.tenantId],
    references: [tenants.id],
  }),
}));

export const insertTenantSchema = createInsertSchema(tenants, {
  name: z.string().min(2),
  slug: z.string().min(2),
});

export const insertTenantMemberSchema = createInsertSchema(tenantMembers, {
  email: z.string().email(),
});

export const insertAccountSchema = createInsertSchema(accounts, {
  name: z.string().min(2),
});

export const insertSubscriptionSchema = createInsertSchema(tenantSubscriptions);

export type Tenant = typeof tenants.$inferSelect;
export type InsertTenant = typeof tenants.$inferInsert;
export type TenantMember = typeof tenantMembers.$inferSelect;
export type InsertTenantMember = typeof tenantMembers.$inferInsert;
export type Account = typeof accounts.$inferSelect;
export type InsertAccount = typeof accounts.$inferInsert;
export type TenantSubscription = typeof tenantSubscriptions.$inferSelect;
export type InsertTenantSubscription = typeof tenantSubscriptions.$inferInsert;
