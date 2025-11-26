import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { storage } from "./storage";

declare module "express-session" {
  interface SessionData {
    userId?: number;
    username?: string;
  }
}

export async function loginHandler(req: Request, res: Response) {
  const { username, password } = req.body;

  console.log('[LOGIN] Attempt for username:', username);
  console.log('[LOGIN] Storage type:', storage.constructor.name);

  if (!username || !password) {
    console.log('[LOGIN] Missing username or password');
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    const user = await storage.getAdminUserByUsername(username);
    
    if (!user) {
      console.log('[LOGIN] User not found:', username);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log('[LOGIN] User found:', { id: user.id, username: user.username, email: user.email });

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    
    if (!isValidPassword) {
      console.log('[LOGIN] Invalid password for user:', username);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.userId = user.id;
    req.session.username = user.username;

    // Explicitly save session before responding to ensure cookie is set
    req.session.save((err) => {
      if (err) {
        console.error('[LOGIN] Session save error:', err);
        return res.status(500).json({ error: "Failed to create session" });
      }
      
      console.log('[LOGIN] Login successful for user:', username);
      console.log('[LOGIN] Session ID:', req.sessionID);

      return res.json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    });
  } catch (error) {
    console.error("[LOGIN] Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function logoutHandler(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.clearCookie("connect.sid");
    return res.json({ message: "Logged out successfully" });
  });
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  console.log('[AUTH] getCurrentUser - Session ID:', req.sessionID);
  console.log('[AUTH] getCurrentUser - Session data:', JSON.stringify(req.session));
  
  if (!req.session.userId) {
    console.log('[AUTH] getCurrentUser - No userId in session');
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const user = await storage.getAdminUserById(req.session.userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Get current user error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}
