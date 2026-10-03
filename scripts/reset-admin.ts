import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const uri = process.env.MONGODB_URI || "mongodb+srv://kakhiweinrooneykakhidze_db_user:AL6ZBiEZ6tk%402L4@small.r76sze8.mongodb.net/khichauri";

async function resetAdminPassword() {
  const client = new MongoClient(uri);

  try {
    console.log("Connecting to MongoDB...");
    await client.connect();

    const adminDb = client.db().admin();
    const listRes = await adminDb.listDatabases();
    const targetDbNames = listRes.databases
      .map(d => d.name)
      .filter(name => !["admin", "local", "config"].includes(name));

    const newPassword = "admin";
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const defaultAdmin = {
      name: "admin",
      surname: "admin",
      user_ID: "admin",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date().toISOString()
    };

    const superAdminUser = {
      name: "Kakhi",
      surname: "Kakhidze",
      user_ID: "kakhi-kakhidze",
      password: hashedPassword,
      role: "superadmin",
      createdAt: new Date().toISOString()
    };

    for (const dbName of targetDbNames) {
      console.log(`\n--- Processing Database: ${dbName} ---`);
      const db = client.db(dbName);

      const adminsColl = db.collection("admins");
      const usersColl = db.collection("users");

      const existingAdmins = await adminsColl.find({}).toArray();
      console.log(`[${dbName}] Existing admins count:`, existingAdmins.length);
      existingAdmins.forEach(a => console.log(`[${dbName}] Admin user_ID:`, a.user_ID, "Name:", a.name, a.surname));

      // Upsert admin user
      await adminsColl.updateOne(
        { user_ID: "admin" },
        { $set: defaultAdmin },
        { upsert: true }
      );
      await usersColl.updateOne(
        { user_ID: "admin" },
        { $set: defaultAdmin },
        { upsert: true }
      );
      console.log(`✅ [${dbName}] Created/Updated admin user with user_ID: 'admin' and password: 'admin'`);

      // Update password for any existing admins as well
      for (const admin of existingAdmins) {
        await adminsColl.updateOne(
          { _id: admin._id },
          { $set: { password: hashedPassword } }
        );
        await usersColl.updateOne(
          { user_ID: admin.user_ID },
          { $set: { password: hashedPassword } }
        );
        console.log(`✅ [${dbName}] Updated password for admin user_ID: '${admin.user_ID}' to 'admin'`);
      }

      // Upsert superadmin user
      await adminsColl.updateOne(
        { user_ID: "kakhi-kakhidze" },
        { $set: superAdminUser },
        { upsert: true }
      );
      await usersColl.updateOne(
        { user_ID: "kakhi-kakhidze" },
        { $set: superAdminUser },
        { upsert: true }
      );
      console.log(`✅ [${dbName}] Configured superadmin user with user_ID: 'kakhi-kakhidze' and password: 'admin'`);
    }
  } catch (error) {
    console.error("❌ Error resetting admin password:", error);
  } finally {
    await client.close();
    console.log("Connection closed.");
  }
}

resetAdminPassword();
