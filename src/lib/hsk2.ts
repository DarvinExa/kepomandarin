/**
 * Data Struktur Kurikulum HSK 2 (Pratinjau Draft // Roadmap)
 * Sesuai prinsip AGENTS.md:
 * - HSK 2 disiapkan sebagai struktur data terstandar bertanda draft.
 * - Konten menyertakan Hanzi, Pinyin, dan terjemahan Bahasa Indonesia alami.
 * - Tidak memicu kuis formal tanpa validasi MVP HSK 1.
 */

export interface Hsk2GrammarPoint {
  id: string;
  patternNumber: string;
  ruleTitle: string;
  formula: string;
  explanation: string;
  keyRule: string;
  specimenSentences: {
    hanzi: string;
    pinyin: string;
    translation: string;
    focusNote?: string;
  }[];
}

export interface Hsk2LessonDialogue {
  speaker: string;
  role: string;
  hanzi: string;
  pinyin: string;
  translation: string;
}

export interface Hsk2LessonBlueprint {
  id: string;
  slug: string;
  lessonNumber: number;
  title: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  objectives: string;
  overview: string;
  primaryGrammarId: string;
  vocabCount: number;
  estimatedMinutes: number;
  dialogueSpecimen: Hsk2LessonDialogue[];
  keyVocabPreview: {
    hanzi: string;
    pinyin: string;
    translation: string;
    tag: string;
  }[];
}

export interface Hsk2VocabWord {
  id: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  partOfSpeech: string;
  themeCategory: string;
  sampleSentence: {
    hanzi: string;
    pinyin: string;
    translation: string;
  };
}

export interface Hsk2ThemeCategory {
  id: string;
  title: string;
  description: string;
  wordsCount: number;
}

export const HSK2_METADATA = {
  levelCode: "HSK 2",
  title: "Tingkat Dasar II (Kurikulum Aktif)",
  status: "active" as const,
  badgeText: "KURIKULUM AKTIF",
  vocabTarget: 300,
  newVocabTarget: 150,
  previousLevelVocab: 150,
  competencyDescription:
    "Memperluas kemampuan komunikasi langsung dalam rutinitas harian, perbandingan kualitas, pengungkapan pengalaman masa lampau, penunjuk jarak dan arah, serta ungkapan kesehatan sederhana.",
  cefrEquivalent: "CEFR A2",
  disclaimer:
    "Kurikulum HSK 2 aktif untuk pembelajaran mandiri terstruktur: mencakup silabus 5 unit pelajaran, 6 matriks formula tata bahasa, dan 150 taksonomi kosakata tematik yang dapat disimpan langsung ke Buku Frasa pribadi.",
};

export const HSK2_GRAMMAR_POINTS: Hsk2GrammarPoint[] = [
  {
    id: "hsk2-g01",
    patternNumber: "01",
    ruleTitle: "Partikel Perubahan Kondisi & Tindakan Selesai: 了 (Le)",
    formula: "Subjek + Kata Kerja + 了 (+ Objek) / Kalimat + 了",
    explanation:
      "Partikel 了 memiliki dua fungsi utama: menandakan bahwa suatu perbuatan telah selesai dilaksanakan, atau mengindikasikan munculnya situasi baru (perubahan kondisi).",
    keyRule:
      "Jangan menyamakan 了 secara mutlak dengan past-tense bahasa Inggris. Jika suatu tindakan belum selesai atau terjadi secara umum, tidak memakai 了.",
    specimenSentences: [
      {
        hanzi: "我吃了早饭就去学校。",
        pinyin: "Wǒ chī le zǎofàn jiù qù xuéxiào.",
        translation: "Setelah sarapan, saya langsung pergi ke sekolah.",
        focusNote: "Menandakan tindakan pertama (makan) selesai sebelum tindakan kedua.",
      },
      {
        hanzi: "天黑了，我们回家吧。",
        pinyin: "Tiān hēi le, wǒmen huí jiā ba.",
        translation: "Hari sudah gelap, ayo kita pulang ke rumah.",
        focusNote: "Perubahan kondisi: dari siang/terang menjadi gelap.",
      },
      {
        hanzi: "下雨了，你带伞了吗？",
        pinyin: "Xià yǔ le, nǐ dài sǎn le ma?",
        translation: "Hujan sudah mulai turun, apakah kamu membawa payung?",
        focusNote: "Munculnya situasi baru di alam sekitar.",
      },
    ],
  },
  {
    id: "hsk2-g02",
    patternNumber: "02",
    ruleTitle: "Pola Perbandingan: 比 (Bǐ)",
    formula: "A + 比 + B + Kata Sifat (+ Tingkatan)",
    explanation:
      "Digunakan untuk membandingkan dua entitas di mana entitas A memiliki tingkat sifat yang melebihi entitas B.",
    keyRule:
      "Dilarang meletakkan kata 很 (hěn) sebelum kata sifat dalam kalimat 比. Untuk menyatakan perbedaan besar, gunakan 多了 (duō le) atau 得多 (de duō) di akhir.",
    specimenSentences: [
      {
        hanzi: "今天比昨天冷一点儿。",
        pinyin: "Jīntiān bǐ zuótiān lěng yìdiǎnr.",
        translation: "Hari ini sedikit lebih dingin daripada kemarin.",
        focusNote: "Perbedaan derajat kecil ditandai dengan 一点儿.",
      },
      {
        hanzi: "西瓜比苹果贵多了。",
        pinyin: "Xīguā bǐ píngguǒ guì duō le.",
        translation: "Semangka jauh lebih mahal daripada apel.",
        focusNote: "Perbedaan derajat besar ditandai dengan 多了.",
      },
      {
        hanzi: "哥哥比我高五厘米。",
        pinyin: "Gēge bǐ wǒ gāo wǔ límǐ.",
        translation: "Kakak laki-laki 5 cm lebih tinggi daripada saya.",
        focusNote: "Angka selisih spesifik diletakkan di ujung kalimat.",
      },
    ],
  },
  {
    id: "hsk2-g03",
    patternNumber: "03",
    ruleTitle: "Aspek Pengalaman Lampau: 动词 + 过 (Guò)",
    formula: "Subjek + Kata Kerja + 过 (+ Objek) / Negasi: 没有 + Kata Kerja + 过",
    explanation:
      "Partikel aspek 过 menekankan bahwa subjek pernah mengalami atau melakukan tindakan tersebut setidaknya satu kali di masa lalu.",
    keyRule:
      "Bentuk sangkalan (negasi) selalu menggunakan 没 (méi) atau 没有 (méiyǒu), tidak pernah menggunakan 不 (bù).",
    specimenSentences: [
      {
        hanzi: "我去过中国两次。",
        pinyin: "Wǒ qù guò Zhōngguó liǎng cì.",
        translation: "Saya pernah berkunjung ke Tiongkok dua kali.",
        focusNote: "Menyatakan pengalaman lampau yang sudah berlalu.",
      },
      {
        hanzi: "我没吃过北京烤鸭。",
        pinyin: "Wǒ méi chī guò Běijīng kǎoyā.",
        translation: "Saya belum pernah memakan bebek panggang Beijing.",
        focusNote: "Bentuk sangkalan pengalaman menggunakan 没.",
      },
      {
        hanzi: "你看过这部中国电影吗？",
        pinyin: "Nǐ kàn guò zhè bù Zhōngguó diànyǐng ma?",
        translation: "Apakah kamu sudah pernah menonton film Tiongkok ini?",
        focusNote: "Pertanyaan pengalaman dengan partikel tanya 吗.",
      },
    ],
  },
  {
    id: "hsk2-g04",
    patternNumber: "04",
    ruleTitle: "Pengukuran Jarak Antar Titik: 离 (Lí)",
    formula: "Titik A + 离 + Titik B + 远 / 近 / (Ukuran Jarak)",
    explanation:
      "Kata 离 berfungsi mengukur rentang jarak spasial maupun interval waktu antara dua titik acuan.",
    keyRule:
      "Struktur selalu [Titik A] 离 [Titik B], baru diikuti deskripsi jarak (很远 / 很近 / 500米). Jangan meletakkan 离 di awal kalimat tanpa subjek pertama.",
    specimenSentences: [
      {
        hanzi: "我家离学校很近，走路只要五分钟。",
        pinyin: "Wǒ jiā lí xuéxiào hěn jìn, zǒulù zhǐ yào wǔ fēnzhōng.",
        translation: "Rumah saya sangat dekat dari sekolah, jalan kaki hanya butuh 5 menit.",
        focusNote: "Titik A (rumah) diukur dari Titik B (sekolah).",
      },
      {
        hanzi: "火车站离这里远不远？",
        pinyin: "Huǒchēzhàn lí zhèlǐ yuǎn bu yuǎn?",
        translation: "Apakah stasiun kereta jauh dari sini?",
        focusNote: "Bentuk tanya afirmasi-negasi: 远不远.",
      },
      {
        hanzi: "离考试还有两个星期。",
        pinyin: "Lí kǎoshì hái yǒu liǎng gè xīngqī.",
        translation: "Masih tersisa dua minggu lagi menjelang ujian.",
        focusNote: "Penggunaan 离 untuk mengukur jarak waktu.",
      },
    ],
  },
  {
    id: "hsk2-g05",
    patternNumber: "05",
    ruleTitle: "Aspek Progresif: 正在 / 在 (Zhèngzài / Zài)",
    formula: "Subjek + 正在 / 正 / 在 + Kata Kerja (+ Objek) (+ 呢)",
    explanation:
      "Menandakan suatu aktivitas yang sedang aktif berlangsung pada saat pembicaraan terjadi (setara 'sedang' atau '-ing').",
    keyRule:
      "Partikel modal 呢 di akhir kalimat sering ditambahkan untuk memperkuat kesan progresif yang hidup dalam percakapan lisan.",
    specimenSentences: [
      {
        hanzi: "他正在房间里做作业呢。",
        pinyin: "Tā zhèngzài fángjiān lǐ zuò zuòyè ne.",
        translation: "Dia sedang mengerjakan pekerjaan rumah di dalam kamar.",
        focusNote: "Penggunaan kombinasi 正在 ... 呢.",
      },
      {
        hanzi: "你打电话的时候，我正在开车。",
        pinyin: "Nǐ dǎ diànhuà de shíhou, wǒ zhèngzài kāichē.",
        translation: "Ketika kamu menelepon, saya sedang mengemudikan mobil.",
        focusNote: "Menjelaskan aksi yang beririsan dengan waktu lain.",
      },
      {
        hanzi: "妈妈在厨房做饭呢。",
        pinyin: "Māma zài chúfáng zuò fàn ne.",
        translation: "Ibu sedang memasak di dapur.",
        focusNote: "Bentuk ringkas menggunakan 在 saja.",
      },
    ],
  },
  {
    id: "hsk2-g06",
    patternNumber: "06",
    ruleTitle: "Arah Gerakan & Tujuan: 往 (Wǎng) & 从...到... (Cóng... Dào...)",
    formula: "往 + Arah / Lokasi + Kata Kerja Gerak / 从 A 到 B",
    explanation:
      "往 mengarahkan pandangan atau gerakan menuju arah tertentu (ke depan, kiri, kanan). 从...到... merangkai titik awal dan titik tujuan perpindahan.",
    keyRule:
      "往 selalu diletakkan sebelum arah atau tujuan, kemudian diikuti kata kerja (misal: 往左拐 : belok ke kiri).",
    specimenSentences: [
      {
        hanzi: "往前走两百米，然后往右拐。",
        pinyin: "Wǎng qián zǒu liǎng bǎi mǐ, ránhòu wǎng yòu guǎi.",
        translation: "Jalan lurus ke depan 200 meter, lalu belok ke kanan.",
        focusNote: "Petunjuk arah umum di jalan raya.",
      },
      {
        hanzi: "从北京到上海坐高铁只要四个小时。",
        pinyin: "Cóng Běijīng dào Shànghǎi zuò gāotiě zhǐ yào sì gè xiǎoshí.",
        translation: "Dari Beijing ke Shanghai naik kereta cepat hanya 4 jam.",
        focusNote: "Kombinasi titik awal (从) dan titik akhir (到).",
      },
      {
        hanzi: "公共汽车往机场的方向开去。",
        pinyin: "Gōnggòng qìchē wǎng jīchǎng de fāngxiàng kāi qù.",
        translation: "Bus melaju menuju arah bandara.",
        focusNote: "往 menunjukkan arah pergerakan kendaraan.",
      },
    ],
  },
];

export const HSK2_LESSON_BLUEPRINTS: Hsk2LessonBlueprint[] = [
  {
    id: "hsk2-lesson-06",
    slug: "06",
    lessonNumber: 6,
    title: "Cuaca & Perubahan Suhu",
    hanzi: "天气与季节",
    pinyin: "Tiānqì yǔ Jìjié",
    translation: "Membahas Prakiraan Cuaca & Perbandingan Musim",
    objectives:
      "Menanyakan kondisi cuaca, menggunakan pola perbandingan 比 untuk suhu dingin/panas, serta mengenali istilah musim dan pakaian pelindung.",
    overview:
      "Unit pembuka HSK 2 memperluas topik percakapan ke alam sekitar. Pengguna belajar membandingkan iklim dua kota dan merespons perubahan suhu.",
    primaryGrammarId: "hsk2-g02",
    vocabCount: 16,
    estimatedMinutes: 14,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Mahasiswa A",
        hanzi: "今天天气怎么样？外面冷不冷？",
        pinyin: "Jīntiān tiānqì zěnmeyàng? Wàimiàn lěng bu lěng?",
        translation: "Bagaimana cuaca hari ini? Apakah di luar dingin?",
      },
      {
        speaker: "B",
        role: "Mahasiswa B",
        hanzi: "今天比昨天冷多了，而且要刮风。",
        pinyin: "Jīntiān bǐ zuótiān lěng duō le, érqiě yào guāfēng.",
        translation: "Hari ini jauh lebih dingin daripada kemarin, dan akan ada angin kencang.",
      },
      {
        speaker: "A",
        role: "Mahasiswa A",
        hanzi: "那我得多穿一件厚衣服。",
        pinyin: "Nà wǒ děi duō chuān yí jiàn hòu yīfu.",
        translation: "Kalau begitu saya harus memakai satu helai pakaian yang lebih tebal.",
      },
      {
        speaker: "B",
        role: "Mahasiswa B",
        hanzi: "下午可能下雪，别忘了戴帽子。",
        pinyin: "Xiàwǔ kěnéng xià xuě, bié wàng le dài màozi.",
        translation: "Siang nanti mungkin turun salju, jangan lupa memakai topi.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "天气", pinyin: "tiānqì", translation: "cuaca", tag: "Kata Benda" },
      { hanzi: "比", pinyin: "bǐ", translation: "dibandingkan / daripada", tag: "Preposisi" },
      { hanzi: "冷", pinyin: "lěng", translation: "dingin", tag: "Kata Sifat" },
      { hanzi: "热", pinyin: "rè", translation: "panas", tag: "Kata Sifat" },
      { hanzi: "穿", pinyin: "chuān", translation: "mengenakan / memakai", tag: "Kata Kerja" },
    ],
  },
  {
    id: "hsk2-lesson-07",
    slug: "07",
    lessonNumber: 7,
    title: "Belanja & Negosiasi Harga",
    hanzi: "购物与价格",
    pinyin: "Gòuwù yǔ Jiàgé",
    translation: "Menanyakan Harga, Menawar, & Memilih Barang",
    objectives:
      "Menanyakan harga barang (多少钱), membandingkan harga mahal (贵) dan murah (便宜), serta menggunakan satuan mata uang Tiongkok (块, 角, 元).",
    overview:
      "Unit kedua membawa pembelajar ke pasar tradisional dan pusat perbelanjaan. Berlatih meminta diskon dengan sopan dan memilih ukuran barang.",
    primaryGrammarId: "hsk2-g02",
    vocabCount: 18,
    estimatedMinutes: 16,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Pembeli",
        hanzi: "老板，这件黑色的衣服多少钱？",
        pinyin: "Lǎobǎn, zhè jiàn hēisè de yīfu duōshao qián?",
        translation: "Bos, pakaian warna hitam ini berapa harganya?",
      },
      {
        speaker: "B",
        role: "Penjual",
        hanzi: "这件两百块，质量非常好。",
        pinyin: "Zhè jiàn liǎng bǎi kuài, zhìliàng fēicháng hǎo.",
        translation: "Yang ini dua ratus yuan, kualitasnya sangat bagus.",
      },
      {
        speaker: "A",
        role: "Pembeli",
        hanzi: "有点儿贵，能不能便宜一点儿？",
        pinyin: "Yǒudiǎnr guì, néng bu néng piányi yìdiǎnr?",
        translation: "Agak mahal, apakah bisa lebih murah sedikit?",
      },
      {
        speaker: "B",
        role: "Penjual",
        hanzi: "给你一百八十块吧，不能再少了。",
        pinyin: "Gěi nǐ yībǎi bāshí kuài ba, bù néng zài shǎo le.",
        translation: "Saya berikan 180 yuan untukmu, tidak bisa kurang lagi.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "便宜", pinyin: "piányi", translation: "murah", tag: "Kata Sifat" },
      { hanzi: "贵", pinyin: "guì", translation: "mahal", tag: "Kata Sifat" },
      { hanzi: "块", pinyin: "kuài", translation: "yuan (lisan)", tag: "Satuan" },
      { hanzi: "卖", pinyin: "mài", translation: "menjual", tag: "Kata Kerja" },
      { hanzi: "一共", pinyin: "yígòng", translation: "total keseluruhan", tag: "Keterangan" },
    ],
  },
  {
    id: "hsk2-lesson-08",
    slug: "08",
    lessonNumber: 8,
    title: "Transportasi & Petunjuk Arah",
    hanzi: "交通与方向",
    pinyin: "Jiāotōng yǔ Fāngxiàng",
    translation: "Moda Angkutan Umum, Mengukur Jarak & Belokan",
    objectives:
      "Memilih angkutan umum (bus, taksi, metro), menanyakan letak lokasi dengan 离 (lí), serta memahami petunjuk belok kiri (往左) dan belok kanan (往右).",
    overview:
      "Unit ketiga membekali pembelajar dengan keterampilan navigasi di kota besar. Fokus pada pemahaman rute jalan dan estimasi waktu tempuh.",
    primaryGrammarId: "hsk2-g04",
    vocabCount: 18,
    estimatedMinutes: 15,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Pejalan Kaki",
        hanzi: "请问，去高铁站怎么走？",
        pinyin: "Qǐngwèn, qù gāotiězhàn zěnme zǒu?",
        translation: "Permisi, bagaimana jalan menuju stasiun kereta cepat?",
      },
      {
        speaker: "B",
        role: "Petugas Stasiun",
        hanzi: "往前走两百米，往左拐就是地铁站。",
        pinyin: "Wǎng qián zǒu liǎng bǎi mǐ, wǎng zuǒ guǎi jiù shì dìtiězhàn.",
        translation: "Jalan ke depan 200 meter, belok ke kiri langsung adalah stasiun metro.",
      },
      {
        speaker: "A",
        role: "Pejalan Kaki",
        hanzi: "地铁站离这里远吗？",
        pinyin: "Dìtiězhàn lí zhèlǐ yuǎn ma?",
        translation: "Apakah stasiun metro jauh dari sini?",
      },
      {
        speaker: "B",
        role: "Petugas Stasiun",
        hanzi: "很近，坐地铁二号线三站就到了。",
        pinyin: "Hěn jìn, zuò dìtiě èr hào xiàn sān zhàn jiù dào le.",
        translation: "Sangat dekat, naik metro jalur 2 lewat 3 pemberhentian langsung sampai.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "公共汽车", pinyin: "gōnggòng qìchē", translation: "bus umum", tag: "Kata Benda" },
      { hanzi: "出租车", pinyin: "chūzūchē", translation: "taksi", tag: "Kata Benda" },
      { hanzi: "离", pinyin: "lí", translation: "berjarak dari", tag: "Preposisi" },
      { hanzi: "往", pinyin: "wǎng", translation: "menuju ke arah", tag: "Preposisi" },
      { hanzi: "近", pinyin: "jìn", translation: "dekat", tag: "Kata Sifat" },
    ],
  },
  {
    id: "hsk2-lesson-09",
    slug: "09",
    lessonNumber: 9,
    title: "Pengalaman & Wisata Perjalanan",
    hanzi: "经历与旅游",
    pinyin: "Jīnglì yǔ Lǚyóu",
    translation: "Menceritakan Pengalaman Masa Lalu & Objek Wisata",
    objectives:
      "Menggunakan partikel aspek 过 untuk menyatakan pengalaman hidup, menceritakan tempat yang pernah dikunjungi, dan mengekspresikan ketertarikan.",
    overview:
      "Unit keempat melatih pembelajar berbagi pengalaman personal: makanan khas yang pernah dicoba, kota yang pernah disinggahi, dan rencana perjalanan.",
    primaryGrammarId: "hsk2-g03",
    vocabCount: 16,
    estimatedMinutes: 15,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Teman A",
        hanzi: "你去过中国旅游吗？",
        pinyin: "Nǐ qù guò Zhōngguó lǚyóu ma?",
        translation: "Apakah kamu pernah berwisata ke Tiongkok?",
      },
      {
        speaker: "B",
        role: "Teman B",
        hanzi: "去过一次，去年秋天我去了北京和西安。",
        pinyin: "Qù guò yí cì, qùnián qiūtiān wǒ qù le Běijīng hé Xī'ān.",
        translation: "Pernah sekali, musim gugur tahun lalu saya pergi ke Beijing dan Xi'an.",
      },
      {
        speaker: "A",
        role: "Teman A",
        hanzi: "你觉得那里怎么样？",
        pinyin: "Nǐ juéde nàlǐ zěnmeyàng?",
        translation: "Bagaimana menurutmu di sana?",
      },
      {
        speaker: "B",
        role: "Teman B",
        hanzi: "非常有意思，风景很美，我也吃过很多特色菜。",
        pinyin: "Fēicháng yǒu yìsi, fēngjǐng hěn měi, wǒ yě chī guò hěn duō tèsè cài.",
        translation: "Sangat menarik, pemandangannya indah, dan saya juga pernah mencoba banyak masakan khas.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "旅游", pinyin: "lǚyóu", translation: "berwisata / bepergian", tag: "Kata Kerja" },
      { hanzi: "过", pinyin: "guò", translation: "pernah (partikel)", tag: "Partikel" },
      { hanzi: "觉得", pinyin: "juéde", translation: "merasa / menganggap", tag: "Kata Kerja" },
      { hanzi: "有意思", pinyin: "yǒu yìsi", translation: "menarik", tag: "Frasa Sifat" },
      { hanzi: "次", pinyin: "cì", translation: "kali (frekuensi)", tag: "Satuan" },
    ],
  },
  {
    id: "hsk2-lesson-10",
    slug: "10",
    lessonNumber: 10,
    title: "Kesehatan, Gejala & Istirahat",
    hanzi: "生病与休息",
    pinyin: "Shēngbìng yǔ Xiūxi",
    translation: "Mengeluhkan Rasa Sakit, Minum Obat, & Perubahan Fisik",
    objectives:
      "Menyatakan kondisi tubuh kurang sehat (生病, 感冒), meminta izin istirahat kerja/kuliah, dan memahami anjuran dokter memakai 了 untuk situasi baru.",
    overview:
      "Unit penutup HSK 2 mengajarkan tata cara berkomunikasi santun saat sakit, mengunjungi klinik, menanyakan instruksi minum obat, dan menjaga kebugaran.",
    primaryGrammarId: "hsk2-g01",
    vocabCount: 16,
    estimatedMinutes: 15,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Rekan Kerja",
        hanzi: "你脸色不太好，怎么了？",
        pinyin: "Nǐ liǎnsè bú tài hǎo, zěnme le?",
        translation: "Wajahmu kelihatan kurang sehat, ada apa?",
      },
      {
        speaker: "B",
        role: "Pasien",
        hanzi: "我感冒了，头有点儿疼，还在发烧。",
        pinyin: "Wǒ gǎnmào le, tóu yǒudiǎnr téng, hái zài fāshāo.",
        translation: "Saya flu, kepala agak sakit, dan juga sedang demam.",
      },
      {
        speaker: "A",
        role: "Rekan Kerja",
        hanzi: "去医院看医生了吗？吃药了吗？",
        pinyin: "Qù yīyuàn kàn yīshēng le ma? Chī yào le ma?",
        translation: "Apakah sudah ke rumah sakit memeriksakan diri ke dokter? Sudah minum obat?",
      },
      {
        speaker: "B",
        role: "Pasien",
        hanzi: "刚才吃了药，我现在想请假回家休息。",
        pinyin: "Gāngcái chī le yào, wǒ xiànzài xiǎng qǐngjià huí jiā xiūxi.",
        translation: "Tadi baru minum obat, sekarang saya ingin minta izin pulang untuk istirahat.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "生病", pinyin: "shēngbìng", translation: "jatuh sakit", tag: "Kata Kerja" },
      { hanzi: "药", pinyin: "yào", translation: "obat", tag: "Kata Benda" },
      { hanzi: "身体", pinyin: "shēntǐ", translation: "tubuh / kesehatan", tag: "Kata Benda" },
      { hanzi: "休息", pinyin: "xiūxi", translation: "beristirahat", tag: "Kata Kerja" },
      { hanzi: "准备", pinyin: "zhǔnbèi", translation: "mempersiapkan", tag: "Kata Kerja" },
    ],
  },
];

export const HSK2_THEME_CATEGORIES: Hsk2ThemeCategory[] = [
  {
    id: "cat-weather",
    title: "Cuaca & Waktu",
    description: "Kondisi iklim, musim, dan ungkapan waktu jam/tanggal yang lebih detail.",
    wordsCount: 28,
  },
  {
    id: "cat-shopping",
    title: "Belanja & Keuangan",
    description: "Transaksi perniagaan, kualitas barang, busana, dan satuan moneter.",
    wordsCount: 30,
  },
  {
    id: "cat-travel",
    title: "Transportasi & Posisi",
    description: "Moda transportasi publik, arah mata angin, serta jarak lokasi relatif.",
    wordsCount: 32,
  },
  {
    id: "cat-actions",
    title: "Aktivitas, Aksi & Hobi",
    description: "Kata kerja harian lanjutan, komunikasi sosial, dan kegiatan rekreasi.",
    wordsCount: 32,
  },
  {
    id: "cat-health",
    title: "Tubuh, Medis & Emosi",
    description: "Kesehatan tubuh, konsultasi medis, serta ekspresi perasaan dan impresi.",
    wordsCount: 28,
  },
];

export const HSK2_VOCABULARY_PREVIEWS: Hsk2VocabWord[] = [
  // 1. Cuaca & Waktu
  {
    id: "hsk2-v001",
    hanzi: "天气",
    pinyin: "tiānqì",
    translation: "cuaca",
    partOfSpeech: "Kata Benda",
    themeCategory: "Cuaca & Waktu",
    sampleSentence: {
      hanzi: "明天的天气怎么样？",
      pinyin: "Míngtiān de tiānqì zěnmeyàng?",
      translation: "Bagaimana cuaca besok?",
    },
  },
  {
    id: "hsk2-v002",
    hanzi: "晴",
    pinyin: "qíng",
    translation: "cerah / terang",
    partOfSpeech: "Kata Sifat",
    themeCategory: "Cuaca & Waktu",
    sampleSentence: {
      hanzi: "今天是个大晴天。",
      pinyin: "Jīntiān shì gè dà qíngtiān.",
      translation: "Hari ini adalah hari yang sangat cerah.",
    },
  },
  {
    id: "hsk2-v003",
    hanzi: "阴",
    pinyin: "yīn",
    translation: "mendung",
    partOfSpeech: "Kata Sifat",
    themeCategory: "Cuaca & Waktu",
    sampleSentence: {
      hanzi: "外面天阴了，快要下雨了。",
      pinyin: "Wàimiàn tiān yīn le, kuài yào xià yǔ le.",
      translation: "Di luar langit mendung, sebentar lagi akan turun hujan.",
    },
  },
  {
    id: "hsk2-v004",
    hanzi: "冷",
    pinyin: "lěng",
    translation: "dingin",
    partOfSpeech: "Kata Sifat",
    themeCategory: "Cuaca & Waktu",
    sampleSentence: {
      hanzi: "冬天这里非常冷。",
      pinyin: "Dōngtiān zhèlǐ fēicháng lěng.",
      translation: "Musim dingin di sini sangat dingin.",
    },
  },
  {
    id: "hsk2-v005",
    hanzi: "热",
    pinyin: "rè",
    translation: "panas",
    partOfSpeech: "Kata Sifat",
    themeCategory: "Cuaca & Waktu",
    sampleSentence: {
      hanzi: "今天太热了，我想喝冰水。",
      pinyin: "Jīntiān tài rè le, wǒ xiǎng hē bīngshuǐ.",
      translation: "Hari ini terlalu panas, saya ingin minum air es.",
    },
  },
  {
    id: "hsk2-v006",
    hanzi: "刮风",
    pinyin: "guāfēng",
    translation: "berangin kencang",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Cuaca & Waktu",
    sampleSentence: {
      hanzi: "昨晚刮了一整夜的大风。",
      pinyin: "Zuówǎn guā le yì zhěng yè de dàfēng.",
      translation: "Tadi malam angin kencang berhembus semalaman.",
    },
  },
  {
    id: "hsk2-v007",
    hanzi: "下雪",
    pinyin: "xià xuě",
    translation: "turun salju",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Cuaca & Waktu",
    sampleSentence: {
      hanzi: "北京的冬天经常下雪。",
      pinyin: "Běijīng de dōngtiān jīngcháng xià xuě.",
      translation: "Musim dingin di Beijing sering turun salju.",
    },
  },
  {
    id: "hsk2-v008",
    hanzi: "小时",
    pinyin: "xiǎoshí",
    translation: "jam (durasi)",
    partOfSpeech: "Kata Benda",
    themeCategory: "Cuaca & Waktu",
    sampleSentence: {
      hanzi: "我学了两个小时的汉语。",
      pinyin: "Wǒ xué le liǎng gè xiǎoshí de Hànyǔ.",
      translation: "Saya belajar bahasa Mandarin selama dua jam.",
    },
  },

  // 2. Belanja & Keuangan
  {
    id: "hsk2-v009",
    hanzi: "便宜",
    pinyin: "piányi",
    translation: "murah",
    partOfSpeech: "Kata Sifat",
    themeCategory: "Belanja & Keuangan",
    sampleSentence: {
      hanzi: "这家超市的水果很便宜。",
      pinyin: "Zhè jiā chāoshì de shuǐguǒ hěn piányi.",
      translation: "Buah-buahan di supermarket ini sangat murah.",
    },
  },
  {
    id: "hsk2-v010",
    hanzi: "贵",
    pinyin: "guì",
    translation: "mahal",
    partOfSpeech: "Kata Sifat",
    themeCategory: "Belanja & Keuangan",
    sampleSentence: {
      hanzi: "这条裤子太贵了。",
      pinyin: "Zhè tiáo kùzi tài guì le.",
      translation: "Celana ini terlalu mahal.",
    },
  },
  {
    id: "hsk2-v011",
    hanzi: "买",
    pinyin: "mǎi",
    translation: "membeli",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Belanja & Keuangan",
    sampleSentence: {
      hanzi: "你想买什么东西？",
      pinyin: "Nǐ xiǎng mǎi shénme dōngxi?",
      translation: "Barang apa yang ingin kamu beli?",
    },
  },
  {
    id: "hsk2-v012",
    hanzi: "卖",
    pinyin: "mài",
    translation: "menjual",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Belanja & Keuangan",
    sampleSentence: {
      hanzi: "西瓜怎么卖？",
      pinyin: "Xīguā zěnme mài?",
      translation: "Bagaimana semangka ini dijual (berapa harganya)?",
    },
  },
  {
    id: "hsk2-v013",
    hanzi: "衣服",
    pinyin: "yīfu",
    translation: "pakaian / baju",
    partOfSpeech: "Kata Benda",
    themeCategory: "Belanja & Keuangan",
    sampleSentence: {
      hanzi: "我今天想买两件新衣服。",
      pinyin: "Wǒ jīntiān xiǎng mǎi liǎng jiàn xīn yīfu.",
      translation: "Hari ini saya ingin membeli dua potong pakaian baru.",
    },
  },
  {
    id: "hsk2-v014",
    hanzi: "穿",
    pinyin: "chuān",
    translation: "mengenakan / memakai",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Belanja & Keuangan",
    sampleSentence: {
      hanzi: "他穿着一件白色的衬衫。",
      pinyin: "Tā chuān zhe yí jiàn báisè de chènshān.",
      translation: "Dia sedang mengenakan kemeja putih.",
    },
  },
  {
    id: "hsk2-v015",
    hanzi: "斤",
    pinyin: "jīn",
    translation: "jin (satuan 500 gram)",
    partOfSpeech: "Satuan",
    themeCategory: "Belanja & Keuangan",
    sampleSentence: {
      hanzi: "苹果五块钱一斤。",
      pinyin: "Píngguǒ wǔ kuài qián yì jīn.",
      translation: "Apel lima yuan per setengah kilogram.",
    },
  },

  // 3. Transportasi & Posisi
  {
    id: "hsk2-v016",
    hanzi: "出租车",
    pinyin: "chūzūchē",
    translation: "taksi",
    partOfSpeech: "Kata Benda",
    themeCategory: "Transportasi & Posisi",
    sampleSentence: {
      hanzi: "我们坐出租车去机场吧。",
      pinyin: "Wǒmen zuò chūzūchē qù jīchǎng ba.",
      translation: "Mari kita naik taksi pergi ke bandara.",
    },
  },
  {
    id: "hsk2-v017",
    hanzi: "公共汽车",
    pinyin: "gōnggòng qìchē",
    translation: "bus umum",
    partOfSpeech: "Kata Benda",
    themeCategory: "Transportasi & Posisi",
    sampleSentence: {
      hanzi: "公共汽车来了，快上车。",
      pinyin: "Gōnggòng qìchē lái le, kuài shàng chē.",
      translation: "Bus umum sudah datang, cepat naik ke bus.",
    },
  },
  {
    id: "hsk2-v018",
    hanzi: "火车站",
    pinyin: "huǒchēzhàn",
    translation: "stasiun kereta api",
    partOfSpeech: "Kata Benda",
    themeCategory: "Transportasi & Posisi",
    sampleSentence: {
      hanzi: "我已经在火车站等你了。",
      pinyin: "Wǒ yǐjīng zài huǒchēzhàn děng nǐ le.",
      translation: "Saya sudah menunggumu di stasiun kereta api.",
    },
  },
  {
    id: "hsk2-v019",
    hanzi: "离",
    pinyin: "lí",
    translation: "berjarak dari",
    partOfSpeech: "Preposisi",
    themeCategory: "Transportasi & Posisi",
    sampleSentence: {
      hanzi: "学校离这里不远。",
      pinyin: "Xuéxiào lí zhèlǐ bù yuǎn.",
      translation: "Sekolah tidak jauh dari sini.",
    },
  },
  {
    id: "hsk2-v020",
    hanzi: "往",
    pinyin: "wǎng",
    translation: "menuju ke arah",
    partOfSpeech: "Preposisi",
    themeCategory: "Transportasi & Posisi",
    sampleSentence: {
      hanzi: "往前走就是银行。",
      pinyin: "Wǎng qián zǒu jiù shì yínháng.",
      translation: "Jalan ke arah depan langsung adalah bank.",
    },
  },
  {
    id: "hsk2-v021",
    hanzi: "左边",
    pinyin: "zuǒbiān",
    translation: "sebelah kiri",
    partOfSpeech: "Kata Benda",
    themeCategory: "Transportasi & Posisi",
    sampleSentence: {
      hanzi: "图书馆在宿舍的左边。",
      pinyin: "Túshūguǎn zài sùshè de zuǒbiān.",
      translation: "Perpustakaan berada di sebelah kiri asrama.",
    },
  },
  {
    id: "hsk2-v022",
    hanzi: "右边",
    pinyin: "yòubiān",
    translation: "sebelah kanan",
    partOfSpeech: "Kata Benda",
    themeCategory: "Transportasi & Posisi",
    sampleSentence: {
      hanzi: "坐在我右边的人是王老师。",
      pinyin: "Zuò zài wǒ yòubiān de rén shì Wáng lǎoshī.",
      translation: "Orang yang duduk di sebelah kanan saya adalah Guru Wang.",
    },
  },

  // 4. Aktivitas, Aksi & Hobi
  {
    id: "hsk2-v023",
    hanzi: "旅游",
    pinyin: "lǚyóu",
    translation: "berwisata / berlibur",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Aktivitas, Aksi & Hobi",
    sampleSentence: {
      hanzi: "我们全家打算下个月去旅游。",
      pinyin: "Wǒmen quán jiā dǎsuàn xià gè yuè qù lǚyóu.",
      translation: "Keluarga kami berencana pergi berwisata bulan depan.",
    },
  },
  {
    id: "hsk2-v024",
    hanzi: "跑步",
    pinyin: "pǎobù",
    translation: "berlari / jogging",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Aktivitas, Aksi & Hobi",
    sampleSentence: {
      hanzi: "我每天早上去公园跑步。",
      pinyin: "Wǒ měitiān zǎoshang qù gōngyuán pǎobù.",
      translation: "Setiap pagi saya pergi ke taman untuk jogging.",
    },
  },
  {
    id: "hsk2-v025",
    hanzi: "游泳",
    pinyin: "yóuyǒng",
    translation: "berenang",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Aktivitas, Aksi & Hobi",
    sampleSentence: {
      hanzi: "夏天在海里游泳很舒服。",
      pinyin: "Xiàtiān zài hǎi lǐ yóuyǒng hěn shūfu.",
      translation: "Di musim panas berenang di laut sangat nyaman.",
    },
  },
  {
    id: "hsk2-v026",
    hanzi: "懂",
    pinyin: "dǒng",
    translation: "mengerti / paham",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Aktivitas, Aksi & Hobi",
    sampleSentence: {
      hanzi: "这句话你听懂了吗？",
      pinyin: "Zhè jù huà nǐ tīng dǒng le ma?",
      translation: "Apakah kamu mengerti kalimat yang diucapkan ini?",
    },
  },
  {
    id: "hsk2-v027",
    hanzi: "找",
    pinyin: "zhǎo",
    translation: "mencari",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Aktivitas, Aksi & Hobi",
    sampleSentence: {
      hanzi: "你在找什么？我的钥匙不见了。",
      pinyin: "Nǐ zài zhǎo shénme? Wǒ de yàoshi bú jiàn le.",
      translation: "Kamu sedang mencari apa? Kunci saya hilang.",
    },
  },
  {
    id: "hsk2-v028",
    hanzi: "准备",
    pinyin: "zhǔnbèi",
    translation: "mempersiapkan",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Aktivitas, Aksi & Hobi",
    sampleSentence: {
      hanzi: "我已经准备好明天的考试了。",
      pinyin: "Wǒ yǐjīng zhǔnbèi hǎo míngtiān de kǎoshì le.",
      translation: "Saya sudah siap untuk ujian besok.",
    },
  },

  // 5. Tubuh, Medis & Emosi
  {
    id: "hsk2-v029",
    hanzi: "生病",
    pinyin: "shēngbìng",
    translation: "jatuh sakit",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Tubuh, Medis & Emosi",
    sampleSentence: {
      hanzi: "他最近生病了，在家里休息。",
      pinyin: "Tā zuìjìn shēngbìng le, zài jiā lǐ xiūxi.",
      translation: "Akhir-akhir ini dia jatuh sakit, beristirahat di rumah.",
    },
  },
  {
    id: "hsk2-v030",
    hanzi: "药",
    pinyin: "yào",
    translation: "obat",
    partOfSpeech: "Kata Benda",
    themeCategory: "Tubuh, Medis & Emosi",
    sampleSentence: {
      hanzi: "医生让你一天吃三次药。",
      pinyin: "Yīshēng ràng nǐ yì tiān chī sān cì yào.",
      translation: "Dokter memintamu minum obat tiga kali sehari.",
    },
  },
  {
    id: "hsk2-v031",
    hanzi: "身体",
    pinyin: "shēntǐ",
    translation: "tubuh / kesehatan",
    partOfSpeech: "Kata Benda",
    themeCategory: "Tubuh, Medis & Emosi",
    sampleSentence: {
      hanzi: "祝你身体健康，学习进步。",
      pinyin: "Zhù nǐ shēntǐ jiànkāng, xuéxí jìnbù.",
      translation: "Semoga kamu sehat walafiat dan belajarmu semakin maju.",
    },
  },
  {
    id: "hsk2-v032",
    hanzi: "休息",
    pinyin: "xiūxi",
    translation: "beristirahat",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Tubuh, Medis & Emosi",
    sampleSentence: {
      hanzi: "太累了，我们坐下来休息一会儿吧。",
      pinyin: "Tài lèi le, wǒmen zuò xiàlai xiūxi yíhuìr ba.",
      translation: "Terlalu lelah, mari kita duduk dan istirahat sejenak.",
    },
  },
  {
    id: "hsk2-v033",
    hanzi: "快乐",
    pinyin: "kuàilè",
    translation: "gembira / bahagia",
    partOfSpeech: "Kata Sifat",
    themeCategory: "Tubuh, Medis & Emosi",
    sampleSentence: {
      hanzi: "祝你生日快乐！",
      pinyin: "Zhù nǐ shēngrì kuàilè!",
      translation: "Selamat ulang tahun (semoga bahagia di hari lahirmu)!",
    },
  },
  {
    id: "hsk2-v034",
    hanzi: "累",
    pinyin: "lèi",
    translation: "lelah / letih",
    partOfSpeech: "Kata Sifat",
    themeCategory: "Tubuh, Medis & Emosi",
    sampleSentence: {
      hanzi: "今天工作了一整天，真累啊。",
      pinyin: "Jīntiān gōngzuò le yì zhěng tiān, zhēn lèi a.",
      translation: "Hari ini bekerja seharian penuh, sungguh melelahkan.",
    },
  },
];
