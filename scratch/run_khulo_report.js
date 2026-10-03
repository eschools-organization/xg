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

async function runkhichauriReport() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('khichauri');

  const dbTeachers = await db.collection('teachers').find({}).toArray();
  const dbSubjects = await db.collection('subjects').find({}).toArray();
  const dbClasses = await db.collection('class').find({}).toArray();

  console.log('\n--- khichauri ALL DB TEACHERS ---');
  dbTeachers.forEach(t => console.log(`[${t._id}] "${t.name}" "${t.surname}"`));

  console.log('\n--- khichauri ALL DB SUBJECTS ---');
  dbSubjects.forEach(s => console.log(`[${s._id}] "${s.subject_name || s.name || s.name_ge}"`));

  // Helper matchers
  function findTeacher(nameStr) {
    if (!nameStr) return null;
    const clean = nameStr.replace(/\s+/g, ' ').trim();
    // exact match
    let found = dbTeachers.find(t => `${t.name} ${t.surname}`.trim() === clean || `${t.name}`.trim() === clean);
    if (found) return found;

    // fuzzy match (e.g. "ნათია დევანა ძე" vs "ნათია დევანაძე", "ლია კუდუხაშვილი" vs "ლიანა კუდუხაშვილი", "თამაზ დევანაძე" vs "თამაზი დეკანაძე")
    const norm = clean.replace(/\s/g, '');
    found = dbTeachers.find(t => `${t.name}${t.surname}`.replace(/\s/g, '') === norm);
    if (found) return found;

    // check name similarity
    found = dbTeachers.find(t => {
      const dbNorm = `${t.name}${t.surname}`.replace(/\s/g, '');
      return dbNorm.includes(norm) || norm.includes(dbNorm);
    });
    return found || null;
  }

  function findSubject(subStr) {
    if (!subStr) return null;
    const clean = subStr.replace(/\s+/g, ' ').trim();
    
    // Explicit mappings for school subjects
    if (clean === 'ქართული' || clean === 'ქართული ენა' || clean === 'ქართული ლიტერატურა') {
      return dbSubjects.find(s => (s.subject_name || s.name) === 'ქართული ენა და ლიტერატურა');
    }
    if (clean === 'უცხო ენა (ინგლისური)' || clean === 'ინგლისური') {
      return dbSubjects.find(s => (s.subject_name || s.name) === 'ინგლისური');
    }
    if (clean === 'ფიზიკური აღზრდა' || clean === 'სპორტი') {
      return dbSubjects.find(s => (s.subject_name || s.name) === 'ფიზიკური აღზრდა');
    }
    if (clean === 'კომპიუტერული ტექნოლოგიები') {
      return dbSubjects.find(s => (s.subject_name || s.name) === 'ისტ');
    }
    if (clean === 'ხელოვნება') {
      return dbSubjects.find(s => (s.subject_name || s.name) === 'სახვითი და გამოყენებითი ხელოვნება');
    }
    if (clean === 'ხელოვნება პროექტი' || clean === 'ხელოვნება (პროექტი)') {
      return dbSubjects.find(s => (s.subject_name || s.name) === 'პროექტი ხელოვნება');
    }
    if (clean === 'სამოქალაქო განათლება (პროექტი)' || clean === 'სამოქალაქო განათლება /პროექტი/') {
      return dbSubjects.find(s => (s.subject_name || s.name) === 'პროექტი სამოქალაქო განათლება');
    }
    if (clean === 'სამოქალაქო განათლება') {
      return dbSubjects.find(s => (s.subject_name || s.name) === 'სამოქალაქო' || (s.subject_name || s.name) === 'მოქალაქეობა');
    }

    // Direct match
    let found = dbSubjects.find(s => (s.subject_name || s.name || s.name_ge) === clean);
    if (found) return found;

    // Partial match
    found = dbSubjects.find(s => {
      const sName = s.subject_name || s.name || s.name_ge || '';
      return sName.includes(clean) || clean.includes(sName);
    });
    return found || null;
  }

  console.log('\n=================== MATCHING REPORT ===================');
  const missingTeachersReport = [];
  const missingSubjectsReport = [];
  const matchedReport = [];

  userInput.forEach(c => {
    const dbClass = dbClasses.find(cls => (cls.classname || cls.name || cls.ID) === c.classKey);
    const headT = findTeacher(c.head);
    if (!headT) {
      missingTeachersReport.push({ role: 'დამრიგებელი', name: c.head, class: c.className });
    }

    c.items.forEach(item => {
      const t = findTeacher(item.teacher);
      const s = findSubject(item.subject);

      if (!t) {
        missingTeachersReport.push({ role: 'მასწავლებელი', name: item.teacher, subject: item.subject, class: c.className });
      }
      if (!s) {
        missingSubjectsReport.push({ name: item.subject, class: c.className });
      }

      if (t && s && dbClass) {
        matchedReport.push({
          classId: dbClass._id,
          className: c.className,
          classKey: c.classKey,
          subjectId: s._id,
          subjectName: s.subject_name || s.name,
          teacherId: t._id,
          teacherName: `${t.name} ${t.surname}`.trim()
        });
      }
    });
  });

  console.log('MISSING TEACHERS IN DB:', missingTeachersReport);
  console.log('MISSING SUBJECTS IN DB:', missingSubjectsReport);
  console.log(`TOTAL MATCHED ITEMS: ${matchedReport.length}`);

  await client.close();
}

runkhichauriReport().catch(console.error);
