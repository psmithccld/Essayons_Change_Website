import { Request, Response } from "express";
import { storage } from "./storage";
import { z } from "zod";

const insertContentSchema = z.object({
  type: z.string(),
  title: z.string(),
  slug: z.string(),
  summary: z.string().optional(),
  body: z.string(),
  status: z.string().default("draft"),
  publishedAt: z.string().optional().nullable().transform((val) => val ? new Date(val) : null),
  scheduledPublishAt: z.string().optional().nullable().transform((val) => val ? new Date(val) : null),
  heroImageUrl: z.string().optional().nullable(),
  authorId: z.number().optional().nullable(),
});

const insertAttachmentSchema = z.object({
  contentId: z.number(),
  kind: z.string(),
  url: z.string(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  fileSize: z.number().optional().nullable(),
  order: z.number().default(0),
});

export async function listContentHandler(req: Request, res: Response) {
  try {
    const { type, status } = req.query;
    const items = await storage.listContent(
      type as string | undefined,
      status as string | undefined
    );
    return res.json(items);
  } catch (error) {
    console.error("List content error:", error);
    return res.status(500).json({ error: "Failed to list content" });
  }
}

export async function getContentHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const item = await storage.getContentById(parseInt(id));
    
    if (!item) {
      return res.status(404).json({ error: "Content not found" });
    }

    const attachments = await storage.getAttachmentsByContentId(item.id);
    return res.json({ ...item, attachments });
  } catch (error) {
    console.error("Get content error:", error);
    return res.status(500).json({ error: "Failed to get content" });
  }
}

export async function createContentHandler(req: Request, res: Response) {
  try {
    console.log("[CREATE_CONTENT] Request body:", JSON.stringify(req.body, null, 2));
    const validated = insertContentSchema.parse(req.body);
    console.log("[CREATE_CONTENT] Validated data:", JSON.stringify(validated, null, 2));
    const item = await storage.createContent(validated);
    console.log("[CREATE_CONTENT] Created item:", JSON.stringify(item, null, 2));
    return res.status(201).json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("[CREATE_CONTENT] Validation error:", JSON.stringify(error.issues, null, 2));
      return res.status(400).json({ error: "Invalid input", details: error.issues });
    }
    console.error("[CREATE_CONTENT] Storage error:", error);
    console.error("[CREATE_CONTENT] Error message:", (error as Error).message);
    console.error("[CREATE_CONTENT] Error stack:", (error as Error).stack);
    return res.status(500).json({ error: "Failed to create content" });
  }
}

export async function updateContentHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    console.log("[UPDATE_CONTENT] ID:", id, "Request body:", JSON.stringify(req.body, null, 2));
    const validated = insertContentSchema.partial().parse(req.body);
    console.log("[UPDATE_CONTENT] Validated data:", JSON.stringify(validated, null, 2));
    const updated = await storage.updateContent(parseInt(id), validated);
    
    if (!updated) {
      console.log("[UPDATE_CONTENT] Content not found for ID:", id);
      return res.status(404).json({ error: "Content not found" });
    }

    console.log("[UPDATE_CONTENT] Updated item:", JSON.stringify(updated, null, 2));
    return res.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("[UPDATE_CONTENT] Validation error:", JSON.stringify(error.issues, null, 2));
      return res.status(400).json({ error: "Invalid input", details: error.issues });
    }
    console.error("[UPDATE_CONTENT] Storage error:", error);
    console.error("[UPDATE_CONTENT] Error message:", (error as Error).message);
    console.error("[UPDATE_CONTENT] Error stack:", (error as Error).stack);
    return res.status(500).json({ error: "Failed to update content" });
  }
}

export async function deleteContentHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await storage.deleteContent(parseInt(id));
    
    if (!deleted) {
      return res.status(404).json({ error: "Content not found" });
    }

    return res.json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Delete content error:", error);
    return res.status(500).json({ error: "Failed to delete content" });
  }
}

export async function createAttachmentHandler(req: Request, res: Response) {
  try {
    const validated = insertAttachmentSchema.parse(req.body);
    const attachment = await storage.createAttachment(validated);
    return res.status(201).json(attachment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid input", details: error.issues });
    }
    console.error("Create attachment error:", error);
    return res.status(500).json({ error: "Failed to create attachment" });
  }
}

export async function deleteAttachmentHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await storage.deleteAttachment(parseInt(id));
    
    if (!deleted) {
      return res.status(404).json({ error: "Attachment not found" });
    }

    return res.json({ message: "Attachment deleted successfully" });
  } catch (error) {
    console.error("Delete attachment error:", error);
    return res.status(500).json({ error: "Failed to delete attachment" });
  }
}
