const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb+srv://kakhiweinrooneykakhidze_db_user:AL6ZBiEZ6tk%402L4@small.r76sze8.mongodb.net/khichauri";
const dbName = "khichauri";

async function verify() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const classes = await db.collection("class").find({}).toArray();
  const subjects = await db.collection("subjects").find({}).toArray();
  const subMap = {};
  subjects.forEach(s => subMap[s._id.toString()] = s.name || s.subject_name);

  console.log("=== VERIFYING LIVE MONGO CALENDARS ===");
  const dayNames = ["ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი"];

  classes.sort((a, b) => (parseInt(a.ID) || 0) - (parseInt(b.ID) || 0));

  classes.forEach(c => {
    if (!c.ID && !c.classname) return;
    console.log(`\n📌 კლასი: ${c.ID || c.classname}`);
    if (c.calendar && c.calendar.length > 0) {
      c.calendar.forEach((day, dIdx) => {
        const slots = day.map(s => s ? subMap[s.subject_id.toString()] || "–" : "–").join(" | ");
        console.log(`  ${dayNames[dIdx]}: ${slots}`);
      });
    } else {
      console.log("  (ცხრილი ცარიელია)");
    }
  });

  await client.close();
}

verify().catch(console.error);
