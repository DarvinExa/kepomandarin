/**
 * measure-words.ts
 * Fondasi dataset dan utilitas untuk Modul 9.4: Measure Word Explorer (Eksplorasi Kata Bantu Bilangan / 量词 - Liàngcí).
 * Berfokus pada 10 kata penggolong paling fundamental dalam HSK 1 dan percakapan kontekstual dasar.
 */

export interface MeasureWordExample {
  numeralOrDemonstrative: string; // Misal: "三" atau "这"
  pinyinPrefix: string;
  mwHanzi: string;
  mwPinyin: string;
  nounHanzi: string;
  nounPinyin: string;
  fullPhrase: string; // "三个苹果" atau "这本书"
  fullPinyin: string; // "sān gè píngguǒ"
  translation: string;
  audioText: string;
}

export interface MeasureWordItem {
  id: string;
  hanzi: string;
  pinyin: string;
  meaningIndonesian: string; // Misal: "Buah / Orang / Universal"
  physicalCategory: string; // Bentuk fisik: "Umum & Manusia", "Permukaan Datar", "Berjilid", dll.
  logicDescription: string; // Filosofi dan aturan penggunaannya
  indonesianEquivalent: string; // Padanan dalam bahasa Indonesia
  commonNouns: string[]; // Daftar kata benda yang sering dipasangkan
  examples: MeasureWordExample[];
}

export const MEASURE_WORDS_DATA: MeasureWordItem[] = [
  {
    id: "mw-ge",
    hanzi: "个",
    pinyin: "gè",
    meaningIndonesian: "Buah / Orang / Satuan Umum",
    physicalCategory: "Universal & Manusia",
    logicDescription:
      "Kata penggolong paling universal dan paling sering digunakan dalam bahasa Mandarin. Digunakan untuk orang secara umum, buah-buahan bundar, dan konsep abstrak yang tidak memiliki penggolong khusus.",
    indonesianEquivalent: "Sebuah, seorang, seekor (umum)",
    commonNouns: ["人 (orang)", "朋友 (teman)", "苹果 (apel)", "星期 (minggu)", "月 (bulan)"],
    examples: [
      {
        numeralOrDemonstrative: "三",
        pinyinPrefix: "sān",
        mwHanzi: "个",
        mwPinyin: "gè",
        nounHanzi: "苹果",
        nounPinyin: "píngguǒ",
        fullPhrase: "三个苹果",
        fullPinyin: "sān gè píngguǒ",
        translation: "tiga buah apel",
        audioText: "三个苹果",
      },
      {
        numeralOrDemonstrative: "这",
        pinyinPrefix: "zhè",
        mwHanzi: "个",
        mwPinyin: "ge",
        nounHanzi: "人",
        nounPinyin: "rén",
        fullPhrase: "这个人",
        fullPinyin: "zhè ge rén",
        translation: "orang ini",
        audioText: "这个人",
      },
      {
        numeralOrDemonstrative: "两",
        pinyinPrefix: "liǎng",
        mwHanzi: "个",
        mwPinyin: "gè",
        nounHanzi: "朋友",
        nounPinyin: "péngyou",
        fullPhrase: "两个朋友",
        fullPinyin: "liǎng gè péngyou",
        translation: "dua orang sahabat",
        audioText: "两个朋友",
      },
    ],
  },
  {
    id: "mw-ben",
    hanzi: "本",
    pinyin: "běn",
    meaningIndonesian: "Jilid / Eksemplar / Buku",
    physicalCategory: "Benda Berjilid & Terikat",
    logicDescription:
      "Berasal dari karakter '本' yang awalnya berarti akar pohon. Digunakan khusus untuk benda bacaan yang dijilid menjadi satu buku utuh.",
    indonesianEquivalent: "Sebuku, sebuah (buku), sejilid",
    commonNouns: ["书 (buku)", "词典 (kamus)", "本子 (buku catatan)"],
    examples: [
      {
        numeralOrDemonstrative: "一",
        pinyinPrefix: "yī",
        mwHanzi: "本",
        mwPinyin: "běn",
        nounHanzi: "书",
        nounPinyin: "shū",
        fullPhrase: "一本书",
        fullPinyin: "yì běn shū",
        translation: "sebuah buku",
        audioText: "一本书",
      },
      {
        numeralOrDemonstrative: "那",
        pinyinPrefix: "nà",
        mwHanzi: "本",
        mwPinyin: "běn",
        nounHanzi: "汉语书",
        nounPinyin: "Hànyǔ shū",
        fullPhrase: "那本汉语书",
        fullPinyin: "nà běn Hànyǔ shū",
        translation: "buku bahasa Mandarin itu",
        audioText: "那本汉语书",
      },
    ],
  },
  {
    id: "mw-kuai",
    hanzi: "块",
    pinyin: "kuài",
    meaningIndonesian: "Yuan (Uang) / Potongan / Balok",
    physicalCategory: "Mata Uang & Potongan Padat",
    logicDescription:
      "Dalam percakapan lisan sehari-hari, '块' adalah kata penggolong wajib untuk mata uang Renminbi (setara dengan 元 yuán secara tertulis). Juga digunakan untuk potongan kue atau batu.",
    indonesianEquivalent: "Rupiah / Dolar / Yuan (lisan), sepotong",
    commonNouns: ["钱 (uang)", "蛋糕 (kue)", "肉 (daging)"],
    examples: [
      {
        numeralOrDemonstrative: "五",
        pinyinPrefix: "wǔ",
        mwHanzi: "块",
        mwPinyin: "kuài",
        nounHanzi: "钱",
        nounPinyin: "qián",
        fullPhrase: "五块钱",
        fullPinyin: "wǔ kuài qián",
        translation: "lima yuan uang",
        audioText: "五块钱",
      },
      {
        numeralOrDemonstrative: "十",
        pinyinPrefix: "shí",
        mwHanzi: "块",
        mwPinyin: "kuài",
        nounHanzi: "蛋糕",
        nounPinyin: "dàngāo",
        fullPhrase: "十块蛋糕",
        fullPinyin: "shí kuài dàngāo",
        translation: "sepuluh potong kue",
        audioText: "十块蛋糕",
      },
    ],
  },
  {
    id: "mw-zhi",
    hanzi: "只",
    pinyin: "zhī",
    meaningIndonesian: "Ekor / Sebelah (Hewan)",
    physicalCategory: "Fauna & Anggota Berpasangan",
    logicDescription:
      "Digunakan untuk sebagian besar hewan berkaki empat, serangga, atau burung. Juga digunakan untuk menyebut sebelah anggota tubuh yang aslinya berpasangan (misal: sebelah mata, sebelah tangan).",
    indonesianEquivalent: "Seekor, sebelah",
    commonNouns: ["猫 (kucing)", "狗 (anjing)", "鸟 (burung)", "手 (sebelah tangan)"],
    examples: [
      {
        numeralOrDemonstrative: "一",
        pinyinPrefix: "yī",
        mwHanzi: "只",
        mwPinyin: "zhī",
        nounHanzi: "猫",
        nounPinyin: "māo",
        fullPhrase: "一只猫",
        fullPinyin: "yì zhī māo",
        translation: "seekor kucing",
        audioText: "一只猫",
      },
      {
        numeralOrDemonstrative: "那",
        pinyinPrefix: "nà",
        mwHanzi: "只",
        mwPinyin: "zhī",
        nounHanzi: "小狗",
        nounPinyin: "xiǎogǒu",
        fullPhrase: "那只小狗",
        fullPinyin: "nà zhī xiǎogǒu",
        translation: "anjing kecil itu",
        audioText: "那只小狗",
      },
    ],
  },
  {
    id: "mw-zhang",
    hanzi: "张",
    pinyin: "zhāng",
    meaningIndonesian: "Lembar / Bidang Datar",
    physicalCategory: "Benda Permukaan Datar & Tipis",
    logicDescription:
      "Berhubungan dengan benda-benda yang dapat direntangkan atau memiliki permukaan datar yang lebar, seperti lembaran kertas, meja, tempat tidur, tiket, atau foto.",
    indonesianEquivalent: "Selembar, sebuah (meja), sekeping",
    commonNouns: ["桌子 (meja)", "纸 (kertas)", "票 (tiket)", "床 (tempat tidur)"],
    examples: [
      {
        numeralOrDemonstrative: "一",
        pinyinPrefix: "yī",
        mwHanzi: "张",
        mwPinyin: "zhāng",
        nounHanzi: "桌子",
        nounPinyin: "zhuōzi",
        fullPhrase: "一张桌子",
        fullPinyin: "yì zhāng zhuōzi",
        translation: "sebuah meja datar",
        audioText: "一张桌子",
      },
      {
        numeralOrDemonstrative: "两",
        pinyinPrefix: "liǎng",
        mwHanzi: "张",
        mwPinyin: "zhāng",
        nounHanzi: "车票",
        nounPinyin: "chēpiào",
        fullPhrase: "两张车票",
        fullPinyin: "liǎng zhāng chēpiào",
        translation: "dua lembar tiket kereta",
        audioText: "两张车票",
      },
    ],
  },
  {
    id: "mw-bei",
    hanzi: "杯",
    pinyin: "bēi",
    meaningIndonesian: "Cangkir / Gelas (Wadah)",
    physicalCategory: "Wadah Minuman Cair",
    logicDescription:
      "Kata penggolong wadah (container measure word) yang mengukur kuantitas cairan berdasarkan cangkir atau gelas yang menampungnya.",
    indonesianEquivalent: "Secangkir, segelas",
    commonNouns: ["茶 (teh)", "水 (air)", "咖啡 (kopi)"],
    examples: [
      {
        numeralOrDemonstrative: "一",
        pinyinPrefix: "yī",
        mwHanzi: "杯",
        mwPinyin: "bēi",
        nounHanzi: "茶",
        nounPinyin: "chá",
        fullPhrase: "一杯茶",
        fullPinyin: "yì bēi chá",
        translation: "secangkir teh hangat",
        audioText: "一杯茶",
      },
      {
        numeralOrDemonstrative: "想喝一",
        pinyinPrefix: "xiǎng hē yì",
        mwHanzi: "杯",
        mwPinyin: "bēi",
        nounHanzi: "水",
        nounPinyin: "shuǐ",
        fullPhrase: "想喝一杯水",
        fullPinyin: "xiǎng hē yì bēi shuǐ",
        translation: "ingin minum segelas air",
        audioText: "想喝一杯水",
      },
    ],
  },
  {
    id: "mw-sui",
    hanzi: "岁",
    pinyin: "suì",
    meaningIndonesian: "Tahun Usia / Umur",
    physicalCategory: "Khusus Usia Manusia",
    logicDescription:
      "Digunakan khusus untuk menghitung umur manusia. Perhatikan bahwa '岁' langsung menempel setelah angka tanpa memerlukan kata 'tahun' (年) lagi.",
    indonesianEquivalent: "Tahun (umur)",
    commonNouns: ["(Menempel langsung setelah angka usia)"],
    examples: [
      {
        numeralOrDemonstrative: "二",
        pinyinPrefix: "èr",
        mwHanzi: "十",
        mwPinyin: "shí",
        nounHanzi: "岁",
        nounPinyin: "suì",
        fullPhrase: "二十岁",
        fullPinyin: "èrshí suì",
        translation: "berusia dua puluh tahun",
        audioText: "二十岁",
      },
      {
        numeralOrDemonstrative: "你几",
        pinyinPrefix: "nǐ jǐ",
        mwHanzi: "岁",
        mwPinyin: "suì",
        nounHanzi: "了",
        nounPinyin: "le",
        fullPhrase: "你几岁了",
        fullPinyin: "nǐ jǐ suì le",
        translation: "kamu berapa tahun umurnya?",
        audioText: "你几岁了",
      },
    ],
  },
  {
    id: "mw-dian",
    hanzi: "点",
    pinyin: "diǎn",
    meaningIndonesian: "Pukul (Jam) / Sedikit",
    physicalCategory: "Waktu Jam & Kuantitas Sedikit",
    logicDescription:
      "Digunakan untuk menyatakan waktu pukul pada jam dinding (misal: 三点 = pukul 3). Dalam bentuk '一点儿' (yìdiǎnr), berfungsi sebagai penggolong kuantitas tak tentu dalam jumlah kecil.",
    indonesianEquivalent: "Pukul, jam, sedikit",
    commonNouns: ["(Pukul jam)", "水 (sedikit air)", "东西 (sedikit barang)"],
    examples: [
      {
        numeralOrDemonstrative: "三",
        pinyinPrefix: "sān",
        mwHanzi: "点",
        mwPinyin: "diǎn",
        nounHanzi: "半",
        nounPinyin: "bàn",
        fullPhrase: "三点半",
        fullPinyin: "sān diǎn bàn",
        translation: "pukul tiga tiga puluh (setengah empat)",
        audioText: "三点半",
      },
      {
        numeralOrDemonstrative: "一",
        pinyinPrefix: "yī",
        mwHanzi: "点",
        mwPinyin: "diǎn",
        nounHanzi: "水",
        nounPinyin: "shuǐ",
        fullPhrase: "一点儿水",
        fullPinyin: "yìdiǎnr shuǐ",
        translation: "sedikit air minum",
        audioText: "一点儿水",
      },
    ],
  },
  {
    id: "mw-wei",
    hanzi: "位",
    pinyin: "wèi",
    meaningIndonesian: "Orang (Hormat / Santun)",
    physicalCategory: "Manusia Terhormat & Tamu",
    logicDescription:
      "Varian santun dan sopan dari kata penggolong '个'. Digunakan saat menyebut guru, dokter, tamu, atau orang yang dihormati dalam etika komunikasi Mandarin.",
    indonesianEquivalent: "Seorang (terhormat / bapak / ibu)",
    commonNouns: ["老师 (guru)", "医生 (dokter)", "客人 (tamu)"],
    examples: [
      {
        numeralOrDemonstrative: "一",
        pinyinPrefix: "yī",
        mwHanzi: "位",
        mwPinyin: "wèi",
        nounHanzi: "老师",
        nounPinyin: "lǎoshī",
        fullPhrase: "一位老师",
        fullPinyin: "yí wèi lǎoshī",
        translation: "seorang guru yang dihormati",
        audioText: "一位老师",
      },
      {
        numeralOrDemonstrative: "这",
        pinyinPrefix: "zhè",
        mwHanzi: "位",
        mwPinyin: "wèi",
        nounHanzi: "医生",
        nounPinyin: "yīshēng",
        fullPhrase: "这位医生",
        fullPinyin: "zhè wèi yīshēng",
        translation: "dokter yang terhormat ini",
        audioText: "这位医生",
      },
    ],
  },
  {
    id: "mw-shuang",
    hanzi: "双",
    pinyin: "shuāng",
    meaningIndonesian: "Pasang",
    physicalCategory: "Benda Berpasangan Alami",
    logicDescription:
      "Digunakan untuk benda-benda yang secara kodrati digunakan berpasangan dua buah (simetris), seperti sumpit makan, sepatu, atau kaus kaki.",
    indonesianEquivalent: "Sepasang",
    commonNouns: ["筷子 (sumpit)", "鞋 (sepatu)", "手 (sepasang tangan)"],
    examples: [
      {
        numeralOrDemonstrative: "一",
        pinyinPrefix: "yī",
        mwHanzi: "双",
        mwPinyin: "shuāng",
        nounHanzi: "筷子",
        nounPinyin: "kuàizi",
        fullPhrase: "一双筷子",
        fullPinyin: "yì shuāng kuàizi",
        translation: "sepasang sumpit makan",
        audioText: "一双筷子",
      },
    ],
  },
];

export interface MeasureWordQuizQuestion {
  id: string;
  prompt: string;
  sentenceWithCloze: string; // Misal: "桌子上有一 ___ 汉语书。"
  targetNoun: string; // "书 (buku)"
  correctMwId: string;
  options: {
    id: string;
    hanzi: string;
    pinyin: string;
    translation: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export const MEASURE_WORD_QUIZ_QUESTIONS: MeasureWordQuizQuestion[] = [
  {
    id: "mwq-01",
    prompt: "Pilihlah kata penggolong yang tepat untuk kata benda '书' (shū - buku):",
    sentenceWithCloze: "桌子上有一 ___ 汉语书。",
    targetNoun: "书 (shū - buku)",
    correctMwId: "mw-ben",
    options: [
      { id: "opt-1a", hanzi: "本", pinyin: "běn", translation: "jilid (untuk buku)", isCorrect: true },
      { id: "opt-1b", hanzi: "张", pinyin: "zhāng", translation: "lembar (benda datar)", isCorrect: false },
      { id: "opt-1c", hanzi: "个", pinyin: "gè", translation: "satuan umum", isCorrect: false },
      { id: "opt-1d", hanzi: "只", pinyin: "zhī", translation: "ekor (hewan)", isCorrect: false },
    ],
    explanation:
      "Buku adalah benda yang dijilid rapi, sehingga wajib menggunakan kata penggolong '本' (běn). Frasa yang benar: 一本书 (yì běn shū).",
  },
  {
    id: "mwq-02",
    prompt: "Lengkapi kalimat untuk memesan minuman teh: '我想喝一 ___ 茶。'",
    sentenceWithCloze: "我想喝一 ___ 茶。",
    targetNoun: "茶 (chá - teh)",
    correctMwId: "mw-bei",
    options: [
      { id: "opt-2a", hanzi: "杯", pinyin: "bēi", translation: "cangkir / gelas wadah", isCorrect: true },
      { id: "opt-2b", hanzi: "块", pinyin: "kuài", translation: "potongan / balok", isCorrect: false },
      { id: "opt-2c", hanzi: "本", pinyin: "běn", translation: "buku", isCorrect: false },
      { id: "opt-2d", hanzi: "双", pinyin: "shuāng", translation: "sepasang", isCorrect: false },
    ],
    explanation:
      "Teh adalah minuman cair yang ditampung dalam wadah cangkir/gelas, sehingga menggunakan penggolong wadah '杯' (bēi). Frasa yang benar: 一杯茶 (yì bēi chá).",
  },
  {
    id: "mwq-03",
    prompt: "Kata penggolong apakah yang tepat untuk benda berpermukaan datar seperti meja '桌子' (zhuōzi)?",
    sentenceWithCloze: "房间里有一 ___ 桌子。",
    targetNoun: "桌子 (zhuōzi - meja)",
    correctMwId: "mw-zhang",
    options: [
      { id: "opt-3a", hanzi: "张", pinyin: "zhāng", translation: "bidang datar", isCorrect: true },
      { id: "opt-3b", hanzi: "只", pinyin: "zhī", translation: "hewan / sebelah", isCorrect: false },
      { id: "opt-3c", hanzi: "岁", pinyin: "suì", translation: "umur", isCorrect: false },
      { id: "opt-3d", hanzi: "块", pinyin: "kuài", translation: "mata uang", isCorrect: false },
    ],
    explanation:
      "Meja memiliki permukaan bidang datar yang luas, sehingga menggunakan kata penggolong '张' (zhāng). Frasa yang benar: 一张桌子 (yì zhāng zhuōzi).",
  },
  {
    id: "mwq-04",
    prompt: "Saat menyatakan harga di toko: '这个苹果五 ___ 钱。'",
    sentenceWithCloze: "这个苹果五 ___ 钱。",
    targetNoun: "钱 (qián - uang)",
    correctMwId: "mw-kuai",
    options: [
      { id: "opt-4a", hanzi: "块", pinyin: "kuài", translation: "yuan (uang lisan)", isCorrect: true },
      { id: "opt-4b", hanzi: "本", pinyin: "běn", translation: "buku", isCorrect: false },
      { id: "opt-4c", hanzi: "双", pinyin: "shuāng", translation: "pasang", isCorrect: false },
      { id: "opt-4d", hanzi: "位", pinyin: "wèi", translation: "orang terhormat", isCorrect: false },
    ],
    explanation:
      "Dalam percakapan lisan sehari-hari, satuan mata uang selalu dihitung dengan '块' (kuài). Frasa yang benar: 五块钱 (wǔ kuài qián).",
  },
  {
    id: "mwq-05",
    prompt: "Kata penggolong sopan yang digunakan untuk menyapa seorang guru '老师' (lǎoshī) adalah:",
    sentenceWithCloze: "这是我们的一 ___ 老师。",
    targetNoun: "老师 (lǎoshī - guru)",
    correctMwId: "mw-wei",
    options: [
      { id: "opt-5a", hanzi: "位", pinyin: "wèi", translation: "orang terhormat / santun", isCorrect: true },
      { id: "opt-5b", hanzi: "只", pinyin: "zhī", translation: "hewan", isCorrect: false },
      { id: "opt-5c", hanzi: "张", pinyin: "zhāng", translation: "permukaan datar", isCorrect: false },
      { id: "opt-5d", hanzi: "点", pinyin: "diǎn", translation: "jam", isCorrect: false },
    ],
    explanation:
      "Guru adalah profesi yang sangat dihormati dalam etika Tiongkok, sehingga varian kata penggolong santun yang wajib digunakan adalah '位' (wèi). Frasa: 一位老师 (yí wèi lǎoshī).",
  },
];
