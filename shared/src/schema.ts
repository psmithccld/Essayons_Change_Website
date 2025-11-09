import { pgTable, serial, varchar, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Admin Users table for authentication
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminUsersRelations = relations(adminUsers, ({ many }) => ({
  content: many(content),
}));

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
});
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;

// Content table for blog posts and tutorials
export const content = pgTable("content", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 50 }).notNull(), // 'blog' or 'tutorial'
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  summary: text("summary"),
  body: text("body").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("draft"), // 'draft' or 'published'
  publishedAt: timestamp("published_at"),
  heroImageUrl: varchar("hero_image_url", { length: 1000 }),
  authorId: integer("author_id").references(() => adminUsers.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const contentRelations = relations(content, ({ one, many }) => ({
  author: one(adminUsers, {
    fields: [content.authorId],
    references: [adminUsers.id],
  }),
  attachments: many(attachments),
}));

export const insertContentSchema = createInsertSchema(content).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertContent = z.infer<typeof insertContentSchema>;
export type Content = typeof content.$inferSelect;

// Attachments table for PDFs and video URLs
export const attachments = pgTable("attachments", {
  id: serial("id").primaryKey(),
  contentId: integer("content_id").references(() => content.id).notNull(),
  kind: varchar("kind", { length: 50 }).notNull(), // 'pdf' or 'video'
  url: varchar("url", { length: 1000 }).notNull(),
  title: varchar("title", { length: 500 }),
  description: text("description"),
  fileSize: integer("file_size"), // in bytes, for PDFs
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const attachmentsRelations = relations(attachments, ({ one }) => ({
  content: one(content, {
    fields: [attachments.contentId],
    references: [content.id],
  }),
}));

export const insertAttachmentSchema = createInsertSchema(attachments).omit({
  id: true,
  createdAt: true,
});
export type InsertAttachment = z.infer<typeof insertAttachmentSchema>;
export type Attachment = typeof attachments.$inferSelect;

// Contact Messages table for contact form submissions
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 500 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("new"), // 'new', 'read', 'responded', 'archived'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
  status: true,
});
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
