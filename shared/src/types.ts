// Type-only façade that re-exports types from schema.ts
// This allows client and MemStorage to import types without materializing Drizzle at runtime

import type {
  AdminUser,
  InsertAdminUser,
  Content,
  InsertContent,
  Attachment,
  InsertAttachment,
  ContactMessage,
  InsertContactMessage,
} from './schema';

// Re-export all types using type-only exports
export type {
  AdminUser,
  InsertAdminUser,
  Content,
  InsertContent,
  Attachment,
  InsertAttachment,
  ContactMessage,
  InsertContactMessage,
};