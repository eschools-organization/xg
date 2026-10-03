const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || "mongodb+srv://kakhiweinrooneykakhidze_db_user:AL6ZBiEZ6tk%402L4@small.r76sze8.mongodb.net/khichauri";

const userInput = [
  {
    className: "პირველი კლასი",
    classKey: "1ა",
    head: "ლელა აბულაძე",
    items: [
      { subject: "ქართული", teacher: "ლელა აბულაძე" },
      { subject: "მათემატიკა", teacher: "ლელა აბულაძე" },
      { subject: "ბუნებისმეტყველება", teacher: "ინგული ჯორბენაძე" },
      { subject: "ფიზიკური აღზრდა", teacher: "გულიკო ბოლქვაძე" },
      { subject: "მუსიკა", teacher: "გულიკო ბოლქვაძე" },
      { subject: "ხელოვნება", teacher: "მამუკა ჯორბენაძე" },
      { subject: "ჭადრაკი", teacher: "გულიკო ბოლქვაძე" }
    ]
  },
  {
    className: "II კლასი",
    classKey: "2ა",
    head: "ნაზი ქამაშიძე",
    items: [
      { subject: "ქართული", teacher: "ნაზი ქამაშიძე" },
      { subject: "მათემატიკა", teacher: "ნაზი ქამაშიძე" },
      { subject: "უცხო ენა (ინგლისური)", teacher: "ნათია დევანა ძე" },
      { subject: "ბუნებისმეტყველება", teacher: "ინგული ჯორბენაძე" },
      { subject: "ფიზიკური აღზრდა", teacher: "ნაზი ქამაშიძე" },
      { subject: "მუსიკა", teacher: "ნაზი ქამაშიძე" },
      { subject: "ხელოვნება", teacher: "მამუკა ჯორბენაძე" },
      { subject: "ჭადრაკი", teacher: "გულიკო ბოლქვაძე" },
      { subject: "კომპიუტერული ტექნოლოგიები", teacher: "ირმა მახარაძე" }
    ]
  },
  {
    className: "მესამე კლასი",
    classKey: "3ა",
    head: "გულიკო ბოლქვაძე",
    items: [
      { subject: "ქართული", teacher: "გულიკო ბოლქვაძე" },
      { subject: "მათემატიკა", teacher: "ნაზი ქამაშიძე" },
      { subject: "ინგლისური", teacher: "ნათია დევანა ძე" },
      { subject: "მე და საზოგადოება", teacher: "ირმა მახარაძე" },
      { subject: "ბუნებისმეტყველება", teacher: "ინგული ჯორბენაძე" },
      { subject: "კომპიუტერული ტექნოლოგიები", teacher: "ირმა მახარაძე" },
      { subject: "ხელოვნება", teacher: "მამუკა ჯორბენაძე" },
      { subject: "მუსიკა", teacher: "გულიკო ბოლქვაძე" },
      { subject: "სპორტი", teacher: "გულიკო ბოლქვაძე" }
    ]
  },
  {
    className: "მეოთხე კლასი",
    classKey: "4ა",
    head: "ლელა აბულაძე",
    items: [
      { subject: "ქართული", teacher: "ლელა აბულაძე" },
      { subject: "მათემატიკა", teacher: "ლელა აბულაძე" },
      { subject: "ინგლისური", teacher: "ნათია დევანაძე" },
      { subject: "ბუნებისმეტყველება", teacher: "ინგული ჯორბენაძე" },
      { subject: "მე და საზოგადოება", teacher: "ირმა მახარაძე" },
      { subject: "კომპიუტერული ტექნოლოგიები", teacher: "ირმა მახარაძე" },
      { subject: "ხელოვნება", teacher: "მამუკა ჯორბენაძე" },
      { subject: "მუსიკა", teacher: "გულიკო ბოლქვაძე" },
      { subject: "სპორტი", teacher: "გულიკო ბოლქვაძე" }
    ]
  },
  {
    className: "მეხუთე კლასი",
    classKey: "5ა",
    head: "ჯეირან ბეჟანიძე",
    items: [
      { subject: "ქართული", teacher: "ჯეირან ბეჟანიძე" },
      { subject: "მათემატიკა", teacher: "ლიანა კუდუხაშვილი" },
      { subject: "ინგლისური", teacher: "ნათია დევანაძე" },
      { subject: "რუსული", teacher: "თამაზ დევანაძე" },
      { subject: "ჩვენი საქართველო", teacher: "ჯემალ ჯორბენაძე" },
      { subject: "ბუნებისმეტყველება", teacher: "მაყვალა ქედელიძე" },
      { subject: "კომპიუტერული ტექნოლოგიები", teacher: "ირმა მახარაძე" },
      { subject: "ხელოვნება", teacher: "მამუკა ჯორბენაძე" },
      { subject: "მუსიკა", teacher: "მირანდა გელაძე" },
      { subject: "სპორტი", teacher: "ოთარი თავართქილაძე" }
    ]
  },
  {
    className: "მეექვსე კლასი",
    classKey: "6ა",
    head: "მაყვალა ქედელიძე",
    items: [
      { subject: "ქართული", teacher: "ჯეირან ბეჟანიძე" },
      { subject: "მათემატიკა", teacher: "ლია კუდუხაშვილი" },
      { subject: "ინგლისური", teacher: "ნათია დევანაძე" },
      { subject: "რუსული", teacher: "თამაზ დევანაძე" },
      { subject: "ჩვენი საქართველო", teacher: "ზურაბ შავაძე" },
      { subject: "ბუნებისმეტყველება", teacher: "მაყვალა ქედელიძე" },
      { subject: "კომპიუტერული ტექნოლოგიები", teacher: "ირმა მახარაძე" },
      { subject: "ხელოვნება", teacher: "მამუკა ჯორბენაძე" },
      { subject: "მუსიკა", teacher: "მირანდა გელაძე" },
      { subject: "სპორტი", teacher: "ოთარი თავართქილაძე" }
    ]
  },
  {
    className: "მერვე კლასი",
    classKey: "8ა",
    head: "მამუკა ჯორბენაძე",
    items: [
      { subject: "ქართული", teacher: "ჯეირან ბეჟანიძე" },
      { subject: "მათემატიკა", teacher: "ლია კუდუხაშვილი" },
      { subject: "ინგლისური", teacher: "ნათია დევანაძე" },
      { subject: "რუსული", teacher: "თამაზ დევანაძე" },
      { subject: "ისტორია", teacher: "ჯემალ ჯორბენაძე" },
      { subject: "გეოგრაფია", teacher: "ლიანა შაინიძე" },
      { subject: "ბიოლოგია", teacher: "ლიანა აბულაძე" },
      { subject: "ქიმია", teacher: "ნანა აბულაძე" },
      { subject: "ფიზიკა", teacher: "მაყვალა ქედელიძე" },
      { subject: "სამოქალაქო განათლება", teacher: "ზურაბ შავაძე" },
      { subject: "ხელოვნება", teacher: "მამუკა ჯორბენაძე" },
      { subject: "სპორტი", teacher: "ოთარი თავართქილაძე" },
      { subject: "მუსიკა", teacher: "მირანდა გელაძე" }
    ]
  },
  {
    className: "მეცხრე კლასი",
    classKey: "9ა",
    head: "ლიანა შაინიძე",
    items: [
      { subject: "ქართული ლიტერატურა", teacher: "გული ბოლქვაძე" },
      { subject: "ქართული ენა", teacher: "გული ბოლქვაძე" },
      { subject: "მათემატიკა", teacher: "ცისანა ქედელიძე" },
      { subject: "ინგლისური", teacher: "ნათია დევანაძე" },
      { subject: "რუსული", teacher: "თამაზ დევანაძე" },
      { subject: "ისტორია", teacher: "ჯემალ ჯორბენაძე" },
      { subject: "გეოგრაფია", teacher: "ლიანა შაინიძე" },
      { subject: "ბიოლოგია", teacher: "ლიანა აბულაძე" },
      { subject: "ფიზიკა", teacher: "მაყვალა ქედელიძე" },
      { subject: "ქიმია", teacher: "ნანა აბულაძე" },
      { subject: "სამოქალაქო განათლება", teacher: "ლიანა შაინიძე" },
      { subject: "ხელოვნება", teacher: "მამუკა ჯორბენაძე" },
      { subject: "მუსიკა", teacher: "მირანდა გელაძე" },
      { subject: "სპორტი", teacher: "ოთარი თავართქილაძე" }
    ]
  },
  {
    className: "მეთერთმეტე კლასი",
    classKey: "11ა",
    head: "ცარინა ქათამაძე",
    items: [
      { subject: "ქართული", teacher: "ჯეირან ბეჟანიძე" },
      { subject: "მათემატიკა", teacher: "ცისანა ქედელიძე" },
      { subject: "ინგლისური", teacher: "ნათია დევანაძე" },
      { subject: "რუსული", teacher: "თამაზ დევანაძე" },
      { subject: "ისტორია", teacher: "ჯემალ ჯორბენაძე" },
      { subject: "საქართველოს ისტორია", teacher: "ჯემალ ჯორბენაძე" },
      { subject: "გეოგრაფია", teacher: "ლიანა შაინიძე" },
      { subject: "სამოქალაქო განათლება", teacher: "ზურაბ შავაძე" },
      { subject: "სამოქალაქო განათლება (პროექტი)", teacher: "ზურაბ შავაძე" },
      { subject: "ბიოლოგია", teacher: "ლიანა აბულაძე" },
      { subject: "ფიზიკა", teacher: "მაყვალა ქედელიძე" },
      { subject: "ქიმია", teacher: "ნანა აბულაძე" },
      { subject: "სპორტი", teacher: "ოთარი თავართქილაძე" },
      { subject: "ხელოვნება პროექტი", teacher: "მამუკა ჯორბენაძე" }
    ]
  },
  {
    className: "მეთორმეტე კლასი",
    classKey: "12ა",
    head: "გული ბოლქვაძე",
    items: [
      { subject: "ქართული", teacher: "გული ბოლქვაძე" },
      { subject: "მათემატიკა", teacher: "მაყვალა ქედელიძე" },
      { subject: "ინგლისური", teacher: "ნათია დევანაძე" },
      { subject: "რუსული", teacher: "თამაზ დევანაძე" },
      { subject: "ისტორია", teacher: "ჯემალ ჯორბენაძე" },
      { subject: "საქართველოს ისტორია", teacher: "ჯემალ ჯორბენაძე" },
      { subject: "გეოგრაფია", teacher: "ლიანა შაინიძე" },
      { subject: "სამოქალაქო განათლება", teacher: "ლიანა შაინიძე" },
      { subject: "ბიოლოგია", teacher: "ლიანა აბულაძე" },
      { subject: "ფიზიკა", teacher: "მაყვალა ქედელიძე" },
      { subject: "ქიმია", teacher: "ნანა აბულაძე" },
      { subject: "სპორტი", teacher: "ოთარი თავართქილაძე" },
      { subject: "სამოქალაქო განათლება /პროექტი/", teacher: "ლიანა შაინიძე" }
    ]
  }
];

function normalize(str) {
  if (!str) return '';
  return str.trim().toLowerCase().replace(/\s+/g, ' ');
}

async function analyze() {
  const client = new MongoClient(uri);
  await client.connect();

  for (const dbName of ['khichauri', 'kakhati']) {
    console.log(`\n=================== ANALYZING DB: ${dbName} ===================`);
    const db = client.db(dbName);

    const dbTeachers = await db.collection('teachers').find({}).toArray();
    const dbSubjects = await db.collection('subjects').find({}).toArray();
    const dbClasses = await db.collection('class').find({}).toArray();

    console.log(`DB Teachers count: ${dbTeachers.length}`);
    console.log(`DB Subjects count: ${dbSubjects.length}`);
    console.log(`DB Classes count: ${dbClasses.length}`);

    // Map DB teachers
    const teacherMap = new Map();
    dbTeachers.forEach(t => {
      const fullName = `${t.name || ''} ${t.surname || ''}`.trim();
      teacherMap.set(normalize(fullName), t);
      teacherMap.set(normalize(`${t.name}`), t);
    });

    // Map DB subjects
    const subjectMap = new Map();
    dbSubjects.forEach(s => {
      const sName = s.subject_name || s.name || s.name_ge || '';
      subjectMap.set(normalize(sName), s);
    });

    // Check matches
    const unrecognizedTeachers = new Set();
    const unrecognizedSubjects = new Set();
    const matchedItems = [];

    userInput.forEach(c => {
      // Find class
      const dbClass = dbClasses.find(cls => (cls.classname || cls.name || cls.ID) === c.classKey);
      
      // Match head teacher
      const normHead = normalize(c.head);
      let foundHead = teacherMap.get(normHead);
      if (!foundHead) {
        // try fuzzy search
        for (const [key, t] of teacherMap.entries()) {
          if (key.includes(normHead) || normHead.includes(key)) {
            foundHead = t;
            break;
          }
        }
      }
      if (!foundHead) {
        unrecognizedTeachers.add(`${c.head} (დამრიგებელი: ${c.className})`);
      }

      c.items.forEach(item => {
        // Match teacher
        const normT = normalize(item.teacher);
        let foundT = teacherMap.get(normT);
        if (!foundT) {
          // try partial
          for (const [key, t] of teacherMap.entries()) {
            if (key.replace(/\s/g, '').includes(normT.replace(/\s/g, '')) || normT.replace(/\s/g, '').includes(key.replace(/\s/g, ''))) {
              foundT = t;
              break;
            }
          }
        }
        if (!foundT) {
          unrecognizedTeachers.add(`${item.teacher} (საგანი: ${item.subject}, კლასი: ${c.className})`);
        }

        // Match subject
        const normS = normalize(item.subject);
        let foundS = subjectMap.get(normS);
        if (!foundS) {
          // try custom aliases
          if (normS.includes('ქართული')) foundS = subjectMap.get('ქართული ენა და ლიტერატურა');
          else if (normS.includes('კომპიუტერული') || normS.includes('ისტ')) foundS = subjectMap.get('ისტ');
          else if (normS.includes('ფიზიკური აღზრდა') || normS.includes('სპორტი')) foundS = subjectMap.get('ფიზიკური აღზრდა') || subjectMap.get('სპორტი');
          else if (normS.includes('ინგლისური')) foundS = subjectMap.get('ინგლისური');
          else if (normS.includes('ხელოვნება') && normS.includes('პროექტი')) foundS = subjectMap.get('პროექტი ხელოვნება');
          else if (normS.includes('ხელოვნება')) foundS = subjectMap.get('სახვითი და გამოყენებითი ხელოვნება') || subjectMap.get('ხელოვნება');
          else if (normS.includes('სამოქალაქო') && normS.includes('პროექტი')) foundS = subjectMap.get('პროექტი სამოქალაქო განათლება');
          else if (normS.includes('სამოქალაქო')) foundS = subjectMap.get('სამოქალაქო') || subjectMap.get('მოქალაქეობა');
        }

        if (!foundS) {
          // search dbSubjects
          for (const s of dbSubjects) {
            const sName = normalize(s.subject_name || s.name || s.name_ge || '');
            if (sName && (sName.includes(normS) || normS.includes(sName))) {
              foundS = s;
              break;
            }
          }
        }

        if (!foundS) {
          unrecognizedSubjects.add(`${item.subject} (კლასი: ${c.className})`);
        }
      });
    });

    console.log(`\nUnrecognized Teachers in ${dbName}:`, Array.from(unrecognizedTeachers));
    console.log(`Unrecognized Subjects in ${dbName}:`, Array.from(unrecognizedSubjects));
  }

  await client.close();
}

analyze().catch(console.error);
