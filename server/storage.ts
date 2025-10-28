// Referenced from blueprint:javascript_database
import { 
  adminUsers, 
  content, 
  attachments,
  contactMessages,
  type AdminUser, 
  type InsertAdminUser,
  type Content,
  type InsertContent,
  type Attachment,
  type InsertAttachment,
  type ContactMessage,
  type InsertContactMessage
} from "../shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // Admin user operations
  getAdminUserById(id: number): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  getAdminUserByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(insertUser: InsertAdminUser): Promise<AdminUser>;

  // Content operations
  getContentById(id: number): Promise<Content | undefined>;
  getContentBySlug(slug: string): Promise<Content | undefined>;
  listContent(type?: string, status?: string): Promise<Content[]>;
  createContent(insertContent: InsertContent): Promise<Content>;
  updateContent(id: number, updates: Partial<InsertContent>): Promise<Content | undefined>;
  deleteContent(id: number): Promise<boolean>;

  // Attachment operations
  getAttachmentsByContentId(contentId: number): Promise<Attachment[]>;
  createAttachment(insertAttachment: InsertAttachment): Promise<Attachment>;
  deleteAttachment(id: number): Promise<boolean>;
  deleteAttachmentsByContentId(contentId: number): Promise<void>;

  // Contact message operations
  createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage>;
  listContactMessages(): Promise<ContactMessage[]>;
  updateContactMessageStatus(id: number, status: string): Promise<ContactMessage | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Admin user operations
  async getAdminUserById(id: number): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
    return user || undefined;
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return user || undefined;
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
    return user || undefined;
  }

  async createAdminUser(insertUser: InsertAdminUser): Promise<AdminUser> {
    const [user] = await db.insert(adminUsers).values(insertUser).returning();
    return user;
  }

  // Content operations
  async getContentById(id: number): Promise<Content | undefined> {
    const [item] = await db.select().from(content).where(eq(content.id, id));
    return item || undefined;
  }

  async getContentBySlug(slug: string): Promise<Content | undefined> {
    const [item] = await db.select().from(content).where(eq(content.slug, slug));
    return item || undefined;
  }

  async listContent(type?: string, status?: string): Promise<Content[]> {
    const conditions = [];
    if (type) conditions.push(eq(content.type, type));
    if (status) conditions.push(eq(content.status, status));

    if (conditions.length === 0) {
      return db.select().from(content).orderBy(desc(content.createdAt));
    }

    return db
      .select()
      .from(content)
      .where(and(...conditions))
      .orderBy(desc(content.createdAt));
  }

  async createContent(insertContent: InsertContent): Promise<Content> {
    const [item] = await db.insert(content).values(insertContent).returning();
    return item;
  }

  async updateContent(id: number, updates: Partial<InsertContent>): Promise<Content | undefined> {
    const [updated] = await db
      .update(content)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(content.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteContent(id: number): Promise<boolean> {
    // First delete associated attachments
    await this.deleteAttachmentsByContentId(id);
    
    const result = await db.delete(content).where(eq(content.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Attachment operations
  async getAttachmentsByContentId(contentId: number): Promise<Attachment[]> {
    return db.select().from(attachments).where(eq(attachments.contentId, contentId)).orderBy(attachments.order);
  }

  async createAttachment(insertAttachment: InsertAttachment): Promise<Attachment> {
    const [attachment] = await db.insert(attachments).values(insertAttachment).returning();
    return attachment;
  }

  async deleteAttachment(id: number): Promise<boolean> {
    const result = await db.delete(attachments).where(eq(attachments.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async deleteAttachmentsByContentId(contentId: number): Promise<void> {
    await db.delete(attachments).where(eq(attachments.contentId, contentId));
  }

  // Contact message operations
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }

  async listContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async updateContactMessageStatus(id: number, status: string): Promise<ContactMessage | undefined> {
    const [updated] = await db
      .update(contactMessages)
      .set({ status })
      .where(eq(contactMessages.id, id))
      .returning();
    return updated || undefined;
  }
}

export const storage = new DatabaseStorage();
