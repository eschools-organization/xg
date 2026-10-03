const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb+srv://kakhiweinrooneykakhidze_db_user:AL6ZBiEZ6tk%402L4@small.r76sze8.mongodb.net/khichauri";
const dbName = "khichauri";

const SUBJECT_MAP = {
  "ქართული": "6391e072e8170db73b8fb0da",
  "მათემატიკა": "6391e072e8170db73b8fb0db",
  "ქიმია": "6391e072e8170db73b8fb0dc",
  "ფიზიკა": "6391e072e8170db73b8fb0dd",
  "მუსიკა": "6391e072e8170db73b8fb0de",
  "გეოგრაფია": "6391e072e8170db73b8fb0df",
  "სპორტი": "6391e072e8170db73b8fb0e1",
  "ინგლისური": "6391e072e8170db73b8fb0e2",
  "ბუნება": "6391e072e8170db73b8fb0e3",
  "ისტ": "6391e072e8170db73b8fb0e4",
  "ხელოვნება": "6391e072e8170db73b8fb0e5",
  "მე და საზოგადოება": "6391e072e8170db73b8fb0e6",
  "რუსული": "6391e072e8170db73b8fb0e7",
  "ჩვენი საქართველო": "6391e072e8170db73b8fb0e8",
  "ბიოლოგია": "6391e072e8170db73b8fb0e9",
  "მოქალაქეობა": "6391e072e8170db73b8fb0eb",
  "ისტორია": "6391e072e8170db73b8fb0ec",
  "საღვთო": "6391e072e8170db73b8fb0ee",
  "ჭადრაკი": "6391e072e8170db73b8fb0ef",
  "გერმანული": "6391e072e8170db73b8fb0f0",
  "სამოქალაქო": "6391e072e8170db73b8fb0f1",
  "საზოგადოება": "6391e072e8170db73b8fb0f1",
  "საქართველოს ისტორია": "6391e072e8170db73b8fb0f2"
};

const rawSchedules = {
  "1ა": [
    // ორშაბათი
    ["ხელოვნება", "მუსიკა", "მათემატიკა", "ქართული", "რუსული"],
    // სამშაბათი
    ["ქართული", "მათემატიკა", "ბუნება", "ინგლისური", "რუსული"],
    // ოთხშაბათი
    ["ხელოვნება", "მათემატიკა", "ქართული", "მუსიკა", "რუსული"],
    // ხუთშაბათი
    ["ქართული", "მათემატიკა", "ბუნება", "სპორტი", "რუსული"],
    // პარასკევი
    ["ქართული", "მათემატიკა", "სპორტი", "ინგლისური"]
  ],
  "2ა": [
    // ორშაბათი
    ["მათემატიკა", "ქართული", "სპორტი", "მუსიკა", "რუსული"],
    // სამშაბათი
    ["ქართული", "მათემატიკა", "სპორტი", "ინგლისური", "რუსული"],
    // ოთხშაბათი
    ["მათემატიკა", "ქართული", "ინგლისური", "ხელოვნება", "რუსული"],
    // ხუთშაბათი
    ["ქართული", "მათემატიკა", "ბუნება", "ხელოვნება", "რუსული"],
    // პარასკევი
    ["ქართული", "მათემატიკა", "ბუნება", "მუსიკა", "რუსული"]
  ],
  "3ა": [
    // ორშაბათი
    ["ქართული", "სპორტი", "მათემატიკა", "მე და საზოგადოება", "რუსული"],
    // სამშაბათი
    ["ქართული", "მათემატიკა", "ინგლისური", "ბუნება", "ხელოვნება"],
    // ოთხშაბათი
    ["ქართული", "მუსიკა", "სპორტი", "მათემატიკა", "რუსული"],
    // ხუთშაბათი
    ["ქართული", "მათემატიკა", "ინგლისური", "ბუნება", "რუსული"],
    // პარასკევი
    ["ქართული", "მათემატიკა", "მუსიკა", "მე და საზოგადოება", "ინგლისური"]
  ],
  "4ა": [
    // ორშაბათი
    ["მათემატიკა", "ქართული", "სპორტი", "ინგლისური", "რუსული"],
    // სამშაბათი
    ["ბუნება", "ინგლისური", "ქართული", "მათემატიკა", "ხელოვნება"],
    // ოთხშაბათი
    ["მათემატიკა", "ინგლისური", "მე და საზოგადოება", "ქართული", "რუსული"],
    // ხუთშაბათი
    ["ინგლისური", "სპორტი", "ხელოვნება", "ქართული", "მათემატიკა"],
    // პარასკევი
    ["რუსული", "მე და საზოგადოება", "ხელოვნება", "მათემატიკა", "ქართული"]
  ],
  "5ა": [
    // ორშაბათი
    ["ისტორია", "მათემატიკა", "ჩვენი საქართველო", "ბუნება", "ქართული"],
    // სამშაბათი
    ["ჩვენი საქართველო", "ქართული", "მათემატიკა", "ბუნება", "რუსული", "ინგლისური"],
    // ოთხშაბათი
    ["ქართული", "მათემატიკა", "ინგლისური", "ისტორია", "რუსული", "მუსიკა"],
    // ხუთშაბათი
    ["რუსული", "ისტორია", "ქართული", "ინგლისური", "სპორტი", "ხელოვნება"],
    // პარასკევი
    ["ხელოვნება", "ქართული", "ისტორია", "ინგლისური", "მათემატიკა"]
  ],
  "6ა": [
    // ორშაბათი
    ["რუსული", "ისტორია", "ქართული", "ჩვენი საქართველო", "მათემატიკა"],
    // სამშაბათი
    ["ქართული", "ჩვენი საქართველო", "ისტორია", "სპორტი", "ხელოვნება"],
    // ოთხშაბათი
    ["რუსული", "ქართული", "ისტორია", "მათემატიკა", "რუსული", "სპორტი"],
    // ხუთშაბათი
    ["რუსული", "ბუნება", "ისტორია", "ქართული", "მათემატიკა", "ხელოვნება"],
    // პარასკევი
    ["რუსული", "ისტორია", "მათემატიკა", "ქართული", "ინგლისური", "ხელოვნება"]
  ],
  "7ა": [
    // ორშაბათი
    ["ბუნება"],
    // სამშაბათი
    ["ბუნება"],
    // ოთხშაბათი
    ["ბუნება"],
    // ხუთშაბათი
    ["ბუნება"],
    // პარასკევი
    ["ბუნება"]
  ],
  "8ა": [
    // ორშაბათი
    ["ბიოლოგია", "ქართული", "ქიმია", "მათემატიკა", "სამოქალაქო", "ისტორია"],
    // სამშაბათი
    ["ბიოლოგია", "მათემატიკა", "ქართული", "ისტორია", "რუსული", "სამოქალაქო", "ფიზიკა"],
    // ოთხშაბათი
    ["ბუნება", "ქიმია", "მათემატიკა", "ქართული", "ხელოვნება", "გეოგრაფია"],
    // ხუთშაბათი
    ["ქართული", "გეოგრაფია", "ბიოლოგია", "მათემატიკა", "ისტორია", "ინგლისური", "ქიმია"],
    // პარასკევი
    ["ბიოლოგია", "ხელოვნება", "სპორტი", "მათემატიკა", "რუსული", "ინგლისური"]
  ],
  "9ა": [
    // ორშაბათი
    ["ქართული", "ხელოვნება", "მათემატიკა", "ისტორია", "ინგლისური", "ისტორია"],
    // სამშაბათი
    ["ბიოლოგია", "ქართული", "გეოგრაფია", "ისტორია", "ინგლისური", "ქიმია", "სამოქალაქო"],
    // ოთხშაბათი
    ["ქართული", "ქიმია", "ინგლისური", "ქიმია", "მათემატიკა", "რუსული"],
    // ხუთშაბათი
    ["ქართული", "მათემატიკა", "ინგლისური", "ისტორია", "მუსიკა", "ბიოლოგია", "სპორტი"],
    // პარასკევი
    ["ქიმია", "ისტორია", "მათემატიკა", "ინგლისური", "ქართული", "რუსული", "საზოგადოება"]
  ],
  "10ა": [
    // ორშაბათი
    ["სპორტი", "ისტორია", "ქართული", "სამოქალაქო", "ინგლისური", "მათემატიკა"],
    // სამშაბათი
    ["ქართული", "ფიზიკა", "ქიმია", "ისტორია", "მათემატიკა", "სამოქალაქო", "ისტორია"],
    // ოთხშაბათი
    ["ინგლისური", "ქიმია", "ისტორია", "ქართული", "ხელოვნება", "მათემატიკა"],
    // ხუთშაბათი
    ["ისტორია", "გეოგრაფია", "ინგლისური", "ქართული", "გეოგრაფია", "მათემატიკა", "სამოქალაქო"],
    // პარასკევი
    ["ინგლისური", "ქართული", "ქიმია", "ისტორია", "სპორტი", "მათემატიკა"]
  ],
  "11ა": [
    // ორშაბათი
    ["ისტორია", "მათემატიკა", "სამოქალაქო", "ინგლისური", "ინგლისური", "ხელოვნება", "ისტორია"],
    // სამშაბათი
    ["სამოქალაქო", "გეოგრაფია", "ისტორია", "ქართული", "ბიოლოგია", "მათემატიკა", "ქიმია"],
    // ოთხშაბათი
    ["ქართული", "ფიზიკა", "მათემატიკა", "ინგლისური", "ქართული", "ფიზიკა"],
    // ხუთშაბათი
    ["ბიოლოგია", "ქართული", "მათემატიკა", "რუსული", "ისტორია", "ქიმია"],
    // პარასკევი
    ["ქართული", "ისტორია", "მათემატიკა", "ხელოვნება", "სპორტი", "რუსული"]
  ],
  "12ა": [
    // ორშაბათი
    ["ისტორია", "ქართული", "ინგლისური", "მათემატიკა", "სპორტი", "ფიზიკა"],
    // სამშაბათი
    ["ინგლისური", "ისტორია", "მათემატიკა", "ქართული", "ქიმია", "სამოქალაქო"],
    // ოთხშაბათი
    ["ქიმია", "ქართული", "რუსული", "ფიზიკა", "მათემატიკა", "სპორტი"],
    // ხუთშაბათი
    ["ისტორია", "ისტორია", "ქართული", "ინგლისური", "მათემატიკა", "გეოგრაფია"],
    // პარასკევი
    ["ქართული", "ქართული", "გეოგრაფია", "სამოქალაქო", "მათემატიკა", "სამოქალაქო"]
  ]
};

async function updateAllSchedules() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  console.log("Connected to MongoDB.");

  // Fix subjects table to ensure both name and subject_name exist
  const subjects = await db.collection("subjects").find({}).toArray();
  for (const s of subjects) {
    const sName = s.subject_name || s.name || "";
    if (sName) {
      await db.collection("subjects").updateOne(
        { _id: s._id },
        { $set: { name: sName, subject_name: sName } }
      );
    }
  }

  // Get all existing classes
  const classesColl = db.collection("class");
  const teachersColl = db.collection("teachers");
  const dbClasses = await classesColl.find({}).toArray();

  // Create lookup for teacher per class/subject from existing DB state
  const classSubjectTeacherMap = {}; // key: "classCode_subjId" -> teacherId
  dbClasses.forEach(c => {
    const cCode = c.ID || c.classname;
    if (cCode && c.subjects) {
      c.subjects.forEach(s => {
        if (s.subject_id && s.teacher_id) {
          classSubjectTeacherMap[`${cCode}_${s.subject_id.toString()}`] = s.teacher_id.toString();
        }
      });
    }
    if (cCode && c.calendar) {
      c.calendar.forEach(day => {
        if (Array.isArray(day)) {
          day.forEach(slot => {
            if (slot && slot.subject_id && slot.teacher_id) {
              classSubjectTeacherMap[`${cCode}_${slot.subject_id.toString()}`] = slot.teacher_id.toString();
            }
          });
        }
      });
    }
  });

  // Global subject fallback teacher lookup
  const globalSubjectTeacherMap = {};
  Object.values(classSubjectTeacherMap).forEach(val => {
    // mapped above
  });
  dbClasses.forEach(c => {
    if (c.subjects) {
      c.subjects.forEach(s => {
        if (s.subject_id && s.teacher_id) {
          globalSubjectTeacherMap[s.subject_id.toString()] = s.teacher_id.toString();
        }
      });
    }
  });

  const defaultTeacherDoc = await teachersColl.findOne({});
  const defaultTeacherId = defaultTeacherDoc ? defaultTeacherDoc._id.toString() : "639a10a6b32cdce23bf79dfc";

  for (const [classCode, daysArr] of Object.entries(rawSchedules)) {
    let clsDoc = dbClasses.find(c => c.ID === classCode || c.classname === classCode);
    
    if (!clsDoc) {
      console.log(`Class "${classCode}" not found, creating new class...`);
      const insertRes = await classesColl.insertOne({
        ID: classCode,
        classname: classCode,
        subjects: [],
        calendar: [],
        students: []
      });
      clsDoc = { _id: insertRes.insertedId, ID: classCode, classname: classCode, subjects: [], calendar: [], students: [] };
    }

    console.log(`\nProcessing Class "${classCode}" (_id: ${clsDoc._id})...`);

    // Build calendar entries
    const calendarData = daysArr.map(daySubjects => {
      return daySubjects.map(subName => {
        const subIdStr = SUBJECT_MAP[subName];
        if (!subIdStr) {
          console.warn(`  ⚠️ Subject name "${subName}" not found in SUBJECT_MAP!`);
          return null;
        }

        // Find teacher ID
        let teacherIdStr = classSubjectTeacherMap[`${classCode}_${subIdStr}`] || globalSubjectTeacherMap[subIdStr] || (clsDoc.damrigebeli ? clsDoc.damrigebeli.toString() : defaultTeacherId);

        return {
          subject_id: new ObjectId(subIdStr),
          teacher_id: new ObjectId(teacherIdStr)
        };
      });
    });

    // Calculate unique subjects & teacher pairs and weekly hours
    const pairMap = new Map();
    calendarData.forEach(daySlots => {
      daySlots.forEach(slot => {
        if (!slot) return;
        const key = `${slot.subject_id.toString()}_${slot.teacher_id.toString()}`;
        if (!pairMap.has(key)) {
          pairMap.set(key, {
            subject_id: slot.subject_id,
            teacher_id: slot.teacher_id,
            hours_per_week: 0
          });
        }
        pairMap.get(key).hours_per_week += 1;
      });
    });

    const updatedSubjectsList = Array.from(pairMap.values());

    console.log(`  Updating class "${classCode}": ${calendarData.length} days, ${updatedSubjectsList.length} subjects.`);

    await classesColl.updateOne(
      { _id: clsDoc._id },
      {
        $set: {
          ID: classCode,
          classname: classCode,
          calendar: calendarData,
          subjects: updatedSubjectsList
        }
      }
    );
  }

  // Rebuild teacher schedules across all classes
  console.log("\nRebuilding teacher schedules across all classes...");
  const allClasses = await classesColl.find({}).toArray();
  const teacherSchedules = {};

  for (const cls of allClasses) {
    if (!cls.calendar) continue;
    for (let dayIdx = 0; dayIdx < cls.calendar.length; dayIdx++) {
      for (let lessonIdx = 0; lessonIdx < cls.calendar[dayIdx].length; lessonIdx++) {
        const entry = cls.calendar[dayIdx][lessonIdx];
        if (entry && entry.teacher_id && entry.teacher_id.toString() !== "000000000000000000000000") {
          const tid = entry.teacher_id.toString();
          if (!teacherSchedules[tid]) {
            teacherSchedules[tid] = Array.from({ length: 5 }, () =>
              Array.from({ length: 7 }, () => ({
                teacher_id: new ObjectId("000000000000000000000000"),
                subject_id: new ObjectId("000000000000000000000000")
              }))
            );
          }
          if (dayIdx < 5 && lessonIdx < 7) {
            teacherSchedules[tid][dayIdx][lessonIdx] = {
              teacher_id: entry.teacher_id,
              subject_id: entry.subject_id,
              class_id: cls._id
            };
          }
        }
      }
    }
  }

  for (const [teacherID, cal] of Object.entries(teacherSchedules)) {
    await teachersColl.updateOne(
      { _id: new ObjectId(teacherID) },
      { $set: { calendar: cal } }
    );
  }

  console.log("\n✅ All class schedules and teacher calendars successfully updated!");
  await client.close();
}

updateAllSchedules().catch(console.error);
