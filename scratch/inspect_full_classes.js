const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb+srv://kakhiweinrooneykakhidze_db_user:AL6ZBiEZ6tk%402L4@small.r76sze8.mongodb.net/khichauri";
const dbName = "khichauri";

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const classes = await db.collection("class").find({}).toArray();
  console.log("Found", classes.length, "classes:");
  classes.forEach(c => console.log(JSON.stringify(c)));

  await client.close();
}

main().catch(console.error);
