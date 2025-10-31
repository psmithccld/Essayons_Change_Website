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
    const validated = insertContentSchema.parse(req.body);
    const item = await storage.createContent(validated);
    return res.status(201).json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid input", details: error.issues });
    }
    console.error("Create content error:", error);
    return res.status(500).json({ error: "Failed to create content" });
  }
}

export async function updateContentHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const validated = insertContentSchema.partial().parse(req.body);
    const updated = await storage.updateContent(parseInt(id), validated);
    
    if (!updated) {
      return res.status(404).json({ error: "Content not found" });
    }

    return res.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid input", details: error.issues });
    }
    console.error("Update content error:", error);
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
