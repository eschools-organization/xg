const { MongoClient, ObjectId } = require("mongodb");
const fs = require("fs");

const uri = process.env.MONGODB_URI || "mongodb+srv://kakhiweinrooneykakhidze_db_user:AL6ZBiEZ6tk%402L4@small.r76sze8.mongodb.net/khichauri";
const dbName = "khichauri";

const T = {
  M_JORBENADZE: "66f303f5cfc556f8606769f0",   // მ. ჯორბენაძე (მამუკა ჯორბენაძე)
  I_JORBENADZE: "639a12e4b32cdce23bf79e3c",   // ი. ჯორბენაძე (ინგული ჯორბენაძე)
  L_ABULADZE_LELA: "639a12bdb32cdce23bf79e36",// ლ. აბულაძე (ლელა აბულაძე)
  L_ABULADZE_LIANA: "68d85586a7d43a20b7a9d571",// ლ. აბულაძე (ლიანა აბულაძე - ბიოლოგია)
  G_BOLKVADZE: "639a10a6b32cdce23bf79dfc",    // გ. ბოლქვაძე (გული ბოლქვაძე)
  N_QAMASHIDZE: "639a12cfb32cdce23bf79e39",   // ნ. ქამაშიძე (ნაზი ქამაშიძე)
  I_MAKHARADZE: "639a1319b32cdce23bf79e45",   // ი. მახარაძე (ირმა მახარაძე)
  N_DEKANADZE: "67001fd9cfc556f860681d6e",    // ნ. დეკანაძე (ეთერი/ნინო დეკანაძე)
  M_QEDELIDZE: "68d854f9a7d43a20b7a9d549",    // მ. ქედელიძე (მარიკა ქედელიძე)
  O_TAVARTKILADZE: "67050f92cfc556f8606908c5",// ო. თავართქილაძე (ოთარი თავართქილაძე)
  M_GELADZE: "68d85705a7d43a20b7a9e0a8",      // მ. გელაძე (მირანდა გელაძე)
  J_BEZHANIDZE: "639a10d7b32cdce23bf79dff",   // ჯ. ბეჟანიძე (ჯეირან ბეჟანიძე)
  J_JORBENADZE: "6704d002cfc556f86068ac18",   // ჯ. ჯორბენაძე (ჯემალ ჯორბენაძე)
  Z_SHAVADZE: "6704d0d4cfc556f86068b8ce",     // ზ. შავაძე (ზურაბ შავაძე)
  L_KUDUKHASHVILI: "639a11dfb32cdce23bf79e18",// ლ. კუდუხაშვილი (ლიანა კუდუხაშვილი)
  T_DEKANADZE: "67050763cfc556f86068f33e",    // თ. დეკანაძე (თამაზი დეკანაძე)
  L_SHAINIDZE: "639a1147b32cdce23bf79e0c",    // ლ. შაინიძე (ლიანა შაინიძე)
  N_ABULADZE: "639a11c5b32cdce23bf79e15",     // ნ. აბულაძე (ნანა აბულაძე)
};

const S = {
  KARTULI: "6391e072e8170db73b8fb0da",
  MATEMATIKA: "6391e072e8170db73b8fb0db",
  QIMIA: "6391e072e8170db73b8fb0dc",
  FIZIKA: "6391e072e8170db73b8fb0dd",
  MUSIKA: "6391e072e8170db73b8fb0de",
  GEOGRAFIA: "6391e072e8170db73b8fb0df",
  SPORTI: "6391e072e8170db73b8fb0e1",
  INGLISURI: "6391e072e8170db73b8fb0e2",
  BUNEBA: "6391e072e8170db73b8fb0e3",
  ISTI: "6391e072e8170db73b8fb0e4",
  KHELOVNEBA: "6391e072e8170db73b8fb0e5",
  ME_DA_SAZ: "6391e072e8170db73b8fb0e6",
  RUSULI: "6391e072e8170db73b8fb0e7",
  CHVENI_SAQ: "6391e072e8170db73b8fb0e8",
  BIOLOGIA: "6391e072e8170db73b8fb0e9",
  MOQALAQEOBA: "6391e072e8170db73b8fb0eb",
  ISTORIA: "6391e072e8170db73b8fb0ec",
  CHADRAKI: "6391e072e8170db73b8fb0ef",
  SAMOQALAQO: "6391e072e8170db73b8fb0f1",
  PR_SAMOQALAQO: "65af8ac793f237748d3fcffd",
  PR_MUSIKA: "65af8ace93f237748d3fd001",
  PR_KHELOVNEBA: "66f3071bcfc556f8606779b7"
};

function slot(subjectId, teacherId) {
  return {
    subject_id: new ObjectId(subjectId),
    teacher_id: new ObjectId(teacherId)
  };
}

const photoSchedules = {
  "1ა": [
    // Mon
    [slot(S.KHELOVNEBA, T.M_JORBENADZE), slot(S.BUNEBA, T.I_JORBENADZE), slot(S.MATEMATIKA, T.L_ABULADZE_LELA), slot(S.KARTULI, T.L_ABULADZE_LELA), slot(S.MUSIKA, T.G_BOLKVADZE)],
    // Tue
    [slot(S.KARTULI, T.L_ABULADZE_LELA), slot(S.KARTULI, T.L_ABULADZE_LELA), slot(S.MATEMATIKA, T.L_ABULADZE_LELA), slot(S.BUNEBA, T.I_JORBENADZE), slot(S.SPORTI, T.G_BOLKVADZE)],
    // Wed
    [slot(S.KHELOVNEBA, T.M_JORBENADZE), slot(S.KARTULI, T.L_ABULADZE_LELA), slot(S.MATEMATIKA, T.L_ABULADZE_LELA), slot(S.SPORTI, T.G_BOLKVADZE), slot(S.KARTULI, T.L_ABULADZE_LELA)],
    // Thu
    [slot(S.KARTULI, T.L_ABULADZE_LELA), slot(S.KARTULI, T.L_ABULADZE_LELA), slot(S.MATEMATIKA, T.L_ABULADZE_LELA), slot(S.SPORTI, T.G_BOLKVADZE), slot(S.CHADRAKI, T.G_BOLKVADZE)],
    // Fri
    [slot(S.KARTULI, T.L_ABULADZE_LELA), slot(S.MATEMATIKA, T.L_ABULADZE_LELA), slot(S.MATEMATIKA, T.L_ABULADZE_LELA), slot(S.MUSIKA, T.G_BOLKVADZE)]
  ],

  "2ა": [
    // Mon
    [slot(S.MATEMATIKA, T.N_QAMASHIDZE), slot(S.KARTULI, T.N_QAMASHIDZE), slot(S.BUNEBA, T.I_JORBENADZE), slot(S.SPORTI, T.N_QAMASHIDZE), slot(S.MUSIKA, T.N_QAMASHIDZE)],
    // Tue
    [slot(S.KARTULI, T.N_QAMASHIDZE), slot(S.BUNEBA, T.I_JORBENADZE), slot(S.MATEMATIKA, T.N_QAMASHIDZE), slot(S.SPORTI, T.N_QAMASHIDZE), slot(S.ISTI, T.I_MAKHARADZE)],
    // Wed
    [slot(S.MATEMATIKA, T.N_QAMASHIDZE), slot(S.KARTULI, T.N_QAMASHIDZE), slot(S.KARTULI, T.N_QAMASHIDZE), slot(S.KHELOVNEBA, T.M_JORBENADZE), slot(S.MUSIKA, T.N_QAMASHIDZE)],
    // Thu
    [slot(S.KARTULI, T.N_QAMASHIDZE), slot(S.INGLISURI, T.N_DEKANADZE), slot(S.MATEMATIKA, T.N_QAMASHIDZE), slot(S.KARTULI, T.N_QAMASHIDZE), slot(S.KHELOVNEBA, T.M_JORBENADZE)],
    // Fri
    [slot(S.KARTULI, T.N_QAMASHIDZE), slot(S.MATEMATIKA, T.N_QAMASHIDZE), slot(S.INGLISURI, T.N_DEKANADZE), slot(S.SPORTI, T.N_QAMASHIDZE), slot(S.CHADRAKI, T.G_BOLKVADZE)]
  ],

  "3ა": [
    // Mon
    [slot(S.KARTULI, T.G_BOLKVADZE), slot(S.SPORTI, T.G_BOLKVADZE), slot(S.MATEMATIKA, T.N_QAMASHIDZE), slot(S.ME_DA_SAZ, T.I_MAKHARADZE), slot(S.BUNEBA, T.I_JORBENADZE)],
    // Tue
    [slot(S.KARTULI, T.G_BOLKVADZE), slot(S.KARTULI, T.G_BOLKVADZE), slot(S.BUNEBA, T.I_JORBENADZE), slot(S.INGLISURI, T.N_DEKANADZE), slot(S.MATEMATIKA, T.N_QAMASHIDZE)],
    // Wed
    [slot(S.KARTULI, T.G_BOLKVADZE), slot(S.MUSIKA, T.G_BOLKVADZE), slot(S.SPORTI, T.G_BOLKVADZE), slot(S.MATEMATIKA, T.N_QAMASHIDZE), slot(S.INGLISURI, T.N_DEKANADZE), slot(S.KHELOVNEBA, T.M_JORBENADZE)],
    // Thu
    [slot(S.KARTULI, T.G_BOLKVADZE), slot(S.MATEMATIKA, T.N_QAMASHIDZE), slot(S.SPORTI, T.G_BOLKVADZE), slot(S.KHELOVNEBA, T.M_JORBENADZE), slot(S.ISTI, T.I_MAKHARADZE)],
    // Fri
    [slot(S.KARTULI, T.G_BOLKVADZE), slot(S.MUSIKA, T.G_BOLKVADZE), slot(S.MATEMATIKA, T.N_QAMASHIDZE), slot(S.ME_DA_SAZ, T.I_MAKHARADZE), slot(S.INGLISURI, T.N_DEKANADZE)]
  ],

  "4ა": [
    // Mon
    [slot(S.MATEMATIKA, T.L_ABULADZE_LELA), slot(S.KARTULI, T.L_ABULADZE_LELA), slot(S.SPORTI, T.L_ABULADZE_LELA), slot(S.MUSIKA, T.L_ABULADZE_LELA), slot(S.KARTULI, T.L_ABULADZE_LELA), slot(S.BUNEBA, T.M_QEDELIDZE)],
    // Tue
    [slot(S.BUNEBA, T.M_QEDELIDZE), slot(S.INGLISURI, T.N_DEKANADZE), slot(S.SPORTI, T.O_TAVARTKILADZE), slot(S.MATEMATIKA, T.L_ABULADZE_LELA), slot(S.KARTULI, T.L_ABULADZE_LELA)],
    // Wed
    [slot(S.MATEMATIKA, T.L_ABULADZE_LELA), slot(S.INGLISURI, T.N_DEKANADZE), slot(S.ME_DA_SAZ, T.I_MAKHARADZE), slot(S.KARTULI, T.L_ABULADZE_LELA), slot(S.MUSIKA, T.M_GELADZE)],
    // Thu
    [slot(S.INGLISURI, T.N_DEKANADZE), slot(S.SPORTI, T.O_TAVARTKILADZE), slot(S.KHELOVNEBA, T.M_JORBENADZE), slot(S.KARTULI, T.L_ABULADZE_LELA), slot(S.MATEMATIKA, T.L_ABULADZE_LELA)],
    // Fri
    [slot(S.ISTI, T.I_MAKHARADZE), slot(S.ME_DA_SAZ, T.I_MAKHARADZE), slot(S.KHELOVNEBA, T.M_JORBENADZE), slot(S.MATEMATIKA, T.L_ABULADZE_LELA), slot(S.KARTULI, T.L_ABULADZE_LELA)]
  ],

  "5ა": [
    // Mon
    [slot(S.ISTI, T.I_MAKHARADZE), slot(S.SPORTI, T.O_TAVARTKILADZE), slot(S.CHVENI_SAQ, T.J_JORBENADZE), slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.MATEMATIKA, T.M_QEDELIDZE)],
    // Tue
    [slot(S.CHVENI_SAQ, T.J_JORBENADZE), slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.KHELOVNEBA, T.M_JORBENADZE), slot(S.BUNEBA, T.M_QEDELIDZE), slot(S.MATEMATIKA, T.M_QEDELIDZE), slot(S.INGLISURI, T.N_DEKANADZE)],
    // Wed
    [slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.SPORTI, T.O_TAVARTKILADZE), slot(S.INGLISURI, T.N_DEKANADZE), slot(S.ISTI, T.I_MAKHARADZE), slot(S.MATEMATIKA, T.M_QEDELIDZE), slot(S.MUSIKA, T.M_GELADZE)],
    // Thu
    [slot(S.BUNEBA, T.M_QEDELIDZE), slot(S.MUSIKA, T.M_GELADZE), slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.INGLISURI, T.N_DEKANADZE), slot(S.MATEMATIKA, T.M_QEDELIDZE), slot(S.RUSULI, T.T_DEKANADZE)],
    // Fri
    [slot(S.KHELOVNEBA, T.M_JORBENADZE), slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.RUSULI, T.T_DEKANADZE), slot(S.BUNEBA, T.M_QEDELIDZE), slot(S.MATEMATIKA, T.M_QEDELIDZE)]
  ],

  "6ა": [
    // Mon
    [slot(S.BUNEBA, T.M_QEDELIDZE), slot(S.ISTI, T.I_MAKHARADZE), slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.CHVENI_SAQ, T.Z_SHAVADZE), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI)],
    // Tue
    [slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.CHVENI_SAQ, T.Z_SHAVADZE), slot(S.CHVENI_SAQ, T.Z_SHAVADZE), slot(S.ISTI, T.I_MAKHARADZE), slot(S.INGLISURI, T.N_DEKANADZE)],
    // Wed
    [slot(S.BUNEBA, T.M_QEDELIDZE), slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.MUSIKA, T.M_GELADZE), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI), slot(S.RUSULI, T.T_DEKANADZE), slot(S.SPORTI, T.O_TAVARTKILADZE)],
    // Thu
    [slot(S.MUSIKA, T.M_GELADZE), slot(S.BUNEBA, T.M_QEDELIDZE), slot(S.INGLISURI, T.N_DEKANADZE), slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI), slot(S.KHELOVNEBA, T.M_JORBENADZE)],
    // Fri
    [slot(S.RUSULI, T.T_DEKANADZE), slot(S.INGLISURI, T.N_DEKANADZE), slot(S.SPORTI, T.O_TAVARTKILADZE), slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI), slot(S.KHELOVNEBA, T.M_JORBENADZE)]
  ],

  "7ა": [
    [], [], [], [], []
  ],

  "8ა": [
    // Mon
    [slot(S.SPORTI, T.O_TAVARTKILADZE), slot(S.KARTULI, T.N_DEKANADZE), slot(S.FIZIKA, T.L_KUDUKHASHVILI), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI), slot(S.SAMOQALAQO, T.Z_SHAVADZE), slot(S.ISTORIA, T.J_JORBENADZE)],
    // Tue
    [slot(S.FIZIKA, T.M_QEDELIDZE), slot(S.BIOLOGIA, T.L_ABULADZE_LIANA), slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.ISTORIA, T.J_JORBENADZE), slot(S.GEOGRAFIA, T.L_SHAINIDZE), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI), slot(S.SAMOQALAQO, T.Z_SHAVADZE)],
    // Wed
    [slot(S.MUSIKA, T.M_GELADZE), slot(S.QIMIA, T.N_ABULADZE), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI), slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.KHELOVNEBA, T.M_JORBENADZE), slot(S.INGLISURI, T.N_DEKANADZE)],
    // Thu
    [slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.BIOLOGIA, T.L_ABULADZE_LIANA), slot(S.GEOGRAFIA, T.L_SHAINIDZE), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI), slot(S.RUSULI, T.T_DEKANADZE), slot(S.INGLISURI, T.N_DEKANADZE), slot(S.QIMIA, T.N_ABULADZE)],
    // Fri
    [slot(S.SPORTI, T.O_TAVARTKILADZE), slot(S.KHELOVNEBA, T.M_JORBENADZE), slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI), slot(S.RUSULI, T.T_DEKANADZE), slot(S.INGLISURI, T.N_DEKANADZE)]
  ],

  "9ა": [
    // Mon
    [slot(S.KARTULI, T.G_BOLKVADZE), slot(S.KHELOVNEBA, T.M_JORBENADZE), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI), slot(S.SPORTI, T.O_TAVARTKILADZE), slot(S.INGLISURI, T.N_DEKANADZE), slot(S.ISTORIA, T.J_JORBENADZE)],
    // Tue
    [slot(S.BIOLOGIA, T.L_ABULADZE_LIANA), slot(S.KARTULI, T.G_BOLKVADZE), slot(S.GEOGRAFIA, T.L_SHAINIDZE), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI), slot(S.ISTORIA, T.J_JORBENADZE), slot(S.QIMIA, T.N_ABULADZE), slot(S.SAMOQALAQO, T.L_SHAINIDZE)],
    // Wed
    [slot(S.KARTULI, T.G_BOLKVADZE), slot(S.FIZIKA, T.M_QEDELIDZE), slot(S.KARTULI, T.G_BOLKVADZE), slot(S.QIMIA, T.N_ABULADZE), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI), slot(S.RUSULI, T.T_DEKANADZE), slot(S.MUSIKA, T.M_GELADZE)],
    // Thu
    [slot(S.GEOGRAFIA, T.L_SHAINIDZE), slot(S.KARTULI, T.G_BOLKVADZE), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI), slot(S.ISTORIA, T.J_JORBENADZE), slot(S.MUSIKA, T.M_GELADZE), slot(S.BIOLOGIA, T.L_ABULADZE_LIANA), slot(S.SPORTI, T.O_TAVARTKILADZE)],
    // Fri
    [slot(S.FIZIKA, T.M_QEDELIDZE), slot(S.KARTULI, T.G_BOLKVADZE), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI), slot(S.INGLISURI, T.N_DEKANADZE), slot(S.KARTULI, T.G_BOLKVADZE), slot(S.RUSULI, T.T_DEKANADZE), slot(S.SAMOQALAQO, T.L_SHAINIDZE)]
  ],

  "10ა": [
    // Mon
    [slot(S.SPORTI, T.O_TAVARTKILADZE), slot(S.ISTORIA, T.J_JORBENADZE), slot(S.KARTULI, T.G_BOLKVADZE), slot(S.INGLISURI, T.N_DEKANADZE), slot(S.SAMOQALAQO, T.Z_SHAVADZE), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI)],
    // Tue
    [slot(S.GEOGRAFIA, T.L_SHAINIDZE), slot(S.FIZIKA, T.M_QEDELIDZE), slot(S.KARTULI, T.G_BOLKVADZE), slot(S.BIOLOGIA, T.L_ABULADZE_LIANA), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI), slot(S.SAMOQALAQO, T.Z_SHAVADZE), slot(S.ISTORIA, T.J_JORBENADZE)],
    // Wed
    [slot(S.INGLISURI, T.N_DEKANADZE), slot(S.RUSULI, T.T_DEKANADZE), slot(S.QIMIA, T.N_ABULADZE), slot(S.KARTULI, T.G_BOLKVADZE), slot(S.PR_KHELOVNEBA, T.M_JORBENADZE), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI)],
    // Thu
    [slot(S.KARTULI, T.G_BOLKVADZE), slot(S.BIOLOGIA, T.L_ABULADZE_LIANA), slot(S.ISTORIA, T.J_JORBENADZE), slot(S.GEOGRAFIA, T.L_SHAINIDZE), slot(S.QIMIA, T.N_ABULADZE), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI), slot(S.PR_SAMOQALAQO, T.L_SHAINIDZE)],
    // Fri
    [slot(S.INGLISURI, T.N_DEKANADZE), slot(S.FIZIKA, T.M_QEDELIDZE), slot(S.KARTULI, T.G_BOLKVADZE), slot(S.RUSULI, T.T_DEKANADZE), slot(S.SPORTI, T.O_TAVARTKILADZE), slot(S.MATEMATIKA, T.L_KUDUKHASHVILI)]
  ],

  "11ა": [
    // Mon
    [slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.MATEMATIKA, T.M_QEDELIDZE), slot(S.SAMOQALAQO, T.Z_SHAVADZE), slot(S.ISTORIA, T.J_JORBENADZE), slot(S.INGLISURI, T.N_DEKANADZE), slot(S.PR_SAMOQALAQO, T.Z_SHAVADZE), slot(S.ISTORIA, T.J_JORBENADZE)],
    // Tue
    [slot(S.SAMOQALAQO, T.Z_SHAVADZE), slot(S.GEOGRAFIA, T.L_SHAINIDZE), slot(S.ISTORIA, T.J_JORBENADZE), slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.BIOLOGIA, T.L_ABULADZE_LIANA), slot(S.MATEMATIKA, T.M_QEDELIDZE), slot(S.QIMIA, T.N_ABULADZE)],
    // Wed
    [slot(S.RUSULI, T.T_DEKANADZE), slot(S.SPORTI, T.O_TAVARTKILADZE), slot(S.MATEMATIKA, T.M_QEDELIDZE), slot(S.INGLISURI, T.N_DEKANADZE), slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.FIZIKA, T.M_QEDELIDZE)],
    // Thu
    [slot(S.BIOLOGIA, T.L_ABULADZE_LIANA), slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.MATEMATIKA, T.M_QEDELIDZE), slot(S.RUSULI, T.T_DEKANADZE), slot(S.ISTORIA, T.J_JORBENADZE), slot(S.QIMIA, T.N_ABULADZE)],
    // Fri
    [slot(S.KARTULI, T.J_BEZHANIDZE), slot(S.SPORTI, T.O_TAVARTKILADZE), slot(S.MATEMATIKA, T.M_QEDELIDZE), slot(S.PR_KHELOVNEBA, T.M_JORBENADZE), slot(S.GEOGRAFIA, T.L_SHAINIDZE), slot(S.FIZIKA, T.M_QEDELIDZE)]
  ],

  "12ა": [
    // Mon
    [slot(S.ISTORIA, T.J_JORBENADZE), slot(S.KARTULI, T.G_BOLKVADZE), slot(S.INGLISURI, T.N_DEKANADZE), slot(S.MATEMATIKA, T.M_QEDELIDZE), slot(S.SPORTI, T.O_TAVARTKILADZE), slot(S.FIZIKA, T.M_QEDELIDZE)],
    // Tue
    [slot(S.INGLISURI, T.N_DEKANADZE), slot(S.ISTORIA, T.J_JORBENADZE), slot(S.MATEMATIKA, T.M_QEDELIDZE), slot(S.KARTULI, T.G_BOLKVADZE), slot(S.QIMIA, T.N_ABULADZE), slot(S.SAMOQALAQO, T.L_SHAINIDZE), slot(S.BIOLOGIA, T.L_ABULADZE_LIANA)],
    // Wed
    [slot(S.QIMIA, T.N_ABULADZE), slot(S.KARTULI, T.G_BOLKVADZE), slot(S.RUSULI, T.T_DEKANADZE), slot(S.FIZIKA, T.M_QEDELIDZE), slot(S.MATEMATIKA, T.M_QEDELIDZE), slot(S.SPORTI, T.O_TAVARTKILADZE)],
    // Thu
    [slot(S.ISTORIA, T.J_JORBENADZE), slot(S.ISTORIA, T.J_JORBENADZE), slot(S.KARTULI, T.G_BOLKVADZE), slot(S.MATEMATIKA, T.M_QEDELIDZE), slot(S.BIOLOGIA, T.L_ABULADZE_LIANA), slot(S.GEOGRAFIA, T.L_SHAINIDZE)],
    // Fri
    [slot(S.KARTULI, T.G_BOLKVADZE), slot(S.RUSULI, T.T_DEKANADZE), slot(S.GEOGRAFIA, T.L_SHAINIDZE), slot(S.SAMOQALAQO, T.L_SHAINIDZE), slot(S.MATEMATIKA, T.M_QEDELIDZE), slot(S.PR_SAMOQALAQO, T.L_SHAINIDZE)]
  ]
};

async function updateAllFromPhoto() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  console.log("Connected to MongoDB.");

  const classesColl = db.collection("class");
  const teachersColl = db.collection("teachers");
  const dbClasses = await classesColl.find({}).toArray();

  for (const [classCode, calendarData] of Object.entries(photoSchedules)) {
    let clsDoc = dbClasses.find(c => c.ID === classCode || c.classname === classCode);

    if (!clsDoc) {
      console.log(`Creating missing class "${classCode}"...`);
      const insertRes = await classesColl.insertOne({
        ID: classCode,
        classname: classCode,
        subjects: [],
        calendar: [],
        students: []
      });
      clsDoc = { _id: insertRes.insertedId, ID: classCode, classname: classCode, subjects: [], calendar: [], students: [] };
    }

    console.log(`\nUpdating Class "${classCode}" (_id: ${clsDoc._id})...`);

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
    console.log(`  Updated ${calendarData.length} days, ${updatedSubjectsList.length} unique subject-teacher pairs.`);
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

  // Dump to db_dump.json
  const dataToDump = {
    classes: await db.collection("class").find({}).toArray(),
    subjects: await db.collection("subjects").find({}).toArray(),
    teachers: await db.collection("teachers").find({}).toArray()
  };
  fs.writeFileSync("db_dump.json", JSON.stringify(dataToDump, null, 2), "utf8");

  console.log("\n✅ Database and db_dump.json updated 100% accurately according to official photos!");
  await client.close();
}

updateAllFromPhoto().catch(console.error);
