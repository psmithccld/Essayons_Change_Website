import bcrypt from "bcryptjs";
import { storage } from "./mem-storage";

export async function seedAdminUser() {
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
