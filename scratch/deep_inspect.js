const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = process.env.MONGODB_URI || "mongodb+srv://kakhiweinrooneykakhidze_db_user:AL6ZBiEZ6tk%402L4@small.r76sze8.mongodb.net/khichauri";

async function deepInspect() {
  const client = new MongoClient(uri);
  await client.connect();

  for (const dbName of ['kakhati', 'khichauri']) {
    console.log(`\n=================== DB: ${dbName} ===================`);
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    const classes = await db.collection('classes').find({}).toArray();
    console.log(`Classes in ${dbName}:`, JSON.stringify(classes, null, 2).slice(0, 1500));

    const subjects = await db.collection('subjects').find({}).toArray();
    console.log(`Subjects count in ${dbName}:`, subjects.length);
    if (subjects.length > 0) {
      console.log(`Sample Subject in ${dbName}:`, JSON.stringify(subjects[0], null, 2));
      console.log(`All Subject keys in ${dbName}:`, subjects.map(s => s.name || s.name_ge || s.title || s.subject_name || Object.keys(s)));
    }
  }

  if (fs.existsSync('db_dump.json')) {
    console.log('\n--- Reading db_dump.json ---');
    const dump = JSON.parse(fs.readFileSync('db_dump.json', 'utf8'));
    console.log('Dump keys:', Object.keys(dump));
  }

  await client.close();
}

deepInspect().catch(console.error);
