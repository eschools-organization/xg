const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb+srv://kakhiweinrooneykakhidze_db_user:AL6ZBiEZ6tk%402L4@small.r76sze8.mongodb.net/khichauri";
const dbName = "khichauri";

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const teachers = await db.collection("teachers").find({}).toArray();
  const subjects = await db.collection("subjects").find({}).toArray();

  console.log("=== ALL TEACHERS IN DB ===");
  teachers.forEach(t => {
    console.log(`ID: ${t._id} | Name: "${t.name} ${t.surname}" | Code/Email: "${t.code || t.email || ''}"`);
  });

  console.log("\n=== ALL SUBJECTS IN DB ===");
  subjects.forEach(s => {
    console.log(`ID: ${s._id} | SubjectName: "${s.subject_name || s.name}"`);
  });

  await client.close();
}

main().catch(console.error);
