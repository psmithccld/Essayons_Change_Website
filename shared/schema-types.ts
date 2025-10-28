// Type-only schema definitions that don't require drizzle-orm
// This allows the application to work without database dependencies

export type AdminUser = {
  id: number;
  username: string;
  passwordHash: string;
  email: string;
  createdAt: Date;
};

export type InsertAdminUser = {
  username: string;
  passwordHash: string;
  email: string;
};

export type Content = {
  id: number;
  type: string;
  title: string;
  slug: string;
  summary: string | null;
  body: string;
  status: string;
  publishedAt: Date | null;
  heroImageUrl: string | null;
  authorId: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type InsertContent = {
  type: string;
  title: string;
  slug: string;
  summary?: string | null;
  body: string;
  status: string;
  publishedAt?: Date | null;
  heroImageUrl?: string | null;
  authorId?: number | null;
};

export type Attachment = {
  id: number;
  contentId: number;
  kind: string;
  url: string;
  title: string | null;
  description: string | null;
  fileSize: number | null;
  order: number;
  createdAt: Date;
};

export type InsertAttachment = {
  contentId: number;
  kind: string;
  url: string;
  title?: string | null;
  description?: string | null;
  fileSize?: number | null;
  order: number;
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: Date;
};

export type InsertContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// Zod schemas for validation
import { z } from "zod";

export const insertContactMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export const insertAdminUserSchema = z.object({
  username: z.string().min(1),
  passwordHash: z.string().min(1),
  email: z.string().email(),
});

export const insertContentSchema = z.object({
  type: z.string(),
  title: z.string(),
  slug: z.string(),
  summary: z.string().nullable().optional(),
  body: z.string(),
  status: z.string(),
  publishedAt: z.date().nullable().optional(),
  heroImageUrl: z.string().nullable().optional(),
  authorId: z.number().nullable().optional(),
});

export const insertAttachmentSchema = z.object({
  contentId: z.number(),
  kind: z.string(),
  url: z.string(),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  fileSize: z.number().nullable().optional(),
  order: z.number(),
});
