import type { 
  AdminUser, 
  InsertAdminUser,
  Content,
  InsertContent,
  Attachment,
  InsertAttachment,
  ContactMessage,
  InsertContactMessage
} from "@shared/types";

export interface IStorage {
  getAdminUserById(id: number): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  getAdminUserByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(insertUser: InsertAdminUser): Promise<AdminUser>;
  
  getContentById(id: number): Promise<Content | undefined>;
  getContentBySlug(slug: string): Promise<Content | undefined>;
  listContent(type?: string, status?: string): Promise<Content[]>;
  createContent(insertContent: InsertContent): Promise<Content>;
  updateContent(id: number, updates: Partial<InsertContent>): Promise<Content | undefined>;
  deleteContent(id: number): Promise<boolean>;
  
  getAttachmentsByContentId(contentId: number): Promise<Attachment[]>;
  createAttachment(insertAttachment: InsertAttachment): Promise<Attachment>;
  deleteAttachment(id: number): Promise<boolean>;
  deleteAttachmentsByContentId(contentId: number): Promise<void>;

  createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage>;
  listContactMessages(): Promise<ContactMessage[]>;
  updateContactMessageStatus(id: number, status: string): Promise<ContactMessage | undefined>;
}

export class MemStorage implements IStorage {
  private adminUsers: Map<number, AdminUser> = new Map();
  private content: Map<number, Content> = new Map();
  private attachments: Map<number, Attachment> = new Map();
  private contactMessages: Map<number, ContactMessage> = new Map();
  private nextAdminUserId = 1;
  private nextContentId = 1;
  private nextAttachmentId = 1;
  private nextContactMessageId = 1;

  async getAdminUserById(id: number): Promise<AdminUser | undefined> {
    return this.adminUsers.get(id);
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(u => u.username === username);
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(u => u.email === email);
  }

  async createAdminUser(insertUser: InsertAdminUser): Promise<AdminUser> {
    const user: AdminUser = {
      id: this.nextAdminUserId++,
      ...insertUser,
      createdAt: new Date(),
    };
    this.adminUsers.set(user.id, user);
    return user;
  }

  async getContentById(id: number): Promise<Content | undefined> {
    return this.content.get(id);
  }

  async getContentBySlug(slug: string): Promise<Content | undefined> {
    return Array.from(this.content.values()).find(c => c.slug === slug);
  }

  async listContent(type?: string, status?: string): Promise<Content[]> {
    let items = Array.from(this.content.values());
    
    if (type) {
      items = items.filter(c => c.type === type);
    }
    
    if (status) {
      items = items.filter(c => c.status === status);
    }
    
    return items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createContent(insertContent: InsertContent): Promise<Content> {
    const now = new Date();
    const item: Content = {
      id: this.nextContentId++,
      ...insertContent,
      createdAt: now,
      updatedAt: now,
    };
    this.content.set(item.id, item);
    return item;
  }

  async updateContent(id: number, updates: Partial<InsertContent>): Promise<Content | undefined> {
    const existing = this.content.get(id);
    if (!existing) return undefined;
    
    const updated: Content = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.content.set(id, updated);
    return updated;
  }

  async deleteContent(id: number): Promise<boolean> {
    await this.deleteAttachmentsByContentId(id);
    return this.content.delete(id);
  }

  async getAttachmentsByContentId(contentId: number): Promise<Attachment[]> {
    return Array.from(this.attachments.values())
      .filter(a => a.contentId === contentId)
      .sort((a, b) => a.order - b.order);
  }

  async createAttachment(insertAttachment: InsertAttachment): Promise<Attachment> {
    const attachment: Attachment = {
      id: this.nextAttachmentId++,
      ...insertAttachment,
      createdAt: new Date(),
    };
    this.attachments.set(attachment.id, attachment);
    return attachment;
  }

  async deleteAttachment(id: number): Promise<boolean> {
    return this.attachments.delete(id);
  }

  async deleteAttachmentsByContentId(contentId: number): Promise<void> {
    const toDelete = Array.from(this.attachments.values())
      .filter(a => a.contentId === contentId)
      .map(a => a.id);
    
    toDelete.forEach(id => this.attachments.delete(id));
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const message: ContactMessage = {
      id: this.nextContactMessageId++,
      ...insertMessage,
      status: 'new',
      createdAt: new Date(),
    };
    this.contactMessages.set(message.id, message);
    return message;
  }

  async listContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateContactMessageStatus(id: number, status: string): Promise<ContactMessage | undefined> {
    const existing = this.contactMessages.get(id);
    if (!existing) return undefined;
    
    const updated: ContactMessage = {
      ...existing,
      status,
    };
    this.contactMessages.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
