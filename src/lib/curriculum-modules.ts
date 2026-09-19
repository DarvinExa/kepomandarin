import {
  FUNDAMENTAL_TONES,
  TONE_PLACEMENT_RULES,
  FUNDAMENTAL_INITIALS,
  FUNDAMENTAL_FINALS,
  FUNDAMENTAL_STROKES,
  FUNDAMENTAL_STROKE_RULES,
} from "./fundamentals";
import {
  HSK2_LESSON_BLUEPRINTS,
  HSK2_GRAMMAR_POINTS,
  HSK2_VOCABULARY_PREVIEWS,
} from "./hsk2";
import {
  HSK3_LESSON_BLUEPRINTS,
  HSK3_GRAMMAR_POINTS,
  HSK3_VOCABULARY_PREVIEWS,
} from "./hsk3";
import {
  HSK4_LESSON_BLUEPRINTS,
  HSK4_GRAMMAR_POINTS,
  HSK4_VOCABULARY_PREVIEWS,
} from "./hsk4";
import {
  HSK5_LESSON_BLUEPRINTS,
  HSK5_GRAMMAR_POINTS,
  HSK5_VOCABULARY_PREVIEWS,
} from "./hsk5";

export interface GrammarItem {
  ruleTitle: string;
  formula?: string;
  explanation: string;
  example: string;
}

export interface DialogueItem {
  speaker: string;
  role?: string;
  hanzi: string;
  pinyin: string;
  translation: string;
}

export interface UnitVocabItem {
  hanzi: string;
  pinyin: string;
  tone?: string;
  translation: string;
  exampleHanzi?: string;
  examplePinyin?: string;
  exampleTranslation?: string;
}

export interface ModuleUnitSummary {
  id: string;
  moduleId: string;
  slug: string;
  unitNumber: number;
  title: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  objectives: string;
  overview: string;
  vocabCount: number;
  durationMinutes: number;
  levelBadge: string;
}

export interface FullUnitDetail extends ModuleUnitSummary {
  grammarRules: GrammarItem[];
  dialogue: DialogueItem[];
  vocabulary: UnitVocabItem[];
}

export interface CurriculumModule {
  id: string;
  slug: string;
  title: string;
  hanziTitle: string;
  pinyinTitle: string;
  subtitle: string;
  levelNumber: number;
  badge: string;
  description: string;
  unitsCount: number;
  totalVocab: number;
  status: "active" | "roadmap";
  units: ModuleUnitSummary[];
}

// -------------------------------------------------------------
// 1. DATA UNIT MODUL FONDASI DASAR (FUNDAMENTALS)
// -------------------------------------------------------------
const FUNDAMENTALS_UNITS: FullUnitDetail[] = [
  {
    id: "fund-01",
    moduleId: "fundamentals",
    slug: "01",
    unitNumber: 1,
    title: "4 Nada Dasar & Nada Netral",
    hanzi: "声调",
    pinyin: "Shēngdiào",
    translation: "Tinggi Rendah Nada & Aturan Tanda Nada",
    objectives:
      "Menguasai kontur 4 nada utama, nada netral, dan rumus penempatan tanda nada pada vokal pinyin.",
    overview:
      "Bahasa Mandarin adalah bahasa bernada. Perbedaan tinggi rendah nada mengubah arti kata secara menyeluruh. Unit ini melatih kepekaan pendengaran dan kestabilan pelafalanmu.",
    vocabCount: 10,
    durationMinutes: 12,
    levelBadge: "FONDASI 01",
    grammarRules: [
      {
        ruleTitle: "Aturan Penempatan Tanda Nada (标调规则)",
        formula: TONE_PLACEMENT_RULES.formula,
        explanation:
          "Tanda nada diletakkan berdasarkan urutan vokal: jika ada 'a', selalu di atas 'a'. Jika tidak ada, cari 'o' atau 'e'. Jika 'i' dan 'u' berdampingan, letakkan pada vokal yang paling belakang.",
        example: "hào (di atas a), hěn (di atas e), liù (di atas u), guì (di atas i).",
      },
      {
        ruleTitle: "Aturan Perubahan Sandhi Nada ke-3 (变调)",
        formula: "Nada 3 + Nada 3 → Nada 2 + Nada 3",
        explanation:
          "Ketika dua karakter bernada ke-3 bertemu berdampingan, karakter pertama otomatis dilafalkan sebagai nada ke-2 (naik), meskipun penulisan pinyin tetap bernada 3.",
        example: "你好 ditulis nǐ hǎo, tetapi dilafalkan ní hǎo.",
      },
    ],
    dialogue: [
      {
        speaker: "A",
        role: "Pembelajar",
        hanzi: "妈，那是马吗？",
        pinyin: "Mā, nà shì mǎ ma?",
        translation: "Ibu, apakah itu kuda?",
      },
      {
        speaker: "B",
        role: "Ibu",
        hanzi: "不是，那是麻。",
        pinyin: "Bú shì, nà shì má.",
        translation: "Bukan, itu adalah rami.",
      },
    ],
    vocabulary: FUNDAMENTAL_TONES.map((t) => ({
      hanzi: t.specimen.hanzi,
      pinyin: t.specimen.pinyin,
      tone: t.name,
      translation: t.specimen.translation,
      exampleHanzi: `${t.specimen.hanzi} (${t.pitchContour})`,
      examplePinyin: t.mnemonic,
      exampleTranslation: t.description,
    })),
  },
  {
    id: "fund-02",
    moduleId: "fundamentals",
    slug: "02",
    unitNumber: 2,
    title: "Inisial & Final Pīnyīn",
    hanzi: "声母与韵母",
    pinyin: "Shēngmǔ yǔ Yùnmǔ",
    translation: "23 Konsonan & 24 Vokal Fonetik Mandarin",
    objectives:
      "Mengenal artikulasi konsonan berhembus (aspirasi), vokal sengau (nasal), dan vokal khusus ü dalam sistem Pīnyīn.",
    overview:
      "Pīnyīn adalah panduan fonetik resmi bahasa Mandarin. Menguasai bunyi konsonan dan vokal menjadi bekal utama sebelum menghafal ribuan karakter Hanzi.",
    vocabCount: 20,
    durationMinutes: 15,
    levelBadge: "FONDASI 02",
    grammarRules: [
      {
        ruleTitle: "Perbedaan Letupan Udara: Konsonan Aspirasi vs Non-Aspirasi",
        formula: "b vs p | d vs t | g vs k | j vs q | zh vs ch | z vs c",
        explanation:
          "Pasangan konsonan Mandarin dibedakan oleh ada tidaknya hembusan udara kuat dari mulut. 'b' lembut tanpa hembusan, sedangkan 'p' ditiupkan udara kuat.",
        example: "bà (ayah, lembut) vs pà (takut, berhembus kuat).",
      },
      {
        ruleTitle: "Pelepasan Titik Dua pada Vokal 'ü'",
        formula: "j, q, x + ü → ju, qu, xu (tanpa titik dua)",
        explanation:
          "Saat vokal 'ü' bergabung dengan inisial j, q, atau x, dua titik di atasnya dilepas dan ditulis 'u', tetapi tetap dilafalkan sebagai vokal bulat 'ü'.",
        example: "qù (pergi), xǔ (mengizinkan).",
      },
    ],
    dialogue: [
      {
        speaker: "A",
        role: "Pengajar",
        hanzi: "请听：八 (bā) 和 怕 (pà)。",
        pinyin: "Qǐng tīng: bā hé pà.",
        translation: "Dengarkan: delapan (bā) dan takut (pà).",
      },
      {
        speaker: "B",
        role: "Murid",
        hanzi: "我听懂了，pà 有很强的气流。",
        pinyin: "Wǒ tīngdǒng le, pà yǒu hěn qiáng de qìliú.",
        translation: "Saya paham, pà memiliki hembusan udara yang kuat.",
      },
    ],
    vocabulary: [
      ...FUNDAMENTAL_INITIALS.slice(0, 8).map((init) => ({
        hanzi: init.exampleHanzi,
        pinyin: init.examplePinyin,
        tone: init.category,
        translation: init.exampleTranslation,
        exampleHanzi: `Konsonan [${init.letter}]`,
        examplePinyin: init.articulationTip,
        exampleTranslation: `Contoh kata: ${init.exampleHanzi} (${init.examplePinyin})`,
      })),
      ...FUNDAMENTAL_FINALS.slice(0, 8).map((fin) => ({
        hanzi: fin.exampleHanzi,
        pinyin: fin.examplePinyin,
        tone: fin.type,
        translation: fin.exampleTranslation,
        exampleHanzi: `Vokal [${fin.letter}]`,
        examplePinyin: fin.soundDescription,
        exampleTranslation: `Contoh kata: ${fin.exampleHanzi} (${fin.examplePinyin})`,
      })),
    ],
  },
  {
    id: "fund-03",
    moduleId: "fundamentals",
    slug: "03",
    unitNumber: 3,
    title: "Aturan & Urutan Menulis Hanzi",
    hanzi: "汉字笔顺",
    pinyin: "Hànzì Bǐshùn",
    translation: "8 Goresan Dasar & 7 Kaidah Urutan Goresan",
    objectives:
      "Memahami 8 goresan dasar karakter Hanzi (Yǒngzì Bāfǎ) dan mempraktikkan 7 kaidah urutan menulis (Bǐshùn) yang seimbang.",
    overview:
      "Menulis karakter Hanzi mengikuti ritme dan aturan goresan yang runtut. Dengan memahami urutan yang benar, karakter yang kamu tulis akan lebih rapi, proporsional, dan mudah diingat.",
    vocabCount: 15,
    durationMinutes: 14,
    levelBadge: "FONDASI 03",
    grammarRules: FUNDAMENTAL_STROKE_RULES.slice(0, 4).map((rule) => ({
      ruleTitle: `Kaidah ${rule.number}: ${rule.ruleTitle} (${rule.hanziPrinciple})`,
      formula: rule.strokeSteps,
      explanation: rule.explanation,
      example: `${rule.exampleChar} (${rule.examplePinyin}) : ${rule.exampleMeaning}`,
    })),
    dialogue: [
      {
        speaker: "A",
        role: "Pengajar",
        hanzi: "写‘十’的时候，先横后竖。",
        pinyin: "Xiě ‘shí’ de shíhou, xiān héng hòu shù.",
        translation: "Saat menulis '十' (sepuluh), tulis goresan mendatar dulu baru tegak lurus.",
      },
      {
        speaker: "B",
        role: "Murid",
        hanzi: "好的，我先写横，再写竖。",
        pinyin: "Hǎo de, wǒ xiān xiě héng, zài xiě shù.",
        translation: "Baik, saya menulis garis mendatar dulu, baru garis tegak.",
      },
    ],
    vocabulary: FUNDAMENTAL_STROKES.map((stroke) => ({
      hanzi: stroke.visualSymbol,
      pinyin: stroke.pinyin,
      tone: stroke.direction,
      translation: stroke.name,
      exampleHanzi: stroke.exampleChar,
      examplePinyin: stroke.examplePinyin,
      exampleTranslation: `${stroke.exampleMeaning} · ${stroke.description}`,
    })),
  },
];

// -------------------------------------------------------------
// 2. DATA UNIT MODUL HSK 1
// -------------------------------------------------------------
const HSK1_UNITS: FullUnitDetail[] = [
  {
    id: "hsk1-01",
    moduleId: "hsk1",
    slug: "01",
    unitNumber: 1,
    title: "Sapaan Sopan",
    hanzi: "问候",
    pinyin: "Wènhòu",
    translation: "Sapaan Sehari-hari & Penutupan Percakapan",
    objectives:
      "Meletakkan fondasi etika komunikasi berbahasa Mandarin, sapaan kasual dan formal, aturan sandhi nada ke-3, serta ucapan perpisahan santun.",
    overview:
      "Pelajaran pertama membiasakan kamu menyapa teman dan guru dengan sopan. Kamu akan melatih pelafalan salam pembuka dan ungkapan terima kasih sehari-hari.",
    vocabCount: 10,
    durationMinutes: 10,
    levelBadge: "HSK 1 · UNIT 01",
    grammarRules: [
      {
        ruleTitle: "Perbedaan '你' (Nǐ) dan '您' (Nín)",
        explanation:
          "Gunakan 你 (nǐ) untuk teman sebaya atau situasi santai, dan gunakan 您 (nín) untuk menunjukkan rasa hormat kepada orang tua, guru, atau mitra kerja.",
        example: "老师，您好！(Lǎoshī, nín hǎo!: Guru, halo!)",
      },
      {
        ruleTitle: "Aturan Sandhi Nada ke-3 (变调)",
        explanation:
          "Ketika dua karakter bernada ke-3 bertemu berdampingan, karakter pertama otomatis dilafalkan dengan nada ke-2 (naik), meskipun ejaan pinyin tetap ditulis nada ke-3.",
        example: "你好 dilafalkan ní hǎo (bukan nǐ hǎo).",
      },
    ],
    dialogue: [
      { speaker: "A", hanzi: "你好！", pinyin: "Nǐ hǎo!", translation: "Halo!" },
      { speaker: "B", hanzi: "你好！早上好。", pinyin: "Nǐ hǎo! Zǎoshang hǎo.", translation: "Halo! Selamat pagi." },
      { speaker: "A", hanzi: "老师，您好！谢谢您。", pinyin: "Lǎoshī, nín hǎo! Xièxie nín.", translation: "Guru, halo! Terima kasih kepada Anda." },
      { speaker: "B", hanzi: "不客气，再见！", pinyin: "Bú kèqi, zàijiàn!", translation: "Sama-sama, sampai jumpa!" },
    ],
    vocabulary: [
      { hanzi: "你", pinyin: "nǐ", tone: "Nada 3", translation: "kamu / engkau", exampleHanzi: "你好！", examplePinyin: "Nǐ hǎo!", exampleTranslation: "Halo!" },
      { hanzi: "好", pinyin: "hǎo", tone: "Nada 3", translation: "baik / bagus", exampleHanzi: "早上好！", examplePinyin: "Zǎoshang hǎo!", exampleTranslation: "Selamat pagi!" },
      { hanzi: "您", pinyin: "nín", tone: "Nada 2", translation: "Anda (sopan)", exampleHanzi: "老师，您好！", examplePinyin: "Lǎoshī, nín hǎo!", exampleTranslation: "Halo, Guru!" },
      { hanzi: "再见", pinyin: "zàijiàn", tone: "Nada 4 + 4", translation: "sampai jumpa", exampleHanzi: "明天再见！", examplePinyin: "Míngtiān zàijiàn!", exampleTranslation: "Sampai jumpa besok!" },
      { hanzi: "老师", pinyin: "lǎoshī", tone: "Nada 3 + 1", translation: "guru / pengajar", exampleHanzi: "王老师好。", examplePinyin: "Wáng lǎoshī hǎo.", exampleTranslation: "Halo, Guru Wang." },
      { hanzi: "早上", pinyin: "zǎoshang", tone: "Nada 3 + netral", translation: "pagi hari", exampleHanzi: "早上好。", examplePinyin: "Zǎoshang hǎo.", exampleTranslation: "Selamat pagi." },
      { hanzi: "谢谢", pinyin: "xièxie", tone: "Nada 4 + netral", translation: "terima kasih", exampleHanzi: "谢谢你！", examplePinyin: "Xièxie nǐ!", exampleTranslation: "Terima kasih banyak!" },
      { hanzi: "不客气", pinyin: "bú kèqi", tone: "Nada 2 + 4 + netral", translation: "sama-sama", exampleHanzi: "不客气，请坐。", examplePinyin: "Bú kèqi, qǐng zuò.", exampleTranslation: "Sama-sama, silakan duduk." },
    ],
  },
  {
    id: "hsk1-02",
    moduleId: "hsk1",
    slug: "02",
    unitNumber: 2,
    title: "Identitas Diri",
    hanzi: "自我介绍",
    pinyin: "Zìwǒ Jièshào",
    translation: "Perkenalan Nama & Asal Kewarganegaraan",
    objectives:
      "Menguasai kata ganti orang, kata kerja kopula 是 (adalah), dan cara menanyakan nama serta asal negara orang lain.",
    overview:
      "Unit kedua fokus pada menyatakan identitas pribadi. Kamu akan belajar memperkenalkan diri, menanyakan asal seseorang, dan menyusun kalimat penghubung dasar.",
    vocabCount: 10,
    durationMinutes: 12,
    levelBadge: "HSK 1 · UNIT 02",
    grammarRules: [
      {
        ruleTitle: "Pola Kalimat Penghubung: A 是 B",
        explanation:
          "Kata 是 (shì) berfungsi menghubungkan subjek dengan status, profesi, atau asal negara (setara dengan 'adalah').",
        example: "我是印尼人。(Wǒ shì Yìnní rén: Saya orang Indonesia.)",
      },
      {
        ruleTitle: "Menanyakan Nama dengan '什么' (Shénme)",
        explanation:
          "Kata tanya 什么 diletakkan langsung di posisi objek kalimat tanpa membalik susunan subjek dan predikat.",
        example: "你叫什么名字？(Nǐ jiào shénme míngzi?: Siapa namamu?)",
      },
    ],
    dialogue: [
      { speaker: "A", hanzi: "你好，你叫什么名字？", pinyin: "Nǐ hǎo, nǐ jiào shénme míngzi?", translation: "Halo, siapa namamu?" },
      { speaker: "B", hanzi: "我叫大卫。你是中国人吗？", pinyin: "Wǒ jiào Dàwèi. Nǐ shì Zhōngguó rén ma?", translation: "Nama saya David. Apakah kamu orang Tiongkok?" },
      { speaker: "A", hanzi: "不是，我是印尼人。我也是学生。", pinyin: "Bú shì, wǒ shì Yìnní rén. Wǒ yě shì xuésheng.", translation: "Bukan, saya orang Indonesia. Saya juga seorang pelajar." },
    ],
    vocabulary: [
      { hanzi: "我", pinyin: "wǒ", tone: "Nada 3", translation: "saya / aku", exampleHanzi: "我是学生。", examplePinyin: "Wǒ shì xuésheng.", exampleTranslation: "Saya adalah seorang pelajar." },
      { hanzi: "是", pinyin: "shì", tone: "Nada 4", translation: "adalah / ya", exampleHanzi: "他是老师。", examplePinyin: "Tā shì lǎoshī.", exampleTranslation: "Dia adalah seorang guru." },
      { hanzi: "叫", pinyin: "jiào", tone: "Nada 4", translation: "bernama / memanggil", exampleHanzi: "我叫王明。", examplePinyin: "Wǒ jiào Wáng Míng.", exampleTranslation: "Nama saya Wang Ming." },
      { hanzi: "什么", pinyin: "shénme", tone: "Nada 2 + netral", translation: "apa", exampleHanzi: "这是什么？", examplePinyin: "Zhè shì shénme?", exampleTranslation: "Ini apa?" },
      { hanzi: "名字", pinyin: "míngzi", tone: "Nada 2 + netral", translation: "nama", exampleHanzi: "你的名字很好听。", examplePinyin: "Nǐ de míngzi hěn hǎotīng.", exampleTranslation: "Namamu sangat bagus didengar." },
      { hanzi: "人", pinyin: "rén", tone: "Nada 2", translation: "orang", exampleHanzi: "印尼人很热情。", examplePinyin: "Yìnní rén hěn rèqíng.", exampleTranslation: "Orang Indonesia sangat ramah." },
      { hanzi: "学生", pinyin: "xuésheng", tone: "Nada 2 + netral", translation: "murid / pelajar", exampleHanzi: "他们都是学生。", examplePinyin: "Tāmen dōu shì xuésheng.", exampleTranslation: "Mereka semua adalah pelajar." },
    ],
  },
  {
    id: "hsk1-03",
    moduleId: "hsk1",
    slug: "03",
    unitNumber: 3,
    title: "Angka & Waktu",
    hanzi: "数字与时间",
    pinyin: "Shùzì yǔ Shíjiān",
    translation: "Penghitungan Dasar, Jam, Hari & Tanggal",
    objectives:
      "Membekali kemampuan menyebut hitungan angka, membaca jam dan menit, serta menyusun urutan waktu kalender dari unit besar ke kecil.",
    overview:
      "Unit ketiga mengajarkan konsep hierarki waktu Mandarin yang dimulai dari tahun, bulan, tanggal, waktu hari, hingga jam dan menit.",
    vocabCount: 10,
    durationMinutes: 14,
    levelBadge: "HSK 1 · UNIT 03",
    grammarRules: [
      {
        ruleTitle: "Hierarki Waktu Mandarin (Besar ke Kecil)",
        explanation:
          "Urutan waktu dalam bahasa Mandarin selalu dimulai dari unit paling besar menuju unit paling kecil: Hari/Tanggal → Pagi/Siang/Malam → Jam → Menit.",
        example: "今天下午两点 (Jīntiān xiàwǔ liǎng diǎn: Hari ini jam 2 siang).",
      },
      {
        ruleTitle: "Perbedaan '二' (Èr) dan '两' (Liǎng)",
        explanation:
          "Gunakan 二 untuk menghitung urutan angka (1, 2, 3), dan gunakan 两 bila diikuti kata bantu bilangan atau saat menyatakan jam dua.",
        example: "两点 (Liǎng diǎn: jam 2), bukan 二点.",
      },
    ],
    dialogue: [
      { speaker: "A", hanzi: "现在几点？", pinyin: "Xiànzài jǐ diǎn?", translation: "Sekarang jam berapa?" },
      { speaker: "B", hanzi: "现在下午三点十分。", pinyin: "Xiànzài xiàwǔ sān diǎn shí fēn.", translation: "Sekarang jam 3 lewat 10 menit siang." },
      { speaker: "A", hanzi: "今天星期几？", pinyin: "Jīntiān xīngqī jǐ?", translation: "Hari ini hari apa?" },
      { speaker: "B", hanzi: "今天星期三。", pinyin: "Jīntiān xīngqīsān.", translation: "Hari ini hari Rabu." },
    ],
    vocabulary: [
      { hanzi: "一", pinyin: "yī", tone: "Nada 1", translation: "satu", exampleHanzi: "一个月。", examplePinyin: "Yí gè yuè.", exampleTranslation: "Satu bulan." },
      { hanzi: "二", pinyin: "èr", tone: "Nada 4", translation: "dua", exampleHanzi: "二月。", examplePinyin: "Èr yuè.", exampleTranslation: "Bulan Februari." },
      { hanzi: "三", pinyin: "sān", tone: "Nada 1", translation: "tiga", exampleHanzi: "三点整。", examplePinyin: "Sān diǎn zhěng.", exampleTranslation: "Jam tiga tepat." },
      { hanzi: "十", pinyin: "shí", tone: "Nada 2", translation: "sepuluh", exampleHanzi: "十分钟。", examplePinyin: "Shí fēnzhōng.", exampleTranslation: "Sepuluh menit." },
      { hanzi: "点", pinyin: "diǎn", tone: "Nada 3", translation: "jam / pukul", exampleHanzi: "五点了。", examplePinyin: "Wǔ diǎn le.", exampleTranslation: "Sudah jam lima." },
      { hanzi: "分", pinyin: "fēn", tone: "Nada 1", translation: "menit", exampleHanzi: "八点十五分。", examplePinyin: "Bā diǎn shíwǔ fēn.", exampleTranslation: "Jam 8 lewat 15 menit." },
      { hanzi: "星期", pinyin: "xīngqī", tone: "Nada 1 + 1", translation: "minggu / pekan", exampleHanzi: "今天星期天。", examplePinyin: "Jīntiān xīngqītiān.", exampleTranslation: "Hari ini hari Minggu." },
    ],
  },
  {
    id: "hsk1-04",
    moduleId: "hsk1",
    slug: "04",
    unitNumber: 4,
    title: "Keluarga & Relasi",
    hanzi: "家庭与关系",
    pinyin: "Jiātíng yǔ Guānxì",
    translation: "Anggota Keluarga & Hubungan Sosial",
    objectives:
      "Menyatakan panggilan anggota keluarga, hubungan kepemilikan dengan partikel 的, serta keberadaan orang menggunakan kata kerja 有.",
    overview:
      "Unit keempat mengajarkan penyebutan hubungan kekeluargaan hangat, menanyakan jumlah anggota keluarga, dan merangkai kata kepemilikan secara tepat.",
    vocabCount: 10,
    durationMinutes: 12,
    levelBadge: "HSK 1 · UNIT 04",
    grammarRules: [
      {
        ruleTitle: "Partikel Kepemilikan: 的 (De)",
        explanation:
          "Partikel 的 menghubungkan pemilik dengan benda/orang yang dimiliki: [Pemilik] + 的 + [Benda/Orang].",
        example: "这是我的书。(Zhè shì wǒ de shū: Ini buku saya.)",
      },
      {
        ruleTitle: "Menyatakan Keberadaan: 有 (Yǒu) & 没有 (Méiyǒu)",
        explanation:
          "Gunakan 有 untuk menyatakan punya/ada, dan 没有 untuk bentuk negasi (tidak punya/tidak ada). Jangan memakai 不有.",
        example: "我家有四口人。(Wǒ jiā yǒu sì kǒu rén: Keluarga saya ada 4 orang.)",
      },
    ],
    dialogue: [
      { speaker: "A", hanzi: "你家有几口人？", pinyin: "Nǐ jiā yǒu jǐ kǒu rén?", translation: "Keluargamu ada berapa orang?" },
      { speaker: "B", hanzi: "我家有四口人：爸爸、妈妈、一个哥哥和我。", pinyin: "Wǒ jiā yǒu sì kǒu rén: bàba, māma, yí gè gēge hé wǒ.", translation: "Keluarga saya ada 4 orang: ayah, ibu, seorang kakak laki-laki, dan saya." },
      { speaker: "A", hanzi: "你哥哥是学生吗？", pinyin: "Nǐ gēge shì xuésheng ma?", translation: "Apakah kakakmu seorang pelajar?" },
      { speaker: "B", hanzi: "是的，他也是大学生。", pinyin: "Shì de, tā yě shì dàxuéshēng.", translation: "Benar, dia juga seorang mahasiswa." },
    ],
    vocabulary: [
      { hanzi: "家", pinyin: "jiā", tone: "Nada 1", translation: "rumah / keluarga", exampleHanzi: "我爱我的家。", examplePinyin: "Wǒ ài wǒ de jiā.", exampleTranslation: "Saya mencintai keluarga saya." },
      { hanzi: "爸爸", pinyin: "bàba", tone: "Nada 4 + netral", translation: "ayah", exampleHanzi: "我爸爸在工作。", examplePinyin: "Wǒ bàba zài gōngzuò.", exampleTranslation: "Ayah saya sedang bekerja." },
      { hanzi: "妈妈", pinyin: "māma", tone: "Nada 1 + netral", translation: "ibu", exampleHanzi: "我妈妈喜欢喝茶。", examplePinyin: "Wǒ māma xǐhuan hē chá.", exampleTranslation: "Ibu saya suka minum teh." },
      { hanzi: "哥哥", pinyin: "gēge", tone: "Nada 1 + netral", translation: "kakak laki-laki", exampleHanzi: "他是我哥哥。", examplePinyin: "Tā shì wǒ gēge.", exampleTranslation: "Dia adalah kakak laki-laki saya." },
      { hanzi: "有", pinyin: "yǒu", tone: "Nada 3", translation: "ada / mempunyai", exampleHanzi: "你有一本书吗？", examplePinyin: "Nǐ yǒu yì běn shū ma?", exampleTranslation: "Apakah kamu punya sebuah buku?" },
      { hanzi: "的", pinyin: "de", tone: "Nada netral", translation: "partikel milik / penjelas", exampleHanzi: "这是谁的书？", examplePinyin: "Zhè shì shéi de shū?", exampleTranslation: "Ini buku milik siapa?" },
    ],
  },
  {
    id: "hsk1-05",
    moduleId: "hsk1",
    slug: "05",
    unitNumber: 5,
    title: "Aktivitas Harian",
    hanzi: "日常活动",
    pinyin: "Rìcháng Huódòng",
    translation: "Kegiatan Rutin, Lokasi & Kebiasaan",
    objectives:
      "Menggabungkan pola kalimat tindakan harian, urutan posisi tempat sebelum kata kerja, serta pertanyaan dengan partikel 吗.",
    overview:
      "Unit penutup HSK 1 ini menyatukan seluruh tata bahasa dasar: menyatakan kegiatan harian, ke mana kamu pergi, dan apa yang kamu lakukan di suatu tempat.",
    vocabCount: 10,
    durationMinutes: 14,
    levelBadge: "HSK 1 · UNIT 05",
    grammarRules: [
      {
        ruleTitle: "Kaidah Tempat Sebelum Aksi: Subjek + 在 (Tempat) + Kata Kerja",
        explanation:
          "Dalam bahasa Mandarin, keterangan tempat selalu diletakkan sebelum tindakan dilakukan, bukan di belakang kalimat.",
        example: "我在学校看书。(Wǒ zài xuéxiào kàn shū: Saya membaca buku di sekolah.)",
      },
      {
        ruleTitle: "Partikel Tanya '吗' (Ma)",
        explanation:
          "Tambahkan partikel 吗 di akhir kalimat pernyataan untuk mengubahnya menjadi kalimat tanya ya/tidak.",
        example: "你去商店吗？(Nǐ qù shāngdiàn ma?: Apakah kamu pergi ke toko?)",
      },
    ],
    dialogue: [
      { speaker: "A", hanzi: "你今天下午做什么？", pinyin: "Nǐ jīntiān xiàwǔ zuò shénme?", translation: "Apa yang kamu lakukan siang ini?" },
      { speaker: "B", hanzi: "我去图书馆看书。你呢？", pinyin: "Wǒ qù túshūguǎn kàn shū. Nǐ ne?", translation: "Saya pergi ke perpustakaan untuk membaca buku. Bagaimana denganmu?" },
      { speaker: "A", hanzi: "我想去喝中国茶，吃点心。", pinyin: "Wǒ xiǎng qù hē Zhōngguó chá, chī diǎnxin.", translation: "Saya ingin minum teh Tiongkok dan makan camilan." },
    ],
    vocabulary: [
      { hanzi: "吃", pinyin: "chī", tone: "Nada 1", translation: "makan", exampleHanzi: "你想吃什么？", examplePinyin: "Nǐ xiǎng chī shénme?", exampleTranslation: "Kamu ingin makan apa?" },
      { hanzi: "喝", pinyin: "hē", tone: "Nada 1", translation: "minum", exampleHanzi: "请喝茶。", examplePinyin: "Qǐng hē chá.", exampleTranslation: "Silakan minum teh." },
      { hanzi: "茶", pinyin: "chá", tone: "Nada 2", translation: "teh", exampleHanzi: "中国茶很好喝。", examplePinyin: "Zhōngguó chá hěn hǎohē.", exampleTranslation: "Teh Tiongkok enak diminum." },
      { hanzi: "去", pinyin: "qù", tone: "Nada 4", translation: "pergi ke", exampleHanzi: "明天我去学校。", examplePinyin: "Míngtiān wǒ qù xuéxiào.", exampleTranslation: "Besok saya pergi ke sekolah." },
      { hanzi: "做", pinyin: "zuò", tone: "Nada 4", translation: "melakukan / membuat", exampleHanzi: "你在做什么？", examplePinyin: "Nǐ zài zuò shénme?", exampleTranslation: "Kamu sedang melakukan apa?" },
      { hanzi: "看", pinyin: "kàn", tone: "Nada 4", translation: "melihat / membaca / menonton", exampleHanzi: "我看书。", examplePinyin: "Wǒ kàn shū.", exampleTranslation: "Saya membaca buku." },
    ],
  },
];

// Helper pembuat unit HSK 2 s.d. 5 dari blueprint yang ada
function mapBlueprintsToUnits(
  moduleId: string,
  levelBadgePrefix: string,
  blueprints: typeof HSK2_LESSON_BLUEPRINTS,
  grammarPoints: typeof HSK2_GRAMMAR_POINTS,
  vocabPreviews: typeof HSK2_VOCABULARY_PREVIEWS
): FullUnitDetail[] {
  return blueprints.map((bp) => {
    const matchingGrammar = grammarPoints.find((g) => g.id === bp.primaryGrammarId);
    const grammarRules: GrammarItem[] = matchingGrammar
      ? [
          {
            ruleTitle: matchingGrammar.ruleTitle,
            formula: matchingGrammar.formula,
            explanation: matchingGrammar.explanation,
            example:
              matchingGrammar.specimenSentences[0]
                ? `${matchingGrammar.specimenSentences[0].hanzi} (${matchingGrammar.specimenSentences[0].pinyin}) : ${matchingGrammar.specimenSentences[0].translation}`
                : "",
          },
        ]
      : [];

    const dialogue: DialogueItem[] = bp.dialogueSpecimen.map((d) => ({
      speaker: d.speaker,
      role: d.role,
      hanzi: d.hanzi,
      pinyin: d.pinyin,
      translation: d.translation,
    }));

    // Ambil kosakata dari keyVocabPreview dan padankan dengan vocabPreviews bila ada
    const vocabulary: UnitVocabItem[] = bp.keyVocabPreview.map((kv) => {
      const fullWord = vocabPreviews.find((v) => v.hanzi === kv.hanzi);
      return {
        hanzi: kv.hanzi,
        pinyin: kv.pinyin,
        tone: kv.tag,
        translation: kv.translation,
        exampleHanzi: fullWord?.sampleSentence?.hanzi,
        examplePinyin: fullWord?.sampleSentence?.pinyin,
        exampleTranslation: fullWord?.sampleSentence?.translation,
      };
    });

    return {
      id: `${moduleId}-${bp.slug}`,
      moduleId,
      slug: bp.slug,
      unitNumber: bp.lessonNumber,
      title: bp.title,
      hanzi: bp.hanzi,
      pinyin: bp.pinyin,
      translation: bp.translation,
      objectives: bp.objectives,
      overview: bp.overview,
      vocabCount: bp.vocabCount,
      durationMinutes: bp.estimatedMinutes,
      levelBadge: `${levelBadgePrefix} · UNIT ${bp.slug}`,
      grammarRules,
      dialogue,
      vocabulary,
    };
  });
}

// -------------------------------------------------------------
// 3. DATA UNIT MODUL HSK 2 S.D. 5
// -------------------------------------------------------------
const HSK2_UNITS: FullUnitDetail[] = mapBlueprintsToUnits(
  "hsk2",
  "HSK 2",
  HSK2_LESSON_BLUEPRINTS,
  HSK2_GRAMMAR_POINTS,
  HSK2_VOCABULARY_PREVIEWS
);

const HSK3_UNITS: FullUnitDetail[] = mapBlueprintsToUnits(
  "hsk3",
  "HSK 3",
  HSK3_LESSON_BLUEPRINTS,
  HSK3_GRAMMAR_POINTS,
  HSK3_VOCABULARY_PREVIEWS
);

const HSK4_UNITS: FullUnitDetail[] = mapBlueprintsToUnits(
  "hsk4",
  "HSK 4",
  HSK4_LESSON_BLUEPRINTS,
  HSK4_GRAMMAR_POINTS,
  HSK4_VOCABULARY_PREVIEWS
);

const HSK5_UNITS: FullUnitDetail[] = mapBlueprintsToUnits(
  "hsk5",
  "HSK 5",
  HSK5_LESSON_BLUEPRINTS,
  HSK5_GRAMMAR_POINTS,
  HSK5_VOCABULARY_PREVIEWS
);

// -------------------------------------------------------------
// 4. MAP SEMUA MODUL
// -------------------------------------------------------------
const ALL_MODULES_LIST: CurriculumModule[] = [
  {
    id: "fundamentals",
    slug: "fundamentals",
    title: "Fondasi Dasar Mandarin",
    hanziTitle: "汉语基础",
    pinyinTitle: "Hànyǔ Jīchǔ",
    subtitle: "Pīnyīn, 4 Nada, & Kaidah Menulis Hanzi",
    levelNumber: 0,
    badge: "MODUL PRASYARAT",
    description:
      "Tiga unit pembelajaran esensial sebelum masuk ke HSK 1: Pelajari kontur 4 nada, bunyi vokal dan konsonan pinyin, serta kaidah goresan Hanzi.",
    unitsCount: FUNDAMENTALS_UNITS.length,
    totalVocab: 45,
    status: "active",
    units: FUNDAMENTALS_UNITS,
  },
  {
    id: "hsk1",
    slug: "hsk1",
    title: "Tingkat HSK 1",
    hanziTitle: "初级汉语一",
    pinyinTitle: "Chūjí Hànyǔ Yī",
    subtitle: "Sapaan, Identitas, Waktu & Rutinitas",
    levelNumber: 1,
    badge: "KURIKULUM UTAMA",
    description:
      "Lima unit pembelajaran kontekstual yang menghubungkan karakter, nada, pola kalimat, dan latihan kontekstual secara bertahap.",
    unitsCount: HSK1_UNITS.length,
    totalVocab: 85,
    status: "active",
    units: HSK1_UNITS,
  },
  {
    id: "hsk2",
    slug: "hsk2",
    title: "Tingkat HSK 2",
    hanziTitle: "初级汉语二",
    pinyinTitle: "Chūjí Hànyǔ Èr",
    subtitle: "Cuaca, Belanja, Navigasi & Pengalaman",
    levelNumber: 2,
    badge: "KURIKULUM AKTIF",
    description:
      "Memperluas percakapan harian: perbandingan cuaca, tawar-menawar belanja, petunjuk arah jalan, dan menceritakan pengalaman masa lalu.",
    unitsCount: HSK2_UNITS.length,
    totalVocab: 150,
    status: "active",
    units: HSK2_UNITS,
  },
  {
    id: "hsk3",
    slug: "hsk3",
    title: "Tingkat HSK 3",
    hanziTitle: "中级汉语一",
    pinyinTitle: "Zhōngjí Hànyǔ Yī",
    subtitle: "Karier Kantor, Hubungan Sosial & Teknologi",
    levelNumber: 3,
    badge: "PETA JALAN DRAF",
    description:
      "Transisi menuju kemandirian berbahasa: komunikasi di tempat kerja, menyusun rencana masa depan, dan mendiskusikan topik kehidupan modern.",
    unitsCount: HSK3_UNITS.length,
    totalVocab: 300,
    status: "roadmap",
    units: HSK3_UNITS,
  },
  {
    id: "hsk4",
    slug: "hsk4",
    title: "Tingkat HSK 4",
    hanziTitle: "中级汉语二",
    pinyinTitle: "Zhōngjí Hànyǔ Èr",
    subtitle: "Psikologi, Negosiasi Bisnis & Isu Budaya",
    levelNumber: 4,
    badge: "PETA JALAN DRAF",
    description:
      "Membahas topik yang lebih kompleks: dinamika pekerjaan, analisis karakter manusia, kepedulian lingkungan, serta nilai-nilai tradisi.",
    unitsCount: HSK4_UNITS.length,
    totalVocab: 600,
    status: "roadmap",
    units: HSK4_UNITS,
  },
  {
    id: "hsk5",
    slug: "hsk5",
    title: "Tingkat HSK 5",
    hanziTitle: "高级汉语一",
    pinyinTitle: "Gāojí Hànyǔ Yī",
    subtitle: "Ekonomi, Hukum, Sastra & Wacana Filosofis",
    levelNumber: 5,
    badge: "PETA JALAN DRAF",
    description:
      "Tingkat lanjut editorial: membaca artikel wacana formal, laporan pasar, ulasan kebudayaan, serta argumentasi akademis secara terstruktur.",
    unitsCount: HSK5_UNITS.length,
    totalVocab: 1200,
    status: "roadmap",
    units: HSK5_UNITS,
  },
];

const MODULE_MAP = new Map<string, CurriculumModule>(
  ALL_MODULES_LIST.map((m) => [m.id, m])
);

// Map unit lengkap per moduleId + slug
const UNIT_DETAIL_MAP = new Map<string, FullUnitDetail>();

[
  ...FUNDAMENTALS_UNITS,
  ...HSK1_UNITS,
  ...HSK2_UNITS,
  ...HSK3_UNITS,
  ...HSK4_UNITS,
  ...HSK5_UNITS,
].forEach((u) => {
  UNIT_DETAIL_MAP.set(`${u.moduleId}:${u.slug}`, u);
});

// Urutan modul untuk navigasi kelulusan
const MODULE_PROGRESSION = ["fundamentals", "hsk1", "hsk2", "hsk3", "hsk4", "hsk5"];

// -------------------------------------------------------------
// 5. PUBLIC ACCESSOR FUNCTIONS
// -------------------------------------------------------------

export function getAllModules(): CurriculumModule[] {
  return ALL_MODULES_LIST;
}

export function getModuleById(moduleId: string): CurriculumModule | null {
  return MODULE_MAP.get(moduleId) ?? null;
}

export function getModuleUnit(moduleId: string, slug: string): FullUnitDetail | null {
  return UNIT_DETAIL_MAP.get(`${moduleId}:${slug}`) ?? null;
}

export interface NextUnitNavigation {
  targetModuleId: string;
  targetSlug: string;
  label: string;
  title: string;
  href: string;
  isLastInCurriculum: boolean;
}

export function getNextUnitNavigation(
  currentModuleId: string,
  currentSlug: string
): NextUnitNavigation | null {
  const currentModule = getModuleById(currentModuleId);
  if (!currentModule) return null;

  const currentIdx = currentModule.units.findIndex((u) => u.slug === currentSlug);
  if (currentIdx === -1) return null;

  // Jika masih ada unit berikutnya di modul yang sama
  if (currentIdx + 1 < currentModule.units.length) {
    const nextUnit = currentModule.units[currentIdx + 1];
    return {
      targetModuleId: currentModuleId,
      targetSlug: nextUnit.slug,
      label: `Lanjut ke Pelajaran ${nextUnit.slug}`,
      title: nextUnit.title,
      href: `/lessons/${currentModuleId}/${nextUnit.slug}`,
      isLastInCurriculum: false,
    };
  }

  // Jika unit terakhir di modul ini, arahkan ke unit pertama modul berikutnya
  const modProgIdx = MODULE_PROGRESSION.indexOf(currentModuleId);
  if (modProgIdx !== -1 && modProgIdx + 1 < MODULE_PROGRESSION.length) {
    const nextModId = MODULE_PROGRESSION[modProgIdx + 1];
    const nextMod = getModuleById(nextModId);
    if (nextMod && nextMod.units.length > 0) {
      const firstUnit = nextMod.units[0];
      return {
        targetModuleId: nextModId,
        targetSlug: firstUnit.slug,
        label: `Lanjut ke ${nextMod.title}: Unit ${firstUnit.slug}`,
        title: firstUnit.title,
        href: `/lessons/${nextModId}/${firstUnit.slug}`,
        isLastInCurriculum: false,
      };
    }
  }

  return {
    targetModuleId: currentModuleId,
    targetSlug: currentSlug,
    label: "Semua Silabus Selesai",
    title: "Selamat! Seluruh Kurikulum Telah Tuntas",
    href: "/lessons",
    isLastInCurriculum: true,
  };
}
