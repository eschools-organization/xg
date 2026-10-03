import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb+srv://kakhiweinrooneykakhidze_db_user:AL6ZBiEZ6tk%402L4@small.r76sze8.mongodb.net/khichauri";

const requestList = [
  { classID: "1ა", gradeName: "I კლასი", teacherName: "ქეთევან", teacherSurname: "მიქელაძე", personalID: "61006029313" },
  { classID: "2ა", gradeName: "II კლასი", teacherName: "ცირა", teacherSurname: "დუმბაძე", personalID: "61010013395" },
  { classID: "3ა", gradeName: "III კლასი", teacherName: "ლუიზა", teacherSurname: "გორგილაძე", personalID: "61009014987" },
  { classID: "4ა", gradeName: "IV კლასი", teacherName: "ლია", teacherSurname: "შარაშიძე", personalID: "61006077115" },
  { classID: "5ა", gradeName: "V კლასი", teacherName: "ზეინაბ", teacherSurname: "ბერიძე", personalID: "61009012536" },
  { classID: "6ა", gradeName: "VI კლასი", teacherName: "ლუიზა", teacherSurname: "გორგილაძე", personalID: "61009014987" },
  { classID: "7ა", gradeName: "VII კლასი", teacherName: "ირა", teacherSurname: "აბულაძე", personalID: "61009003319" },
  { classID: "8ა", gradeName: "VIII კლასი", teacherName: "მელანო", teacherSurname: "ზოიძე", personalID: "61010004293" },
  { classID: "9ა", gradeName: "IX კლასი", teacherName: "ნანული", teacherSurname: "ქათამაძე", personalID: "61010014750" },
  { classID: "10ა", gradeName: "X კლასი", teacherName: "თალიკო", teacherSurname: "მიქელაძე", personalID: "61010014815" },
  { classID: "11ა", gradeName: "XI კლასი", teacherName: "დავით", teacherSurname: "სამნიძე", personalID: "61008002125" },
  { classID: "12ა", gradeName: "XII კლასი", teacherName: "ირა", teacherSurname: "აბულაძე", personalID: "61009003319" }
];

async function applyUpdates() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("khichauri");

  const teachersColl = db.collection("teachers");
  const classColl = db.collection("class");

  const teachers = await teachersColl.find({}).toArray();
  const classes = await classColl.find({}).toArray();

  for (const item of requestList) {
    const teacherDoc = teachers.find(t => 
      (t.user_ID && t.user_ID === item.personalID) ||
      ((t.name || "").trim() === item.teacherName && (t.surname || "").trim() === item.teacherSurname)
    );

    if (!teacherDoc) {
      console.log("❌ Teacher not found in DB:", item.teacherName, item.teacherSurname);
      continue;
    }

    if (!teacherDoc.user_ID) {
      await teachersColl.updateOne({ _id: teacherDoc._id }, { $set: { user_ID: item.personalID } });
    }

    let classDoc = classes.find(c => c.ID === item.classID);
    if (!classDoc) {
      console.log("Creating class doc for:", item.classID);
      const res = await classColl.insertOne({
        ID: item.classID,
        classname: item.classID,
        damrigebeli: teacherDoc._id,
        subjects: [],
        students: []
      });
      classDoc = { _id: res.insertedId, ID: item.classID };
    } else {
      await classColl.updateOne(
        { _id: classDoc._id },
        { $set: { damrigebeli: teacherDoc._id } }
      );
    }

    console.log(`✅ [${item.gradeName} - ${item.classID}] Damrigebeli set to: ${item.teacherName} ${item.teacherSurname} (${item.personalID})`);
  }

  await client.close();
}

applyUpdates().catch(console.error);
