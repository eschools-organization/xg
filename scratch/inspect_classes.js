const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb+srv://kakhiweinrooneykakhidze_db_user:AL6ZBiEZ6tk%402L4@small.r76sze8.mongodb.net/khichauri";
const dbName = "khichauri";

async function run() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const classes = await db.collection("class").find({}).toArray();
  const subjects = await db.collection("subjects").find({}).toArray();
  const teachers = await db.collection("teachers").find({}).toArray();

  console.log("=== ALL CLASSES ===");
  classes.forEach(c => {
    console.log(`ID: ${c._id}, classname: "${c.classname}", ID_field: "${c.ID}"`);
  });

  console.log("\n=== ALL SUBJECTS ===");
  subjects.forEach(s => {
    console.log(`ID: ${s._id}, name: "${s.name}"`);
  });

  console.log("\n=== ALL TEACHERS ===");
  teachers.forEach(t => {
    console.log(`ID: ${t._id}, name: "${t.name} ${t.surname}"`);
  });

  await client.close();
}

run().catch(console.error);
