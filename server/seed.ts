import bcrypt from "bcryptjs";
import { storage } from "./storage";

export async function seedAdminUser() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    const existingProdAdmin = await storage.getAdminUserByUsername("Essayon6");
    
    if (existingProdAdmin) {
      console.log("[SEED] Production admin user 'Essayon6' already exists");
      return;
    }

    const prodPassword = process.env.ADMIN_PASSWORD || 'EssayonsChange2024!';
    const passwordHash = await bcrypt.hash(prodPassword, 10);
    
    const admin = await storage.createAdminUser({
      username: "Essayon6",
      email: "psmith@essayonschange.com",
      passwordHash,
    });

    console.log("[SEED] Production admin user created:", {
      id: admin.id,
      username: admin.username,
      email: admin.email,
    });
  } else {
    const existingAdmin = await storage.getAdminUserByUsername("admin");
    
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    const passwordHash = await bcrypt.hash("admin123", 10);
    
    const admin = await storage.createAdminUser({
      username: "admin",
      email: "admin@essayons.com",
      passwordHash,
    });

    console.log("Admin user created:", {
      id: admin.id,
      username: admin.username,
      email: admin.email,
    });
    console.log("Login credentials: username=admin, password=admin123");
  }
}
