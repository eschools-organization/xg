const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb+srv://kakhiweinrooneykakhidze_db_user:AL6ZBiEZ6tk%402L4@small.r76sze8.mongodb.net/khichauri";
const dbName = "khichauri";

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const subjects = await db.collection("subjects").find({}).toArray();
  const classes = await db.collection("class").find({}).toArray();
  const teachers = await db.collection("teachers").find({}).toArray();

  console.log("=== SUBJECT MAP ===");
  subjects.forEach(s => {
    console.log(`ID: ${s._id} | name: "${s.name}" | subject_name: "${s.subject_name}"`);
  });

  console.log("\n=== CLASS LIST ===");
  classes.forEach(c => {
    console.log(`ID: ${c._id} | classname: "${c.classname}" | ID: "${c.ID}" | grade: "${c.grade}"`);
  });

  console.log("\n=== TEACHERS LIST ===");
  teachers.forEach(t => {
    console.log(`ID: ${t._id} | name: "${t.name} ${t.surname}"`);
  });

  await client.close();
}

main().catch(console.error);
