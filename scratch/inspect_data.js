const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || "mongodb+srv://kakhiweinrooneykakhidze_db_user:AL6ZBiEZ6tk%402L4@small.r76sze8.mongodb.net/khichauri";

async function inspectDb() {
  const client = new MongoClient(uri);
  await client.connect();

  for (const dbName of ['kakhati', 'khichauri']) {
    console.log(`\n=================== DB: ${dbName} ===================`);
    const db = client.db(dbName);

    const classes = await db.collection('classes').find({}).toArray();
    console.log(`--- CLASSES (${classes.length}) ---`);
    classes.forEach(c => {
      console.log(`ID: ${c._id} | Name: "${c.name}" | class_head: "${c.class_head}" | teacher_id: "${c.teacher_id}"`);
    });

    const subjects = await db.collection('subjects').find({}).toArray();
    console.log(`\n--- SUBJECTS (${subjects.length}) ---`);
    subjects.forEach(s => {
      console.log(`ID: ${s._id} | name: "${s.name}" | name_ge: "${s.name_ge}"`);
    });

    const teachers = await db.collection('teachers').find({}).toArray();
    console.log(`\n--- TEACHERS (${teachers.length}) ---`);
    teachers.forEach(t => {
      console.log(`ID: ${t._id} | Name: "${t.name} ${t.surname}" | user_ID: "${t.user_ID}"`);
    });

    const assignments = await db.collection('assignments').find({}).toArray();
    console.log(`\n--- ASSIGNMENTS (${assignments.length}) ---`);
    assignments.slice(0, 10).forEach(a => {
      console.log(JSON.stringify(a));
    });
  }

  await client.close();
}

inspectDb().catch(console.error);
