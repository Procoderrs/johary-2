import User from "../models/User.js";

/**
 * Creates an admin if not exists.
 * Safe to call multiple times.
 */
const createAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@ecommerce.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail, role: "admin" });
    if (existingAdmin) {
      console.log("Admin already exists:", adminEmail);
      return;
    }

    // ✅ Pass plain password, Mongoose pre-save will hash it
    await User.create({
      name: "Admin",
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    console.log(`✅ Admin created with email: ${adminEmail} and password: ${adminPassword}`);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    console.error(error.stack);
  }
};

export default createAdmin;