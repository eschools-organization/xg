const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb+srv://kakhiweinrooneykakhidze_db_user:AL6ZBiEZ6tk%402L4@small.r76sze8.mongodb.net/khichauri";
const dbName = "khichauri";

async function run() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const subjects = await db.collection("subjects").find({}).toArray();
  console.log("=== SUBJECTS DETAIL ===");
  subjects.forEach(s => {
    console.log(JSON.stringify(s));
  });

  const classes = await db.collection("class").find({}).toArray();
  console.log("\n=== CLASSES DETAIL ===");
  classes.forEach(c => {
    console.log(`_id: ${c._id}, classname: "${c.classname}", ID: "${c.ID}"`);
  });

  await client.close();
}

run().catch(console.error);
