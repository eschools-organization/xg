const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || "mongodb+srv://kakhiweinrooneykakhidze_db_user:AL6ZBiEZ6tk%402L4@small.r76sze8.mongodb.net/khichauri";

async function checkAllClasses() {
  const client = new MongoClient(uri);
  await client.connect();

  for (const dbName of ['khichauri', 'kakhati']) {
    console.log(`\n=================== DB: ${dbName} ===================`);
    const db = client.db(dbName);

    const classes = await db.collection('class').find({}).toArray();
    console.log(`Class count in ${dbName}:`, classes.length);
    classes.forEach(c => {
      console.log(`Class ID: ${c._id} | name: "${c.classname || c.name || c.ID}" | damrigebeli: "${c.damrigebeli || c.tutor_id}" | subjects count: ${c.subjects ? c.subjects.length : 0}`);
    });
  }

  await client.close();
}

checkAllClasses().catch(console.error);
