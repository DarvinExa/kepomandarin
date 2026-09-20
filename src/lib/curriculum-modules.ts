import {
  FUNDAMENTAL_TONES,
  FUNDAMENTAL_INITIALS,
  FUNDAMENTAL_FINALS,
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
  example: string; // Kompatibilitas mundur
  positiveExamples?: Array<{
    hanzi: string;
    pinyin: string;
    translation: string;
  }>;
  usageConstraints?: string;
  commonErrors?: string;
  communicativeFunction?: string;
  comparisonNotes?: string;
}

export interface DialogueContext {
  participants: string;
  location: string;
  goal: string;
  scenarioNotes?: string;
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
  toneNumber?: number;
  translation: string;
  partOfSpeech?: string;
  usageNotes?: string;
  isEnrichment?: boolean;
  inclusionReason?: string;
  exampleHanzi?: string;
  examplePinyin?: string;
  exampleTranslation?: string;
  audioUrl?: string;
}

export interface PronunciationFocus {
  sounds?: string;
  tones?: string;
  toneCombinations?: string;
  commonErrors?: string;
  articulatoryTip?: string;
}

export interface HanziComponentItem {
  hanzi: string;
  structure: string; // 'Tunggal', 'Kiri-Kanan', 'Atas-Bawah', 'Dalam-Luar', 'Mengelilingi'
  components: string;
  strokeCount: number;
  strokeOrderRules?: string[];
  notes?: string;
}

export interface ListeningActivity {
  goal: string;
  audioText: string;
  pinyin: string;
  translation: string;
  gistQuestion: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  };
  detailQuestion?: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  };
}

export interface SpeakingActivity {
  prompt: string;
  vocabularySupport: string[];
  evaluationRubric: string;
}

export interface ReadingActivity {
  textHanzi: string;
  textPinyin: string;
  textTranslation: string;
  mainIdea: string;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }>;
}

export interface WritingActivity {
  prompt: string;
  minimumCharacters?: number;
  checklist: string[];
  modelAnswer: {
    hanzi: string;
    pinyin: string;
    translation: string;
  };
}

export interface UnitCheckpoint {
  completionCriteria: string;
  masteryThresholdPercent: number;
  remedialRecommendation: string;
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
  // Metadata Tata Kelola & Mutu Kurikulum
  status?: "draft" | "reviewed" | "published";
  reviewer?: string;
  prerequisites?: string[];
  skills?: string[];
  curriculumVersion?: string;

  // Materi Pembelajaran Inti
  dialogueContext?: DialogueContext;
  dialogue: DialogueItem[];
  vocabulary: UnitVocabItem[];
  enrichmentVocabulary?: UnitVocabItem[];
  pronunciationFocus?: PronunciationFocus;
  hanziComponents?: HanziComponentItem[];
  grammarRules: GrammarItem[];
  culturalNotes?: string;

  // Keterampilan Bahasa (Skills)
  listeningActivity?: ListeningActivity;
  speakingActivity?: SpeakingActivity;
  readingActivity?: ReadingActivity;
  writingActivity?: WritingActivity;

  // Integrasi Retensi & Evaluasi
  personalizationPrompt?: string; // Phrasebook hook
  errorJournalHooks?: string[];   // Error journal auto-record hooks
  checkpoint?: UnitCheckpoint;
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
  // -------------------------------------------------------------
  // F-01: Cara Kerja Bahasa Mandarin (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "fund-01",
    moduleId: "fundamentals",
    slug: "01",
    unitNumber: 1,
    title: "Cara Kerja Bahasa Mandarin",
    hanzi: "语言机制",
    pinyin: "Yǔyán Jīzhì",
    translation: "Hanzi, Pīnyīn, Suku Kata & Karakter Tonal",
    objectives:
      "Memahami perbedaan mendasar karakter Hanzi vs alfabet fonetik, fungsi sistem Pīnyīn sebagai panduan pelafalan, anatomi satu suku kata (Inisial + Final + Nada), serta perbedaan bahasa lisan vs tulisan.",
    overview:
      "Mandarin bukan bahasa beraksara alfabet. Setiap kata dibangun dari kesatuan tiga pilar: Inisial konsonan, Final vokal, dan Kontur Nada suara, yang diwakili oleh aksara karakter Hanzi logografis. Menguasai mekanisme ini adalah fondasi paling krusial sebelum mulai belajar berbicara dan membaca.",
    vocabCount: 5,
    durationMinutes: 12,
    levelBadge: "FONDASI 01",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: [],
    skills: ["Teori Fonetik", "Pengenalan Aksara", "Analisis Suku Kata"],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "Guru Wang (Pengajar) & David (Murid Baru)",
      location: "Ruang Diskusi Fonetik KepoMandarin",
      goal: "Membedah satu suku kata 'mǎ' (马 - kuda) ke dalam komponen inisial, final, dan nada.",
      scenarioNotes:
        "David baru pertama kali belajar bahasa Mandarin dan terkejut mengetahui bahwa intonasi nada yang berbeda pada pinyin yang sama menghasilkan arti kata yang sama sekali berbeda.",
    },

    dialogue: [
      {
        speaker: "David",
        role: "Murid",
        hanzi: "老师，为什么拼音 'ma' 有很多意思？",
        pinyin: "Lǎoshī, wèishénme pīnyīn 'ma' yǒu hěnduō yìsi?",
        translation: "Guru, mengapa pinyin 'ma' bisa memiliki banyak arti yang berbeda?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "因为中文是声调语言。声调变了，汉字和意思就变了。",
        pinyin: "Yīnwèi Zhōngwén shì shēngdiào yǔyán. Shēngdiào biàn le, hànzì hé yìsi jiù biàn le.",
        translation: "Karena bahasa Mandarin adalah bahasa bernada. Jika nada berubah, karakter Hanzi dan artinya ikut berubah.",
      },
      {
        speaker: "David",
        role: "Murid",
        hanzi: "那我们怎么拆解一个音节呢？比如 'mǎ'？",
        pinyin: "Nà wǒmen zěnme chāijiě yí ge yīnjié ne? Bǐrú 'mǎ'?",
        translation: "Lalu bagaimana cara kita membedah satu suku kata? Misalnya kata 'mǎ'?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "声母是 m，韵母是 a，上面是第三声。",
        pinyin: "Shēngmǔ shì m, yùnmǔ shì a, shàngmiàn shì dì-sān shēng.",
        translation: "Inisialnya adalah m, finalnya adalah a, dan di atasnya adalah nada ketiga.",
      },
    ],

    vocabulary: [
      {
        hanzi: "汉字",
        pinyin: "hànzì",
        tone: "Nada 4 + 4",
        translation: "karakter Han / aksara Mandarin",
        partOfSpeech: "kata benda",
        usageNotes: "Aksara logografis Mandarin yang melambangkan morfem dan makna; bukan abjad alfabet fonetik.",
        exampleHanzi: "汉字很有意思。",
        examplePinyin: "Hànzì hěn yǒu yìsi.",
        exampleTranslation: "Karakter Hanzi sangat menarik.",
      },
      {
        hanzi: "拼音",
        pinyin: "pīnyīn",
        tone: "Nada 1 + 1",
        translation: "Pinyin (sistem romanisasi fonetik)",
        partOfSpeech: "kata benda",
        usageNotes: "Sistem transkripsi resmi huruf Latin untuk memandu cara membaca dan melafalkan aksara Hanzi.",
        exampleHanzi: "学拼音很有用。",
        examplePinyin: "Xué pīnyīn hěn yǒuyòng.",
        exampleTranslation: "Mempelajari pinyin sangat berguna.",
      },
      {
        hanzi: "声母",
        pinyin: "shēngmǔ",
        tone: "Nada 1 + 3",
        translation: "inisial (konsonan awal)",
        partOfSpeech: "kata benda",
        usageNotes: "Bunyi konsonan yang terletak di bagian awal suatu suku kata Mandarin (seperti b, p, m, d, t).",
        exampleHanzi: "‘m’ 是声母。",
        examplePinyin: "‘m’ shì shēngmǔ.",
        exampleTranslation: "'m' adalah sebuah inisial.",
      },
      {
        hanzi: "韵母",
        pinyin: "yùnmǔ",
        tone: "Nada 4 + 3",
        translation: "final (vokal atau rima inti)",
        partOfSpeech: "kata benda",
        usageNotes: "Bagian vokal atau vokal sengau yang mengikuti inisial dalam suatu suku kata (seperti a, o, e, an).",
        exampleHanzi: "‘a’ 是韵母。",
        examplePinyin: "‘a’ shì yùnmǔ.",
        exampleTranslation: "'a' adalah sebuah final.",
      },
      {
        hanzi: "声调",
        pinyin: "shēngdiào",
        tone: "Nada 1 + 4",
        translation: "nada fonetik",
        partOfSpeech: "kata benda",
        usageNotes: "Tinggi rendah kontur pitch suara yang membedakan makna leksikal kata dalam bahasa Mandarin.",
        exampleHanzi: "中文有四个声调。",
        examplePinyin: "Zhōngwén yǒu sì ge shēngdiào.",
        exampleTranslation: "Bahasa Mandarin memiliki empat nada.",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "中文",
        pinyin: "Zhōngwén",
        tone: "Nada 1 + 2",
        translation: "bahasa Mandarin / bahasa Tionghoa",
        isEnrichment: true,
        inclusionReason: "Istilah sehari-hari yang paling sering digunakan untuk menyebut bahasa Mandarin secara menyeluruh.",
        exampleHanzi: "我学中文。",
        examplePinyin: "Wǒ xué Zhōngwén.",
        exampleTranslation: "Saya belajar bahasa Mandarin.",
      },
      {
        hanzi: "字",
        pinyin: "zì",
        tone: "Nada 4",
        translation: "karakter / aksara",
        isEnrichment: true,
        inclusionReason: "Satuan morfem tunggal terkecil dalam penulisan bahasa Mandarin.",
        exampleHanzi: "这是一个字。",
        examplePinyin: "Zhè shì yí ge zì.",
        exampleTranslation: "Ini adalah satu karakter.",
      },
      {
        hanzi: "音节",
        pinyin: "yīnjié",
        tone: "Nada 1 + 2",
        translation: "suku kata fonetik",
        isEnrichment: true,
        inclusionReason: "Konsep dasar fonetik untuk memahami unit satu tarikan suara dalam pelafalan Pinyin.",
        exampleHanzi: "这是一个音节。",
        examplePinyin: "Zhè shì yí ge yīnjié.",
        exampleTranslation: "Ini adalah satu suku kata.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Pembedaan membaca Pīnyīn dengan ejaan abjad Bahasa Indonesia. Huruf Pinyin seperti 'c', 'q', 'x', dan 'zh' tidak dibaca seperti huruf abjad Indonesia.",
      tones:
        "Mandarin adalah bahasa tonal dengan 4 nada utama (Tinggi Datar 55, Naik 35, Turun-Naik 214, Turun Tajam 51) serta satu nada netral (pendek, ringan).",
      toneCombinations:
        "Kontur nada menentukan arti kata. Sebagai contoh: mā (ibu), má (rami), mǎ (kuda), mà (memarahi).",
      commonErrors:
        "Menganggap Pīnyīn dapat dibaca seperti ejaan Latin Bahasa Indonesia, atau mengabaikan tanda nada saat berbicara.",
      articulatoryTip:
        "Tautkan selalu bunyi audio dengan bentuk karakter Hanzi. Jangan hanya menghafal teks latin pinyin tanpa memperhatikan tanda nada.",
    },

    hanziComponents: [
      {
        hanzi: "汉",
        structure: "Kiri-Kanan",
        components: "氵 (tiga titik air) + 又 (tangan kanan)",
        strokeCount: 5,
        strokeOrderRules: ["Kiri sebelum kanan", "Titik atas sebelum bawah"],
        notes: "Bagian kiri 氵 melambangkan air (sungai Han), bagian kanan 又 melambangkan aksi tangan.",
      },
      {
        hanzi: "字",
        structure: "Atas-Bawah",
        components: "宀 (atap rumah) + 子 (anak)",
        strokeCount: 6,
        strokeOrderRules: ["Atas sebelum bawah", "Luar sebelum dalam"],
        notes: "Melambangkan anak yang belajar membaca dan menulis di bawah naungan atap rumah.",
      },
      {
        hanzi: "文",
        structure: "Tunggal",
        components: "文 (pola goresan / tulisan utuh)",
        strokeCount: 4,
        strokeOrderRules: ["Titik atas dulu", "Garis mendatar", "Miring kiri", "Miring kanan"],
        notes: "Piktograf kuno yang melambangkan goresan ornamen budaya, sastra, atau pola tulisan.",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Anatomi Satu Suku Kata: Inisial + Final + Nada",
        formula: "Suku Kata = Inisial (声母) + Final (韵母) + Nada (声调)",
        explanation:
          "Setiap suku kata Mandarin yang lengkap tersusun atas tiga komponen: konsonan pembuka (Inisial), vokal penutup/inti (Final), dan tinggi rendah suara (Nada). Tanda nada selalu ditempatkan di atas huruf vokal final.",
        example: "m (inisial) + a (final) + nada 3 (ˇ) = mǎ (马 - kuda)",
        positiveExamples: [
          { hanzi: "妈", pinyin: "mā", translation: "Inisial m + Final a + Nada 1 = ibu" },
          { hanzi: "麻", pinyin: "má", translation: "Inisial m + Final a + Nada 2 = rami" },
          { hanzi: "马", pinyin: "mǎ", translation: "Inisial m + Final a + Nada 3 = kuda" },
          { hanzi: "骂", pinyin: "mà", translation: "Inisial m + Final a + Nada 4 = memarahi" },
        ],
        usageConstraints:
          "Sebagian suku kata tidak memiliki inisial konsonan (disebut suku kata zero-initial seperti 'ài' atau 'ēn'), namun final vokal dan nada tetap wajib hadir.",
        commonErrors: "Menulis tanda nada di atas konsonan, atau menghilangkan tanda nada sama sekali.",
        communicativeFunction:
          "Memungkinkan pembelajar membedah setiap kata baru yang didengar menjadi komponen fonetik yang terukur.",
      },
      {
        ruleTitle: "Pembedaan Bahasa Lisan vs Tulisan (Hanzi Sederhana vs Tradisional)",
        formula: "Bahasa Lisan (Pīnyīn + Nada) ↔ Bahasa Tulisan (Karakter Hanzi)",
        explanation:
          "Mandarin memiliki ribuan karakter Hanzi dengan jumlah variasi bunyi suku kata yang terbatas, sehingga banyak kata berbunyi identik (homofon). Karena itu, karakter Hanzi wajib dipelajari agar arti kata tidak tertukar dalam komunikasi tertulis. Sistem aksara yang dipelajari pada KepoMandarin adalah Hanzi Sederhana (Simplified) standar resmi.",
        example: "shì dapat berarti '是' (adalah), '事' (urusan), atau '市' (pasar/kota).",
        usageConstraints: "Pinyin hanya bertindak sebagai jembatan pembantu lafal, bukan aksara pengganti Hanzi.",
        commonErrors: "Mengabaikan karakter Hanzi dan hanya mengandalkan hafalan teks latin Pinyin.",
        communicativeFunction:
          "Menanamkan kesadaran logografis bahwa makna kata Mandarin terikat erat pada bentuk karakter Hanzi.",
      },
    ],

    culturalNotes:
      "Karakter Hanzi telah digunakan selama lebih dari 3.000 tahun dan merupakan salah satu sistem tulisan tertua di dunia yang masih aktif digunakan tanpa terputus. Bermula dari guratan piktograf pada tempurung kura-kura (Jiǎgǔwén), karakter Hanzi berevolusi menjadi seni kaligrafi dan sistem komunikasi kaya makna yang menghubungkan ratusan juta penutur di berbagai belahan dunia.",

    listeningActivity: {
      goal: "Mengenali kontur nada ke-3 dan menguraikan komponen suku kata 'mǎ' (马) dari pendengaran audio.",
      audioText: "mǎ",
      pinyin: "mǎ",
      translation: "kuda (nada ketiga)",
      gistQuestion: {
        question: "Dengarkan audio kata 'ma' berikut. Berdasarkan kontur pitch suaranya, nada berapakah yang dilafalkan?",
        options: [
          "Nada 1 (Tinggi Datar 55)",
          "Nada 2 (Naik Tajam 35)",
          "Nada 3 (Turun-Naik Rendah 214)",
          "Nada 4 (Jatuh Tegas 51)",
        ],
        correctAnswer: "Nada 3 (Turun-Naik Rendah 214)",
        explanation: "Kata 'mǎ' dilafalkan dengan nada ke-3 yang bersuara rendah lalu melengkung sedikit naik.",
      },
      detailQuestion: {
        question: "Bagaimanakah penguraian inisial dan final yang tepat untuk suku kata 'mǎ'?",
        options: [
          "Inisial: m, Final: a, Nada: ke-3",
          "Inisial: ma, Final: tidak ada, Nada: ke-1",
          "Inisial: a, Final: m, Nada: ke-3",
          "Inisial: m, Final: ar, Nada: ke-4",
        ],
        correctAnswer: "Inisial: m, Final: a, Nada: ke-3",
        explanation: "Suku kata 'mǎ' tersusun atas konsonan inisial 'm', vokal final 'a', dan tanda nada ke-3.",
      },
    },

    speakingActivity: {
      prompt: "Lafalkan rangkaian empat nada dari suku kata 'ma': 'mā', 'má', 'mǎ', 'mà' dengan stabil dan kontur yang jelas.",
      vocabularySupport: ["mā (ibu)", "má (rami)", "mǎ (kuda)", "mà (memarahi)"],
      evaluationRubric: "Perhatikan nada 1 datar tinggi, nada 2 mendaki, nada 3 turun rendah di tenggorokan, dan nada 4 jatuh pendek tegas.",
    },

    readingActivity: {
      textHanzi: "汉字不是字母。学中文要学汉字、拼音和声调。",
      textPinyin: "Hànzì bú shì zìmǔ. Xué Zhōngwén yào xué hànzì, pīnyīn hé shēngdiào.",
      textTranslation: "Hanzi bukan alfabet. Belajar bahasa Mandarin harus mempelajari karakter Hanzi, Pinyin, dan nada.",
      mainIdea: "Tiga pilar utama dalam mempelajari bahasa Mandarin adalah Hanzi, Pinyin, dan Nada.",
      questions: [
        {
          question: "Mengapa kita tidak bisa menyamakan karakter Hanzi dengan abjad alfabet?",
          options: [
            "Karena Hanzi adalah karakter logografis bermakna, bukan kumpulan huruf fonem alfabetis.",
            "Karena Hanzi hanya terdiri dari angka.",
            "Karena Hanzi tidak dapat dilafalkan secara lisan.",
            "Karena Hanzi hanya digunakan pada zaman kuno.",
          ],
          correctAnswer: "Karena Hanzi adalah karakter logografis bermakna, bukan kumpulan huruf fonem alfabetis.",
          explanation: "Hanzi merepresentasikan morfem dan makna secara langsung dalam satu blok aksara, berbeda dengan abjad Latin yang hanya mencatat bunyi fonem.",
        },
      ],
    },

    writingActivity: {
      prompt: "Salin karakter dasar '汉' (Hàn) dan '字' (zì) pada buku catatan dengan memperhatikan urutan goresan yang runtut.",
      minimumCharacters: 2,
      checklist: [
        "Tulis radikal air 氵 di sebelah kiri sebelum menulis 又 di sebelah kanan pada karakter 汉.",
        "Tulis radikal atap 宀 di bagian atas sebelum menulis 子 di bagian bawah pada karakter 字.",
      ],
      modelAnswer: {
        hanzi: "汉字",
        pinyin: "hànzì",
        translation: "karakter Han / aksara Mandarin",
      },
    },

    personalizationPrompt:
      "Tuliskan nama panggilanmu dalam ejaan suku kata pinyin terdekat atau buat satu catatan pengingat tentang motivasimu belajar bahasa Mandarin.",
    errorJournalHooks: [
      "Tertukar membaca huruf Pīnyīn dengan cara membaca ejaan bahasa Indonesia",
      "Lupa mencantumkan tanda nada pada penulisan suku kata pinyin",
      "Mengira Pīnyīn adalah aksara resmi Mandarin yang menggantikan karakter Hanzi",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna memahami hakikat bahasa Mandarin dan mampu membedah satu suku kata seperti 'mǎ' menjadi inisial 'm', final 'a', dan nada ke-3.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Tinjau kembali materi Kaidah Anatomi Suku Kata dan latih pendengaran pada contoh audio 4 nada dasar.",
    },
  },

  // -------------------------------------------------------------
  // F-02: Initials: Kelompok Dasar (b p m f, d t n l, g k h)
  // -------------------------------------------------------------
  {
    id: "fund-02",
    moduleId: "fundamentals",
    slug: "02",
    unitNumber: 2,
    title: "Initials: Kelompok Dasar",
    hanzi: "基础声母",
    pinyin: "Jīchǔ Shēngmǔ",
    translation: "Inisial Dasar: b p m f, d t n l, g k h & Letupan Aspirasi",
    objectives:
      "Menguasai artikulasi kelompok konsonan inisial dasar (b p m f, d t n l, g k h), membedakan letupan udara berhembus (aspirasi) pada p, t, k vs tanpa hembusan b, d, g, serta membedakan konsonan n vs l dan bunyi h tenggorokan.",
    overview:
      "Konsonan inisial Mandarin terbagi tegas oleh ada tidaknya hembusan udara (aspirasi). Pembedaan antara b/p, d/t, dan g/k bukan karena pita suara bergetar keras atau lembut, melainkan karena letupan semburan udara dari rongga mulut. Menguasai kontras ini adalah kunci artikulasi jelas dan tidak tertukar.",
    vocabCount: 11,
    durationMinutes: 15,
    levelBadge: "FONDASI 02",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["fund-01"],
    skills: ["Pelafalan Konsonan", "Pembedaan Aspirasi", "Pasangan Minimal Fonetik"],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "Guru Wang (Pengajar) & Budi (Murid)",
      location: "Laboratorium Fonetik KepoMandarin",
      goal: "Menguji kepekaan hembusan udara (aspirasi) menggunakan kertas tisu di depan mulut pada pasangan minimal 'bā' vs 'pà'.",
      scenarioNotes:
        "Budi memegang selembar kertas tisu tipis di depan bibirnya untuk merasakan perbedaan letupan udara saat melafalkan konsonan b vs p.",
    },

    dialogue: [
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "请把纸巾放在嘴唇前面，听我读：八 (bā) 和 怕 (pà)。",
        pinyin: "Qǐng bǎ zhǐjīn fàng zài zuǐchún qiánmiàn, tīng wǒ dú: bā hé pà.",
        translation:
          "Tolong letakkan kertas tisu di depan bibir, dengarkan saya melafalkan: bā (delapan) dan pà (takut).",
      },
      {
        speaker: "Budi",
        role: "Murid",
        hanzi: "老师，读 'pà' 的时候，纸巾动得很厉害！",
        pinyin: "Lǎoshī, dú 'pà' de shíhou, zhǐjīn dòng de hěn lìhai!",
        translation: "Guru, saat melafalkan 'pà', kertas tisunya bergerak sangat kuat!",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "对！‘p’ 是送气音，气流很强；‘b’ 是不送气音，纸巾不能动。",
        pinyin: "Duì! ‘p’ shì sòngqìyīn, qìliú hěn qiáng; ‘b’ shì bú sòngqìyīn, zhǐjīn bù néng dòng.",
        translation:
          "Benar! 'p' adalah konsonan aspirasi (berhembus kuat); 'b' adalah non-aspirasi, kertas tidak boleh bergerak.",
      },
      {
        speaker: "Budi",
        role: "Murid",
        hanzi: "我懂了，‘d/t’ 和 ‘g/k’ 也是同样的道理吧？",
        pinyin: "Wǒ dǒng le, ‘d/t’ hé ‘g/k’ yě shì tóngyàng de dàolǐ ba?",
        translation: "Saya mengerti, pasangan 'd/t' dan 'g/k' juga mengikuti prinsip yang sama kan?",
      },
    ],

    vocabulary: FUNDAMENTAL_INITIALS.slice(0, 11).map((init) => ({
      hanzi: init.exampleHanzi,
      pinyin: init.examplePinyin,
      tone: init.category,
      translation: init.exampleTranslation,
      partOfSpeech: "konsonan inisial",
      usageNotes: init.articulationTip,
      exampleHanzi: `Konsonan [${init.letter}]`,
      examplePinyin: init.articulationTip,
      exampleTranslation: `Contoh kata: ${init.exampleHanzi} (${init.examplePinyin}) : ${init.exampleTranslation}`,
    })),

    enrichmentVocabulary: [
      {
        hanzi: "送气",
        pinyin: "sòngqì",
        tone: "Nada 4 + 4",
        translation: "aspirasi (hembusan udara kuat)",
        isEnrichment: true,
        inclusionReason: "Istilah fonetik utama untuk konsonan yang disertai semburan udara kuat.",
        exampleHanzi: "‘p’ 是送气音。",
        examplePinyin: "‘p’ shì sòngqìyīn.",
        exampleTranslation: "'p' adalah bunyi konsonan aspirasi.",
      },
      {
        hanzi: "不送气",
        pinyin: "bú sòngqì",
        tone: "Nada 2 + 4 + 4",
        translation: "non-aspirasi (tanpa hembusan udara)",
        isEnrichment: true,
        inclusionReason: "Istilah fonetik untuk konsonan lembut tanpa semburan udara.",
        exampleHanzi: "‘b’ 是不送气音。",
        examplePinyin: "‘b’ shì bú sòngqìyīn.",
        exampleTranslation: "'b' adalah bunyi konsonan non-aspirasi.",
      },
      {
        hanzi: "口",
        pinyin: "kǒu",
        tone: "Nada 3",
        translation: "mulut / bibir artikulasi",
        isEnrichment: true,
        inclusionReason: "Organ artikulasi utama untuk melatih penutupan dan pelepasan konsonan bibir b p m f.",
        exampleHanzi: "张开口。",
        examplePinyin: "Zhāng kāi kǒu.",
        exampleTranslation: "Buka mulut.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Pembedaan letupan semburan udara (aspirasi) pada pasangan: b vs p, d vs t, g vs k. Konsonan 'p', 't', dan 'k' wajib diucapkan dengan hembusan angin yang jelas.",
      tones:
        "Konsonan inisial tidak memiliki nada sendiri, melainkan digabungkan dengan vokal dan nada untuk membentuk satu suku kata utuh (misal: b + à = bà).",
      toneCombinations:
        "Pasangan minimal: bā (8) vs pà (takut), dǎ (memukul) vs tǎ (pagoda), gē (kakak) vs kē (butir).",
      commonErrors:
        "Menyamakan konsonan Mandarin dengan huruf Indonesia di mana 'b' disangka bersuara tebal padahal dalam Mandarin 'b' tidak bersuara (voiceless un-aspirated), mirip 'p' lembut tanpa hembusan.",
      articulatoryTip:
        "Lakukan tes kertas tisu: letakkan tisu 5 cm di depan bibir. Huruf 'p', 't', 'k' harus membuat tisu terhempas, sedangkan 'b', 'd', 'g' tisu harus tetap diam.",
    },

    hanziComponents: [
      {
        hanzi: "八",
        structure: "Tunggal",
        components: "八 (dua goresan terpisah)",
        strokeCount: 2,
        strokeOrderRules: ["Miring kiri (撇) dulu", "Miring kanan (捺) kemudian"],
        notes: "Piktograf dua garis yang terpisah, melambangkan pembagian atau angka 8 (bā).",
      },
      {
        hanzi: "大",
        structure: "Tunggal",
        components: "大 (sosok manusia merentangkan tangan)",
        strokeCount: 3,
        strokeOrderRules: ["Garis mendatar (横)", "Miring kiri (撇)", "Miring kanan (捺)"],
        notes: "Piktograf sosok manusia yang merentangkan kedua tangan dan kaki selebar mungkin (dà).",
      },
      {
        hanzi: "口",
        structure: "Tunggal",
        components: "口 (bingkai rongga mulut)",
        strokeCount: 3,
        strokeOrderRules: ["Garis tegak kiri", "Sudut mendatar-tegak", "Tutup bawah"],
        notes: "Piktograf rongga mulut terbuka; radikal dasar untuk kata-kata terkait suara dan makan (kǒu).",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Kaidah Pasangan Aspirasi vs Non-Aspirasi (b/p, d/t, g/k)",
        formula: "Non-Aspirasi (b, d, g) vs Aspirasi Kuat (p, t, k)",
        explanation:
          "Di dalam bahasa Mandarin, pasangan konsonan ini tidak dibedakan oleh pita suara (voiced vs voiceless) melainkan oleh semburan udara. Baik 'b' maupun 'p' sama-sama pita suaranya rileks, perbedaannya murni pada letupan udara yang kuat pada 'p'.",
        example: "bàba (爸爸 - ayah, lembut) vs pà (怕 - takut, berhembus kuat).",
        positiveExamples: [
          { hanzi: "八", pinyin: "bā", translation: "b tanpa hembusan = delapan" },
          { hanzi: "怕", pinyin: "pà", translation: "p berhembus kuat = takut" },
          { hanzi: "大", pinyin: "dà", translation: "d tanpa hembusan = besar" },
          { hanzi: "他", pinyin: "tā", translation: "t berhembus kuat = dia" },
        ],
        usageConstraints:
          "Jangan melafalkan 'b' seperti 'b' berat bahasa Indonesia yang menggetarkan pita suara sejak awal bibir tertutup.",
        commonErrors:
          "Salah menangkap kata karena hembusan udara kurang, misal pendengar mengira 'bà' padahal yang dimaksud adalah 'pà'.",
        communicativeFunction:
          "Membantu pembicara membedakan makna kata yang berbunyi mirip melalui kejernihan hembusan artikulasi.",
      },
      {
        ruleTitle: "Pembedaan Konsonan Hidung 'n' vs Samping 'l' & Bunyi Tenggorokan 'h'",
        formula: "n (aliran udara hidung) vs l (aliran udara samping lidah) | h (desahan tenggorokan rileks)",
        explanation:
          "Bagi beberapa penutur daerah di Indonesia, 'n' dan 'l' kerap tertukar. Pastikan saat melafalkan 'n', udara mengalir lewat hidung (jepit hidung akan terasa bergetar). Saat melafalkan 'l', udara mengalir bebas lewat kedua sisi lidah. Bunyi 'h' Mandarin dilafalkan lembut di pangkal tenggorokan, mirip saat kita meniupkan hawa hangat ke kaca kacamata.",
        example: "nǐ (你 - kamu) vs lǐ (里 - di dalam); hǎo (好 - baik).",
        positiveExamples: [
          { hanzi: "你", pinyin: "nǐ", translation: "n aliran hidung = kamu" },
          { hanzi: "李", pinyin: "lǐ", translation: "l aliran samping lidah = marga Li" },
          { hanzi: "好", pinyin: "hǎo", translation: "h tenggorokan rileks = baik" },
        ],
        usageConstraints: "Hindari melafalkan 'h' terlalu keras seperti mengorok di pangkal tenggorokan.",
        commonErrors: "Menyamakan 'n' dengan 'l' sehingga 'nǐ' (kamu) terdengar seperti 'lǐ' (di dalam).",
        communicativeFunction:
          "Menghindari kerancuan sapaan dasar dan memastikan pelafalan kata sehari-hari tepat.",
      },
    ],

    culturalNotes:
      "Dalam seni pertunjukan tradisional Tiongkok seperti opera Beijing dan seni bercerita Kuaiban (快板), pelafalan konsonan inisial berhembus (p, t, k) dilatih dengan sangat ketat agar kata-kata dapat terdengar tajam dan jelas hingga baris penonton paling belakang tanpa mikrofon. Latihan tes hembusan kertas tisu adalah metode klasik yang digunakan di seluruh akademi bahasa Mandarin.",

    listeningActivity: {
      goal: "Membedakan bunyi konsonan inisial berhembus (p) dan tidak berhembus (b) melalui pasangan minimal.",
      audioText: "pà",
      pinyin: "pà",
      translation: "takut (aspirasi kuat)",
      gistQuestion: {
        question:
          "Dengarkan audio kata berikut. Apakah inisial yang diucapkan memiliki hembusan udara kuat (aspirasi)?",
        options: [
          "Ya, konsonan berhembus kuat (Aspirasi / p)",
          "Tidak, konsonan lembut tanpa hembusan (Non-aspirasi / b)",
        ],
        correctAnswer: "Ya, konsonan berhembus kuat (Aspirasi / p)",
        explanation: "Kata 'pà' (怕) dilafalkan dengan letupan semburan udara yang kuat dari kedua bibir.",
      },
      detailQuestion: {
        question: "Manakah suku kata yang dilafalkan pada rekaman audio tersebut?",
        options: ["pà (怕 - takut)", "bà (爸 - ayah)", "dà (大 - besar)", "mǎ (马 - kuda)"],
        correctAnswer: "pà (怕 - takut)",
        explanation:
          "Audio melafalkan konsonan bibir berhembus 'p' dipadu vokal 'a' bernada 4: pà (怕 - takut).",
      },
    },

    speakingActivity: {
      prompt:
        "Pegang telapak tangan atau selembar kertas di depan bibirmu. Ucapkan pasangan 'bā - pà', 'dā - tā', dan 'gē - kē'. Rasakan hembusan udara hanya pada kata kedua.",
      vocabularySupport: ["bā (八 - 8)", "pà (怕 - takut)", "dà (大 - besar)", "tā (他 - dia)"],
      evaluationRubric:
        "Pastikan kertas tidak bergerak saat melafalkan b, d, g; dan bergerak kuat saat melafalkan p, t, k.",
    },

    readingActivity: {
      textHanzi: "他怕大狗。爸爸买八个苹果。",
      textPinyin: "Tā pà dà gǒu. Bàba mǎi bā ge píngguǒ.",
      textTranslation: "Dia takut anjing besar. Ayah membeli delapan buah apel.",
      mainIdea:
        "Kalimat ini melatih kombinasi konsonan inisial dasar b, p, d, t, g, k dalam konteks kalimat bermakna utuh.",
      questions: [
        {
          question:
            "Pada kalimat '他怕大狗', konsonan apa sajakah yang mengawali kata 'tā' dan 'pà'?",
          options: [
            "Konsonan aspirasi berhembus kuat: t dan p",
            "Konsonan tanpa hembusan: d dan b",
            "Konsonan sengau hidung: n dan m",
            "Konsonan tenggorokan: h dan k",
          ],
          correctAnswer: "Konsonan aspirasi berhembus kuat: t dan p",
          explanation:
            "Kata 'tā' diawali inisial 't' dan 'pà' diawali inisial 'p', keduanya merupakan konsonan aspirasi berhembus kuat.",
        },
      ],
    },

    writingActivity: {
      prompt: "Tulis karakter dasar '八' (bā - delapan) dan '大' (dà - besar) sesuai urutan goresan.",
      minimumCharacters: 2,
      checklist: [
        "Tulis goresan miring kiri (撇 Piě) terlebih dahulu sebelum miring kanan (捺 Nà) pada karakter 八.",
        "Tulis garis mendatar (横 Héng) dulu, kemudian miring kiri (撇 Piě), lalu miring kanan (捺 Nà) pada karakter 大.",
      ],
      modelAnswer: {
        hanzi: "八大",
        pinyin: "bā dà",
        translation: "delapan besar",
      },
    },

    personalizationPrompt:
      "Uji pelafalanmu sendiri dengan tes kertas tisu di depan cermin, lalu catat konsonan inisial dasar mana yang terasa paling menantang bagimu.",
    errorJournalHooks: [
      "Tertukar membedakan konsonan b dan p karena kurangnya hembusan udara",
      "Tertukar membedakan konsonan d dan t",
      "Tertukar membedakan konsonan n dan l",
      "Melafalkan 'b' terlalu berat dengan getaran pita suara berlebih seperti bahasa Indonesia",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna mampu membedakan pasangan minimal konsonan aspirasi (p, t, k) vs non-aspirasi (b, d, g) secara konsisten baik saat menyimak audio maupun saat produksi lisan.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Lakukan kembali tes kertas tisu di depan mulut dan dengarkan ulang audio pasangan minimal b/p dan d/t.",
    },
  },

  // -------------------------------------------------------------
  // F-03: Initials: Kelompok Sulit (j q x, zh ch sh r, z c s)
  // -------------------------------------------------------------
  {
    id: "fund-03",
    moduleId: "fundamentals",
    slug: "03",
    unitNumber: 3,
    title: "Initials: Kelompok Sulit",
    hanzi: "难点声母",
    pinyin: "Nándiǎn Shēngmǔ",
    translation: "Konsonan Lanjutan: Bunyi j q x, zh ch sh r, dan z c s",
    objectives:
      "Membedakan 3 kelompok konsonan Mandarin: bunyi lidah terangkat (zh ch sh r), bunyi gigi datar (z c s), dan bunyi lidah halus (j q x); serta melatih pelafalan konsonan q, x, zh, dan r dengan santai dan tepat.",
    overview:
      "Banyak pemula merasa konsonan zh, ch, sh, dan r terdengar mirip dengan z, c, dan s. Di unit ini, kamu akan mempelajari cara mudah menempatkan lidah: kapan lidah sedikit diangkat ke atas, dan kapan lidah tetap lurus mendatar di gigi depan.",
    vocabCount: 10,
    durationMinutes: 16,
    levelBadge: "FONDASI 03",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["fund-02"],
    skills: [
      "Konsonan Lidah Terangkat (zh ch sh r)",
      "Konsonan Gigi Datar (z c s)",
      "Konsonan Lidah Halus (j q x)",
      "Membedakan Bunyi Mirip",
    ],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "Guru Wang (Pengajar) & Siti (Murid)",
      location: "Klinik Artikulasi KepoMandarin",
      goal: "Membedakan bunyi lidah terangkat 'zhī' (知) dengan bunyi gigi datar 'zī' (资), serta melatih hembusan angin pada kata 'chá' (茶).",
      scenarioNotes:
        "Siti merasa lidahnya kaku saat berganti dari bunyi lidah melengkung ke lidah mendatar, lalu menanyakan tips posisi lidah yang rileks.",
    },

    dialogue: [
      {
        speaker: "Siti",
        role: "Murid",
        hanzi: "老师，为什么 ‘zhī’ 和 ‘zī’ 听起来这么像？",
        pinyin: "Lǎoshī, wèishénme ‘zhī’ hé ‘zī’ tīngqǐlái zhème xiàng?",
        translation: "Guru, mengapa 'zhī' dan 'zī' terdengar begitu mirip?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "秘密在舌尖的位置。读 ‘zhī’ 时，舌尖向上卷起；读 ‘zī’ 时，舌尖放平抵住下齿背。",
        pinyin:
          "Mìmì zài shéjiān de wèizhi. Dú ‘zhī’ shí, shéjiān xiàng shàng juǎnqǐ; dú ‘zī’ shí, shéjiān fàng píng dǐzhù xiàchǐbèi.",
        translation:
          "Rahasianya ada pada posisi ujung lidah. Saat membaca 'zhī', ujung lidah melengkung ke atas; saat membaca 'zī', lidah datar menyentuh belakang gigi bawah.",
      },
      {
        speaker: "Siti",
        role: "Murid",
        hanzi: "那 ‘ch’ 呢？比如喝茶的 ‘chá’？",
        pinyin: "Nà ‘ch’ ne? Bǐrú hē chá de ‘chá’?",
        translation: "Lalu bagaimana dengan 'ch'? Misalnya kata 'chá' pada minum teh?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "‘ch’ 位置和 ‘zh’ 一样卷舌，但要用力吹出一股强气流！",
        pinyin: "‘ch’ wèizhi hé ‘zh’ yíyàng juǎnshé, dàn yào yònglì chuī chū yì gǔ qiáng qìliú!",
        translation:
          "Posisi lidah 'ch' sama-sama digulung seperti 'zh', tetapi harus meniupkan hembusan udara yang sangat kuat!",
      },
    ],

    vocabulary: FUNDAMENTAL_INITIALS.slice(11).map((init) => ({
      hanzi: init.exampleHanzi,
      pinyin: init.examplePinyin,
      tone: init.category,
      translation: init.exampleTranslation,
      partOfSpeech: "konsonan inisial",
      usageNotes: init.articulationTip,
      exampleHanzi: `Konsonan [${init.letter}]`,
      examplePinyin: init.articulationTip,
      exampleTranslation: `Contoh kata: ${init.exampleHanzi} (${init.examplePinyin}) : ${init.exampleTranslation}`,
    })),

    enrichmentVocabulary: [
      {
        hanzi: "翘舌音",
        pinyin: "qiàoshéyīn",
        tone: "Nada 4 + 2 + 1",
        translation: "konsonan lidah melengkung ke atas (zh, ch, sh, r)",
        isEnrichment: true,
        inclusionReason: "Istilah fonetik resmi untuk kelompok konsonan zh, ch, sh, r.",
        exampleHanzi: "‘zh’ 是翘舌音。",
        examplePinyin: "‘zh’ shì qiàoshéyīn.",
        exampleTranslation: "'zh' adalah konsonan dengan lidah melengkung ke atas.",
      },
      {
        hanzi: "平舌音",
        pinyin: "píngshéyīn",
        tone: "Nada 2 + 2 + 1",
        translation: "konsonan dental datar (lidah menyentuh gigi bawah)",
        isEnrichment: true,
        inclusionReason: "Istilah fonetik resmi untuk kelompok konsonan z, c, s.",
        exampleHanzi: "‘z’ 是平舌音。",
        examplePinyin: "‘z’ shì píngshéyīn.",
        exampleTranslation: "'z' adalah konsonan dental datar.",
      },
      {
        hanzi: "舌尖",
        pinyin: "shéjiān",
        tone: "Nada 2 + 1",
        translation: "ujung lidah",
        isEnrichment: true,
        inclusionReason: "Kunci utama untuk membedakan bunyi lidah terangkat (zh) dengan gigi datar (z).",
        exampleHanzi: "抬起舌尖。",
        examplePinyin: "Tái qǐ shéjiān.",
        exampleTranslation: "Angkat ujung lidah.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Pembedaan 3 kelompok bunyi: 1) j q x (lidah mendatar di langit-langit depan), 2) zh ch sh r (ujung lidah diangkat sedikit ke atas), 3) z c s (ujung lidah lurus di belakang gigi depan).",
      tones:
        "Vokal penyerta '-i' pada z, c, s dan zh, ch, sh, r tidak dibaca /i/ melainkan vokal dengung khusus (apical vowel). Misal: sì dibaca /sz/, bukan /si/.",
      toneCombinations:
        "Pasangan minimal kontras: zhī (知) vs zī (资), shī (诗) vs sī (丝), chī (吃) vs cī (呲).",
      commonErrors:
        "Kesalahan penutur Indonesia: (1) Membaca 'q' seperti huruf Q Indonesia, (2) Membaca 'x' seperti /ks/, (3) Tidak menggulung lidah pada zh, (4) Menggetarkan r seperti r getar Indonesia (r Mandarin mirip r bahasa Inggris Amerika dengan getaran pita suara stabil).",
      articulatoryTip:
        "Untuk melatih 'zh ch sh', sentuhkan ujung lidah ke langit-langit keras di belakang gusi atas, lalu tarik sedikit ke belakang sambil menghembuskan suara.",
    },

    hanziComponents: [
      {
        hanzi: "七",
        structure: "Tunggal",
        components: "七 (dua goresan kait bersilang)",
        strokeCount: 2,
        strokeOrderRules: ["Garis mendatar miring (横)", "Garis tegak lengkung kait (竖弯钩)"],
        notes: "Karakter dasar angka 7 yang melambangkan inisial palatal berhembus q (qī).",
      },
      {
        hanzi: "日",
        structure: "Tunggal",
        components: "日 (piktograf matahari)",
        strokeCount: 4,
        strokeOrderRules: ["Garis tegak kiri", "Sudut mendatar-tegak", "Garis tengah", "Tutup bawah"],
        notes: "Piktograf matahari; melambangkan konsonan r (rì) dengan lidah sedikit melengkung ke atas.",
      },
      {
        hanzi: "四",
        structure: "Mengelilingi",
        components: "囗 (bingkai luar) + 儿 (kaki anak)",
        strokeCount: 5,
        strokeOrderRules: ["Luar sebelum dalam", "Tutup bingkai paling akhir"],
        notes: "Karakter struktur mengelilingi yang melambangkan inisial dental datar s (sì).",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Posisi Lidah: Konsonan Lidah Terangkat (zh ch sh r) vs Gigi Datar (z c s)",
        formula:
          "zh ch sh r (ujung lidah melengkung ke atas) vs z c s (lidah datar di belakang gigi)",
        explanation:
          "Kunci pembeda adalah kelengkungan lidah. Pada zh, ch, sh, r, ujung lidah terangkat ke langit-langit mulut bagian tengah. Pada z, c, s, seluruh permukaan lidah mendatar rata menempel di belakang gigi depan bawah. Menukar kedua posisi ini akan mengubah arti kata secara fatal.",
        example:
          "shí (十 - sepuluh) vs sì (四 - empat); zhǔ (主 - tuan) vs zǔ (祖 - leluhur).",
        positiveExamples: [
          { hanzi: "知", pinyin: "zhī", translation: "zh lidah tergulung ke atas = tahu/mengerti" },
          { hanzi: "资", pinyin: "zī", translation: "z lidah datar di belakang gigi = modal/biaya" },
          { hanzi: "茶", pinyin: "chá", translation: "ch lidah tergulung + hembusan udara kuat = teh" },
          { hanzi: "词", pinyin: "cí", translation: "c lidah datar + hembusan udara kuat = kata/kosakata" },
        ],
        usageConstraints:
          "Rahang tetap santai saat beralih antara bunyi zh/ch/sh dan z/c/s; cukup gerakkan ujung lidah.",
        commonErrors:
          "Mengucapkan 'zh' seperti 'z' sehingga kata 'zhī dào' (tahu) terdengar seperti 'zī dào'.",
        communicativeFunction:
          "Mencegah kesalahpahaman fatal pada angka dan kosakata sehari-hari (misal: shí sepuluh vs sì empat).",
      },
      {
        ruleTitle: "Artikulasi Konsonan Palatal 'j, q, x' & Pembedaan Aspirasi 'q' vs 'ch'",
        formula: "j (lembut) | q (letupan desis kuat) | x (gesekan desis halus)",
        explanation:
          "Kelompok j, q, x dilafalkan dengan merapatkan bagian depan daun lidah ke langit-langit keras. Huruf 'q' bukan q Indonesia, melainkan letupan desis tajam dengan lidah melebar. Huruf 'x' berbunyi desisan halus mirip huruf 's' tipis dengan lidah melebar.",
        example: "qī (七 - tujuh), xièxie (谢谢 - terima kasih), jī (鸡 - ayam).",
        positiveExamples: [
          { hanzi: "七", pinyin: "qī", translation: "q desisan tajam lidah melebar = tujuh" },
          { hanzi: "西", pinyin: "xī", translation: "x desisan halus = barat" },
          { hanzi: "日", pinyin: "rì", translation: "r getar pita suara lidah melengkung = hari/matahari" },
        ],
        usageConstraints:
          "Huruf 'j, q, x' hanya dapat bergabung dengan vokal 'i' dan 'ü'; tidak pernah bergabung dengan 'a', 'o', 'u' murni tanpa peluncur 'i'.",
        commonErrors:
          "Membaca 'qī' seperti 'ki' atau 'kwi', dan membaca 'xiè' seperti 'kse'.",
        communicativeFunction:
          "Memastikan pelafalan salam dan sapaan sopan seperti 'xièxie' dan 'qǐng' terdengar fasih dan alami.",
      },
    ],

    culturalNotes:
      "Pembedaan bunyi lidah terangkat (zh, ch, sh) dan bunyi gigi datar (z, c, s) adalah ciri khas pelafalan standar. Dengan melatih posisi lidah sejak awal, artikulasi Mandarin-mu akan terdengar bersih dan mudah dipahami lawan bicara.",

    listeningActivity: {
      goal: "Membedakan bunyi lidah terangkat (zh) dan gigi datar (z) melalui rekaman audio.",
      audioText: "zhī",
      pinyin: "zhī",
      translation: "tahu / mengetahui (lidah terangkat)",
      gistQuestion: {
        question:
          "Dengarkan audio berikut. Apakah konsonan yang diucapkan termasuk bunyi lidah terangkat (zh) atau gigi datar (z)?",
        options: [
          "Bunyi lidah terangkat ke atas (zhī)",
          "Dental lidah datar di belakang gigi (zī)",
        ],
        correctAnswer: "Bunyi lidah terangkat ke atas (zhī)",
        explanation:
          "Audio melafalkan kata 'zhī' (知) dengan ujung lidah melengkung ke atas menyentuh langit-langit keras.",
      },
      detailQuestion: {
        question: "Manakah pasangan kata yang memiliki arti 'tahu' dan 'teh'?",
        options: [
          "zhī (知 - tahu) dan chá (茶 - teh)",
          "zī (资 - modal) dan cá (tidak ada)",
          "jī (鸡 - ayam) dan qī (七 - tujuh)",
          "shū (书 - buku) dan sū (苏 - bangkit)",
        ],
        correctAnswer: "zhī (知 - tahu) dan chá (茶 - teh)",
        explanation:
          "Kata 'zhī' (知) diawali konsonan lidah terangkat zh, dan 'chá' (茶) diawali konsonan lidah terangkat berhembus ch.",
      },
    },

    speakingActivity: {
      prompt:
        "Lafalkan pasangan kontras berikut secara bergantian sambil merasakan perpindahan posisi ujung lidah: (1) zhī - zī, (2) chī - cī, (3) shī - sī, (4) rì - zì.",
      vocabularySupport: [
        "zhī (知)",
        "zī (资)",
        "chá (茶)",
        "cí (词)",
        "shū (书)",
        "sì (四)",
      ],
      evaluationRubric:
        "Pastikan lidah melengkung ke atas pada kata pertama, dan lidah kembali mendatar pada kata kedua.",
    },

    readingActivity: {
      textHanzi: "十四是十四，四十是四十。四不是十，十不是四。",
      textPinyin:
        "Shísì shì shísì, sìshí shì sìshí. Sì bú shì shí, shí bú shì sì.",
      textTranslation:
        "Empat belas adalah empat belas, empat puluh adalah empat puluh. Empat bukan sepuluh, sepuluh bukan empat.",
      mainIdea:
        "Permainan kata klasik (Ràokǒulìng) untuk melatih kelancaran membedakan angka 10 ('shí', lidah terangkat) dan angka 4 ('sì', lidah datar).",
      questions: [
        {
          question:
            "Apa tujuan utama melatih rima klasik '十四是十四，四十是四十'?",
          options: [
            "Melatih lidah membedakan bunyi 'sh' pada angka 10 (shí) dengan bunyi 's' pada angka 4 (sì).",
            "Menghafal rumus matematika kuno Tiongkok.",
            "Melatih suara nyanyian opera.",
            "Menghafal nama-nama musim di Tiongkok.",
          ],
          correctAnswer:
            "Melatih lidah membedakan bunyi 'sh' pada angka 10 (shí) dengan bunyi 's' pada angka 4 (sì).",
          explanation:
            "Rima ini adalah latihan paling efektif agar tidak tertukar antara 'shí' (10) dan 'sì' (4).",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tulis karakter '七' (qī - tujuh), '日' (rì - hari/matahari), dan '四' (sì - empat) sesuai kaidah goresan yang benar.",
      minimumCharacters: 3,
      checklist: [
        "Tulis goresan mendatar-miring (横 Héng) dulu sebelum garis tegak lengkung kait pada karakter 七.",
        "Tulis garis tegak kiri, lalu sudut mendatar-tegak, garis tengah, dan tutup bawah pada karakter 日.",
        "Tulis bingkai luar kiri, bingkai sudut atas-kanan, komponen dalam 儿, lalu tutup bawah pada karakter 四.",
      ],
      modelAnswer: {
        hanzi: "七日四",
        pinyin: "qī rì sì",
        translation: "tujuh hari empat",
      },
    },

    personalizationPrompt:
      "Coba rekam dirimu membaca kalimat '十四是十四，四十是四十' sebanyak 3 kali tanpa terbelit lidah.",
    errorJournalHooks: [
      "Membaca 'q' seperti huruf Q Indonesia (misal: qī dibaca seperti ki)",
      "Membaca 'x' seperti /ks/ (misal: xièxie dibaca ksekse)",
      "Lupa mengangkat ujung lidah pada konsonan zh, ch, sh",
      "Menggetarkan konsonan 'r' berlebihan seperti huruf R getar bahasa Indonesia",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna mampu membedakan dan melafalkan kelompok konsonan zh, ch, sh, r dan z, c, s dengan posisi lidah yang tepat.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Latih kembali rima artikulasi '十四是十四，四十是四十' secara perlahan sambil memperhatikan posisi ujung lidah di depan cermin.",
    },
  },

  // -------------------------------------------------------------
  // F-04: Finals Tunggal dan Gabungan (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "fund-04",
    moduleId: "fundamentals",
    slug: "04",
    unitNumber: 4,
    title: "Finals Tunggal & Gabungan",
    hanzi: "单复韵母",
    pinyin: "Dān-Fù Yùnmǔ",
    translation: "Vokal Tunggal a o e i u ü & Vokal Majemuk ai ei ao ou ia ie ua uo üe",
    objectives:
      "Menguasai artikulasi 6 vokal tunggal (termasuk pembentukan bibir bulat 'ü'), vokal majemuk gabungan (ai, ei, ao, ou, ia, ie, ua, uo, üe), aturan singkatan ortografi (iou→iu, uei→ui, uen→un), aturan pelepasan titik dua 'ü' setelah j, q, x, y, serta fungsi huruf semivokal y dan w.",
    overview:
      "Finals (vokal) adalah penentu warna dan kejernihan suku kata Mandarin. Unit ini membedah cara membentuk vokal tunggal dengan rongga mulut stabil, transisi artikulasi yang mulus pada vokal majemuk, serta aturan ortografi Pīnyīn krusial yang sering membingungkan pemula (seperti mengapa 'qù' ditulis tanpa titik dua, atau mengapa 'liù' asalnya adalah 'liòu').",
    vocabCount: 15,
    durationMinutes: 14,
    levelBadge: "FONDASI 04",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["fund-01", "fund-02", "fund-03"],
    skills: ["Artikulasi Vokal", "Ortografi Pinyin", "Diskriminasi u vs ü"],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "Guru Wang (Pengajar) & Lisa (Murid)",
      location: "Klinik Fonetik KepoMandarin",
      goal: "Membedah cara melafalkan vokal bulat 'ü' pada 'qù' (去) dan membedakan 'lǜ' (绿 - hijau) dengan 'lù' (路 - jalan), serta mengurai singkatan 'liù' (六).",
      scenarioNotes:
        "Lisa bingung mengapa huruf 'u' pada 'qù' dibaca seperti 'ü', sedangkan pada 'bù' dibaca 'u' biasa, dan menanyakan mengapa titik dua pada 'lǜ' tetap dipertahankan.",
    },

    dialogue: [
      {
        speaker: "Lisa",
        role: "Murid",
        hanzi: "老师，为什么去 (qù) 里面写的是 ‘u’，读音却像 ‘ü’？",
        pinyin: "Lǎoshī, wèishénme qù (qù) lǐmiàn xiě de shì ‘u’, dúyīn què xiàng ‘ü’?",
        translation:
          "Guru, mengapa pada qù (去) tertulis huruf 'u', tetapi bunyinya terdengar seperti 'ü'?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "因为 j、q、x 和 y 从不与 ‘u’ 相拼。当它们遇到 ‘ü’ 时，两个小圆点省略不写！",
        pinyin:
          "Yīnwèi j, q, x hé y cóngbù yǔ ‘u’ xiāngpīn. Dāng tāmen yùdào ‘ü’ shí, liǎng ge xiǎoyuándiǎn shěnglüè bù xiě!",
        translation:
          "Karena j, q, x, dan y tidak pernah bergabung dengan 'u'. Ketika bertemu 'ü', dua titik kecil di atas dihilangkan dalam penulisan!",
      },
      {
        speaker: "Lisa",
        role: "Murid",
        hanzi: "那为什么绿 (lǜ) 的两点不能去掉呢？",
        pinyin: "Nà wèishénme lǜ (lǜ) de liǎng diǎn bù néng qùdiào ne?",
        translation: "Lalu mengapa dua titik pada lǜ (绿) tidak boleh dihilangkan?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "因为 l 和 n 既能拼 ‘u’ (如路 lù)，又能拼 ‘ü’ (如绿 lǜ)。去掉两点就会混淆了！",
        pinyin:
          "Yīnwèi l hé n jìnéng pīn ‘u’ (rú lù lù), yòunéng pīn ‘ü’ (rú lǜ lǜ). Qùdiào liǎng diǎn jiù huì hùnxiáo le!",
        translation:
          "Karena l dan n bisa bergabung dengan 'u' (seperti lù - jalan) maupun 'ü' (seperti lǜ - hijau). Jika titiknya dihilangkan, artinya akan tertukar!",
      },
      {
        speaker: "Lisa",
        role: "Murid",
        hanzi: "我明白了！还有六 (liù)，为什么拼写是 ‘iu’？",
        pinyin: "Wǒ míngbai le! Hái yǒu liù (liù), wèishénme pīnxiě shì ‘iu’?",
        translation: "Saya paham! Lalu kata liù (六), mengapa ejaannya 'iu'?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "‘iu’ 是 ‘iou’ 的省写形式。发音时中间其实含有一个隐约的 ‘o’。",
        pinyin: "‘iu’ shì ‘iou’ de shěngxiě xíngshì. Fāyīn shí zhōngjiān qíshí hányǒu yí ge yǐnyuē de ‘o’.",
        translation:
          "'iu' adalah bentuk singkatan dari 'iou'. Saat dilafalkan, di tengahnya sebenarnya tersimpan bunyi 'o' yang samar.",
      },
    ],

    vocabulary: FUNDAMENTAL_FINALS.slice(0, 15).map((fin) => ({
      hanzi: fin.exampleHanzi,
      pinyin: fin.examplePinyin,
      tone: fin.type,
      translation: fin.exampleTranslation,
      partOfSpeech: "vokal final",
      usageNotes: fin.soundDescription,
      exampleHanzi: `Vokal [${fin.letter}]`,
      examplePinyin: fin.soundDescription,
      exampleTranslation: `Contoh kata: ${fin.exampleHanzi} (${fin.examplePinyin}) : ${fin.exampleTranslation}`,
    })),

    enrichmentVocabulary: [
      {
        hanzi: "单韵母",
        pinyin: "dānyùnmǔ",
        tone: "Nada 1 + 4 + 3",
        translation: "vokal tunggal (monoftong)",
        isEnrichment: true,
        inclusionReason: "Istilah linguistik resmi untuk 6 vokal dasar a, o, e, i, u, ü.",
        exampleHanzi: "汉语有六个单韵母。",
        examplePinyin: "Hànyǔ yǒu liù ge dānyùnmǔ.",
        exampleTranslation: "Bahasa Mandarin memiliki 6 vokal tunggal.",
      },
      {
        hanzi: "复韵母",
        pinyin: "fùyùnmǔ",
        tone: "Nada 4 + 4 + 3",
        translation: "vokal majemuk (diftong/triftong)",
        isEnrichment: true,
        inclusionReason: "Istilah linguistik resmi untuk vokal gabungan seperti ai, ei, ao, ou.",
        exampleHanzi: "‘ai’ 是复韵母。",
        examplePinyin: "‘ai’ shì fùyùnmǔ.",
        exampleTranslation: "'ai' adalah vokal majemuk.",
      },
      {
        hanzi: "圆唇",
        pinyin: "yuánchún",
        tone: "Nada 2 + 2",
        translation: "bibir membulat (rounded lips)",
        isEnrichment: true,
        inclusionReason: "Petunjuk kinestetik paling penting untuk membentuk vokal ü.",
        exampleHanzi: "发 ‘ü’ 时要圆唇。",
        examplePinyin: "Fā ‘ü’ shí yào yuánchún.",
        exampleTranslation: "Saat melafalkan 'ü' bibir harus membulat.",
      },
      {
        hanzi: "省写",
        pinyin: "shěngxiě",
        tone: "Nada 3 + 3",
        translation: "penulisan singkatan ortografi",
        isEnrichment: true,
        inclusionReason: "Konsep kaidah Pinyin untuk singkatan iou→iu, uei→ui, uen→un.",
        exampleHanzi: "‘iu’ 是省写。",
        examplePinyin: "‘iu’ shì shěngxiě.",
        exampleTranslation: "'iu' adalah penulisan singkatan.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Artikulasi 6 vokal tunggal (a, o, e, i, u, ü) dan vokal majemuk (ai, ei, ui/uei, ao, ou, iu/iou, ie, üe, er). Perhatian khusus pada vokal bulat 'ü' (posisi lidah bunyi /i/ dengan bentuk bibir membulat /u/).",
      tones:
        "Pada vokal majemuk, tanda nada diletakkan pada vokal utama dengan urutan prioritas: a > o > e > i / u (jika i dan u berdampingan seperti iu atau ui, nada diletakkan pada vokal di urutan kedua).",
      toneCombinations:
        "Pasangan minimal kontras vokal: lù (路 - jalan) vs lǜ (绿 - hijau); nǔ (努 - berusaha) vs nǚ (女 - wanita); bái (白 - putih) vs běi (北 - utara).",
      commonErrors:
        "Kesalahan umum: (1) Membunyikan 'ü' seperti 'u' biasa tanpa membulatkan bibir, (2) Membaca 'e' seperti 'e' pada 'meja' bukannya vokal belakang tenggorokan, (3) Mengabaikan vokal transisi tengah pada singkatan 'iu' (iou) dan 'ui' (uei), (4) Menuliskan titik dua 'ü' setelah j, q, x, y (misal menulis 'qü').",
      articulatoryTip:
        "Untuk membentuk 'ü' sempurna: Bunyikan vokal panjang 'i' (bibir tersenyum). Tahan posisi lidah, lalu bulatkan bibir Anda ke depan seperti hendak bersiul tanpa menggeser lidah. Suara yang keluar adalah 'ü' murni.",
    },

    hanziComponents: [
      {
        hanzi: "白",
        structure: "Tunggal",
        components: "丿 (goresan titik miring) + 日 (matahari)",
        strokeCount: 5,
        strokeOrderRules: ["Titik miring atas (撇)", "Garis tegak kiri", "Sudut mendatar-tegak", "Garis tengah", "Tutup bawah"],
        notes: "Melambangkan warna putih; mewakili vokal majemuk 'ai' (bái).",
      },
      {
        hanzi: "月",
        structure: "Tunggal",
        components: "月 (piktograf bulan sabit)",
        strokeCount: 4,
        strokeOrderRules: ["Garis tegak lengkung kiri (竖撇)", "Sudut mendatar-tegak kait", "Dua garis mendatar dalam"],
        notes: "Melambangkan bulan; mewakili vokal majemuk bulat 'üe' dengan semivokal y (yuè).",
      },
      {
        hanzi: "六",
        structure: "Atas-bawah",
        components: "亠 (kepala titik garis) + 八 (kaki delapan)",
        strokeCount: 4,
        strokeOrderRules: ["Titik atas (点)", "Garis mendatar (横)", "Titik miring kiri (撇)", "Titik miring kanan (点)"],
        notes: "Melambangkan angka enam; mewakili vokal singkatan 'iou → iu' (liù).",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Aturan Pelepasan Titik Dua 'ü' (j, q, x, y vs n, l)",
        formula:
          "j, q, x, y + ü → ju, qu, xu, yu (titik dua dilepas) | n, l + ü → nǚ, lǜ (titik dua wajib ditulis)",
        explanation:
          "Karena kelompok palatal j, q, x dan semivokal y tidak pernah dapat bergabung dengan vokal 'u' biasa dalam fonotaktik Mandarin, maka pertemuan dengan 'ü' tidak akan pernah menimbulkan kerancuan makna. Oleh karena itu, dua titik di atas 'ü' dilepas dalam ejaan standar Pīnyīn. Sebaliknya, konsonan n dan l dapat berpasangan dengan 'u' (misal: lù 路 - jalan) maupun 'ü' (misal: lǜ 绿 - hijau), sehingga dua titik di atas 'ü' WAJIB ditulis agar maknanya tidak tertukar.",
        example: "qù (去 - pergi), yuè (月 - bulan) vs lǜ (绿 - hijau), nǚ (女 - wanita).",
        positiveExamples: [
          { hanzi: "去", pinyin: "qù", translation: "q + ü ditulis qu (titik dua dilepas) = pergi" },
          { hanzi: "月", pinyin: "yuè", translation: "y + üe ditulis yue (titik dua dilepas) = bulan" },
          { hanzi: "绿", pinyin: "lǜ", translation: "l + ü ditulis lü (titik dua tetap ada) = hijau" },
          { hanzi: "路", pinyin: "lù", translation: "l + u ditulis lu (vokal u biasa) = jalan" },
        ],
        usageConstraints:
          "Jangan pernah menuliskan titik dua pada ju, qu, xu, yu. Namun jangan pernah menghilangkan titik dua pada nǚ dan lǜ.",
        commonErrors:
          "Menulis 'qü' atau melafalkan 'lù' (jalan) padahal bermaksud mengatakan 'lǜ' (warna hijau).",
        communicativeFunction:
          "Menjamin keakuratan penulisan pinyin formal dan mencegah kekeliruan fatal dalam percakapan sehari-hari.",
      },
      {
        ruleTitle: "Aturan Singkatan Vokal Majemuk: iou → iu, uei → ui, dan uen → un",
        formula: "inisial + iou → iu | inisial + uei → ui | inisial + uen → un",
        explanation:
          "Ketika ketiga vokal majemuk ini didahului oleh inisial konsonan, huruf vokal di bagian tengah dihilangkan dalam penulisan ortografi Pīnyīn untuk efisiensi. Namun dalam pelafalan aktual yang alami, vokal tengah tersebut tetap terdengar samar dan mengalir.",
        example: "liù (六 - enam, asalnya liòu); duì (对 - benar, asalnya duèi); chūn (春 - musim semi, asalnya chūen).",
        positiveExamples: [
          { hanzi: "六", pinyin: "liù", translation: "l + iou ditulis liù (dibaca l-i-o-u mengalir) = enam" },
          { hanzi: "对", pinyin: "duì", translation: "d + uei ditulis duì (dibaca d-u-e-i mengalir) = benar" },
          { hanzi: "春", pinyin: "chūn", translation: "ch + uen ditulis chūn (dibaca ch-u-e-n) = musim semi" },
        ],
        usageConstraints:
          "Jika ketiga vokal ini berdiri sendiri tanpa inisial konsonan di depan, bentuknya berubah menjadi: you (iou), wei (uei), wen (uen).",
        commonErrors:
          "Membaca 'duì' sebagai 'dui' datar bahasa Indonesia tanpa sedikit pun meluncurkan vokal 'e'.",
        communicativeFunction:
          "Menjembatani pemahaman antara teks tulisan pinyin dan realitas bunyi lisan penutur asli.",
      },
      {
        ruleTitle: "Aturan Pemakaian Huruf Semivokal 'y' dan 'w'",
        formula: "Suku kata berawal vokal i → y / yi | berawal vokal u → w / wu | berawal vokal ü → yu",
        explanation:
          "Dalam kaidah ortografi Pīnyīn, sebuah suku kata tidak boleh berawal langsung dari huruf vokal i, u, atau ü tanpa penanda batas suku kata. Jika suku kata berawal i murni (seperti yī 一), ditambahkan 'y'. Jika berawal gabungan (seperti ya, ye, yao), huruf 'i' digantikan oleh 'y'. Jika berawal u murni (seperti wǔ 五), ditambahkan 'w'. Jika berawal gabungan (seperti wa, wo, wai), huruf 'u' digantikan oleh 'w'. Untuk ü murni atau gabungan (seperti yuè 月), selalu diawali huruf 'y' dan titik dua dilepas.",
        example: "yī (一 - satu), wǔ (五 - lima), yuè (月 - bulan).",
        positiveExamples: [
          { hanzi: "一", pinyin: "yī", translation: "vokal i murni diawali y = satu" },
          { hanzi: "五", pinyin: "wǔ", translation: "vokal u murni diawali w = lima" },
          { hanzi: "月", pinyin: "yuè", translation: "vokal üe ditulis yue = bulan" },
        ],
        usageConstraints:
          "Huruf 'y' dan 'w' secara fonetis bukan konsonan murni, melainkan penanda ortografis pemisah batas suku kata.",
        commonErrors:
          "Membaca 'yī' dengan bunyi konsonan 'y' tebal seperti kata 'yoyo' dalam bahasa Indonesia.",
        communicativeFunction:
          "Mencegah kerancuan pembacaan batas antarsuku kata saat membaca teks pinyin bersambung.",
      },
    ],

    culturalNotes:
      "Dalam kebudayaan Tionghoa, angka '六' (liù - enam) yang mengandung vokal singkatan 'iou' adalah angka keberuntungan tinggi yang berhomofon dengan ungkapan '六六大顺' (liù liù dà shùn - segala urusan berjalan lancar dan mulus). Karakter '月' (yuè - bulan) yang mengandung vokal 'üe' melambangkan kebersamaan dan reuni keluarga yang dirayakan dalam Festival Pertengahan Musim Gugur (中秋节 Zhōngqiūjié). Memahami pelafalan yang tepat pada kata-kata ini memperkaya apresiasi kultural di balik setiap ucapan.",

    listeningActivity: {
      goal: "Membedakan bunyi vokal bulat 'ü' dan vokal belakang 'u' pada pasangan minimal 'lǜ' vs 'lù'.",
      audioText: "lǜ",
      pinyin: "lǜ",
      translation: "hijau (vokal bulat ü)",
      gistQuestion: {
        question:
          "Dengarkan audio kata berikut. Apakah kata yang diucapkan mengandung vokal bulat khusus ü (lǜ - hijau) atau vokal u biasa (lù - jalan)?",
        options: [
          "Vokal bulat bersiul 'ü' (lǜ - hijau)",
          "Vokal belakang 'u' biasa (lù - jalan)",
        ],
        correctAnswer: "Vokal bulat bersiul 'ü' (lǜ - hijau)",
        explanation:
          "Audio melafalkan vokal bulat khusus 'ü' dengan bentuk bibir membulat bersiul pada kata 'lǜ' (绿 - hijau).",
      },
      detailQuestion: {
        question:
          "Manakah pernyataan yang benar mengenai penulisan tanda titik dua pada kata 'lǜ' dan 'qù'?",
        options: [
          "Titik dua wajib ditulis pada lǜ, tetapi wajib dilepas pada qù (menjadi qu).",
          "Titik dua harus dilepas pada kedua kata tersebut.",
          "Titik dua harus ditulis pada kedua kata tersebut (menjadi lǜ dan qǜ).",
          "Titik dua hanya ditulis pada vokal i.",
        ],
        correctAnswer:
          "Titik dua wajib ditulis pada lǜ, tetapi wajib dilepas pada qù (menjadi qu).",
        explanation:
          "Konsonan 'l' membutuhkan titik dua untuk membedakannya dari 'lu', sedangkan inisial 'q' tidak pernah berpasangan dengan 'u' biasa sehingga titik dua dilepas secara otomatis.",
      },
    },

    speakingActivity: {
      prompt:
        "Lafalkan pasangan minimal vokal berikut secara bergantian di depan cermin sambil mengamati perubahan bentuk bibir Anda: (1) lù (路 - jalan) vs lǜ (绿 - hijau), (2) nǔ (努 - daya) vs nǚ (女 - wanita), (3) bái (白 - putih) vs běi (北 - utara), (4) liù (六 - enam) vs duì (对 - benar).",
      vocabularySupport: [
        "lù (路)",
        "lǜ (绿)",
        "nǔ (努)",
        "nǚ (女)",
        "bái (白)",
        "běi (北)",
        "liù (六)",
        "duì (对)",
      ],
      evaluationRubric:
        "Pastikan bibir membulat maju seperti bersiul saat membaca kata kedua pada pasangan 1 dan 2 (ü), dan pastikan transisi vokal terdengar halus pada kata-kata majemuk.",
    },

    readingActivity: {
      textHanzi: "白月光，照地上。路上走，去何方？六月天，绿草长。",
      textPinyin:
        "Bái yuèguāng, zhào dìshang. Lùshang zǒu, qù héfāng? Liùyuè tiān, lǜcǎo cháng.",
      textTranslation:
        "Sinar bulan putih, menerangi tanah. Berjalan di jalanan, hendak pergi ke mana? Musim di bulan Juni, rumput hijau bertumbuh panjang.",
      mainIdea:
        "Bait puisi fonetik pendek yang menggabungkan vokal ai (bái), üe (yuè), u (lù), ü (qù, lǜ), dan iu (liù) dalam satu bait berima harmonis.",
      questions: [
        {
          question:
            "Berdasarkan bait puisi di atas, kata manakah yang memuat vokal majemuk bersiul 'üe' yang ditulis dengan semivokal 'y'?",
          options: [
            "yuè (月 - bulan)",
            "bái (白 - putih)",
            "liù (六 - enam)",
            "lǜ (绿 - hijau)",
          ],
          correctAnswer: "yuè (月 - bulan)",
          explanation:
            "Kata 'yuè' (月) berasal dari vokal majemuk 'üe' yang diawali semivokal 'y' tanpa titik dua.",
        },
        {
          question: "Apa arti dari frasa 'lǜ cǎo' (绿草) pada baris ketiga puisi?",
          options: [
            "rumput hijau",
            "jalan putih",
            "enam bulan",
            "cahaya bulan",
          ],
          correctAnswer: "rumput hijau",
          explanation: "'lǜ' berarti hijau dan 'cǎo' berarti rumput.",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tulis karakter '白' (bái - putih / 5 goresan), '月' (yuè - bulan / 4 goresan), dan '六' (liù - enam / 4 goresan) dengan urutan goresan yang tepat.",
      minimumCharacters: 3,
      checklist: [
        "Tulis goresan titik miring kiri (撇 Piě) terlebih dahulu sebelum badan kotak pada karakter 白.",
        "Tulis goresan tegak lengkung kiri (竖撇 Shùpiě) dulu pada karakter 月 sebelum garis sudut kait kanan.",
        "Tulis goresan titik atas (点 Diǎn) dan garis mendatar (横 Héng) sebelum sepasang kaki miring pada karakter 六.",
      ],
      modelAnswer: {
        hanzi: "白月六",
        pinyin: "bái yuè liù",
        translation: "putih bulan enam",
      },
    },

    personalizationPrompt:
      "Rekam suaramu melafalkan frasa 'liù yuè' (六月 - bulan Juni) dan 'lǜ sè' (绿色 - warna hijau). Simpan kedua frasa ini ke dalam Buku Frasa pribadimu sebagai penanda penguasaan vokal 'iu' dan 'ü'.",
    errorJournalHooks: [
      "Membunyikan vokal 'ü' sama seperti vokal 'u' biasa (bibir tidak membulat bersiul)",
      "Menuliskan titik dua 'ü' setelah konsonan j, q, x, dan semivokal y (misal menulis 'qü' atau 'yü')",
      "Menghilangkan titik dua 'ü' setelah konsonan n dan l (misal menulis 'lu' padahal bermaksud 'lǜ')",
      "Mengabaikan vokal tengah yang tersembunyi pada singkatan ortografi 'iu' (iou) dan 'ui' (uei)",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna mampu membedakan pelafalan vokal u vs ü, menerapkan kaidah pelepasan titik dua ü setelah j q x y, mengidentifikasi singkatan ortografi iou→iu dan uei→ui, serta membaca teks fonetik pendek berima.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Latih kembali teknik bersiul untuk membunyikan 'ü' dan tinjau kembali aturan pelepasan titik dua pada konsonan palatal j, q, x.",
    },
  },

  // -------------------------------------------------------------
  // F-05: Nasal Finals / Vokal Sengau (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "fund-05",
    moduleId: "fundamentals",
    slug: "05",
    unitNumber: 5,
    title: "Nasal Finals (Vokal Sengau)",
    hanzi: "前后鼻韵母",
    pinyin: "Qián-Hòu Bí Yùnmǔ",
    translation: "Sengau Depan an en in un ün & Sengau Belakang ang eng ing ong",
    objectives:
      "Menguasai perbedaan titik resonansi sengau depan (-n) vs sengau belakang (-ng), melatih kepekaan pasangan minimal an/ang, en/eng, in/ing, serta memahami vokal sengau gabungan ian, iang, uan, uang, iong.",
    overview:
      "Vokal sengau (Bí Yùnmǔ) dibentuk dengan mengalirkan getaran suara ke dalam rongga hidung. Kunci penguasaannya terletak pada posisi penutupan rongga mulut: sengau depan diakhiri oleh ujung lidah yang menempel rapat pada gusi atas (-n), sedangkan sengau belakang ditutup oleh pangkal lidah yang terangkat ke langit-langit lunak (-ng). Membedakan kedua resonansi ini sangat vital karena kesalahan artikulasi mengubah makna kata secara mendasar.",
    vocabCount: 14,
    durationMinutes: 14,
    levelBadge: "FONDASI 05",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["fund-01", "fund-02", "fund-03", "fund-04"],
    skills: ["Resonansi Sengau", "Minimal-Pair an/ang", "Artikulasi ian/iang"],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "Guru Wang (Pengajar) & Budi (Murid)",
      location: "Laboratorium Fonetik KepoMandarin",
      goal: "Membedakan resonansi kata 'kàn' (看 - melihat) vs 'kāng' (康 - sehat), serta melatih vokal sengau gabungan 'tiān' (天 - langit/hari) vs 'xiāng' (香 - wangi).",
      scenarioNotes:
        "Budi sering keliru mengucapkan kata sengau depan menjadi sengau belakang (seperti mengucapkan 'shàn' menjadi 'shàng') sehingga lawan bicaranya bingung.",
    },

    dialogue: [
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "请仔细听这两个音：‘看’ (kàn) 和 ‘康’ (kāng)。你能听出区别吗？",
        pinyin: "Qǐng zǐxì tīng zhè liǎng ge yīn: ‘kàn’ hé ‘kāng’. Nǐ néng tīngchū qūbié ma?",
        translation:
          "Dengarkan baik-baik kedua bunyi ini: 'kàn' dan 'kāng'. Apakah kamu bisa mendengar perbedaannya?",
      },
      {
        speaker: "Budi",
        role: "Murid",
        hanzi: "‘kàn’ 好像在门牙后面突然停住了，而 ‘kāng’ 感觉声音在喉咙深处振动！",
        pinyin:
          "‘kàn’ hǎoxiàng zài ményá hòumiàn tūrán tíngzhù le, ér ‘kāng’ gǎnjué shēngyīn zài hóulóng shēnchù zhèndòng!",
        translation:
          "'kàn' sepertinya berhenti mendadak di belakang gigi depan, sedangkan 'kāng' terasa suaranya bergetar di rongga tenggorokan dalam!",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "非常敏锐！读 ‘kàn’ 时，舌尖抵住上齿龈，是前鼻音；读 ‘kāng’ 时，舌根后缩抬起，是后鼻音。",
        pinyin:
          "Fēicháng mǐnruì! Dú ‘kàn’ shí, shéjiān dǐzhù shàngchǐyín, shì qiánbíyīn; dú ‘kāng’ shí, shégēn hòusuō táiqǐ, shì hòubíyīn.",
        translation:
          "Sangat tajam! Saat membaca 'kàn', ujung lidah menempel di gusi atas, itu adalah sengau depan; saat membaca 'kāng', pangkal lidah ditarik mundur dan terangkat, itu adalah sengau belakang.",
      },
      {
        speaker: "Budi",
        role: "Murid",
        hanzi: "那 ‘tiān’ (天) 和 ‘xiāng’ (香) 呢？我觉得 ‘ian’ 读起来有点像 ‘ien’？",
        pinyin: "Nà ‘tiān’ (tiān) hé ‘xiāng’ (xiāng) ne? Wǒ juéde ‘ian’ dú qǐlái yǒudiǎn xiàng ‘ien’?",
        translation:
          "Lalu bagaimana dengan 'tiān' (天) dan 'xiāng' (香)? Saya merasa 'ian' terdengar agak mirip 'ien'?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "太对了！‘ian’ 里的 ‘a’ 受前后窄元音影响发音偏向 ‘ê’，所以 ‘tiān’ 听起来像 /tien/，千万不要读成 /tian/ 开大口！",
        pinyin:
          "Tài duì le! ‘ian’ lǐ de ‘a’ shòu qiánhòu zhǎiyuányīn yǐngxiǎng fāyīn piānxiàng ‘ê’, suǒyǐ ‘tiān’ tīngqǐlái xiàng /tien/, qiānwàn bú yào dúchéng /tian/ kāi dà kǒu!",
        translation:
          "Tepat sekali! Huruf 'a' pada 'ian' terpengaruh oleh vokal sempit di sekitarnya sehingga bergeser mendekati 'ê', maka 'tiān' terdengar seperti /tien/, jangan pernah membuka mulut terlalu lebar seperti /tian/!",
      },
    ],

    vocabulary: [
      ...FUNDAMENTAL_FINALS.slice(15).map((fin) => ({
        hanzi: fin.exampleHanzi,
        pinyin: fin.examplePinyin,
        tone: fin.type,
        translation: fin.exampleTranslation,
        partOfSpeech: "vokal sengau",
        usageNotes: fin.soundDescription,
        exampleHanzi: `Vokal Sengau [${fin.letter}]`,
        examplePinyin: fin.soundDescription,
        exampleTranslation: `Contoh kata: ${fin.exampleHanzi} (${fin.examplePinyin}) : ${fin.exampleTranslation}`,
      })),
      {
        hanzi: "天",
        pinyin: "tiān",
        tone: "Vokal Sengau Gabungan",
        translation: "langit / hari",
        partOfSpeech: "nomina",
        usageNotes: "Vokal sengau depan gabungan 'ian' (dibaca mendekati /ien/).",
        exampleHanzi: "今天天气很好。",
        examplePinyin: "Jīntiān tiānqì hěn hǎo.",
        exampleTranslation: "Hari ini cuaca sangat bagus.",
      },
      {
        hanzi: "香",
        pinyin: "xiāng",
        tone: "Vokal Sengau Gabungan",
        translation: "wangi / harum",
        partOfSpeech: "adjektiva",
        usageNotes: "Vokal sengau belakang gabungan 'iang' (a terbuka lebar).",
        exampleHanzi: "茉莉花很香。",
        examplePinyin: "Mòlìhuā hěn xiāng.",
        exampleTranslation: "Bunga melati sangat harum.",
      },
      {
        hanzi: "万",
        pinyin: "wàn",
        tone: "Vokal Sengau Gabungan",
        translation: "sepuluh ribu",
        partOfSpeech: "numeralia",
        usageNotes: "Vokal sengau depan gabungan 'uan' (u + an).",
        exampleHanzi: "一万块。",
        examplePinyin: "Yí wàn kuài.",
        exampleTranslation: "Sepuluh ribu yuan.",
      },
      {
        hanzi: "黄",
        pinyin: "huáng",
        tone: "Vokal Sengau Gabungan",
        translation: "kuning",
        partOfSpeech: "adjektiva",
        usageNotes: "Vokal sengau belakang gabungan 'uang' (u + ang).",
        exampleHanzi: "黄色的花。",
        examplePinyin: "Huángsè de huā.",
        exampleTranslation: "Bunga berwarna kuning.",
      },
      {
        hanzi: "穷",
        pinyin: "qióng",
        tone: "Vokal Sengau Gabungan",
        translation: "miskin",
        partOfSpeech: "adjektiva",
        usageNotes: "Vokal sengau belakang gabungan 'iong' (i + ong).",
        exampleHanzi: "不穷。",
        examplePinyin: "Bù qióng.",
        exampleTranslation: "Tidak miskin.",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "前鼻音",
        pinyin: "qiánbíyīn",
        tone: "Nada 2 + 2 + 1",
        translation: "sengau depan (-n)",
        isEnrichment: true,
        inclusionReason: "Istilah linguistik resmi untuk vokal berakhiran -n dengan penutupan ujung lidah.",
        exampleHanzi: "‘an’ 是前鼻音。",
        examplePinyin: "‘an’ shì qiánbíyīn.",
        exampleTranslation: "'an' adalah vokal sengau depan.",
      },
      {
        hanzi: "后鼻音",
        pinyin: "hòubíyīn",
        tone: "Nada 4 + 2 + 1",
        translation: "sengau belakang (-ng)",
        isEnrichment: true,
        inclusionReason: "Istilah linguistik resmi untuk vokal berakhiran -ng dengan penutupan pangkal lidah.",
        exampleHanzi: "‘ang’ 是后鼻音。",
        examplePinyin: "‘ang’ shì hòubíyīn.",
        exampleTranslation: "'ang' adalah vokal sengau belakang.",
      },
      {
        hanzi: "鼻腔共鸣",
        pinyin: "bíqiāng gòngmíng",
        tone: "Nada 2 + 1 + 4 + 2",
        translation: "resonansi rongga hidung",
        isEnrichment: true,
        inclusionReason: "Mekanisme akustik utama dalam memproduksi vokal sengau.",
        exampleHanzi: "感受鼻腔共鸣。",
        examplePinyin: "Gǎnshòu bíqiāng gòngmíng.",
        exampleTranslation: "Rasakan resonansi rongga hidung.",
      },
      {
        hanzi: "舌根",
        pinyin: "shégēn",
        tone: "Nada 2 + 1",
        translation: "pangkal lidah",
        isEnrichment: true,
        inclusionReason: "Organ artikulasi kunci untuk menutup vokal sengau belakang -ng.",
        exampleHanzi: "抬起舌根发 ‘-ng’。",
        examplePinyin: "Tái qǐ shégēn fā ‘-ng’.",
        exampleTranslation: "Angkat pangkal lidah untuk membunyikan '-ng'.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Dua kelompok vokal sengau: Sengau Depan (an, en, in, un, ün) yang ditutup oleh ujung lidah pada gusi atas, dan Sengau Belakang (ang, eng, ing, ong) yang ditutup oleh pangkal lidah pada langit-langit lunak. Perhatian khusus pada vokal sengau gabungan ian (dibaca mendekati /ien/).",
      tones:
        "Pada vokal sengau, tanda nada selalu diletakkan pada vokal inti sebelum konsonan nasal (misal: sān nada di atas 'a', lěng nada di atas 'e', nín nada di atas 'i'). Konsonan nasal -n dan -ng tidak pernah diberi tanda nada.",
      toneCombinations:
        "Pasangan minimal kontras nasal: kàn (看 - melihat) vs kāng (康 - sehat); bīn (宾 - tamu) vs bīng (冰 - es); fēn (分 - menit) vs fēng (风 - angin); shēn (身 - badan) vs shēng (生 - lahir).",
      commonErrors:
        "Kesalahan umum penutur Indonesia: (1) Menyamakan sengau depan -n dengan sengau belakang -ng (misal: sān terdengar seperti sāng), (2) Membaca 'ian' dengan vokal 'a' terbuka lebar seperti bahasa Indonesia bukannya meluncur ke /ien/ (misal: tiān dibaca tian bukannya tien), (3) Mengabaikan penutupan ujung lidah pada akhiran -n sehingga bunyi sengau menghilang di udara.",
      articulatoryTip:
        "Trik Ujung Jari: Tempelkan ujung jari Anda dengan lembut di cuping hidung. Saat membunyikan sengau depan (-n), getaran terasa di bagian depan hidung dan berhenti saat lidah mengetuk gusi. Saat membunyikan sengau belakang (-ng), getaran berdengung lebih dalam dan rongga mulut tetap terbuka tanpa sentuhan ujung lidah.",
    },

    hanziComponents: [
      {
        hanzi: "天",
        structure: "Tunggal",
        components: "一 (garis langit atas) + 大 (orang besar)",
        strokeCount: 4,
        strokeOrderRules: ["Garis mendatar atas pendek", "Garis mendatar bawah panjang", "Garis miring kiri (撇)", "Garis miring kanan (捺)"],
        notes: "Melambangkan langit di atas kepala manusia; mewakili vokal sengau gabungan 'ian' (tiān).",
      },
      {
        hanzi: "中",
        structure: "Tunggal menembus",
        components: "口 (kotak mulut) + 丨 (garis tegak penembus)",
        strokeCount: 4,
        strokeOrderRules: ["Garis tegak kiri kotak", "Sudut mendatar-tegak kotak", "Garis tutup bawah kotak", "Garis tegak panjang lurus menembus tengah"],
        notes: "Melambangkan posisi tengah atau pusat; mewakili vokal sengau belakang 'ong' (zhōng).",
      },
      {
        hanzi: "三",
        structure: "Tunggal",
        components: "三 (tiga garis mendatar)",
        strokeCount: 3,
        strokeOrderRules: ["Garis mendatar atas", "Garis mendatar tengah (terpendek)", "Garis mendatar bawah (terpanjang)"],
        notes: "Melambangkan angka tiga; mewakili vokal sengau depan 'an' (sān).",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Mekanisme Penutupan: Sengau Depan (-n / 前鼻音) vs Sengau Belakang (-ng / 后鼻音)",
        formula: "-n (ujung lidah menempel gusi atas) vs -ng (pangkal lidah menutup langit-langit lunak)",
        explanation:
          "Pada akhiran -n, aliran udara mulut dihentikan total oleh ujung lidah yang menempel pada alveolum (gusi atas di belakang gigi depan), menyisakan dengung keluar lewat hidung. Pada akhiran -ng, ujung lidah tetap diam di dasar mulut sementara pangkal lidah terangkat ke belakang, menghasilkan resonansi dengung yang lebih bulat dan panjang.",
        example: "kàn (看 - melihat) vs kāng (康 - sehat); bīn (宾 - tamu) vs bīng (冰 - es).",
        positiveExamples: [
          { hanzi: "看", pinyin: "kàn", translation: "sengau depan ujung lidah menempel = melihat" },
          { hanzi: "康", pinyin: "kāng", translation: "sengau belakang pangkal lidah terangkat = sehat" },
          { hanzi: "分", pinyin: "fēn", translation: "sengau depan = menit / bagian" },
          { hanzi: "风", pinyin: "fēng", translation: "sengau belakang = angin" },
        ],
        usageConstraints:
          "Jangan membiarkan ujung lidah menyentuh gigi saat membunyikan -ng; biarkan rongga mulut depan terbuka.",
        commonErrors:
          "Mengucapkan 'kàn' (melihat) menjadi 'kāng' sehingga artinya berubah menjadi 'sehat/lapang'.",
        communicativeFunction:
          "Menghindari salah pengertian makna kata berpasangan minimal dalam percakapan sehari-hari.",
      },
      {
        ruleTitle: "Kaidah Pelafalan Khusus Vokal Sengau Gabungan: ian vs iang",
        formula: "i + an = ian (dibaca mendekati /ien/) vs i + ang = iang (a terbuka lebar)",
        explanation:
          "Dalam kaidah fonetik Mandarin, huruf 'a' pada 'ian' mengalami asimilasi fonetis oleh vokal tinggi 'i' dan nasal depan 'n', sehingga bunyinya menyempit menjadi vokal madya depan /ɛ/ (mirip bunyi 'e' pada kata 'bebek' atau 'ember'). Sebaliknya, pada 'iang', vokal 'a' tetap diucapkan terbuka lebar dan penuh di bagian belakang rongga mulut.",
        example: "tiān (天 - langit/hari, dibaca /tien/) vs xiāng (香 - wangi, dibaca terbuka /xiang/).",
        positiveExamples: [
          { hanzi: "天", pinyin: "tiān", translation: "ian dilafalkan mendekati /tien/ = langit / hari" },
          { hanzi: "香", pinyin: "xiāng", translation: "iang dilafalkan /xiang/ terbuka = harum / wangi" },
          { hanzi: "点", pinyin: "diǎn", translation: "ian dilafalkan /dien/ = titik / jam" },
          { hanzi: "想", pinyin: "xiǎng", translation: "iang dilafalkan terbuka = ingin / berpikir" },
        ],
        usageConstraints:
          "Aturan pergeseran vokal /ien/ ini HANYA berlaku untuk 'ian' dan 'üan' (seperti yuán 元), TIDAK berlaku untuk 'uang' atau 'ang'.",
        commonErrors:
          "Membaca 'tiān' dengan vokal 'a' lebar seperti kata 'ti-an' dalam bahasa Indonesia.",
        communicativeFunction:
          "Memberikan warna pelafalan standar Putonghua yang fasih, alami, dan tidak kaku.",
      },
      {
        ruleTitle: "Aturan Penulisan Singkatan: uen → un & ü + n → ün",
        formula: "inisial + uen → un | inisial + ün → ün (dengan n, l) / un (setelah j, q, x, y)",
        explanation:
          "Ketika vokal nasal 'uen' didahului konsonan inisial, huruf 'e' tengah dihilangkan dalam penulisan (seperti wèn 问 menjadi wèn jika berdiri sendiri, tetapi lùn 论 saat berinisial l). Untuk vokal 'ün', ketika bergabung dengan j, q, x, y, dua titik di atas dilepas (menjadi jun, qun, xun, yun) tetapi tetap dilafalkan sebagai vokal bulat /ün/.",
        example: "chūn (春 - musim semi, asalnya chūen), yún (云 - awan, asalnya yǘn).",
        positiveExamples: [
          { hanzi: "问", pinyin: "wèn", translation: "berdiri sendiri ditulis wèn = bertanya" },
          { hanzi: "春", pinyin: "chūn", translation: "ch + uen disingkat chūn = musim semi" },
          { hanzi: "云", pinyin: "yún", translation: "y + ün ditulis yún tanpa titik dua = awan" },
        ],
        usageConstraints:
          "Ingat bahwa suku kata 'qun' (群 - kelompok) dibaca /qün/, bukan /qun/ biasa.",
        commonErrors:
          "Membaca 'chūn' sebagai cun datar tanpa meluncurkan vokal transisi.",
        communicativeFunction:
          "Memahami korelasi antara bentuk ejaan teks pinyin dan realitas bunyi fonetik.",
      },
    ],

    culturalNotes:
      "Konsep '天' (tiān - langit/alam) dan '中' (zhōng - tengah) adalah dua pilar kosmologi paling sentral dalam peradaban Tionghoa. Karakter '中' merupakan akar dari nama resmi negara Tiongkok: '中国' (Zhōngguó - Negeri Tengah). Orang Tionghoa kuno meyakini keharmonisan antara manusia dan semesta melalui filosofi '天人合一' (Tiān Rén Hé Yī - kesatuan langit dan manusia). Menguasai bunyi sengau pada 'tiān' dan 'zhōng' secara fasih menjadi jembatan budaya yang sangat bermakna.",

    listeningActivity: {
      goal: "Membedakan bunyi sengau depan (kàn) dan sengau belakang (kāng) melalui pasangan minimal audio.",
      audioText: "kàn",
      pinyin: "kàn",
      translation: "melihat (sengau depan ujung lidah)",
      gistQuestion: {
        question:
          "Dengarkan audio kata berikut. Apakah kata yang diucapkan berakhiran sengau depan ujung lidah (-n) atau sengau belakang pangkal lidah (-ng)?",
        options: [
          "Sengau depan ujung lidah menempel gusi (kàn - melihat)",
          "Sengau belakang rongga tekak berdengung (kāng - sehat)",
        ],
        correctAnswer: "Sengau depan ujung lidah menempel gusi (kàn - melihat)",
        explanation:
          "Audio melafalkan kata 'kàn' (看) dengan suara terputus bersih oleh ujung lidah yang mengetuk gusi atas (-n).",
      },
      detailQuestion: {
        question:
          "Bagaimana cara melafalkan vokal sengau 'ian' pada kata 'tiān' (天) yang tepat sesuai standar Putonghua?",
        options: [
          "Vokal diluncurkan halus mendekati bunyi /ien/ (tiān terdengar seperti /tien/)",
          "Vokal 'a' dibuka sangat lebar seperti kata 'ti-an' bahasa Indonesia",
          "Vokal 'i' dihilangkan dan hanya dibaca 'an'",
          "Huruf 'n' diucapkan berdengung panjang seperti 'ng'",
        ],
        correctAnswer:
          "Vokal diluncurkan halus mendekati bunyi /ien/ (tiān terdengar seperti /tien/)",
        explanation:
          "Pada vokal 'ian', vokal 'a' mengalami pergeseran fonetis mendekati bunyi /ien/ karena diapit oleh vokal sempit 'i' dan nasal alveolar 'n'.",
      },
    },

    speakingActivity: {
      prompt:
        "Lafalkan pasangan minimal vokal sengau berikut secara bergantian sambil merasakan perpindahan titik dengung di hidung dan posisi lidah: (1) sān (三 - tiga) vs shàng (上 - atas), (2) hěn (很 - sangat) vs lěng (冷 - dingin), (3) bīn (宾 - tamu) vs bīng (冰 - es), (4) tiān (天 - langit) vs xiāng (香 - harum).",
      vocabularySupport: [
        "sān (三)",
        "shàng (上)",
        "hěn (很)",
        "lěng (冷)",
        "bīn (宾)",
        "bīng (冰)",
        "tiān (天)",
        "xiāng (香)",
      ],
      evaluationRubric:
        "Pastikan ujung lidah mengetuk gusi atas pada kata pertama (-n), dan pangkal lidah terangkat ke belakang dengan mulut tetap terbuka pada kata kedua (-ng).",
    },

    readingActivity: {
      textHanzi: "蓝蓝的天，白白的云。冷风吹过，春天来到。看天上，数星星。",
      textPinyin:
        "Lánlán de tiān, báibái de yún. Lěngfēng chuīguò, chūntiān láidào. Kàn tiānshang, shǔ xīngxing.",
      textTranslation:
        "Langit yang biru, awan yang putih. Angin dingin berhembus lewat, musim semi telah tiba. Memandang ke langit, menghitung bintang-bintang.",
      mainIdea:
        "Bait puisi deskriptif alam yang kaya dengan kombinasi vokal sengau depan dan belakang: lán (an), tiān (ian), yún (ün), lěng (eng), fēng (eng), chūn (un), kàn (an), xīng (ing).",
      questions: [
        {
          question:
            "Berdasarkan teks puisi di atas, manakah kata yang memuat vokal sengau belakang berbunyi /eng/?",
          options: [
            "lěng (冷 - dingin) dan fēng (风 - angin)",
            "tiān (天 - langit) dan yún (云 - awan)",
            "kàn (看 - melihat) dan lán (蓝 - biru)",
            "chūn (春 - musim semi)",
          ],
          correctAnswer: "lěng (冷 - dingin) dan fēng (风 - angin)",
          explanation:
            "Kata 'lěng' dan 'fēng' keduanya berakhiran sengau belakang 'eng'.",
        },
        {
          question: "Apa arti dari frasa 'chūntiān' (春天) pada baris kedua puisi?",
          options: [
            "musim semi",
            "langit biru",
            "angin dingin",
            "awan putih",
          ],
          correctAnswer: "musim semi",
          explanation: "'chūn' berarti semi dan 'tiān' berarti musim/hari.",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tulis karakter '天' (tiān - langit / 4 goresan), '中' (zhōng - tengah / 4 goresan), dan '三' (sān - tiga / 3 goresan) dengan urutan goresan yang tepat.",
      minimumCharacters: 3,
      checklist: [
        "Tulis garis mendatar atas pendek, garis mendatar bawah panjang, lalu goresan miring kiri (撇) dan miring kanan (捺) pada karakter 天.",
        "Tulis garis tegak kiri kotak, sudut mendatar-tegak kotak, garis tutup bawah kotak, lalu garis tegak panjang lurus menembus tengah pada karakter 中.",
        "Tulis tiga garis mendatar dari atas ke bawah (tengah paling pendek, bawah paling panjang) pada karakter 三.",
      ],
      modelAnswer: {
        hanzi: "天中三",
        pinyin: "tiān zhōng sān",
        translation: "langit tengah tiga",
      },
    },

    personalizationPrompt:
      "Rekam suaramu melafalkan frasa 'jīntiān tiānqì hěn hǎo' (今天天气很好 - Hari ini cuaca sangat bagus). Simpan frasa ini ke dalam Buku Frasa pribadimu sebagai penanda kemahiran vokal sengau depan 'in' dan 'ian'.",
    errorJournalHooks: [
      "Menyamakan vokal sengau depan (-n) dengan sengau belakang (-ng) sehingga kata 'kàn' terdengar seperti 'kāng'",
      "Membaca vokal 'ian' dengan vokal 'a' terbuka lebar bukannya meluncur ke /ien/ (misal: tiān dibaca tian bukannya tien)",
      "Tidak mengangkat pangkal lidah saat membunyikan vokal sengau belakang (-ng)",
      "Membaca 'qun' atau 'yun' dengan vokal 'u' biasa bukannya vokal bulat /ün/",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna mampu membedakan resonansi sengau depan (-n) vs sengau belakang (-ng) pada pasangan minimal, melafalkan vokal sengau gabungan 'ian' sebagai /ien/, serta menguasai penulisan aksara dasar 天, 中, 三.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Latih kembali kepekaan cuping hidung saat melafalkan pasangan kata 'kàn' vs 'kāng' dan 'bīn' vs 'bīng'.",
    },
  },

  // -------------------------------------------------------------
  // F-06: Empat Nada dan Nada Netral (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "fund-06",
    moduleId: "fundamentals",
    slug: "06",
    unitNumber: 6,
    title: "4 Nada Utama & Nada Netral",
    hanzi: "四声与轻声",
    pinyin: "Sìshēng yǔ Qīngshēng",
    translation: "Kontur Pitch 55, 35, 214, 51 & Karakter Nada Netral",
    objectives:
      "Menguasai 4 kontur pitch nada utama (55, 35, 214, 51) dan nada netral (qīngshēng), memahami fungsi nomor nada (1-4) vs tanda diakritik, serta melatih kestabilan intonasi dalam kombinasi dua nada berurutan (tone pairs).",
    overview:
      "Mandarin adalah bahasa tonal logografis: perubahan nada suara pada suku kata yang sama menghasilkan kata dengan makna yang sama sekali berlainan (seperti mā ibu vs mǎ kuda). Unit ini membedah sistem nada 5-tingkat secara objektif, dinamika nada dalam kata gabungan, serta melatih kepekaan telinga menangkap kontur pitch.",
    vocabCount: 9,
    durationMinutes: 15,
    levelBadge: "FONDASI 06",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["fund-01", "fund-02", "fund-03", "fund-04", "fund-05"],
    skills: ["Kontur Pitch 5-Tingkat", "Identifikasi Tonal", "Nada Netral", "Kombinasi Nada"],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "Guru Wang (Pengajar) & Siti (Murid)",
      location: "Studio Akustik KepoMandarin",
      goal: "Membedah kurva kontur 4 nada pada suku kata 'ma' (妈, 麻, 马, 骂) dan memahami cara menjatuhkan nada ke-4 secara tegas tanpa diseret.",
      scenarioNotes:
        "Siti merasa ragu saat melafalkan nada ke-4 karena takut terdengar marah, dan sering kali nada ke-4 miliknya menggantung datar di tengah.",
    },

    dialogue: [
      {
        speaker: "Siti",
        role: "Murid",
        hanzi: "老师，读第四声 ‘骂’ (mà) 的时候，我总觉得像在对别人发脾气？",
        pinyin: "Lǎoshī, dú dì-sì shēng ‘mà’ de shíhou, wǒ zǒng juéde xiàng zài duì biérén fā píqi?",
        translation:
          "Guru, saat membaca nada keempat 'mà' (memarahi), saya selalu merasa seperti sedang marah pada orang lain?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "哈哈，不是发脾气，而是要有‘落到底’的决断力！从最高音 5 一口气降到最低音 1，短促有力。",
        pinyin:
          "Hāha, bú shì fā píqi, ér shì yào yǒu ‘luò dào dǐ’ de juéduànlì! Cóng zuì gāo yīn 5 yìkǒuqì jiàng dào zuì dī yīn 1, duǎncù yǒulì.",
        translation:
          "Haha, bukan marah, melainkan harus memiliki ketegasan untuk 'jatuh sampai ke dasar'! Turun dari puncak nada 5 langsung ke dasar 1 dalam satu tarikan nafas, pendek dan bertenaga.",
      },
      {
        speaker: "Siti",
        role: "Murid",
        hanzi: "那第三声 ‘马’ (mǎ) 呢？要先下后上吗？",
        pinyin: "Nà dì-sān shēng ‘mǎ’ ne? Yào xiān xià hòu shàng ma?",
        translation:
          "Lalu bagaimana dengan nada ketiga 'mǎ' (kuda)? Apakah harus turun dulu baru naik?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "在单字慢读时确实是 214 (降到底再挑起)；但在连贯句子中，主要发前半段低沉的部分就行。",
        pinyin:
          "Zài dānzì màn dú shí quèshí shì 214 (jiàng dào dǐ zài tiǎoqǐ); dàn zài liánguàn jùzi zhōng, zhǔyào fā qiánbànduàn dīchén de bùfen jiù xíng.",
        translation:
          "Saat dibaca perlahan per kata memang 214 (turun ke dasar lalu diangkat); tetapi dalam kalimat mengalir, cukup bunyikan bagian awal yang rendah dan dalam.",
      },
      {
        speaker: "Siti",
        role: "Murid",
        hanzi: "还有妈妈的 ‘ma’，为什么后面不标声调？",
        pinyin: "Hái yǒu māma de ‘ma’, wèishénme hòumiàn bù biāo shēngdiào?",
        translation: "Lalu kata 'ma' pada māma, mengapa yang di belakang tidak bertanda nada?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "那是轻声 (nada netral)，又轻又短，像小雨滴轻轻落在地上一样。",
        pinyin: "Nà shì qīngshēng, yòu qīng yòu duǎn, xiàng xiǎoyǔdī qīngqīng luò zài dìshang yíyàng.",
        translation:
          "Itu adalah nada netral (qīngshēng), ringan dan pendek, seperti tetesan rintik hujan lembut yang jatuh ke tanah.",
      },
    ],

    vocabulary: [
      ...FUNDAMENTAL_TONES.map((t) => ({
        hanzi: t.specimen.hanzi,
        pinyin: t.specimen.pinyin,
        tone: t.name,
        translation: t.specimen.translation,
        partOfSpeech: "kosakata kontras nada",
        usageNotes: `${t.pitchContour} - ${t.description}`,
        exampleHanzi: `${t.specimen.hanzi} (${t.pitchContour})`,
        examplePinyin: t.mnemonic,
        exampleTranslation: `Arti: ${t.specimen.translation}. Karakter ${t.specimen.hanzi} (${t.specimen.pinyin}) melambangkan ${t.name}.`,
      })),
      {
        hanzi: "妈妈",
        pinyin: "māma",
        tone: "Nada 1 + Nada Netral",
        translation: "ibu",
        partOfSpeech: "nomina",
        usageNotes: "Kombinasi nada 1 tinggi datar diikuti nada netral pendek lembut.",
        exampleHanzi: "我妈妈很好。",
        examplePinyin: "Wǒ māma hěn hǎo.",
        exampleTranslation: "Ibu saya sangat baik.",
      },
      {
        hanzi: "老师",
        pinyin: "lǎoshī",
        tone: "Nada 3 + Nada 1",
        translation: "guru",
        partOfSpeech: "nomina",
        usageNotes: "Kombinasi nada 3 rendah berayun diikuti nada 1 tinggi datar.",
        exampleHanzi: "老师好！",
        examplePinyin: "Lǎoshī hǎo!",
        exampleTranslation: "Halo Guru!",
      },
      {
        hanzi: "再见",
        pinyin: "zàijiàn",
        tone: "Nada 4 + Nada 4",
        translation: "selamat tinggal",
        partOfSpeech: "ungkapan",
        usageNotes: "Dua nada ke-4 berurutan, keduanya dijatuhkan secara tegas dan bertenaga.",
        exampleHanzi: "明天再见。",
        examplePinyin: "Míngtiān zàijiàn.",
        exampleTranslation: "Sampai jumpa besok.",
      },
      {
        hanzi: "好的",
        pinyin: "hǎo de",
        tone: "Nada 3 + Nada Netral",
        translation: "baiklah",
        partOfSpeech: "partikel penegas",
        usageNotes: "Nada ke-3 diikuti partikel nada netral santai.",
        exampleHanzi: "好的，没问题。",
        examplePinyin: "Hǎo de, méi wèntí.",
        exampleTranslation: "Baiklah, tidak masalah.",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "五度标记法",
        pinyin: "wǔdù biāojìfǎ",
        tone: "Nada 3 + 4 + 1 + 4 + 3",
        translation: "sistem notasi 5-tingkat Chao Yuen Ren",
        isEnrichment: true,
        inclusionReason: "Metode fonetik ilmiah standar internasional untuk memetakan kontur pitch Mandarin.",
        exampleHanzi: "用五度标记法画声调。",
        examplePinyin: "Yòng wǔdù biāojìfǎ huà shēngdiào.",
        exampleTranslation: "Menggambar nada menggunakan sistem notasi 5-tingkat.",
      },
      {
        hanzi: "音高",
        pinyin: "yīngāo",
        tone: "Nada 1 + 1",
        translation: "tinggi nada suara (pitch)",
        isEnrichment: true,
        inclusionReason: "Konsep fisik getaran pita suara yang menjadi dasar pembentukan nada.",
        exampleHanzi: "保持音高稳定。",
        examplePinyin: "Bǎochí yīngāo wěndìng.",
        exampleTranslation: "Jaga stabilitas tinggi nada suara.",
      },
      {
        hanzi: "调值",
        pinyin: "diàozhí",
        tone: "Nada 4 + 2",
        translation: "nilai kontur nada pitch (misal: 55, 35, 214, 51)",
        isEnrichment: true,
        inclusionReason: "Angka rujukan resmi yang menggambarkan pergerakan tinggi suara dari awal ke akhir.",
        exampleHanzi: "第一声的调值是55。",
        examplePinyin: "Dì-yī shēng de diàozhí shì 55.",
        exampleTranslation: "Nilai kontur nada pertama adalah 55.",
      },
      {
        hanzi: "轻声",
        pinyin: "qīngshēng",
        tone: "Nada 1 + 1",
        translation: "nada netral (tanpa tanda nada)",
        isEnrichment: true,
        inclusionReason: "Fenomena prosodi penting dalam bahasa Mandarin lisan sehari-hari.",
        exampleHanzi: "‘吗’ 读轻声。",
        examplePinyin: "‘ma’ dú qīngshēng.",
        exampleTranslation: "'ma' dibaca dengan nada netral.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Empat kontur pitch relatif: Nada 1 (55 - tinggi datar stabil), Nada 2 (35 - menanjak bertanya), Nada 3 (214 - turun rendah ke lembah lalu sedikit naik), Nada 4 (51 - jatuh tegas bertenaga dari puncak ke dasar), serta Nada Netral (pendek, ringan, santai).",
      tones:
        "Sistem nada Mandarin tidak bergantung pada tinggi suara mutlak penyanyi, melainkan rentang relatif pita suara penutur. Nilai nada 5 adalah titik tertinggi rentang wajar Anda, dan nilai 1 adalah dasar dada terendah Anda.",
      toneCombinations:
        "Kombinasi dua nada penting (Tone Pairs): 1+1 (tiāntiān 天天), 1+4 (fēijī 飞机), 2+4 (shítáng 食堂), 3+1 (lǎoshī 老师), 4+4 (zàijiàn 再见), 4+Netral (xièxie 谢谢).",
      commonErrors:
        "Kesalahan umum penutur Indonesia: (1) Nada 1 kurang tinggi dan tidak rata (sering menurun seperti intonasi akhir kalimat bahasa Indonesia), (2) Nada 2 kurang menanjak tajam (terdengar menggantung datar di tengah), (3) Nada 3 dimulai terlalu tinggi bukannya turun ke dasar dada, (4) Nada 4 diseret panjang melandai bukannya dijatuhkan tegas, (5) Menekan nada netral terlalu keras.",
      articulatoryTip:
        "Gunakan Gerakan Tangan: Gerakkan tanganmu saat berlatih nada! Tangan datar lurus untuk Nada 1 (→), tangan meluncur naik ke atas untuk Nada 2 (↗), tangan melengkung turun ke bawah lalu naik untuk Nada 3 (↘↗), dan tangan menyabet tegas ke bawah untuk Nada 4 (↘). Kinestetik tangan membantu pita suara mengikuti kontur secara naluriah.",
    },

    hanziComponents: [
      {
        hanzi: "妈",
        structure: "Kiri-kanan",
        components: "女 (wanita) + 马 (kuda sebagai fonetik)",
        strokeCount: 6,
        strokeOrderRules: ["Tulis komponen kiri radikal 女 dulu", "Tulis komponen kanan 马"],
        notes: "Melambangkan ibu; contoh utama Nada 1 tinggi datar (mā).",
      },
      {
        hanzi: "马",
        structure: "Tunggal",
        components: "马 (piktograf kuda berkaki dan bersurai)",
        strokeCount: 3,
        strokeOrderRules: ["Sudut mendatar-tegak (横折)", "Garis mendatar-tegak kait (竖折折钩)", "Garis mendatar bawah (横)"],
        notes: "Melambangkan kuda; contoh utama Nada 3 melengkung rendah (mǎ).",
      },
      {
        hanzi: "四",
        structure: "Mengelilingi",
        components: "囗 (bingkai luar) + 儿 (kaki anak)",
        strokeCount: 5,
        strokeOrderRules: ["Tulis garis luar kiri", "Sudut atas-kanan", "Komponen dalam", "Tutup bingkai paling akhir"],
        notes: "Melambangkan angka empat; contoh utama Nada 4 jatuh tegas (sì).",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Sistem Kontur Pitch 5-Tingkat (五度标记法 - Chao Yuen Ren)",
        formula: "Nada 1: 55 | Nada 2: 35 | Nada 3: 214 | Nada 4: 51",
        explanation:
          "Sistem 5 tingkat membagi rentang suara penutur menjadi 5 garis horizontal relatif. Nada 1 bergerak dari tingkat 5 ke 5 (55) secara datar dan tinggi. Nada 2 bergerak dari tingkat 3 ke 5 (35) menanjak lurus seperti intonasi bertanya. Nada 3 berawal di tingkat 2, turun ke dasar dada 1, lalu naik ke 4 (214). Nada 4 meluncur cepat dari puncak 5 langsung ke dasar paling bawah 1 (51) dengan tegas bertenaga.",
        example: "mā (55 - 妈), má (35 - 麻), mǎ (214 - 马), mà (51 - 骂).",
        positiveExamples: [
          { hanzi: "妈", pinyin: "mā", translation: "kontur 55 tinggi datar = ibu" },
          { hanzi: "麻", pinyin: "má", translation: "kontur 35 naik bertanya = rami / kesemutan" },
          { hanzi: "马", pinyin: "mǎ", translation: "kontur 214 melengkung rendah = kuda" },
          { hanzi: "骂", pinyin: "mà", translation: "kontur 51 jatuh tegas bertenaga = memarahi" },
        ],
        usageConstraints:
          "Jangan memaksakan frekuensi nada terlalu tinggi atau terlalu rendah di luar rentang vokal alamimu; yang penting adalah jarak perbedaan antar-tingkat kontur.",
        commonErrors:
          "Menyanyikan nada dengan melodi yang berlebihan sehingga terdengar teatrikal bukannya berbicara wajar.",
        communicativeFunction:
          "Menjamin ketepatan arti kata dasar Mandarin secara presisi tanpa salah tafsir fatal.",
      },
      {
        ruleTitle: "Sifat Akustik Nada Netral (轻声 - Qīngshēng)",
        formula: "Nada suku kata pertama + Nada Netral (ringan, pendek, tidak bertanda)",
        explanation:
          "Nada netral tidak memiliki kontur pitch mandiri yang tetap; tinggi rendahnya bergantung penuh pada nada suku kata sebelumnya: Setelah Nada 1, nada netral bernada sedang-rendah (tingkat 2). Setelah Nada 2, nada netral bernada sedang (tingkat 3). Setelah Nada 3, nada netral bernada sedang-tinggi (tingkat 4). Setelah Nada 4, nada netral bernada sangat rendah (tingkat 1).",
        example: "māma (妈妈 - ibu), bàba (爸爸 - ayah), hǎo de (好的 - baiklah).",
        positiveExamples: [
          { hanzi: "妈妈", pinyin: "māma", translation: "setelah nada 1: ma kedua bernada rendah lembut = ibu" },
          { hanzi: "爸爸", pinyin: "bàba", translation: "setelah nada 4: ba kedua bernada paling rendah pendek = ayah" },
          { hanzi: "好的", pinyin: "hǎo de", translation: "setelah nada 3: de bernada agak tinggi santai = baiklah" },
        ],
        usageConstraints:
          "Dalam penulisan pinyin resmi, suku kata bernada netral TIDAK diberi tanda diakritik nada sama sekali.",
        commonErrors:
          "Memberi penekanan keras atau memanjangkan durasi suku kata bernada netral.",
        communicativeFunction:
          "Menghasilkan irama ujaran yang luwes, santai, dan tidak kaku.",
      },
      {
        ruleTitle: "Aturan Feedback Artikulasi Fonetik (Prinsip Non-Absolut)",
        formula: "Feedback deskriptif berbasis kontur vs klaim keliru 'sempurna'",
        explanation:
          "Sesuai pedoman kurikulum dan prinsip fonetik ilmiah, evaluasi pelafalan tidak boleh menyatakan hasil rekaman 'sempurna'. Evaluasi harus selalu bersifat deskriptif terarah, misalnya: 'kontur belum cukup naik ke tingkat 5', 'awal nada 3 masih terlalu tinggi', atau 'durasi nada 4 masih terseret'. Hal ini melatih kesadaran akustik pembelajar secara realistis.",
        example: "duì (对 - benar), bái (白 - putih).",
        positiveExamples: [
          { hanzi: "对", pinyin: "duì", translation: "evaluasi nada 4: jatuh sudah tegas ke tingkat 1" },
          { hanzi: "白", pinyin: "bái", translation: "evaluasi nada 2: tanjakan pitch sudah stabil dari tingkat 3 ke 5" },
        ],
        usageConstraints:
          "Hindari menilai pelafalan semata-mata dari volume suara atau aksen daerah penutur.",
        commonErrors:
          "Mengira bahwa suara keras otomatis berarti nada keempat sudah benar.",
        communicativeFunction:
          "Membangun pemantauan diri mandiri (self-monitoring) yang objektif.",
      },
    ],

    culturalNotes:
      "Dalam seni tutur tradisional Tiongkok seperti opera Kunqu dan puisi klasik Tang-Song, penguasaan empat nada (Sìshēng) adalah fondasi dari keindahan ritme sastra 'Píngzè' (平仄 - kontras nada datar dan miring). Penutur Mandarin sangat menghargai keindahan musikalitas tutur kata yang seimbang, di mana nada bukan sekadar pembeda arti kamus melainkan ekspresi keharmonisan rasa dan ketegasan sikap.",

    listeningActivity: {
      goal: "Mengidentifikasi kontur pitch 4 nada utama pada suku kata 'ma' melalui perbandingan audio.",
      audioText: "mǎ",
      pinyin: "mǎ",
      translation: "kuda (Nada 3: melengkung rendah)",
      gistQuestion: {
        question:
          "Dengarkan audio suku kata berikut. Manakah kontur intonasi nada yang sedang dilafalkan?",
        options: [
          "Nada 3 (mǎ): Suara turun rendah ke dasar dada lalu sedikit naik (214)",
          "Nada 1 (mā): Suara tinggi dan datar stabil (55)",
          "Nada 2 (má): Suara menanjak naik seperti bertanya (35)",
          "Nada 4 (mà): Suara jatuh tajam dan tegas bertenaga (51)",
        ],
        correctAnswer:
          "Nada 3 (mǎ): Suara turun rendah ke dasar dada lalu sedikit naik (214)",
        explanation:
          "Audio melafalkan kata 'mǎ' (马 - kuda) dengan kontur berayun rendah ke dasar pita suara (Nada ke-3: 214).",
      },
      detailQuestion: {
        question:
          "Pada kata sapaan 'lǎoshī' (老师 - guru), bagaimanakah kombinasi nada yang diucapkan?",
        options: [
          "Kombinasi Nada 3 (rendah) diikuti Nada 1 (tinggi datar)",
          "Kombinasi Nada 1 diikuti Nada 4",
          "Kombinasi Nada 2 diikuti Nada 2",
          "Kombinasi dua nada netral",
        ],
        correctAnswer:
          "Kombinasi Nada 3 (rendah) diikuti Nada 1 (tinggi datar)",
        explanation:
          "Kata 'lǎo' adalah nada ke-3 (rendah) dan 'shī' adalah nada ke-1 (tinggi datar).",
      },
    },

    speakingActivity: {
      prompt:
        "Lafalkan rangkaian empat nada berikut secara berurutan dengan panduan gestur tangan: (1) mā (妈 - tinggi datar), (2) má (麻 - naik bertanya), (3) mǎ (马 - melengkung rendah), (4) mà (骂 - jatuh tegas). Lanjutkan dengan melafalkan kata nada netral 'māma' (妈妈).",
      vocabularySupport: [
        "mā (妈)",
        "má (麻)",
        "mǎ (马)",
        "mà (骂)",
        "māma (妈妈)",
      ],
      evaluationRubric:
        "Pastikan nada 1 stabil tidak menurun di akhir suara, nada 2 menanjak tajam, nada 3 mencapai titik terendah dada, dan nada 4 jatuh cepat bertenaga.",
    },

    readingActivity: {
      textHanzi: "妈妈骑马，马慢，妈妈骂马。",
      textPinyin: "Māma qí mǎ, mǎ màn, māma mà mǎ.",
      textTranslation:
        "Ibu menunggang kuda, kudanya lambat, ibu memarahi kuda.",
      mainIdea:
        "Kalimat rima klasik fonetik yang merangkum seluruh variasi nada suku kata 'ma': mā (nada 1), mǎ (nada 3), mà (nada 4), dan ma (nada netral).",
      questions: [
        {
          question:
            "Berdasarkan rima klasik di atas, kata apakah yang diucapkan dengan Nada Pertama (tinggi datar)?",
          options: [
            "Mā pada kata 'Māma' (ibu)",
            "Mǎ (kuda)",
            "Mà (memarahi)",
            "Màn (lambat)",
          ],
          correctAnswer: "Mā pada kata 'Māma' (ibu)",
          explanation:
            "Suku kata pertama pada 'māma' adalah nada 1 tinggi datar.",
        },
        {
          question:
            "Apa arti dari frasa 'māma mà mǎ' pada penggalan rima di atas?",
          options: [
            "ibu memarahi kuda",
            "ibu menunggang kuda",
            "kuda memarahi ibu",
            "kuda berlari cepat",
          ],
          correctAnswer: "ibu memarahi kuda",
          explanation: "'mà' berarti memarahi dan 'mǎ' berarti kuda.",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tulis karakter '妈' (mā - ibu / 6 goresan), '马' (mǎ - kuda / 3 goresan), dan '四' (sì - empat / 5 goresan) dengan urutan goresan yang tepat.",
      minimumCharacters: 3,
      checklist: [
        "Tulis radikal wanita 女 (titik sudut lengkung, miring kiri, mendatar) di sebelah kiri sebelum karakter 马 di sebelah kanan pada karakter 妈.",
        "Tulis goresan sudut mendatar-tegak, garis mendatar-tegak kait, dan garis mendatar penutup bawah pada karakter 马.",
        "Tulis bingkai luar kiri, bingkai sudut atas-kanan, komponen dalam 儿, lalu tutup bawah pada karakter 四.",
      ],
      modelAnswer: {
        hanzi: "妈妈马四",
        pinyin: "mā mǎ sì",
        translation: "ibu kuda empat",
      },
    },

    personalizationPrompt:
      "Rekam dirimu membaca kalimat rima nada 'Māma qí mǎ, mǎ màn, māma mà mǎ' dengan intonasi yang tegas. Simpan kalimat ini ke dalam Buku Frasa pribadimu sebagai tes mandiri penguasaan 4 nada.",
    errorJournalHooks: [
      "Nada pertama (mā) menurun intonasinya di akhir suku kata seperti intonasi kalimat berita",
      "Nada kedua (má) tidak menanjak cukup tajam ke tingkat 5 sehingga terdengar ragu-ragu",
      "Nada ketiga (mǎ) tidak menyentuh dasar nada terendah pita suara",
      "Nada keempat (mà) diseret melandai panjang bukannya dijatuhkan secara tegas",
      "Memberi penekanan atau intonasi berlebih pada nada netral (qīngshēng)",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna mampu membedakan 4 kontur nada pada suku kata minimal ma/ba/da, melafalkan nada netral secara ringan dan tepat, serta membaca kalimat rima 4 nada tanpa kerancuan kontur.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Gunakan bantuan gestur tangan untuk mengarahkan pita suara dan latih kembali rima 'Māma qí mǎ' secara perlahan.",
    },
  },

  // -------------------------------------------------------------
  // F-07: Tone Sandhi & Perubahan Pelafalan (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "fund-07",
    moduleId: "fundamentals",
    slug: "07",
    unitNumber: 7,
    title: "Tone Sandhi & Perubahan Nada",
    hanzi: "变调规律",
    pinyin: "Biàndiào Guīlǜ",
    translation: "Perubahan Nada Dua Nada 3, Kata 不 (Bù), Kata 一 (Yī) & Nada 3 Separuh",
    objectives:
      "Memahami 4 aturan perubahan nada praktis: aturan dua nada 3 (你好 jadi ní hǎo), perubahan kata 'tidak' (不 jadi bú), perubahan kata 'satu' (一 jadi yí atau yì), serta cara membaca nada 3 santai.",
    overview:
      "Dalam percakapan Mandarin yang mengalir wajar, pita suara manusia secara biologis melakukan modulasi nada (Tone Sandhi) agar ujaran lebih lentur dan efisien. Penulisan Pinyin formal biasanya tetap mempertahankan bentuk kamus asli, namun pelafalan aktual lisan mengikuti aturan sandhi. Menguasai unit ini membuat bicaramu terdengar natural layaknya penutur asli dan tidak patah-patah.",
    vocabCount: 10,
    durationMinutes: 14,
    levelBadge: "FONDASI 07",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["fund-01", "fund-02", "fund-03", "fund-04", "fund-05", "fund-06"],
    skills: ["Perubahan Nada 3+3", "Perubahan Kata 不 (Tidak)", "Perubahan Kata 一 (Satu)", "Nada 3 Santai"],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "Guru Wang (Pengajar) & Lisa (Murid)",
      location: "Klinik Kelancaran Tutur KepoMandarin",
      goal: "Membedah mengapa 'nǐ hǎo' dibaca 'ní hǎo', mengapa 'bù shì' dibaca 'bú shì', dan bagaimana melafalkan 'yī' dalam 'yí ge' vs 'yì tiān'.",
      scenarioNotes:
        "Lisa bingung karena kamus menulis 'nǐ hǎo' dengan nada 3+3, tetapi saat mendengarkan rekaman penutur asli terdengar seperti nada 2+3.",
    },

    dialogue: [
      {
        speaker: "Lisa",
        role: "Murid",
        hanzi: "老师，为什么字典里写 ‘nǐ hǎo’，您说话时却读 ‘ní hǎo’ 呢？",
        pinyin: "Lǎoshī, wèishénme zìdiǎn lǐ xiě ‘nǐ hǎo’, nín shuōhuà shí què dú ‘ní hǎo’ ne?",
        translation:
          "Guru, mengapa di kamus tertulis 'nǐ hǎo', tetapi saat Anda berbicara dilafalkan 'ní hǎo'?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "这是汉语最重要的规律——三声变调！两个第三声连在一起时，连读太费力，所以第一个字自动变成第二声！",
        pinyin:
          "Zhè shì Hànyǔ zuì zhòngyào de guīlǜ——sānshēng biàndiào! Liǎng ge dì-sān shēng lián zài yìqǐ shí, liándú tài fèilì, suǒyǐ dì-yī ge zì zìdòng biànchéng dì-èr shēng!",
        translation:
          "Ini adalah aturan paling penting dalam bahasa Mandarin: Sandhi Nada ke-3! Ketika dua nada ke-3 berdampingan, melafalkannya penuh terlalu melelahkan pita suara, sehingga kata pertama otomatis berubah menjadi nada ke-2!",
      },
      {
        speaker: "Lisa",
        role: "Murid",
        hanzi: "那字典的拼音为什么不直接改成 ‘ní hǎo’ 呢？",
        pinyin: "Nà zìdiǎn de pīnyīn wèishénme bù zhíjiē gǎichéng ‘ní hǎo’ ne?",
        translation: "Lalu mengapa pinyin di kamus tidak langsung diubah menjadi 'ní hǎo' saja?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "为了保持字词的原貌。拼音写本调 (bentuk asal)，嘴巴读变调 (bentuk sandhi kontekstual)。",
        pinyin: "Wèile bǎochí zìcí de yuánmào. Pīnyīn xiě běndiào, zuǐba dú biàndiào.",
        translation:
          "Untuk menjaga keaslian identitas kata. Pinyin menuliskan nada kamus aslinya, namun mulut membacakan nada sandhi kontekstualnya.",
      },
      {
        speaker: "Lisa",
        role: "Murid",
        hanzi: "那 ‘不’ (bù) 和 ‘一’ (yī) 也是这样吗？",
        pinyin: "Nà ‘bù’ hé ‘yī’ yě shì zhèyàng ma?",
        translation: "Lalu apakah kata '不' (bù) dan '一' (yī) juga seperti itu?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "没错！‘不’ 遇到第四声变成第二声 (如 bú shì 不是)；‘一’ 遇到第四声变第二声 (如 yí ge 一个)，遇到一二三声变第四声 (如 yì tiān 一天)！",
        pinyin:
          "Méi cuò! ‘Bù’ yùdào dì-sì shēng biànchéng dì-èr shēng (rú bú shì búshì); ‘yī’ yùdào dì-sì shēng biàn dì-èr shēng (rú yí ge yíge), yùdào yī-èr-sān shēng biàn dì-sì shēng (rú yì tiān yìtiān)!",
        translation:
          "Tepat sekali! '不' bertemu nada 4 berubah menjadi nada 2 (seperti bú shì 不是); '一' bertemu nada 4 berubah menjadi nada 2 (seperti yí ge 一个), bertemu nada 1, 2, 3 berubah menjadi nada 4 (seperti yì tiān 一天)!",
      },
    ],

    vocabulary: [
      {
        hanzi: "你好",
        pinyin: "nǐ hǎo (ní hǎo)",
        tone: "Sandhi 3 + 3 → 2 + 3",
        translation: "halo / apa kabar",
        partOfSpeech: "ungkapan",
        usageNotes: "Kata 'nǐ' berubah nada menjadi nada ke-2 (ní hǎo).",
        exampleHanzi: "你好吗？",
        examplePinyin: "Ní hǎo ma?",
        exampleTranslation: "Apa kabarmu?",
      },
      {
        hanzi: "很好",
        pinyin: "hěn hǎo (hén hǎo)",
        tone: "Sandhi 3 + 3 → 2 + 3",
        translation: "sangat baik",
        partOfSpeech: "adjektiva",
        usageNotes: "Kata 'hěn' berubah nada menjadi nada ke-2 (hén hǎo).",
        exampleHanzi: "我很好。",
        examplePinyin: "Wǒ hén hǎo.",
        exampleTranslation: "Saya sangat baik.",
      },
      {
        hanzi: "可以",
        pinyin: "kěyǐ (kéyǐ)",
        tone: "Sandhi 3 + 3 → 2 + 3",
        translation: "boleh / bisa",
        partOfSpeech: "verba modal",
        usageNotes: "Kata 'kě' berubah nada menjadi nada ke-2 (kéyǐ).",
        exampleHanzi: "可以吗？",
        examplePinyin: "Kéyǐ ma?",
        exampleTranslation: "Bolehkah?",
      },
      {
        hanzi: "不是",
        pinyin: "bú shì",
        tone: "Sandhi 不 + 4 → 2 + 4",
        translation: "bukan / tidak",
        partOfSpeech: "adverba negasi",
        usageNotes: "Kata 'bù' melunak menjadi nada 2 saat bertemu kata bernada 4 'shì'.",
        exampleHanzi: "我不是老师。",
        examplePinyin: "Wǒ bú shì lǎoshī.",
        exampleTranslation: "Saya bukan guru.",
      },
      {
        hanzi: "不要",
        pinyin: "bú yào",
        tone: "Sandhi 不 + 4 → 2 + 4",
        translation: "jangan / tidak mau",
        partOfSpeech: "verba",
        usageNotes: "Kata 'bù' berubah menjadi nada 2 sebelum kata bernada 4 'yào'.",
        exampleHanzi: "不要说话。",
        examplePinyin: "Bú yào shuōhuà.",
        exampleTranslation: "Jangan berbicara.",
      },
      {
        hanzi: "不对",
        pinyin: "bú duì",
        tone: "Sandhi 不 + 4 → 2 + 4",
        translation: "tidak benar / keliru",
        partOfSpeech: "adjektiva",
        usageNotes: "Kata 'bù' berubah menjadi nada 2 sebelum kata bernada 4 'duì'.",
        exampleHanzi: "这不对。",
        examplePinyin: "Zhè bú duì.",
        exampleTranslation: "Ini tidak benar.",
      },
      {
        hanzi: "一个",
        pinyin: "yí ge",
        tone: "Sandhi 一 + 4 → 2 + netral",
        translation: "sebuah / satu orang",
        partOfSpeech: "frasa bilangan",
        usageNotes: "Kata 'yī' berubah menjadi nada 2 sebelum kata bernada 4 'gè'.",
        exampleHanzi: "一个人。",
        examplePinyin: "Yí ge rén.",
        exampleTranslation: "Satu orang.",
      },
      {
        hanzi: "一天",
        pinyin: "yì tiān",
        tone: "Sandhi 一 + 1 → 4 + 1",
        translation: "satu hari",
        partOfSpeech: "frasa waktu",
        usageNotes: "Kata 'yī' berubah menjadi nada 4 sebelum kata bernada 1 'tiān'.",
        exampleHanzi: "学了一天。",
        examplePinyin: "Xué le yì tiān.",
        exampleTranslation: "Belajar satu hari.",
      },
      {
        hanzi: "一起",
        pinyin: "yì qǐ",
        tone: "Sandhi 一 + 3 → 4 + 3",
        translation: "bersama-sama",
        partOfSpeech: "adverba",
        usageNotes: "Kata 'yī' berubah menjadi nada 4 sebelum kata bernada 3 'qǐ'.",
        exampleHanzi: "我们一起去。",
        examplePinyin: "Wǒmen yìqǐ qù.",
        exampleTranslation: "Kita pergi bersama.",
      },
      {
        hanzi: "北京",
        pinyin: "Běijīng",
        tone: "Nada 3 Separuh (21) + Nada 1 (55)",
        translation: "Beijing (ibu kota Tiongkok)",
        partOfSpeech: "nomina",
        usageNotes: "Kata 'Běi' dilafalkan separuh rendah (21) tanpa melompat naik.",
        exampleHanzi: "我去北京。",
        examplePinyin: "Wǒ qù Běijīng.",
        exampleTranslation: "Saya pergi ke Beijing.",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "变调",
        pinyin: "biàndiào",
        tone: "Nada 4 + 4",
        translation: "tone sandhi / modulasi nada kontekstual",
        isEnrichment: true,
        inclusionReason: "Istilah linguistik resmi untuk perubahan nada kata saat digabungkan.",
        exampleHanzi: "汉语的变调很丰富。",
        examplePinyin: "Hànyǔ de biàndiào hěn fēngfù.",
        exampleTranslation: "Tone sandhi dalam bahasa Mandarin sangat kaya.",
      },
      {
        hanzi: "本调",
        pinyin: "běndiào",
        tone: "Nada 3 + 4",
        translation: "nada asli kamus (citation tone)",
        isEnrichment: true,
        inclusionReason: "Bentuk nada dasar suatu karakter saat berdiri mandiri terisolasi.",
        exampleHanzi: "字典标注本调。",
        examplePinyin: "Zìdiǎn biāozhù běndiào.",
        exampleTranslation: "Kamus mencantumkan nada asli kamus.",
      },
      {
        hanzi: "半三声",
        pinyin: "bànsānshēng",
        tone: "Nada 4 + 1 + 1",
        translation: "nada ke-3 separuh (half-third tone)",
        isEnrichment: true,
        inclusionReason: "Kaidah pengucapan nada ke-3 paling umum dalam kalimat mengalir.",
        exampleHanzi: "‘北京’ 里读半三声。",
        examplePinyin: "‘Běijīng’ lǐ dú bànsānshēng.",
        exampleTranslation: "Dalam kata 'Běijīng' dibaca nada ke-3 separuh.",
      },
      {
        hanzi: "连读",
        pinyin: "liándú",
        tone: "Nada 2 + 2",
        translation: "pembacaan mengalir tersambung (connected speech)",
        isEnrichment: true,
        inclusionReason: "Kondisi fonetis alami yang memicu terjadinya sandhi.",
        exampleHanzi: "连读时注意变调。",
        examplePinyin: "Liándú shí zhùyì biàndiào.",
        exampleTranslation: "Perhatikan perubahan nada saat membaca mengalir.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Aturan modulasi nada alami: (1) 3+3 menjadi 2+3, (2) 不 (bù) menjadi bú saat bertemu nada 4, (3) 一 (yī) mandiri bernada 1, menjadi yí sebelum nada 4, dan menjadi yì sebelum nada 1, 2, 3, (4) Nada 3 separuh (turun dari 2 ke 1 tanpa melompat naik) saat mendahului nada 1, 2, 4 atau nada netral.",
      tones:
        "Prinsip Ortografi vs Realisasi Lisan: Pinyin ortografis kamus umumnya tetap menuliskan nada asli (citation tone), namun penutur wajib merealisasikan tone sandhi saat berbicara. Mengetahui perbedaan ini mencegah keterkejutan pembelajar saat mendengar penutur asli.",
      toneCombinations:
        "Sandhi penting dalam HSK 1: nǐ hǎo (ní hǎo), shǒubiǎo (shóubiǎo - jam tangan), bú kèqi (bú kèqi - sama-sama), bú shì (bú shì - bukan), yíkuàir (bersama), yìqǐ (bersama), yìbǎi (seratus).",
      commonErrors:
        "Kesalahan umum penutur Indonesia: (1) Melafalkan dua nada 3 berturut-turut secara kaku dan terputus (nǐ ... hǎo) bukannya mengalir ní hǎo, (2) Membaca 'bú shì' dengan nada 4+4 berat (bù shì), (3) Melafalkan 'yī' selalu dengan nada 1 di segala posisi, (4) Memaksakan nada 3 naik penuh saat berada di tengah frasa.",
      articulatoryTip:
        "Trik Aliran Sungai: Bayangkan nada sandhi seperti perahu di sungai. Jika ada dua turunan tajam (3+3), perahu mengangkat haluan di turunan pertama (berubah jadi nada 2 menanjak) agar tidak karam ke dasar sungai. Jangan berhenti di tengah kata!",
    },

    hanziComponents: [
      {
        hanzi: "不",
        structure: "Tunggal",
        components: "一 (garis atas) + 𠂉 (badan) + 丨 (garis tegak) + 丶 (titik)",
        strokeCount: 4,
        strokeOrderRules: ["Garis mendatar atas (横)", "Garis miring kiri (撇)", "Garis tegak (竖)", "Titik kanan (点)"],
        notes: "Partikel negasi utama; mewakili kaidah sandhi kata 不 (bú sebelum nada 4).",
      },
      {
        hanzi: "一",
        structure: "Tunggal",
        components: "一 (satu garis mendatar lurus)",
        strokeCount: 1,
        strokeOrderRules: ["Satu tarikan garis mendatar dari kiri ke kanan (横)"],
        notes: "Angka satu; mewakili kaidah sandhi tiga nada (yī, yí, yì).",
      },
      {
        hanzi: "好",
        structure: "Kiri-kanan",
        components: "女 (wanita) + 子 (anak)",
        strokeCount: 6,
        strokeOrderRules: ["Tulis komponen kiri radikal 女 terlebih dahulu", "Tulis komponen kanan 子"],
        notes: "Melambangkan kebaikan; komponen penting dalam salam sandhi '你好' (nǐ hǎo).",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Kaidah Dua Nada Ketiga Berurutan (三声变调: 3 + 3 → 2 + 3)",
        formula: "Nada 3 + Nada 3 → dilafalkan Nada 2 + Nada 3 (Pinyin tetap ditulis 3+3)",
        explanation:
          "Secara fisiologis pita suara, melakukan dua penurunan penuh 214 secara berurutan sangat berat dan memperlambat laju bicara. Karena itu, suku kata nada 3 pertama secara otomatis dilafalkan sebagai nada 2 (35 menanjak), sementara suku kata kedua tetap bernada 3 penuh.",
        example: "你好 ditulis nǐ hǎo, dilafalkan ní hǎo; 很好 ditulis hěn hǎo, dilafalkan hén hǎo.",
        positiveExamples: [
          { hanzi: "你好", pinyin: "nǐ hǎo (dilafalkan ní hǎo)", translation: "halo / salam" },
          { hanzi: "很好", pinyin: "hěn hǎo (dilafalkan hén hǎo)", translation: "sangat baik" },
          { hanzi: "可以", pinyin: "kěyǐ (dilafalkan kéyǐ)", translation: "boleh / bisa" },
        ],
        usageConstraints:
          "Aturan ini berlaku otomatis pada semua kata majemuk dua karakter bernada 3 dalam percakapan lisan.",
        commonErrors:
          "Menuliskan pinyin dengan ejaan 'ní hǎo' pada ujian formal (penulisan baku pinyin tetap nǐ hǎo).",
        communicativeFunction:
          "Menjamin kelancaran ritme tutur percakapan sehari-hari.",
      },
      {
        ruleTitle: "Kaidah Sandhi Kata '不' (Bù) dan Kata '一' (Yī)",
        formula: "不 (bù) + Nada 4 → bú + Nada 4 | 一 (yī) + Nada 4 → yí + Nada 4 | 一 (yī) + Nada 1/2/3 → yì",
        explanation:
          "Kata negasi '不' bernada 4 asli, tetapi jika diikuti suku kata yang juga bernada 4, '不' melunak menjadi nada 2 ('bú') untuk menghindari dua letupan tajam beruntun. Kata '一' bernada 1 asli saat berhitung angka (yī, èr, sān), tetapi menjadi nada 2 ('yí') sebelum nada 4, dan menjadi nada 4 ('yì') sebelum nada 1, 2, atau 3.",
        example: "bú shì (不是), bú qù (不去); yí ge (一个), yì tiān (一天), yìqǐ (一起).",
        positiveExamples: [
          { hanzi: "不是", pinyin: "bú shì", translation: "bù + nada 4 shì → bú shì = bukan" },
          { hanzi: "一个", pinyin: "yí ge", translation: "yī + nada 4 ge → yí ge = sebuah" },
          { hanzi: "一天", pinyin: "yì tiān", translation: "yī + nada 1 tiān → yì tiān = satu hari" },
          { hanzi: "一起", pinyin: "yì qǐ", translation: "yī + nada 3 qǐ → yì qǐ = bersama-sama" },
        ],
        usageConstraints:
          "Jika kata '一' berfungsi sebagai nomor urut (seperti dì-yī 第一 - pertama) atau nomor telepon/kamar, nadanya tetap nada 1 murni (yī).",
        commonErrors:
          "Membaca 'bù shì' dan 'yī ge' dengan nada datar kaku.",
        communicativeFunction:
          "Menghidupkan intonasi percakapan agar terdengar fasih dan dinamis.",
      },
      {
        ruleTitle: "Fenomena Nada Ketiga Separuh (半三声 - Half-Third Tone)",
        formula: "Nada 3 + Nada 1/2/4/Netral → Nada 3 dilafalkan separuh (kontur 21 tanpa lompatan naik)",
        explanation:
          "Ketika suku kata bernada 3 diikuti oleh suku kata yang bernada 1, 2, 4, atau nada netral, nada 3 tersebut tidak dibaca penuh 214. Pita suara hanya membunyikan bagian penurunan rendah (21) lalu langsung menyambung ke nada berikutnya tanpa menaikkan suara kembali.",
        example: "Běijīng (北京 - Beijing), hěn duō (很多 - banyak), qǐngwèn (请问 - numpang tanya).",
        positiveExamples: [
          { hanzi: "北京", pinyin: "Běijīng", translation: "Běi (turun rendah 21) + jīng (tinggi datar 55) = Beijing" },
          { hanzi: "很多", pinyin: "hěn duō", translation: "hěn (rendah 21) + duō (55) = banyak" },
          { hanzi: "请问", pinyin: "qǐngwèn", translation: "qǐng (rendah 21) + wèn (51) = numpang tanya" },
        ],
        usageConstraints:
          "Bentuk penuh 214 HANYA dilafalkan saat suku kata nada 3 berdiri mandiri di akhir kalimat atau diucapkan sangat lambat terisolasi.",
        commonErrors:
          "Memaksakan nada 3 berayun naik saat membaca 'Běijīng' sehingga ritmenya tersendat.",
        communicativeFunction:
          "Menjaga stamina pita suara dan kecepatan berbicara dalam kalimat panjang.",
      },
    ],

    culturalNotes:
      "Di Tiongkok, salam paling universal '你好' (nǐ hǎo) yang dilafalkan 'ní hǎo' adalah etiket sosial paling mendasar. Menyapa dengan nada yang tepat menunjukkan penghormatan dan keramahan. Kata '不' (bù) yang melunak menjadi 'bú' saat bertemu penolakan tegas seperti 'bú yào' (不要) atau 'bú shì' (不是) mencerminkan kehalusan rasa bahasa Mandarin dalam meredam ketegangan artikulasi, menciptakan harmoni bunyi yang selaras dengan nilai kesopanan Timur.",

    listeningActivity: {
      goal: "Mengidentifikasi perubahan nada sandhi kontekstual pada frasa 'nǐ hǎo' dan 'bú shì'.",
      audioText: "nǐ hǎo",
      pinyin: "ní hǎo",
      translation: "halo (dua nada 3 dilafalkan 2+3)",
      gistQuestion: {
        question:
          "Dengarkan audio frasa 'nǐ hǎo' (你好) berikut. Bagaimanakah nada suku kata pertama 'nǐ' direalisasikan secara lisan?",
        options: [
          "Direalisasikan naik seperti Nada ke-2 (ní hǎo)",
          "Direalisasikan melengkung rendah penuh Nada ke-3 (nǐ hǎo)",
          "Direalisasikan jatuh tegas Nada ke-4 (nì hǎo)",
          "Direalisasikan tinggi datar Nada ke-1 (nī hǎo)",
        ],
        correctAnswer: "Direalisasikan naik seperti Nada ke-2 (ní hǎo)",
        explanation:
          "Sesuai kaidah sandhi 3+3, suku kata 'nǐ' otomatis dilafalkan sebagai nada ke-2 menanjak (ní hǎo).",
      },
      detailQuestion: {
        question:
          "Bagaimanakah pelafalan kata '一' (yī) yang tepat pada frasa '一个' (sebuah) dan '一天' (satu hari)?",
        options: [
          "'yí ge' (nada 2 sebelum nada 4) dan 'yì tiān' (nada 4 sebelum nada 1)",
          "'yī ge' dan 'yī tiān' keduanya tetap nada 1",
          "'yì ge' dan 'yí tiān' (kebalikan)",
          "'yí ge' dan 'yí tiān' keduanya nada 2",
        ],
        correctAnswer:
          "'yí ge' (nada 2 sebelum nada 4) dan 'yì tiān' (nada 4 sebelum nada 1)",
        explanation:
          "Kata '一' berubah menjadi nada 2 ('yí') sebelum nada 4 (ge), dan berubah menjadi nada 4 ('yì') sebelum nada 1 (tiān).",
      },
    },

    speakingActivity: {
      prompt:
        "Latih pelafalan sandhi mengalir berikut secara berulang tanpa jeda kaku: (1) nǐ hǎo → dilafalkan ní hǎo, (2) hěn hǎo → dilafalkan hén hǎo, (3) bú shì → dilafalkan bú shì, (4) yí ge → dilafalkan yí ge, (5) yì tiān → dilafalkan yì tiān.",
      vocabularySupport: [
        "nǐ hǎo (你好)",
        "hěn hǎo (很好)",
        "bú shì (不是)",
        "yí ge (一个)",
        "yì tiān (一天)",
      ],
      evaluationRubric:
        "Pastikan suku kata pertama naik mulus pada nǐ hǎo dan bú shì, serta transisi tempo terdengar alami tanpa jeda buatan.",
    },

    readingActivity: {
      textHanzi: "你好！我很好。今天不是星期天，我们一起去北京，买一个手表。",
      textPinyin:
        "Nǐ hǎo! Wǒ hěn hǎo. Jīntiān bú shì xīngqītiān, wǒmen yìqǐ qù Běijīng, mǎi yí ge shǒubiǎo.",
      textTranslation:
        "Halo! Saya sangat baik. Hari ini bukan hari Minggu, kita pergi ke Beijing bersama-sama, membeli sebuah jam tangan.",
      mainIdea:
        "Sebuah teks percakapan pendek yang memadukan keempat jenis sandhi nada: nǐ hǎo (3+3), hěn hǎo (3+3), bú shì (不+4), yìqǐ (一+3), Běijīng (nada 3 separuh), yí ge (一+4), dan shǒubiǎo (3+3).",
      questions: [
        {
          question:
            "Pada teks di atas, manakah pasangan kata yang mengalami perubahan nada '不' menjadi nada kedua (bú)?",
          options: [
            "bú shì (不是 - bukan)",
            "xīngqītiān (星期天 - hari Minggu)",
            "yìqǐ (一起 - bersama)",
            "shǒubiǎo (手表 - jam tangan)",
          ],
          correctAnswer: "bú shì (不是 - bukan)",
          explanation:
            "Kata '不' bertemu suku kata bernada 4 'shì' sehingga dilafalkan 'bú shì'.",
        },
        {
          question:
            "Bagaimanakah suku kata 'shǒu' pada kata 'shǒubiǎo' (手表 - jam tangan) dilafalkan?",
          options: [
            "Dilafalkan dengan Nada ke-2 menanjak (shóubiǎo)",
            "Dilafalkan dengan Nada ke-4 (shòubiǎo)",
            "Dilafalkan dengan Nada ke-1 (shōubiǎo)",
            "Dilafalkan dengan nada netral",
          ],
          correctAnswer: "Dilafalkan dengan Nada ke-2 menanjak (shóubiǎo)",
          explanation:
            "Karena 'shǒu' (nada 3) bertemu 'biǎo' (nada 3), 'shǒu' berubah nada menjadi nada ke-2 (shóu).",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tulis karakter '不' (bù - tidak / 4 goresan), '一' (yī - satu / 1 goresan), dan '好' (hǎo - baik / 6 goresan) dengan urutan goresan yang tepat.",
      minimumCharacters: 3,
      checklist: [
        "Tulis goresan mendatar (横), garis miring kiri (撇), garis tegak (竖), dan titik miring kanan (点) pada karakter 不.",
        "Tulis satu garis mendatar tegas dari kiri ke kanan pada karakter 一.",
        "Tulis radikal wanita 女 di sebelah kiri terlebih dahulu sebelum karakter anak 子 di sebelah kanan pada karakter 好.",
      ],
      modelAnswer: {
        hanzi: "不一好",
        pinyin: "bù yī hǎo",
        translation: "tidak satu baik",
      },
    },

    personalizationPrompt:
      "Rekam suaramu menyapa 'Nǐ hǎo, wǒ hěn hǎo!' dengan pelafalan sandhi yang mengalir (ní hǎo, wǒ hén hǎo). Simpan kedua frasa ini ke dalam Buku Frasa pribadimu sebagai bukti penguasaan kaidah sandhi 3+3.",
    errorJournalHooks: [
      "Melafalkan dua nada 3 berdampingan (seperti nǐ hǎo) secara kaku tanpa mengubah kata pertama menjadi nada ke-2",
      "Membaca 'bú shì' dengan nada 4+4 berat bukannya melunakkan '不' menjadi nada ke-2",
      "Melafalkan '一' selalu dengan nada 1 di segala posisi frasa",
      "Memaksakan nada 3 berayun naik penuh di tengah kata (seperti pada Běijīng)",
      "Mengubah tanda pinyin resmi dalam tulisan teks formal menjadi tanda sandhi (misal menulis 'ní hǎo' bukannya 'nǐ hǎo')",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna mampu menerapkan sandhi 3+3 (ní hǎo), sandhi 不 (bú shì), sandhi 一 (yí ge / yì tiān), dan nada 3 separuh secara spontan saat membaca teks mengalir.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Latih kembali teknik shadowing frasa 'nǐ hǎo' dan 'bú shì' mengikuti ritme penutur asli tanpa jeda antarkata.",
    },
  },

  // -------------------------------------------------------------
  // F-08: Aturan Penulisan Pinyin (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "fund-08",
    moduleId: "fundamentals",
    slug: "08",
    unitNumber: 8,
    title: "Aturan Penulisan Pinyin",
    hanzi: "拼写规则",
    pinyin: "Pīnxiě Guīzé",
    translation: "Posisi Tanda Nada, Apostrof Pemisah, Kapitalisasi Nama & Aturan Semivokal y/w",
    objectives:
      "Menguasai kaidah baku ortografi internasional Hanyu Pinyin: urutan vokal penempatan tanda nada (a > o > e > i/u), tanda apostrof pemisah batas suku kata (géyīn fúhào), kaidah penulisan huruf semivokal y dan w, aturan kapitalisasi nama diri dan tempat, serta pemisahan kata majemuk.",
    overview:
      "Hanyu Pinyin memiliki aturan ortografi resmi (ISO 7098) yang dirancang secara matematis untuk menghindari kerancuan pembacaan batas suku kata. Kesalahan penempatan tanda nada atau ketidakhadiran tanda apostrof dapat memicu salah tafsir fatal (misalnya: Xī'ān 西安 kota Xi'an vs xiān 先 terlebih dahulu). Unit ini membekali pembelajar dengan pemahaman ortografis yang presisi dan profesional.",
    vocabCount: 10,
    durationMinutes: 14,
    levelBadge: "FONDASI 08",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["fund-01", "fund-02", "fund-03", "fund-04", "fund-05", "fund-06", "fund-07"],
    skills: ["Ortografi Pinyin", "Penempatan Nada", "Apostrof Pemisah", "Kapitalisasi"],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "Guru Wang (Pengajar) & Budi (Murid)",
      location: "Studio Tipografi KepoMandarin",
      goal: "Membedah mengapa tanda nada pada 'liù' ada di atas 'u' bukannya 'i', mengapa nama kota 'Xī'ān' wajib memakai tanda petik tunggal (apostrof), dan kaidah kapitalisasi nama orang Tionghoa.",
      scenarioNotes:
        "Budi bingung menempatkan tanda nada saat ada dua vokal berdampingan (seperti iu dan ui) serta sering lupa menambahkan apostrof pemisah suku kata.",
    },

    dialogue: [
      {
        speaker: "Budi",
        role: "Murid",
        hanzi: "老师，‘liù’ (六) 和 ‘duì’ (对) 都有两个元音，声调到底该标在谁头上？",
        pinyin: "Lǎoshī, ‘liù’ (liù) hé ‘duì’ (duì) dōu yǒu liǎng ge yuányīn, shēngdiào dàodǐ gāi biāo zài shuí tóu shang?",
        translation:
          "Guru, kata 'liù' dan 'duì' keduanya punya dua vokal, tanda nada sebenarnya harus ditaruh di atas huruf yang mana?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "记住这个顺口溜：有 a 标 a，没 a 找 o、e；i、u 并列标在后！所以在 ‘liù’ 标在 u，在 ‘duì’ 标在 i！",
        pinyin:
          "Jìzhù zhè ge shùnkǒuliū: yǒu a biāo a, méi a zhǎo o, e; i, u bìngliè biāo zài hòu! Suǒyǐ zài ‘liù’ biāo zài u, zài ‘duì’ biāo zài i!",
        translation:
          "Ingat rima hafalan ini: jika ada a beri nada pada a; jika tidak ada a, cari o atau e; jika i dan u berdampingan, beri nada pada huruf di belakang! Maka pada 'liù' nada di atas u, dan pada 'duì' nada di atas i!",
      },
      {
        speaker: "Budi",
        role: "Murid",
        hanzi: "太顺口了！那为什么西安写成 ‘Xī'ān’，中间要加一个撇号 (apostrof)？",
        pinyin: "Tài shùnkǒu le! Nà wèishénme Xī'ān xiěchéng ‘Xī'ān’, zhōngjiān yào jiā yí ge piěhào (apostrof)?",
        translation:
          "Sangat mudah dihafal! Lalu mengapa Xi'an ditulis 'Xī'ān', di tengahnya harus ditambah tanda apostrof?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "因为如果去掉撇号写成 ‘xīān’，别人会误读成单个字 ‘xiān’ (先 - 之前)！撇号的作用是隔开音节。",
        pinyin:
          "Yīnwèi rúguǒ qùdiào piěhào xiěchéng ‘xīān’, biérén huì wùdú chéng dāngè zì ‘xiān’ (xiān - zhīqián)! Piěhào de zuòyòng shì gékāi yīnjié.",
        translation:
          "Karena jika apostrofnya dihilangkan dan ditulis 'xīān', orang lain akan keliru membacanya sebagai satu kata tunggal 'xiān' (先 - duluan)! Fungsi apostrof adalah memisahkan batas suku kata.",
      },
      {
        speaker: "Budi",
        role: "Murid",
        hanzi: "原来如此！还有写人名的时候，姓和名要怎么大写？",
        pinyin: "Yuánlái rúcǐ! Hái yǒu xiě rénmíng de shíhou, xìng hé míng yào zěnme dàxiě?",
        translation: "Ternyata begitu! Lalu saat menulis nama orang, bagaimana aturan huruf kapital marga dan nama?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi: "姓 (marga) 和名 (nama diri) 首字母大写，并且分写。例如：Wáng Fāng (王芳) 和 Lǐ Míng (李明)。",
        pinyin:
          "Xìng hé míng shǒuzìmǔ dàxiě, bìngqiě fēnxiě. Lìrú: Wáng Fāng (Wáng Fāng) hé Lǐ Míng (Lǐ Míng).",
        translation:
          "Huruf pertama marga dan nama diri diawali huruf kapital, dan ditulis terpisah. Contoh: Wáng Fāng dan Lǐ Míng.",
      },
    ],

    vocabulary: [
      {
        hanzi: "标调",
        pinyin: "biāodiào",
        tone: "Nada 1 + Nada 4",
        translation: "penempatan tanda nada",
        partOfSpeech: "verba / nomina",
        usageNotes: "Aturan resmi meletakkan tanda nada pada vokal yang tepat.",
        exampleHanzi: "正确标调。",
        examplePinyin: "Zhèngquè biāodiào.",
        exampleTranslation: "Menempatkan tanda nada dengan benar.",
      },
      {
        hanzi: "规则",
        pinyin: "guīzé",
        tone: "Nada 1 + Nada 2",
        translation: "aturan / kaidah baku",
        partOfSpeech: "nomina",
        usageNotes: "Kaidah standar ortografi ISO 7098.",
        exampleHanzi: "拼音规则。",
        examplePinyin: "Pīnyīn guīzé.",
        exampleTranslation: "Aturan ortografi pinyin.",
      },
      {
        hanzi: "符号",
        pinyin: "fúhào",
        tone: "Nada 2 + Nada 4",
        translation: "simbol / tanda",
        partOfSpeech: "nomina",
        usageNotes: "Termasuk tanda diakritik nada dan tanda apostrof.",
        exampleHanzi: "隔音符号。",
        examplePinyin: "Géyīn fúhào.",
        exampleTranslation: "Tanda pemisah suku kata (apostrof).",
      },
      {
        hanzi: "西安",
        pinyin: "Xī'ān",
        tone: "Nada 1 + Nada 1 (berapostrof)",
        translation: "Kota Xi'an (ibu kota provinsi Shaanxi)",
        partOfSpeech: "nomina proper",
        usageNotes: "Membutuhkan tanda apostrof (') pemisah antara Xī dan ān.",
        exampleHanzi: "去西安旅游。",
        examplePinyin: "Qù Xī'ān lǚyóu.",
        exampleTranslation: "Pergi berwisata ke Xi'an.",
      },
      {
        hanzi: "先",
        pinyin: "xiān",
        tone: "Nada 1 (satu suku kata)",
        translation: "terlebih dahulu / duluan",
        partOfSpeech: "adverba",
        usageNotes: "Satu suku kata tunggal tanpa apostrof; kontras dari Xī'ān.",
        exampleHanzi: "你先请。",
        examplePinyin: "Nǐ xiān qǐng.",
        exampleTranslation: "Silakan Anda terlebih dahulu.",
      },
      {
        hanzi: "皮袄",
        pinyin: "pí'ǎo",
        tone: "Nada 2 + Nada 3 (berapostrof)",
        translation: "jaket kulit berbulu",
        partOfSpeech: "nomina",
        usageNotes: "Membutuhkan apostrof pemisah antara pí dan ǎo.",
        exampleHanzi: "穿皮袄。",
        examplePinyin: "Chuān pí'ǎo.",
        exampleTranslation: "Mengenakan jaket kulit berbulu.",
      },
      {
        hanzi: "飘",
        pinyin: "piāo",
        tone: "Nada 1 (satu suku kata)",
        translation: "melayang / berkibar",
        partOfSpeech: "verba",
        usageNotes: "Satu suku kata tunggal; kontras dari pí'ǎo.",
        exampleHanzi: "随风飘。",
        examplePinyin: "Suí fēng piāo.",
        exampleTranslation: "Melayang mengikuti angin.",
      },
      {
        hanzi: "天安门",
        pinyin: "Tiān'ānmén",
        tone: "Nada 1 + Nada 1 + Nada 2",
        translation: "Gerbang Tiananmen",
        partOfSpeech: "nomina proper",
        usageNotes: "Apostrof memisahkan Tiān dan ān.",
        exampleHanzi: "北京天安门。",
        examplePinyin: "Běijīng Tiān'ānmén.",
        exampleTranslation: "Tiananmen Beijing.",
      },
      {
        hanzi: "北京",
        pinyin: "Běijīng",
        tone: "Nada 3 + Nada 1",
        translation: "Beijing (ibu kota Tiongkok)",
        partOfSpeech: "nomina proper",
        usageNotes: "Nama tempat ditulis digabung dengan huruf awal kapital.",
        exampleHanzi: "去北京。",
        examplePinyin: "Qù Běijīng.",
        exampleTranslation: "Pergi ke Beijing.",
      },
      {
        hanzi: "王芳",
        pinyin: "Wáng Fāng",
        tone: "Nada 2 + Nada 1",
        translation: "Wang Fang (nama orang)",
        partOfSpeech: "nomina proper",
        usageNotes: "Marga (Wáng) dan nama diri (Fāng) ditulis terpisah dengan huruf awal kapital.",
        exampleHanzi: "王芳是学生。",
        examplePinyin: "Wáng Fāng shì xuésheng.",
        exampleTranslation: "Wang Fang adalah seorang pelajar.",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "隔音符号",
        pinyin: "géyīn fúhào",
        tone: "Nada 2 + 1 + 2 + 4",
        translation: "tanda apostrof pemisah suku kata ( ' )",
        isEnrichment: true,
        inclusionReason: "Tanda baca ortografis resmi paling penting dalam sistem Hanyu Pinyin.",
        exampleHanzi: "使用隔音符号。",
        examplePinyin: "Shǐyòng géyīn fúhào.",
        exampleTranslation: "Menggunakan tanda pemisah suku kata.",
      },
      {
        hanzi: "标调规则",
        pinyin: "biāodiào guīzé",
        tone: "Nada 1 + 4 + 1 + 2",
        translation: "aturan penempatan tanda nada",
        isEnrichment: true,
        inclusionReason: "Kaidah tata letak diakritik nada pada huruf vokal.",
        exampleHanzi: "掌握标调规则。",
        examplePinyin: "Zhǎngwò biāodiào guīzé.",
        exampleTranslation: "Kuasai aturan penempatan tanda nada.",
      },
      {
        hanzi: "大小写",
        pinyin: "dàxiǎoxiě",
        tone: "Nada 4 + 3 + 3",
        translation: "huruf kapital dan huruf kecil",
        isEnrichment: true,
        inclusionReason: "Kaidah penulisan huruf awal kalimat, nama diri, dan nama tempat.",
        exampleHanzi: "区分大小写。",
        examplePinyin: "Qūfēn dàxiǎoxiě.",
        exampleTranslation: "Membedakan huruf kapital dan kecil.",
      },
      {
        hanzi: "分词连写",
        pinyin: "fēncí liánxiě",
        tone: "Nada 1 + 2 + 2 + 3",
        translation: "pemisahan antarkata dan perangkaian kata majemuk",
        isEnrichment: true,
        inclusionReason: "Prinsip ortografi dasar: suku kata dalam satu kata dirangkai, antarkata dipisahkan spasi.",
        exampleHanzi: "按词分写。",
        examplePinyin: "Àn cí fēnxiě.",
        exampleTranslation: "Tulis terpisah menurut kata.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Kaidah ortografi visual: Urutan prioritas vokal a > o > e > i / u. Kasus khusus pasangan iu dan ui (tanda nada selalu pada vokal kedua). Pelepasan titik pada vokal i saat diberi nada (ī, í, ǐ, ì titik dihilangkan). Pelepasan titik ü menjadi u setelah j, q, x, y.",
      tones:
        "Penggunaan Apostrof (géyīn fúhào '): Wajib digunakan di depan suku kata yang diawali vokal a, o, atau e apabila suku kata tersebut bersambung dengan suku kata sebelumnya, agar tidak terjadi kerancuan segmentasi bunyi.",
      toneCombinations:
        "Pasangan ambiguitas ejaan: Xī'ān (西安 - 2 suku kata) vs xiān (先 - 1 suku kata); pí'ǎo (皮袄 - 2 suku kata) vs piāo (飘 - 1 suku kata); fāng'àn (方案 - rancangan) vs fāngān (tidak ada/rancu).",
      commonErrors:
        "Kesalahan umum penutur Indonesia: (1) Menaruh tanda nada di atas 'i' pada kata 'liù' (keliru menulis lìu), (2) Menulis nama orang digabung tanpa spasi atau tanpa huruf kapital (misal: wangfang atau Wángfāng), (3) Melupakan tanda apostrof pada Xi'an sehingga dieja xian, (4) Menulis tanda nada di atas konsonan n atau ng.",
      articulatoryTip:
        "Ingat Rumus Piramida Vokal: a (paling lebar) → o/e (sedang) → i/u (sempit). Tanda nada selalu mencari vokal yang mulutnya paling terbuka. Khusus jika dua vokal sempit i dan u berebut, yang datang belakangan yang menang!",
    },

    hanziComponents: [
      {
        hanzi: "西",
        structure: "Tunggal",
        components: "西 (piktograf sarang burung / barat)",
        strokeCount: 6,
        strokeOrderRules: ["Garis mendatar atas (横)", "Garis tegak kiri (竖)", "Sudut mendatar-tegak kotak (横折)", "Komponen dalam", "Tutup bawah"],
        notes: "Melambangkan barat; komponen pertama dalam nama kota Xī'ān (西安).",
      },
      {
        hanzi: "安",
        structure: "Atas-bawah",
        components: "宀 (radikal atap rumah) + 女 (wanita di dalam rumah)",
        strokeCount: 6,
        strokeOrderRules: ["Tulis komponen atas radikal atap 宀", "Tulis komponen bawah radikal wanita 女"],
        notes: "Melambangkan ketenangan/keamanan; suku kata yang membutuhkan tanda apostrof pemisah.",
      },
      {
        hanzi: "先",
        structure: "Atas-bawah",
        components: "⺧ (kaki depan) + 儿 (kaki melangkah)",
        strokeCount: 6,
        strokeOrderRules: ["Goresan miring kiri atas (撇)", "Garis mendatar pendek (横)", "Garis tegak tengah (竖)", "Garis mendatar panjang (横)", "Garis kaki kiri dan kanan"],
        notes: "Melambangkan terlebih dahulu; kata satu suku kata pembanding Xī'ān.",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Urutan Hierarki Penempatan Tanda Nada (标调规则)",
        formula: "a → o / e → vokal urutan kedua pada iu & ui",
        explanation:
          "Tanda nada selalu diposisikan di atas vokal utama. Jika suku kata memiliki vokal 'a', tanda nada selalu diletakkan di atas 'a'. Jika tidak ada 'a', cari 'o' atau 'e'. Jika vokal 'i' dan 'u' berdampingan (seperti pada iu atau ui), tanda nada diletakkan pada huruf yang berada di urutan kedua (misal: liù, guì). Saat vokal 'i' diberi nada, titik di atasnya dilepas dan digantikan oleh tanda nada (ī, í, ǐ, ì).",
        example: "hào (di atas a), hěn (di atas e), liù (di atas u), guì (di atas i).",
        positiveExamples: [
          { hanzi: "好", pinyin: "hǎo", translation: "ada vokal a → tanda nada di atas a" },
          { hanzi: "六", pinyin: "liù", translation: "kombinasi iu → tanda nada pada huruf kedua u" },
          { hanzi: "对", pinyin: "duì", translation: "kombinasi ui → tanda nada pada huruf kedua i" },
          { hanzi: "你", pinyin: "nǐ", translation: "vokal i tunggal → titik i diganti tanda nada caron" },
        ],
        usageConstraints:
          "Konsonan inisial maupun nasal (-n, -ng) tidak pernah boleh diberi tanda nada.",
        commonErrors:
          "Menulis tanda nada di atas huruf pertama pada singkatan 'iu' (misal menulis 'lìu' bukannya 'liù').",
        communicativeFunction:
          "Menghasilkan teks pinyin yang terstandarisasi internasional secara akurat.",
      },
      {
        ruleTitle: "Fungsi dan Penggunaan Tanda Apostrof Pemisah (隔音符号 Géyīn Fúhào)",
        formula: "Suku kata berawal a, o, e setelah suku kata lain → bubuhkan tanda apostrof (')",
        explanation:
          "Ketika suku kata yang diawali oleh vokal a, o, atau e menyambung langsung setelah suku kata lain dalam satu kata majemuk, tanda petik tunggal (') wajib disisipkan tepat di perbatasan antarsuku kata untuk mencegah penggabungan yang keliru.",
        example: "Xī'ān (西安 - Kota Xi'an), pí'ǎo (皮袄 - jaket kulit bulu), Tiān'ānmén (天安门 - Gerbang Tiananmen).",
        positiveExamples: [
          { hanzi: "西安", pinyin: "Xī'ān", translation: "Xī + ān dipisahkan apostrof = Kota Xi'an" },
          { hanzi: "皮袄", pinyin: "pí'ǎo", translation: "pí + ǎo dipisahkan apostrof = jaket kulit bulu" },
          { hanzi: "天安门", pinyin: "Tiān'ānmén", translation: "Tiān + ān dipisahkan apostrof = Gerbang Tiananmen" },
        ],
        usageConstraints:
          "Apostrof HANYA dibutuhkan jika suku kata kedua diawali oleh huruf a, o, atau e.",
        commonErrors:
          "Menulis 'Xian' tanpa apostrof sehingga disalahartikan sebagai kata 'xiān' (先 - terlebih dahulu).",
        communicativeFunction:
          "Mencegah ambiguitas interpretasi bunyi dan arti kata dalam dokumen resmi.",
      },
      {
        ruleTitle: "Kaidah Huruf Kapital Nama Diri dan Tempat (大写规则)",
        formula: "Nama orang: Marga Nama (terpisah kapital) | Nama tempat: gabung kapital",
        explanation:
          "Pada nama orang Tionghoa, nama marga (Xìng) dan nama diri (Míng) ditulis terpisah dengan huruf pertama masing-masing dikapitalisasi (misal: Wáng Fāng, Lǐ Míng). Pada nama tempat geografis resmi, suku kata pembentuk digabungkan dengan huruf awal dikapitalisasi (misal: Běijīng, Shànghǎi, Guǎngzhōu). Kata pertama dalam kalimat juga wajib diawali huruf kapital.",
        example: "Wáng Fāng (王芳), Běijīng (北京), Shànghǎi (上海).",
        positiveExamples: [
          { hanzi: "王明", pinyin: "Wáng Míng", translation: "Marga Wáng + Nama Míng ditulis kapital terpisah" },
          { hanzi: "北京", pinyin: "Běijīng", translation: "Nama kota digabung dengan huruf kapital awal" },
        ],
        usageConstraints:
          "Gelar kehormatan seperti 'Lǎoshī' (Guru) atau 'Xiānsheng' (Tuan) ditulis terpisah dari nama (misal: Wáng Lǎoshī).",
        commonErrors:
          "Menulis nama diri orang Tionghoa digabung rapat tanpa spasi (misal menulis 'Wangming').",
        communicativeFunction:
          "Menjamin kepatuhan standar internasional ejaan nama identitas paspor dan dokumen formal.",
      },
    ],

    culturalNotes:
      "Sistem Hanyu Pinyin secara resmi diciptakan pada tahun 1958 oleh tim linguis Tiongkok yang dipimpin oleh Zhou Youguang (dijuluki 'Bapak Pinyin'). Pada tahun 1982, Pinyin disahkan oleh International Organization for Standardization (ISO 7098) sebagai standar romanisasi internasional resmi untuk bahasa Mandarin. Memahami aturan ortografinya secara disiplin menghargai jembatan ilmiah yang menghubungkan kebudayaan Tiongkok dengan dunia modern.",

    listeningActivity: {
      goal: "Membedakan kata bersuku kata ganda dengan apostrof pemisah (Xī'ān) vs kata suku kata tunggal (xiān).",
      audioText: "Xī'ān",
      pinyin: "Xī'ān",
      translation: "Kota Xi'an (dua suku kata berapostrof)",
      gistQuestion: {
        question:
          "Dengarkan audio berikut. Apakah audio melafalkan nama kota dua suku kata 'Xī'ān' (西安) atau kata satu suku kata 'xiān' (先)?",
        options: [
          "Nama kota dua suku kata berpemisah 'Xī'ān' (西安)",
          "Kata satu suku kata 'xiān' (先 - terlebih dahulu)",
        ],
        correctAnswer: "Nama kota dua suku kata berpemisah 'Xī'ān' (西安)",
        explanation:
          "Audio melafalkan dua suku kata terpisah secara beruntun: 'Xī' lalu 'ān', yang dalam ortografi wajib ditulis 'Xī'ān' menggunakan apostrof pemisah.",
      },
      detailQuestion: {
        question:
          "Manakah penulisan pinyin yang benar untuk angka 'enam' (liù) dan kata 'benar' (duì)?",
        options: [
          "'liù' (tanda di atas u) dan 'duì' (tanda di atas i)",
          "'lìu' (tanda di atas i) dan 'dùy' (tanpa i)",
          "'liù' dan 'dùi' (tanda di atas u)",
          "'līu' dan 'dūi'",
        ],
        correctAnswer: "'liù' (tanda di atas u) dan 'duì' (tanda di atas i)",
        explanation:
          "Sesuai aturan hierarki penempatan nada, jika vokal 'i' dan 'u' berdampingan, tanda nada selalu diletakkan pada huruf vokal yang berada di urutan kedua.",
      },
    },

    speakingActivity: {
      prompt:
        "Lafalkan pasangan kata pembeda segmentasi suku kata berikut dengan artikulasi batas kata yang jelas: (1) Xī'ān (西安 - dua ketukan) vs xiān (先 - satu ketukan), (2) pí'ǎo (皮袄 - dua ketukan) vs piāo (飘 - satu ketukan), (3) Tiān'ānmén (天安门 - tiga ketukan).",
      vocabularySupport: [
        "Xī'ān (西安)",
        "xiān (先)",
        "pí'ǎo (皮袄)",
        "piāo (飘)",
        "Tiān'ānmén (天安门)",
      ],
      evaluationRubric:
        "Pastikan ada jeda mikro alami saat mengucapkan suku kata berapostrof, dan jeda tersebut tidak terputus secara berlebihan.",
    },

    readingActivity: {
      textHanzi: "王明去西安旅游。他先去天安门，然后坐飞机去北京。天气很好，买了一件新皮袄。",
      textPinyin:
        "Wáng Míng qù Xī'ān lǚyóu. Tā xiān qù Tiān'ānmén, ránhòu zuò fēijī qù Běijīng. Tiānqì hěn hǎo, mǎi le yí jiàn xīn pí'ǎo.",
      textTranslation:
        "Wang Ming pergi berwisata ke Xi'an. Dia terlebih dahulu pergi ke Tiananmen, kemudian naik pesawat terbang ke Beijing. Cuacanya sangat bagus, membeli sepotong jaket kulit bulu baru.",
      mainIdea:
        "Teks narasi perjalanan yang mendemonstrasikan penulisan nama orang terkapitalisasi (Wáng Míng), nama tempat berapostrof (Xī'ān, Tiān'ānmén), kata mandiri tanpa apostrof (xiān), dan kata benda berapostrof (pí'ǎo).",
      questions: [
        {
          question:
            "Mengapa nama 'Xī'ān' dan 'Tiān'ānmén' pada teks di atas wajib ditulis dengan tanda apostrof (')?",
          options: [
            "Untuk memisahkan suku kata yang diawali oleh vokal 'a' agar tidak menyatu dengan konsonan sebelumnya",
            "Sebagai tanda bahwa kota tersebut adalah kota kuno",
            "Sebagai tanda nada pengganti",
            "Untuk menunjukkan bahwa huruf tersebut harus dibaca berbisik",
          ],
          correctAnswer:
            "Untuk memisahkan suku kata yang diawali oleh vokal 'a' agar tidak menyatu dengan konsonan sebelumnya",
          explanation:
            "Tanda apostrof (géyīn fúhào) mencegah 'Xī'ān' terbaca 'xiān' dan 'Tiān'ān' terbaca menyatu tanpa batas.",
        },
        {
          question:
            "Bagaimanakah penulisan huruf kapital nama tokoh 'Wáng Míng' pada teks di atas?",
          options: [
            "Marga dan nama diri sama-sama diawali huruf kapital dan dipisahkan oleh spasi (Wáng Míng)",
            "Ditulis huruf kecil semua tanpa spasi (wangming)",
            "Hanya marganya yang diawali huruf kapital (Wáng ming)",
            "Hanya nama dirinya yang diawali huruf kapital (wáng Míng)",
          ],
          correctAnswer:
            "Marga dan nama diri sama-sama diawali huruf kapital dan dipisahkan oleh spasi (Wáng Míng)",
          explanation:
            "Sesuai kaidah resmi ortografi Hanyu Pinyin, marga dan nama diri diawali huruf kapital dan ditulis terpisah.",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tulis karakter '西' (xī - barat / 6 goresan), '安' (ān - tenang / 6 goresan), dan '先' (xiān - duluan / 6 goresan) dengan urutan goresan yang tepat.",
      minimumCharacters: 3,
      checklist: [
        "Tulis garis mendatar atas (横), garis tegak kiri (竖), sudut mendatar-tegak kotak (横折), garis miring kiri dalam (撇), garis tegak lengkung dalam (竖弯), dan garis tutup bawah (横) pada karakter 西.",
        "Tulis titik atas radikal atap (点), titik miring kiri (点), sudut mendatar-kait (横钩), lalu radikal wanita 女 di bawahnya pada karakter 安.",
        "Tulis goresan miring kiri atas (撇), garis mendatar pendek (横), garis tegak tengah (竖), garis mendatar panjang (横), garis miring kiri (撇), dan garis tegak lengkung kait (竖弯钩) pada karakter 先.",
      ],
      modelAnswer: {
        hanzi: "西安先",
        pinyin: "Xī'ān xiān",
        translation: "Xi'an terlebih dahulu",
      },
    },

    personalizationPrompt:
      "Tulis nama lengkapmu dalam format ejaan baku Pinyin dengan kaidah kapitalisasi marga dan nama yang tepat (contoh: Lǐ Míng / Budi Santoso). Simpan nama pinyin pribadimu ke dalam Buku Frasa.",
    errorJournalHooks: [
      "Menempatkan tanda nada di atas huruf vokal yang salah pada diftong 'iu' atau 'ui' (misal menulis 'lìu' bukannya 'liù')",
      "Tidak menghapus tanda titik pada vokal 'i' saat diberi tanda diakritik nada",
      "Melupakan tanda apostrof pemisah pada suku kata yang diawali vokal a, o, e (misal menulis 'Xian' bukannya 'Xī'ān')",
      "Menulis nama orang Tionghoa digabung rapat tanpa kapitalisasi marga (misal menulis 'wangming')",
      "Menaruh tanda nada di atas konsonan n atau ng",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna mampu menempatkan tanda nada secara tepat mengikuti hierarki a > o/e > iu/ui, menggunakan apostrof pemisah batas kata géyīn fúhào pada Xī'ān dan Tiān'ānmén, serta menerapkan kaidah kapitalisasi nama diri.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Hafalkan kembali rima hierarki penempatan nada '有 a 标 a，没 a 找 o、e；i、u 并列标在后' dan tinjau kembali fungsi apostrof.",
    },
  },

  // -------------------------------------------------------------
  // F-09: Struktur Hanzi dan Urutan Goresan (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "fund-09",
    moduleId: "fundamentals",
    slug: "09",
    unitNumber: 9,
    title: "Struktur Hanzi & Urutan Goresan",
    hanzi: "汉字结构与笔顺",
    pinyin: "Hànzì Jiégòu yǔ Bǐshùn",
    translation: "5 Struktur Karakter, 6 Prinsip Urutan Goresan & 9 Radikal Dasar",
    objectives:
      "Memahami 5 struktur bangun karakter Hanzi (tunggal, kiri-kanan, atas-bawah, dalam-luar, mengelilingi), 6 prinsip urutan goresan menulis (atas-bawah, kiri-kanan, horizontal-vertikal, luar-dalam, tengah-sisi, tutup bingkai), serta 9 radikal semantik fondasi (人/亻, 口, 女, 子, 木, 日, 月, 水/氵, 火/灬).",
    overview:
      "Aksara Hanzi adalah karya arsitektur visual geometris. Setiap karakter dibentuk dari goresan-goresan teratur yang saling menyeimbangkan dalam kotak imajiner. Mengetahui 5 jenis struktur bangun dan 6 aturan emas urutan goresan tidak hanya membuat tulisan tanganmu rapi dan proporsional, namun juga mempermudah penghitungan goresan saat mencari kata di kamus serta mempercepat pengenalan pola memori visual.",
    vocabCount: 10,
    durationMinutes: 16,
    levelBadge: "FONDASI 09",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: [
      "fund-01",
      "fund-02",
      "fund-03",
      "fund-04",
      "fund-05",
      "fund-06",
      "fund-07",
      "fund-08",
    ],
    skills: ["Arsitektur Hanzi", "Urutan Goresan", "Radikal Semantik", "Analisis Komponen"],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "Guru Wang (Pengajar Kaligrafi) & Budi (Murid)",
      location: "Studio Kaligrafi & Tipografi KepoMandarin",
      goal: "Membongkar rahasia urutan goresan karakter bertingkat ('十', '木', '国') dan memahami filosofi arsitektur 5 struktur Hanzi serta peran 9 radikal semantik dasar.",
      scenarioNotes:
        "Budi sering menggambar Hanzi secara sembarangan seperti menjiplak sketsa tanpa urutan goresan. Guru Wang meluruskan teknik menulis dengan kaidah urutan goresan alami dan perumpamaan pintu gerbang.",
    },

    dialogue: [
      {
        speaker: "Budi",
        role: "Murid",
        hanzi: "老师，汉字笔画那么多，我按自己顺手的方式画出来不行吗？",
        pinyin:
          "Lǎoshī, hànzì bǐhuà nàme duō, wǒ àn zìjǐ shùnshǒu de fāngshì huà chūlai bù xíng ma?",
        translation:
          "Guru, goresan Hanzi ada begitu banyak, apakah tidak boleh jika saya menggambarnya sesuai cara yang terasa nyaman bagi saya sendiri?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi:
          "不行哦！笔顺不是随意规定的，而是几千年来毛笔书写的力学规律。比如写‘十’(shí)，必须‘先横后竖’；写‘人’(rén)，必须‘先撇后捺’。顺着写，字形才端正平稳。",
        pinyin:
          "Bù xíng o! Bǐshùn bú shì suíyì guīdìng de, ér shì jǐ qiān nián lái máobǐ shūxiě de lìxué guīlǜ. Bǐrú xiě ‘shí’, bìxū ‘xiān héng hòu shù’; xiě ‘rén’, bìxū ‘xiān piě hòu nà’. Shùnzhe xiě, zìxíng cái duānzhèng píngwěn.",
        translation:
          "Tentu tidak boleh! Urutan goresan bukan aturan asal-asalan, melainkan hukum mekanika kuas kaligrafi selama ribuan tahun. Misalnya menulis '十', wajib 'horizontal mendatar dulu baru vertikal tegak'; menulis '人', wajib 'miring kiri dulu baru miring kanan'. Menulis mengikuti urutan membuat bentuk karakter seimbang dan kokoh.",
      },
      {
        speaker: "Budi",
        role: "Murid",
        hanzi: "那像‘国’(guó) 这种外面有一个大框的字，要先把框全封起来吗？",
        pinyin:
          "Nà xiàng ‘guó’ zhè zhǒng wàimiàn yǒu yí ge dà kuāng de zì, yào xiān bǎ kuāng quán fēng qǐlai ma?",
        translation:
          "Lalu untuk karakter seperti '国' yang luarnya memiliki kotak bingkai besar, apakah bingkainya harus ditutup rapat terlebih dahulu?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi:
          "千万不要！全包围结构的原则是‘进门再关门’：先写外框的左、上、右三边，放‘玉’(giok) 进去，最后再写底边横画封口！",
        pinyin:
          "Qiānwàn bú yào! Quánbāowéi jiégòu de yuánzé shì ‘jìn mén zài guān mén’: xiān xiě wàikuāng de zuǒ, shàng, yòu sān biān, fàng ‘yù’ jìnqu, zuìhòu zài xiě dǐbiān héng huà fēngkǒu!",
        translation:
          "Jangan sekali-kali begitu! Prinsip karakter berstruktur mengelilingi penuh adalah 'masuk rumah dulu, baru kunci pintu': tulis dulu tiga sisi kiri, atas, dan kanan bingkai luar, masukkan karakter '玉' ke dalamnya, barulah garis mendatar bawah ditulis paling akhir untuk menutup pintu bingkai!",
      },
      {
        speaker: "Budi",
        role: "Murid",
        hanzi: "太生动的比喻了！还有像‘海’(hǎi) 旁边的‘氵’，是水的意思吗？",
        pinyin:
          "Tài shēngdòng de bǐyù le! Hái yǒu xiàng ‘hǎi’ pángbiān de ‘氵’, shì shuǐ de yìsi ma?",
        translation:
          "Perumpamaan yang sangat hidup! Lalu seperti bagian '氵' di samping kata 'hǎi', apakah artinya air?",
      },
      {
        speaker: "Guru Wang",
        role: "Pengajar",
        hanzi:
          "对！‘氵’叫三点水，是由‘水’变形来的部首。带‘氵’的字大多跟水或液体有关，比如河、湖、洗。认准偏旁部首，学汉字就快多了！",
        pinyin:
          "Duì! ‘氵’ jiào sāndiǎnshuǐ, shì yóu ‘shuǐ’ biànxíng lái de bùshǒu. Dài ‘氵’ de zì dàduō gēn shuǐ huò yètǐ yǒuguān, bǐrú hé, hú, xǐ. Rènzhǔn piānpáng bùshǒu, xué hànzì jiù kuài duō le!",
        translation:
          "Tepat sekali! '氵' disebut sāndiǎnshuǐ (tiga titik air), merupakan radikal perubahan dari karakter '水'. Karakter berunsur '氵' sebagian besar berhubungan dengan air atau cairan, seperti sungai (河), danau (湖), mencuci (洗). Mengenali radikal membuat belajar karakter jauh lebih cepat!",
      },
    ],

    vocabulary: [
      {
        hanzi: "结构",
        pinyin: "jiégòu",
        tone: "Nada 2 + Nada 4",
        translation: "struktur / tata bangun karakter",
        partOfSpeech: "nomina",
        usageNotes: "Mengacu pada arsitektur geometris pembagian ruang karakter Hanzi.",
        exampleHanzi: "汉字结构。",
        examplePinyin: "Hànzì jiégòu.",
        exampleTranslation: "Struktur bangun karakter Hanzi.",
      },
      {
        hanzi: "笔顺",
        pinyin: "bǐshùn",
        tone: "Nada 3 + Nada 4",
        translation: "urutan goresan pena",
        partOfSpeech: "nomina",
        usageNotes: "Urutan runtut tarikan garis saat menulis karakter Hanzi.",
        exampleHanzi: "注意笔顺。",
        examplePinyin: "Zhùyì bǐshùn.",
        exampleTranslation: "Perhatikan urutan goresan pena.",
      },
      {
        hanzi: "部首",
        pinyin: "bùshǒu",
        tone: "Nada 4 + Nada 3",
        translation: "radikal karakter",
        partOfSpeech: "nomina",
        usageNotes: "Komponen kunci penentu kategori semantik untuk pengindeksan kamus.",
        exampleHanzi: "查字典部首。",
        examplePinyin: "Chá zìdiǎn bùshǒu.",
        exampleTranslation: "Mencari radikal di dalam kamus.",
      },
      {
        hanzi: "偏旁",
        pinyin: "piānpáng",
        tone: "Nada 1 + Nada 2",
        translation: "komponen pembentuk karakter",
        partOfSpeech: "nomina",
        usageNotes: "Bagian sisi samping kiri (偏) atau kanan (旁) pada karakter gabungan.",
        exampleHanzi: "左右偏旁。",
        examplePinyin: "Zuǒyòu piānpáng.",
        exampleTranslation: "Komponen sisi kiri dan kanan.",
      },
      {
        hanzi: "笔画",
        pinyin: "bǐhuà",
        tone: "Nada 3 + Nada 4",
        translation: "goresan garis pena",
        partOfSpeech: "nomina",
        usageNotes: "Satuan garis tunggal dari saat pena mendarat hingga diangkat.",
        exampleHanzi: "数笔画。",
        examplePinyin: "Shǔ bǐhuà.",
        exampleTranslation: "Menghitung jumlah goresan pena.",
      },
      {
        hanzi: "横",
        pinyin: "héng",
        tone: "Nada 2",
        translation: "goresan mendatar ( 一 )",
        partOfSpeech: "nomina",
        usageNotes: "Ditarik mendatar lurus dari kiri ke kanan dengan stabil.",
        exampleHanzi: "先写一横。",
        examplePinyin: "Xiān xiě yì héng.",
        exampleTranslation: "Tulis satu garis mendatar terlebih dahulu.",
      },
      {
        hanzi: "竖",
        pinyin: "shù",
        tone: "Nada 4",
        translation: "goresan tegak lurus ( 丨 )",
        partOfSpeech: "nomina",
        usageNotes: "Ditarik tegak lurus dari atas ke bawah secara mantap.",
        exampleHanzi: "再写一竖。",
        examplePinyin: "Zài xiě yí shù.",
        exampleTranslation: "Kemudian tulis satu garis tegak lurus.",
      },
      {
        hanzi: "撇",
        pinyin: "piě",
        tone: "Nada 3",
        translation: "goresan miring ke kiri ( 丿 )",
        partOfSpeech: "nomina",
        usageNotes: "Dimulai dari kanan atas lalu melengkung tipis ke kiri bawah.",
        exampleHanzi: "先撇后捺。",
        examplePinyin: "Xiān piě hòu nà.",
        exampleTranslation: "Tarik miring kiri dulu baru miring kanan.",
      },
      {
        hanzi: "捺",
        pinyin: "nà",
        tone: "Nada 4",
        translation: "goresan miring ke kanan ( ㇏ )",
        partOfSpeech: "nomina",
        usageNotes: "Dimulai dari kiri atas lalu menekan menebal ke kanan bawah.",
        exampleHanzi: "重重一捺。",
        examplePinyin: "Zhòngzhòng yí nà.",
        exampleTranslation: "Satu tarikan garis miring kanan yang mantap.",
      },
      {
        hanzi: "点",
        pinyin: "diǎn",
        tone: "Nada 3",
        translation: "goresan titik ( 丶 )",
        partOfSpeech: "nomina",
        usageNotes: "Titik pendek yang ditekan dari ringan lalu membulat mantap.",
        exampleHanzi: "加上一点。",
        examplePinyin: "Jiā shang yì diǎn.",
        exampleTranslation: "Tambahkan satu goresan titik.",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "独体字",
        pinyin: "dútǐzì",
        tone: "Nada 2 + 3 + 4",
        translation: "karakter berstruktur tunggal utuh",
        isEnrichment: true,
        inclusionReason:
          "Kategori karakter yang tidak dapat dipecah menjadi komponen terpisah (misal: 日, 月, 木).",
        exampleHanzi: "木是独体字。",
        examplePinyin: "Mù shì dútǐzì.",
        exampleTranslation: "Karakter '木' adalah karakter berstruktur tunggal.",
      },
      {
        hanzi: "合体字",
        pinyin: "hétǐzì",
        tone: "Nada 2 + 3 + 4",
        translation: "karakter berstruktur gabungan",
        isEnrichment: true,
        inclusionReason:
          "Karakter yang tersusun dari kombinasi dua atau lebih komponen radikal (misal: 林, 森, 国).",
        exampleHanzi: "大多数汉字是合体字。",
        examplePinyin: "Dàduōshù hànzì shì hétǐzì.",
        exampleTranslation: "Mayoritas karakter Hanzi adalah karakter gabungan.",
      },
      {
        hanzi: "三点水",
        pinyin: "sāndiǎnshuǐ",
        tone: "Nada 1 + 3 + 3",
        translation: "radikal tiga titik air ( 氵 )",
        isEnrichment: true,
        inclusionReason:
          "Bentuk modifikasi radikal air paling umum yang muncul di ratusan karakter HSK.",
        exampleHanzi: "海有三点水旁。",
        examplePinyin: "Hǎi yǒu sāndiǎnshuǐ páng.",
        exampleTranslation: "Karakter '海' memiliki radikal tiga titik air di sampingnya.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Pengucapan istilah-istilah goresan dasar dan radikal dalam bahasa Mandarin (héng, shù, piě, nà, diǎn, tí, zhé, gōu, bùshǒu, piānpáng).",
      tones:
        "Perhatikan nada pada nama goresan: héng (nada 2 naik), shù (nada 4 tegas), piě (nada 3 melengkung rendah), nà (nada 4 tegas), diǎn (nada 3 melengkung rendah).",
      toneCombinations:
        "Kombinasi nada pada terminologi kaligrafi: bǐshùn (nada 3 + nada 4), bùshǒu (nada 4 + nada 3), jiégòu (nada 2 + nada 4).",
      commonErrors:
        "Menulis goresan vertikal (shù) dari bawah ke atas, atau menutup kotak bingkai luar sebelum mengisi elemen di dalam.",
      articulatoryTip:
        "Ucapkan nama goresan saat jemari menarik garis di atas kertas/layar: 'héng, shù, piě, nà' untuk melatih memori kinestetik motorik tangan.",
    },

    hanziComponents: [
      {
        hanzi: "木",
        structure: "Tunggal (独体字)",
        components: "木 (pohon berakar dan berdahan utuh)",
        strokeCount: 4,
        strokeOrderRules: [
          "Horizontal sebelum vertikal (横 → 竖)",
          "Miring kiri sebelum kanan (撇 → 捺)",
        ],
        notes:
          "Piktograf pohon kuno: garis horizontal adalah dahan, garis vertikal adalah batang, garis miring adalah akar.",
      },
      {
        hanzi: "林",
        structure: "Kiri-Kanan (左右结构)",
        components: "木 (kayu kiri lebih ramping) + 木 (kayu kanan)",
        strokeCount: 8,
        strokeOrderRules: [
          "Kiri sebelum kanan (从左到右)",
          "Goresan nà pada pohon kiri berubah menjadi titik (diǎn)",
        ],
        notes:
          "Dua pohon bersanding membentuk hutan kecil (woodland). Komponen kiri mengalah dengan memperpendek goresan kanan menjadi titik.",
      },
      {
        hanzi: "森",
        structure: "Piramida Atas-Bawah (品字形 / 上下结构)",
        components: "木 (atas) + 木 (bawah kiri) + 木 (bawah kanan)",
        strokeCount: 12,
        strokeOrderRules: [
          "Atas sebelum bawah (从上到下)",
          "Bawah kiri sebelum bawah kanan (从左到右)",
        ],
        notes:
          "Tiga pohon berkumpul melambangkan hutan belantara yang lebat (forest/jungle).",
      },
      {
        hanzi: "国",
        structure: "Mengelilingi Penuh (全包围结构)",
        components: "囗 (bingkai batas wilayah luar) + 玉 (batu giok berharga di dalam)",
        strokeCount: 8,
        strokeOrderRules: [
          "Luar sebelum dalam (先外后里)",
          "Garis bawah penutup ditulis paling akhir (再封口)",
        ],
        notes:
          "Filosofi sebuah negara: benteng perbatasan kokoh (囗) yang menjaga permata berharga (玉) milik rakyat di dalamnya.",
      },
      {
        hanzi: "休",
        structure: "Kiri-Kanan (左右结构)",
        components: "亻 (radikal manusia dānrénpáng) + 木 (pohon)",
        strokeCount: 6,
        strokeOrderRules: [
          "Kiri sebelum kanan (从左到右)",
          "Tulis radikal orang 亻 dulu baru pohon 木",
        ],
        notes:
          "Karakter ideografis asosiatif (Huìyìzì): seseorang yang sedang bersandar di batang pohon untuk beristirahat.",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "5 Jenis Struktur Arsitektur Bangun Karakter Hanzi (5大汉字结构)",
        formula:
          "Struktur: Tunggal | Kiri-Kanan | Atas-Bawah | Setengah Mengelilingi | Mengelilingi Penuh",
        explanation:
          "Setiap karakter Hanzi menempati satu bidang bujur sangkar imajiner (方块字). Berdasarkan pembagian ruang geometrisnya, Hanzi terbagi menjadi 5 jenis arsitektur utama: 1) Tunggal (独体字, misal: 一, 人, 口, 木); 2) Kiri-Kanan (左右结构, misal: 你, 好, 林, 休); 3) Atas-Bawah (上下结构, misal: 字, 爸, 森, 点); 4) Setengah Mengelilingi / Dalam-Luar (半包围结构, misal: 这, 问, 同); 5) Mengelilingi Penuh (全包围结构, misal: 国, 回, 四).",
        example: "木 (tunggal) → 林 (kiri-kanan) → 森 (atas-bawah bertumpuk)",
        positiveExamples: [
          { hanzi: "人、大、小", pinyin: "rén, dà, xiǎo", translation: "Struktur tunggal (独体字)" },
          { hanzi: "你、好、他", pinyin: "nǐ, hǎo, tā", translation: "Struktur kiri-kanan (左右结构)" },
          { hanzi: "早、爸、字", pinyin: "zǎo, bà, zì", translation: "Struktur atas-bawah (上下结构)" },
          {
            hanzi: "这、包、问",
            pinyin: "zhè, bāo, wèn",
            translation: "Struktur setengah mengelilingi (半包围结构)",
          },
          {
            hanzi: "国、回、四",
            pinyin: "guó, huí, sì",
            translation: "Struktur mengelilingi penuh (全包围结构)",
          },
        ],
        usageConstraints:
          "Memahami struktur membantu menjaga proporsi bidang bujur sangkar saat menulis tangan.",
        commonErrors:
          "Menulis komponen kiri dan kanan terlalu berjauhan sehingga terbaca sebagai dua karakter terpisah.",
        communicativeFunction:
          "Membantu mengenali pola bangun visual aksara sehingga karakter kompleks dapat dipecah menjadi unit-unit yang mudah diingat.",
      },
      {
        ruleTitle: "6 Kaidah Emas Urutan Goresan Pena Baku (6大笔顺黄金法则)",
        formula:
          "Urutan: Atas→Bawah | Kiri→Kanan | Horizontal→Vertikal | Miring Kiri→Kanan | Luar→Dalam→Tutup | Tengah→Sisi",
        explanation:
          "Urutan penulisan goresan mengikuti hukum kelembaman mekanika tangan penutur asli yang disempurnakan ribuan tahun: 1) Atas sebelum bawah (从上到下, misal: 二, 三, 早); 2) Kiri sebelum kanan (从左到右, misal: 川, 好); 3) Horizontal sebelum vertikal (先横后竖, misal: 十, 木); 4) Miring kiri sebelum miring kanan (先撇后捺, misal: 人, 八, 文); 5) Luar sebelum dalam, lalu tutup segel paling akhir (先外后里再封口 / 进门再关门, misal: 国, 回, 四, 日); 6) Tengah sebelum sisi pada struktur simetris (先中间后两边, misal: 小, 水, 山).",
        example: "Menulis '十': garis mendatar 横 (1) lalu garis vertikal 竖 (2).",
        positiveExamples: [
          {
            hanzi: "十",
            pinyin: "shí",
            translation: "Kaidah horizontal sebelum vertikal (先横后竖)",
          },
          {
            hanzi: "人",
            pinyin: "rén",
            translation: "Kaidah miring kiri sebelum miring kanan (先撇后捺)",
          },
          {
            hanzi: "三",
            pinyin: "sān",
            translation: "Kaidah atas sebelum bawah (从上到下)",
          },
          {
            hanzi: "小",
            pinyin: "xiǎo",
            translation: "Kaidah tengah sebelum sisi (先中间后两边)",
          },
          {
            hanzi: "国",
            pinyin: "guó",
            translation: "Kaidah luar dulu, isi dalam, lalu tutup bawah (先外后里再封口)",
          },
        ],
        usageConstraints:
          "Urutan goresan menentukan estetika karakter dan kecepatan menulis tanpa mengangkat pena secara janggal.",
        commonErrors:
          "Menutup garis horizontal bawah bingkai luar pada karakter '国' sebelum menulis isi dalamnya.",
        communicativeFunction:
          "Menjamin goresan mengalir alami, bentuk karakter proporsional, serta memudahkan pencarian jumlah goresan di kamus.",
      },
      {
        ruleTitle: "9 Radikal Semantik Fondasi & Transformasi Grafisnya (9大基础语义部首)",
        formula: "Radikal Semantik = Kunci Makna Rumpun Karakter",
        explanation:
          "Lebih dari 85% karakter Hanzi modern adalah karakter piktifonetik (形声字) di mana salah satu komponennya adalah radikal semantik (penunjuk makna kategori). 9 radikal fondasi paling utama dan variasinya: 1) 人 / 亻 (dānrénpáng: manusia, orang, misal: 你, 他, 休); 2) 口 (kǒuzìpáng: mulut, berbicara, makan, misal: 吃, 喝, 叫, 吗); 3) 女 (nǚzìpáng: wanita, keluarga wanita, misal: 妈, 姐, 妹, 好); 4) 子 (zǐ: anak, benih, generasi, misal: 字, 孩, 学); 5) 木 (mùzìpáng: pohon, kayu, perabot kayu, misal: 林, 森, 桌, 椅); 6) 日 (rìzìpáng: matahari, waktu, siang, misal: 明, 早, 昨, 晚); 7) 月 (yuè: bulan, waktu / daging anatomi tubuh, misal: 期, 朋, 腿); 8) 水 / 氵 (sāndiǎnshuǐ: air, cairan, basah, misal: 河, 海, 洗, 泪); 9) 火 / 灬 (sìdiǎnhuǒ: api, panas, memasak, misal: 热, 点, 烧, 烤).",
        example: "Radikal 氵 (air) pada 河 (sungai), 海 (laut), dan 洗 (mencuci).",
        positiveExamples: [
          { hanzi: "海", pinyin: "hǎi", translation: "Radikal 氵 (air) → laut" },
          { hanzi: "吃", pinyin: "chī", translation: "Radikal 口 (mulut) → makan" },
          { hanzi: "妈", pinyin: "mā", translation: "Radikal 女 (wanita) → ibu" },
          {
            hanzi: "明",
            pinyin: "míng",
            translation: "Radikal 日 (matahari) + 月 (bulan) → terang / cerah",
          },
          { hanzi: "热", pinyin: "rè", translation: "Radikal 灬 (empat titik api) → panas" },
        ],
        usageConstraints:
          "Beberapa radikal mengalami perubahan bentuk saat diletakkan di samping kiri atau bawah (人→亻, 水→氵, 火→灬).",
        commonErrors:
          "Menganggap goresan radikal hanya hiasan acak tanpa menyadari keterkaitannya dengan rumpun arti kata.",
        communicativeFunction:
          "Memungkinkan pembelajar menebak perkiraan rumpun makna kata baru bahkan sebelum mengetahui cara membacanya.",
      },
    ],

    culturalNotes:
      "Seni Kaligrafi Tiongkok & Ergonomi Tarikan Kuas: Urutan goresan Hanzi bukanlah sekadar aturan administratif, melainkan hasil penyempurnaan ergonomis selama ribuan tahun melalui media kuas bulu (毛笔). Menulis dari atas ke bawah dan kiri ke kanan mencegah telapak tangan mengotori tinta basah di atas kertas beras (宣纸), sementara urutan 'horizontal lalu vertikal' dan 'masuk pintu dulu baru tutup pintu' menjaga keseimbangan pusat gravitasi karakter (重心) agar stabil, proporsional, dan memiliki ritme tarikan napas kaligrafi (气韵生动).",

    listeningActivity: {
      goal: "Mendengarkan audio pelafalan kaidah goresan dan mengidentifikasi karakter dasar yang sesuai dengan urutan tersebut.",
      audioText: "先横，后竖。",
      pinyin: "Xiān héng, hòu shù.",
      translation: "Pertama mendatar, kemudian tegak lurus.",
      gistQuestion: {
        question:
          "Berdasarkan audio '先横，后竖' (mendatar dulu baru tegak), karakter manakah berikut yang ditulis tepat mengikuti kaidah ini?",
        options: [
          "十 (shí - angka sepuluh: garis mendatar terlebih dahulu lalu memotong garis tegak lurus)",
          "人 (rén - orang: garis miring kiri lalu miring kanan)",
          "八 (bā - delapan: dua garis miring terpisah)",
          "儿 (ér - anak: garis miring kiri lalu kait vertikal kanan)",
        ],
        correctAnswer:
          "十 (shí - angka sepuluh: garis mendatar terlebih dahulu lalu memotong garis tegak lurus)",
        explanation:
          "Karakter '十' (sepuluh) adalah teladan utama kaidah '先横后竖' (horizontal mendatar dulu baru vertikal tegak lurus).",
      },
      detailQuestion: {
        question:
          "Pada karakter berbingkai mengelilingi '国' (guó - negara), jenis goresan apakah yang ditulis paling akhir untuk menutup pintu bingkai?",
        options: [
          "Goresan mendatar penutup bawah (横封口)",
          "Goresan vertikal tiang kiri (竖)",
          "Goresan titik batu giok di dalam (点)",
          "Goresan sudut patah atas-kanan (横折)",
        ],
        correctAnswer: "Goresan mendatar penutup bawah (横封口)",
        explanation:
          "Sesuai prinsip 'masuk pintu dulu baru kunci pintu', garis horizontal paling bawah pada '国' selalu ditulis paling akhir setelah batu giok '玉' di dalamnya selesai dibuat.",
      },
    },

    speakingActivity: {
      prompt:
        "Sebutkan dengan lantang 5 klasifikasi struktur bangun karakter Hanzi (dútǐ, zuǒyòu, shàngxià, bàobāowéi, quánbāowéi) beserta contoh satu karakternya masing-masing dengan pelafalan nada yang tepat.",
      vocabularySupport: [
        "独体字 (dútǐzì - contoh: 木)",
        "左右结构 (zuǒyòu jiégòu - contoh: 林)",
        "上下结构 (shàngxià jiégòu - contoh: 森)",
        "半包围结构 (bàobāowéi jiégòu - contoh: 这)",
        "全包围结构 (quánbāowéi jiégòu - contoh: 国)",
      ],
      evaluationRubric:
        "Artikulasi nama struktur jelas, nada tepat, dan mampu menjelaskan logika pembagian ruang pada masing-masing jenis struktur karakter.",
    },

    readingActivity: {
      textHanzi:
        "写汉字要讲究笔顺。先横后竖，先撇后捺。写全包围的字，要先进门，再关门。认清偏旁部首，能帮我们又快又好地记住生字。",
      textPinyin:
        "Xiě hànzì yào jiǎngjiu bǐshùn. Xiān héng hòu shù, xiān piě hòu nà. Xiě quánbāowéi de zì, yào xiān jìn mén, zài guān mén. Rènqīng piānpáng bùshǒu, néng bāng wǒmen yòu kuài yòu hǎo de jìzhù shēngzì.",
      textTranslation:
        "Menulis karakter Hanzi harus memperhatikan urutan goresan. Mendatar dulu baru tegak, miring kiri dulu baru miring kanan. Menulis karakter berstruktur mengelilingi penuh harus masuk pintu dulu baru menutup pintu. Mengenali komponen radikal dapat membantu kita mengingat karakter baru dengan cepat dan baik.",
      mainIdea:
        "Pentingnya urutan goresan baku dan pemahaman radikal semantik dalam mempercepat penguasaan karakter Hanzi.",
      questions: [
        {
          question:
            "Mengapa pada karakter berstruktur mengelilingi penuh (seperti 国 atau 回) kita dilarang menutup garis bawah terlebih dahulu?",
          options: [
            "Karena sesuai prinsip 'masuk pintu dulu baru tutup pintu', komponen isi di bagian dalam wajib diselesaikan sebelum bingkai dikunci oleh garis bawah.",
            "Karena garis bawah tidak boleh bersentuhan dengan dinding vertikal.",
            "Karena garis bawah hanya boleh ditulis menggunakan kuas bulu khusus.",
            "Karena karakter berbingkai tidak memerlukan garis penutup bawah.",
          ],
          correctAnswer:
            "Karena sesuai prinsip 'masuk pintu dulu baru tutup pintu', komponen isi di bagian dalam wajib diselesaikan sebelum bingkai dikunci oleh garis bawah.",
          explanation:
            "Kaidah '先外后里再封口' mewajibkan isi ruangan selesai ditulis terlebih dahulu sebelum pintu bingkai bawah ditutup.",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Praktikkan menulis 5 karakter fundamental dengan urutan goresan yang presisi pada kanvas atau buku latihan: '一', '十', '木', '小', dan '国'.",
      minimumCharacters: 5,
      checklist: [
        "Menulis '十': garis mendatar (横) dari kiri ke kanan terlebih dahulu, baru garis tegak (竖) dari atas ke bawah memotong tengah.",
        "Menulis '木': garis mendatar (横) → garis tegak (竖) → miring kiri (撇) → miring kanan (捺).",
        "Menulis '小': garis tegak berkait tengah (竖钩) terlebih dahulu, baru titik miring kiri (撇点) dan titik kanan (点).",
        "Menulis '国': tiang kiri bingkai → garis siku atas-kanan → karakter giok '玉' di dalam → garis mendatar bawah penutup paling akhir.",
      ],
      modelAnswer: {
        hanzi: "一、十、木、小、国",
        pinyin: "yī, shí, mù, xiǎo, guó",
        translation: "satu, sepuluh, kayu, kecil, negara",
      },
    },

    personalizationPrompt:
      "Amati karakter marga atau nama Mandarinmu (atau salah satu karakter favoritmu seperti 爱, 学, atau 中). Identifikasi jenis arsitektur strukturnya dan uraikan komponen radikal pembentuknya ke dalam catatan pribadimu.",
    errorJournalHooks: [
      "Menulis garis vertikal (竖) meluncur dari bawah ke atas (melanggar gravitasi goresan)",
      "Menutup kotak bingkai luar pada karakter mengelilingi (全包围 seperti 国, 回, 四) sebelum menulis komponen dalamnya",
      "Menulis titik atau sayap sisi terlebih dahulu sebelum tiang tengah pada karakter simetris seperti '小' atau '水'",
      "Mengabaikan radikal semantik dan menganggap Hanzi hanya gambar garis abstrak tanpa makna kelompok kata",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna menguasai 5 klasifikasi arsitektur struktur Hanzi, 6 kaidah emas urutan goresan pena baku, serta memahami fungsi semantik 9 radikal fondasi dengan akurasi minimal 80%.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Gunakan fitur panduan animasi urutan goresan langkah demi langkah untuk mengulang penulisan karakter '十', '木', '小', dan '国'.",
    },
  },

  // -------------------------------------------------------------
  // F-10: Ujian Akhir Fondasi & Mini Proyek (Evaluasi Komprehensif)
  // -------------------------------------------------------------
  {
    id: "fund-10",
    moduleId: "fundamentals",
    slug: "10",
    unitNumber: 10,
    title: "Ujian Akhir Fondasi & Mini Proyek",
    hanzi: "结业考核",
    pinyin: "Jiéyè Kǎohé",
    translation: "Evaluasi Integratif Pinyin, Nada, Hanzi & Proyek Rekaman Perkenalan",
    objectives:
      "Menguji penguasaan komprehensif seluruh materi Fondasi Dasar (F-01 s.d. F-09): Bagian A (Inisial, Final, Ejaan Pinyin), Bagian B (4 Nada, Nada Netral, Tone Sandhi), Bagian C (Struktur Hanzi, Radikal, Urutan Goresan), serta menyelesaikan Mini Proyek perkenalan lisan sederhana.",
    overview:
      "Selamat telah menuntaskan sembilan unit pelajaran fondasi! Ujian akhir ini dirancang untuk mengukur kesiapanmu sebelum melangkah ke HSK 1. Evaluasi mencakup tiga pilar utama: ketajaman fonetik Pinyin, akurasi kontur Nada suara, serta logika arsitektur Hanzi. Ujian diakhiri dengan Mini Proyek produksi lisan pendek untuk membangun keberanian dan kejernihan artikulasi.",
    vocabCount: 10,
    durationMinutes: 20,
    levelBadge: "UJIAN AKHIR FONDASI",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: [
      "fund-01",
      "fund-02",
      "fund-03",
      "fund-04",
      "fund-05",
      "fund-06",
      "fund-07",
      "fund-08",
      "fund-09",
    ],
    skills: ["Evaluasi Pinyin", "Evaluasi Nada", "Evaluasi Hanzi", "Produksi Lisan Mandiri"],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "Guru Wang (Penguji Evaluasi) & Budi (Peserta Ujian Fondasi)",
      location: "Studio Asesmen KepoMandarin",
      goal: "Melakukan simulasi evaluasi integratif 3 pilar fondasi dan arahan teknis pengerjaan Mini Proyek perkenalan lisan.",
      scenarioNotes:
        "Budi telah menuntaskan seluruh 9 unit modul fondasi dan siap menguji kesiapannya sebelum memulai materi HSK 1.",
    },

    dialogue: [
      {
        speaker: "Guru Wang",
        role: "Penguji",
        hanzi: "祝贺你完成基础九课！今天我们进行综合考核：拼音、声调和汉字笔顺。",
        pinyin:
          "Zhùhè nǐ wánchéng jīchǔ jiǔ kè! Jīntiān wǒmen jìnxíng zōnghé kǎohé: pīnyīn, shēngdiào hé hànzì bǐshùn.",
        translation:
          "Selamat telah menyelesaikan sembilan pelajaran fondasi! Hari ini kita melakukan evaluasi komprehensif: pinyin, nada suara, dan urutan goresan Hanzi.",
      },
      {
        speaker: "Budi",
        role: "Peserta",
        hanzi: "老师，我已经准备好了！我对变调规则和汉字结构很有信心。",
        pinyin:
          "Lǎoshī, wǒ yǐjīng zhǔnbèi hǎo le! Wǒ duì biàndiào guīzé hé hànzì jiégòu hěn yǒu xìnxīn.",
        translation:
          "Guru, saya sudah siap! Saya sangat percaya diri dengan aturan tone sandhi dan struktur karakter Hanzi.",
      },
      {
        speaker: "Guru Wang",
        role: "Penguji",
        hanzi:
          "非常好！考核分为三部分：第一听辨声母韵母，第二辨识声调变调，第三分析汉字部首。最后完成一段迷你口语录音。",
        pinyin:
          "Fēicháng hǎo! Kǎohé fēn wéi sān bùfen: dì-yī tīngbiàn shēngmǔ yùnmǔ, dì-èr biànshí shēngdiào biàndiào, dì-sān fēnxī hànzì bùshǒu. Zuìhòu wánchéng yí duàn mínǐ kǒuyǔ lùyīn.",
        translation:
          "Sangat bagus! Ujian terbagi menjadi tiga bagian: pertama menyimak diskriminasi inisial dan final, kedua mengidentifikasi nada dan perubahan sandhi, ketiga menganalisis radikal Hanzi. Terakhir selesaikan satu rekaman lisan mini.",
      },
      {
        speaker: "Budi",
        role: "Peserta",
        hanzi: "迷你项目录音有什么具体要求吗？",
        pinyin: "Mínǐ xiàngmù lùyīn yǒu shénme jùtǐ yāoqiú ma?",
        translation: "Apakah ada persyaratan khusus untuk rekaman mini proyek?",
      },
      {
        speaker: "Guru Wang",
        role: "Penguji",
        hanzi:
          "录一段简短问候，说出你的名字，并用中文说一句话。重点是发音清晰、声调自然，不用追求完美口音！",
        pinyin:
          "Lù yí duàn jiǎnduǎn wènhòu, shuōchū nǐ de míngzi, bìng yòng Zhōngwén shuō yí jù huà. Zhòngdiǎn shì fāyīn qīngxī, shēngdiào zìrán, bú yòng zhuīqiú wánměi kǒuyīn!",
        translation:
          "Rekam salam pendek, sebutkan namamu, dan ucapkan satu kalimat dalam bahasa Mandarin. Fokusnya adalah pelafalan yang jelas dan nada yang alami, tidak perlu mengejar aksen sempurna!",
      },
      {
        speaker: "Budi",
        role: "Peserta",
        hanzi: "太棒了，这种实战考核让我对进入 HSK 1 充满信心！",
        pinyin: "Tài bàng le, zhè zhǒng shízhàn kǎohé ràng wǒ duì jìnrù HSK 1 chōngmǎn xìnxīn!",
        translation:
          "Luar biasa, ujian praktik seperti ini membuat saya sangat percaya diri untuk melangkah ke HSK 1!",
      },
    ],

    vocabulary: [
      {
        hanzi: "考核",
        pinyin: "kǎohé",
        tone: "Nada 3 + Nada 2",
        translation: "ujian penilaian / evaluasi",
        partOfSpeech: "verba / nomina",
        usageNotes: "Proses asesmen untuk mengukur pemahaman dan ketuntasan materi.",
        exampleHanzi: "参加结业考核。",
        examplePinyin: "Cānjiā jiéyè kǎohé.",
        exampleTranslation: "Mengikuti ujian penilaian kelulusan.",
      },
      {
        hanzi: "综合",
        pinyin: "zōnghé",
        tone: "Nada 1 + Nada 2",
        translation: "komprehensif / terintegrasi",
        partOfSpeech: "adjektiva / verba",
        usageNotes: "Menggabungkan berbagai aspek kemampuan secara holistik.",
        exampleHanzi: "综合复习。",
        examplePinyin: "Zōnghé fùxí.",
        exampleTranslation: "Mengulang pelajaran secara komprehensif.",
      },
      {
        hanzi: "基础",
        pinyin: "jīchǔ",
        tone: "Nada 1 + Nada 3",
        translation: "fondasi / dasar",
        partOfSpeech: "nomina",
        usageNotes: "Landasan utama pembelajaran bahasa.",
        exampleHanzi: "打好基础。",
        examplePinyin: "Dǎ hǎo jīchǔ.",
        exampleTranslation: "Meletakkan fondasi yang kokoh.",
      },
      {
        hanzi: "录音",
        pinyin: "lùyīn",
        tone: "Nada 4 + Nada 1",
        translation: "merekam suara / rekaman audio",
        partOfSpeech: "verba / nomina",
        usageNotes: "Media latihan produksi lisan untuk mini proyek.",
        exampleHanzi: "开始录音。",
        examplePinyin: "Kāishǐ lùyīn.",
        exampleTranslation: "Mulai merekam suara.",
      },
      {
        hanzi: "准确",
        pinyin: "zhǔnquè",
        tone: "Nada 3 + Nada 4",
        translation: "akurat / tepat",
        partOfSpeech: "adjektiva",
        usageNotes: "Ketepatan letak artikulasi fonetik dan kontur pitch nada.",
        exampleHanzi: "发音准确。",
        examplePinyin: "Fāyīn zhǔnquè.",
        exampleTranslation: "Pelafalan akurat.",
      },
      {
        hanzi: "流利",
        pinyin: "liúlì",
        tone: "Nada 2 + Nada 4",
        translation: "lancar / fasih",
        partOfSpeech: "adjektiva",
        usageNotes: "Kelancaran aliran irama bicara tanpa keraguan berlebihan.",
        exampleHanzi: "说得很流利。",
        examplePinyin: "Shuō de hěn liúlì.",
        exampleTranslation: "Berbicara dengan sangat lancar.",
      },
      {
        hanzi: "信心",
        pinyin: "xìnxīn",
        tone: "Nada 4 + Nada 1",
        translation: "rasa percaya diri / keyakinan",
        partOfSpeech: "nomina",
        usageNotes: "Keberanian memproduksi bahasa tanpa takut membuat kekeliruan.",
        exampleHanzi: "很有信心。",
        examplePinyin: "Hěn yǒu xìnxīn.",
        exampleTranslation: "Sangat percaya diri.",
      },
      {
        hanzi: "进步",
        pinyin: "jìnbù",
        tone: "Nada 4 + Nada 4",
        translation: "kemajuan / progres",
        partOfSpeech: "nomina / verba",
        usageNotes: "Perkembangan kemampuan belajar dari unit ke unit.",
        exampleHanzi: "取得很大进步。",
        examplePinyin: "Qǔdé hěn dà jìnbù.",
        exampleTranslation: "Memperoleh kemajuan yang sangat besar.",
      },
      {
        hanzi: "复习",
        pinyin: "fùxí",
        tone: "Nada 4 + Nada 2",
        translation: "mengulang pelajaran / review",
        partOfSpeech: "verba",
        usageNotes: "Mengkaji ulang materi lama untuk memperkuat retensi memori.",
        exampleHanzi: "每天复习。",
        examplePinyin: "Měitiān fùxí.",
        exampleTranslation: "Mengulang pelajaran setiap hari.",
      },
      {
        hanzi: "祝贺",
        pinyin: "zhùhè",
        tone: "Nada 4 + Nada 4",
        translation: "memberi selamat / selamat",
        partOfSpeech: "verba",
        usageNotes: "Ucapan selamat atas kelulusan dan penyelesaian tahapan belajar.",
        exampleHanzi: "祝贺你结业！",
        examplePinyin: "Zhùhè nǐ jiéyè!",
        exampleTranslation: "Selamat atas kelulusanmu!",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "结业",
        pinyin: "jiéyè",
        tone: "Nada 2 + Nada 4",
        translation: "tamat belajar / menyelesaikan jenjang fondasi",
        isEnrichment: true,
        inclusionReason:
          "Status pencapaian akademik setelah menuntaskan seluruh silabus fondasi.",
        exampleHanzi: "基础结业证书。",
        examplePinyin: "Jīchǔ jiéyè zhèngshū.",
        exampleTranslation: "Sertifikat kelulusan fondasi dasar.",
      },
      {
        hanzi: "表达",
        pinyin: "biǎodá",
        tone: "Nada 3 + Nada 2",
        translation: "mengekspresikan / menyampaikan maksud secara lisan",
        isEnrichment: true,
        inclusionReason: "Tujuan utama pembelajaran komunikatif berbasis konteks.",
        exampleHanzi: "自信表达。",
        examplePinyin: "Zìxìn biǎodá.",
        exampleTranslation: "Mengekspresikan diri dengan percaya diri.",
      },
      {
        hanzi: "听力辨析",
        pinyin: "tīnglì biànxī",
        tone: "Nada 1 + 4 + 4 + 1",
        translation: "analisis diskriminasi pendengaran",
        isEnrichment: true,
        inclusionReason:
          "Metode evaluasi ilmiah untuk mengukur ketajaman telinga terhadap pasangan bunyi minimal.",
        exampleHanzi: "进行听力辨析。",
        examplePinyin: "Jìnxíng tīnglì biànxī.",
        exampleTranslation: "Melakukan analisis diskriminasi pendengaran.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Pengujian diskriminasi komprehensif inisial sulit (zh/ch/sh vs z/c/s, j/q/x) dan final sengau (an vs ang, in vs ing, ian vs iang).",
      tones:
        "Pengujian stabilitas 4 kontur nada dalam konteks kalimat mengalir, penerapan otomatis sandhi 3+3 (ní hǎo) dan sandhi kata 不 (bú shì) serta 一 (yí ge).",
      toneCombinations:
        "Ritme artikulasi alami: jeda mikro antar-frasa, pelafalan nada netral yang ringan pendek, dan penegasan nada ke-4 yang mantap.",
      commonErrors:
        "Keraguan pitch saat rekaman lisan, melafalkan ejaan pinyin seperti bahasa Indonesia, atau lupa aturan sandhi pada kata 不 dan 一.",
      articulatoryTip:
        "Bernapas tenang dari diafragma sebelum merekam suara. Jangan terburu-buru; artikulasi yang stabil dan kontur nada yang jelas jauh lebih dihargai daripada berbicara cepat.",
    },

    hanziComponents: [
      {
        hanzi: "基",
        structure: "Atas-Bawah (上下结构)",
        components: "其 (komponen fonetik/alat tapis) + 土 (tanah/bumi di bagian bawah)",
        strokeCount: 11,
        strokeOrderRules: [
          "Atas sebelum bawah (从上到下)",
          "Tulis komponen 其 di atas terlebih dahulu, baru komponen tanah 土 di bawah",
        ],
        notes: "Melambangkan fondasi bangunan yang berpijak kokoh di atas tanah yang padat.",
      },
      {
        hanzi: "考",
        structure: "Setengah Mengelilingi (半包围结构)",
        components: "耂 (orang tua beruban) + 丂 (alat kait lengkung)",
        strokeCount: 6,
        strokeOrderRules: [
          "Atas sebelum bawah (从上到下)",
          "Garis miring panjang membelah dari kanan atas ke kiri bawah",
        ],
        notes: "Makna historis: menguji, meneliti, atau memeriksa pengetahuan secara mendalam.",
      },
      {
        hanzi: "成",
        structure: "Setengah Mengelilingi (半包围结构)",
        components: "戈 (senjata lembing) + 𠃌 (bingkai sudut)",
        strokeCount: 6,
        strokeOrderRules: [
          "Horizontal atas terlebih dahulu",
          "Garis kait siku kanan",
          "Titik kanan atas ditulis paling akhir (最后写点)",
        ],
        notes: "Melambangkan pencapaian tuntas, keberhasilan, atau cita-cita yang telah terwujud.",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Bagian A: Kaidah Ejaan & Diskriminasi Fonemik Pinyin",
        formula:
          "Inisial Dasar & Sulit + Final Tunggal & Sengau + Ortografi Resmi ISO 7098",
        explanation:
          "Sistem Pinyin mengintegrasikan 21 inisial konsonan, 36 final vokal, dan aturan ejaan baku. Ujian Bagian A mengevaluasi: 1) Pembedaan aspirasi (b vs p, d vs t, g vs k); 2) Pembedaan konsonan lidah terangkat vs gigi datar (zh/ch/sh vs z/c/s); 3) Pelepasan titik dua vokal ü setelah j, q, x, y (qu, ju, xu, yu) vs n/l (nǚ, lǜ); 4) Penggunaan apostrof pemisah batas suku kata (Xī'ān vs xiān).",
        example: "Xī'ān (西安) wajib berapostrof; qù (去) vokal ü tanpa titik dua.",
        positiveExamples: [
          {
            hanzi: "去",
            pinyin: "qù",
            translation: "Inisial q + final ü tanpa titik dua",
          },
          {
            hanzi: "绿",
            pinyin: "lǜ",
            translation: "Inisial l + final ü wajib bertitik dua",
          },
          {
            hanzi: "西安",
            pinyin: "Xī'ān",
            translation: "Apostrof pemisah batas suku kata",
          },
          {
            hanzi: "知",
            pinyin: "zhī",
            translation: "Konsonan dengan lidah melengkung ke atas (zh, ch, sh, r)",
          },
        ],
        usageConstraints:
          "Pinyin adalah panduan pelafalan resmi, bukan sistem abjad tersendiri.",
        commonErrors:
          "Menghilangkan tanda apostrof pada nama kota Xī'ān sehingga terbaca xiān.",
        communicativeFunction:
          "Menjamin kejernihan artikulasi internasional dan mencegah salah tafsir kata dalam percakapan nyata.",
      },
      {
        ruleTitle: "Bagian B: Kaidah Kontur Nada & Tone Sandhi Lisan",
        formula:
          "4 Kontur Pitch + Nada Netral + Sandhi (3+3→2+3, 不 + Nada 4→bú, 一 + Nada 4→yí)",
        explanation:
          "Tinggi rendah suara dalam Mandarin bersifat leksikal. Ujian Bagian B mengevaluasi: 1) 4 kontur nada sistem 5-tingkat (55, 35, 214, 51); 2) Nada netral yang ringan dan pendek; 3) Sandhi dua nada ke-3 berdampingan (nǐ hǎo → ní hǎo); 4) Perubahan nada kata 不 (bú shì) dan kata bilangan 一 (yí ge sebelum nada 4, yì tiān sebelum nada 1/2/3).",
        example: "你好 (ní hǎo) + 不是 (bú shì) + 一个 (yí ge).",
        positiveExamples: [
          {
            hanzi: "你好",
            pinyin: "ní hǎo",
            translation: "Kaidah sandhi 3+3 (三声变调)",
          },
          {
            hanzi: "不是",
            pinyin: "bú shì",
            translation: "Kata 不 berubah nada 2 sebelum nada 4",
          },
          {
            hanzi: "一个",
            pinyin: "yí ge",
            translation: "Kata 一 berubah nada 2 sebelum nada 4",
          },
          {
            hanzi: "一天",
            pinyin: "yì tiān",
            translation: "Kata 一 berubah nada 4 sebelum nada 1",
          },
        ],
        usageConstraints:
          "Pinyin tertulis di kamus tetap mencatat nada asal; perubahan sandhi terjadi di lisan.",
        commonErrors:
          "Melafalkan nada 4 dengan ragu atau mengabaikan sandhi pada kata 不 dan 一.",
        communicativeFunction:
          "Menciptakan kelenturan bicara yang alami, percaya diri, dan mudah dipahami oleh penutur asli.",
      },
      {
        ruleTitle: "Bagian C: Kaidah Arsitektur Hanzi & Identifikasi Radikal Semantik",
        formula:
          "5 Struktur Bangun + 6 Prinsip Goresan + 9 Radikal Fondasi Kunci",
        explanation:
          "Karakter Hanzi adalah arsitektur visual geometris. Ujian Bagian C mengevaluasi: 1) 5 jenis struktur (Tunggal, Kiri-Kanan, Atas-Bawah, Setengah Mengelilingi, Mengelilingi Penuh); 2) 6 kaidah emas urutan goresan (atas ke bawah, kiri ke kanan, horizontal sebelum vertikal, luar sebelum dalam lalu tutup bingkai paling akhir); 3) Identifikasi rumpun makna 9 radikal fondasi (人/亻, 口, 女, 子, 木, 日, 月, 水/氵, 火/灬).",
        example: "国 (全包围: luar dulu, isi giok 玉, lalu tutup bawah).",
        positiveExamples: [
          {
            hanzi: "木、林、森",
            pinyin: "mù, lín, sēn",
            translation: "Evolusi struktur tunggal → kiri-kanan → piramida",
          },
          {
            hanzi: "国",
            pinyin: "guó",
            translation: "Kaidah mengelilingi penuh: masuk dulu baru kunci pintu",
          },
          {
            hanzi: "海",
            pinyin: "hǎi",
            translation: "Radikal 氵 (tiga titik air) penunjuk rumpun perairan",
          },
          {
            hanzi: "妈",
            pinyin: "mā",
            translation: "Radikal 女 (wanita) penunjuk rumpun keluarga perempuan",
          },
        ],
        usageConstraints:
          "Memahami radikal mempermudah menebak rumpun makna kata-kata baru di HSK 1.",
        commonErrors:
          "Menutup garis bawah bingkai karakter '国' sebelum menulis isi di dalamnya.",
        communicativeFunction:
          "Memberikan modal aksaralogi yang kuat untuk membaca dan menghafal kosakata HSK 1 tanpa beban berlebih.",
      },
    ],

    culturalNotes:
      "Filosofi 'Wēn Gù Ér Zhī Xīn' (温故而知新): Pepatah klasik Kong Hu Cu dari Kitab Lunyu yang bermakna 'Dengan mengkaji ulang hal-hal lama secara mendalam, seseorang dapat memetik pemahaman dan wawasan baru'. Ujian kelulusan fondasi bukan untuk menghakimi kekurangan, melainkan sebagai cermin reflektif untuk memantapkan landasan sebelum melangkah ke jenjang yang lebih tinggi di Tingkat HSK 1.",

    listeningActivity: {
      goal: "Ujian Menyimak Integratif: Mendengarkan audio kalimat pendek dan mengidentifikasi perubahan sandhi nada serta batas suku kata.",
      audioText: "你好，一个红苹果。",
      pinyin: "Nǐ hǎo, yí ge hóng píngguǒ.",
      translation: "Halo, sebuah apel merah.",
      gistQuestion: {
        question:
          "Berdasarkan rekaman audio '你好，一个红苹果', nada berapakah yang dilafalkan pada kata '一' (satu)?",
        options: [
          "Nada ke-2 naik ('yí') karena mendahului kata bernada ke-4 ('gè' / ge)",
          "Nada ke-1 tinggi datar ('yī')",
          "Nada ke-4 jatuh tajam ('yì')",
          "Nada netral tanpa intonasi",
        ],
        correctAnswer:
          "Nada ke-2 naik ('yí') karena mendahului kata bernada ke-4 ('gè' / ge)",
        explanation:
          "Kata bilangan '一' (yī) secara konsisten mengalami perubahan sandhi menjadi nada ke-2 ('yí') saat berada tepat sebelum suku kata bernada ke-4 ('gè' / ge).",
      },
      detailQuestion: {
        question:
          "Pada kata salam '你好' (nǐ hǎo), bagaimanakah pelafalan nada yang tepat pada kata pertama '你'?",
        options: [
          "Dilafalkan sebagai Nada ke-2 menanjak ('ní') akibat kaidah sandhi 3+3 (三声变调)",
          "Tetap dilafalkan Nada ke-3 murni melengkung",
          "Dilafalkan Nada ke-1 datar tinggi",
          "Dilafalkan Nada ke-4 jatuh tegas",
        ],
        correctAnswer:
          "Dilafalkan sebagai Nada ke-2 menanjak ('ní') akibat kaidah sandhi 3+3 (三声变调)",
        explanation:
          "Kaidah sandhi 3+3 mewajibkan nada ke-3 pertama berubah menjadi nada ke-2 dalam pelafalan lisan ('ní hǎo') demi keluwesan pita suara.",
      },
    },

    speakingActivity: {
      prompt:
        "Mini Proyek Rekaman Suara: Rekam audio perkenalan diri pendek (15–30 detik) dalam bahasa Mandarin yang memuat 3 elemen: 1) Salam sopan (你好 / 老师好); 2) Nama panggilanmu (我叫...); 3) Satu kalimat sederhana tentang belajarmu (我学中文 / 汉字很有意思).",
      vocabularySupport: [
        "你好 (Nǐ hǎo: Halo)",
        "老师好 (Lǎoshī hǎo: Halo Guru)",
        "我叫…… (Wǒ jiào...: Nama saya...)",
        "我学中文 (Wǒ xué Zhōngwén: Saya belajar bahasa Mandarin)",
        "汉字很有意思 (Hànzì hěn yǒu yìsi: Karakter Hanzi sangat menarik)",
        "谢谢 (Xièxie: Terima kasih)",
      ],
      evaluationRubric:
        "Rubrik Evaluasi: 1) Kejelasan artikulasi (intelligibility); 2) Keberanian produksi suara mandiri; 3) Penerapan dasar 4 nada dan sandhi (ní hǎo); 4) Fokus pada keberanian komunikasi nyata, bukan aksen sempurna penutur asli.",
    },

    readingActivity: {
      textHanzi:
        "学中文，打好基础最重要。学好声母、韵母和声调，再掌握汉字结构和笔顺，我们就能自信地学好 HSK 1。温故而知新，每一步都有收获。",
      textPinyin:
        "Xué Zhōngwén, dǎ hǎo jīchǔ zuì zhòngyào. Xué hǎo shēngmǔ, yùnmǔ hé shēngdiào, zài zhǎngwò hànzì jiégòu hé bǐshùn, wǒmen jiù néng zìxìn de xué hǎo HSK 1. Wēn gù ér zhī xīn, měi yí bù dōu yǒu shōuhuò.",
      textTranslation:
        "Belajar bahasa Mandarin, meletakkan fondasi yang baik adalah yang terpenting. Menguasai inisial, final, dan nada, lalu menguasai struktur Hanzi dan urutan goresan, kita akan dapat mempelajari HSK 1 dengan penuh percaya diri. Mengkaji ulang membuahkan pemahaman baru, setiap langkah membawa hasil.",
      mainIdea:
        "Fondasi fonetik dan aksara yang solid merupakan modal paling berharga untuk menaklukkan HSK 1 dengan sukses.",
      questions: [
        {
          question:
            "Menurut teks bacaan di atas, apa bekal utama yang membuat seorang pembelajar dapat memasuki jenjang HSK 1 dengan penuh percaya diri?",
          options: [
            "Menguasai inisial, final, dan nada, serta struktur karakter dan urutan goresan Hanzi secara solid",
            "Menghafal 5000 karakter Hanzi tanpa mempelajari cara melafalkannya",
            "Hanya mengandalkan teks alfabet tanpa mau mempelajari aksara Hanzi",
            "Menghindari latihan berbicara dan hanya membaca diam-diam",
          ],
          correctAnswer:
            "Menguasai inisial, final, dan nada, serta struktur karakter dan urutan goresan Hanzi secara solid",
          explanation:
            "Tiga pilar fonetik (inisial, final, nada) dan arsitektur Hanzi (struktur, urutan goresan) adalah modal kokoh untuk memulai HSK 1 dengan lancar.",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tuliskan tiga karakter fondasi integratif pada catatan belajarmu dengan urutan goresan yang tepat: '基' (jī - fondasi), '考' (kǎo - ujian), dan '成' (chéng - sukses/tuntas).",
      minimumCharacters: 3,
      checklist: [
        "Menulis '基': komponen atas '其' terlebih dahulu, baru komponen tanah '土' di bawah.",
        "Menulis '考': bagian atas '耂' terlebih dahulu, baru garis lengkung kait bawah '丂'.",
        "Menulis '成': garis mendatar atas → garis tegak miring kiri → garis kait siku kanan → titik atas paling akhir.",
      ],
      modelAnswer: {
        hanzi: "基础考核成功",
        pinyin: "jīchǔ kǎohé chénggōng",
        translation: "ujian fondasi berhasil lulus",
      },
    },

    personalizationPrompt:
      "Tuliskan refleksi singkat di jurnal belajarmu: dari 9 materi fondasi yang telah kamu pelajari, topik mana yang paling menarik dan paling memperluas wawasanmu tentang bahasa Mandarin?",
    errorJournalHooks: [
      "Tertukar antara bunyi lidah terangkat (zh/ch/sh) dan gigi datar (z/c/s) saat mendengar",
      "Lupa menerapkan sandhi nada lisan pada frasa nǐ hǎo (mengucapkannya datar tanpa meluncurkan nada kedua)",
      "Menulis pinyin tanpa tanda apostrof pemisah pada nama kota atau suku kata bervokal ganda",
      "Menutup garis bawah bingkai karakter mengelilingi sebelum menulis komponen dalamnya",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna menyelesaikan seluruh evaluasi integratif Bagian A (Pinyin), Bagian B (Nada), Bagian C (Hanzi), dan menyelesaikan Mini Proyek perkenalan lisan dengan nilai minimal 80%.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Jika skor di bawah 80%, tinjau kembali unit spesifik yang memerlukan penguatan (F-02/03 untuk inisial, F-04/05 untuk final, F-06/07 untuk nada, F-08 untuk ejaan, F-09 untuk Hanzi).",
    },
  },
];

// -------------------------------------------------------------
// 2. DATA UNIT MODUL HSK 1
// -------------------------------------------------------------
const HSK1_UNITS: FullUnitDetail[] = [
  // -------------------------------------------------------------
  // HSK 1 Unit 01: Salam & Sopan Santun (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "hsk1-01",
    moduleId: "hsk1",
    slug: "01",
    unitNumber: 1,
    title: "Salam & Sopan Santun",
    hanzi: "问候与礼貌",
    pinyin: "Wènhòu yǔ Lǐmào",
    translation: "Sapaan Sehari-hari, Etika Kesantunan & Penutupan Percakapan",
    objectives:
      "Menguasai etika komunikasi dasar bahasa Mandarin: membedakan penggunaan kata ganti hormat 您 vs 你, menguasai sapaan berdasarkan waktu (pagi/malam), menerapkan sandhi nada ke-3 pada 你好, serta merespons permohonan maaf (对不起 ↔ 没关系) dan ucapan terima kasih (谢谢 ↔ 不客气) secara santun.",
    overview:
      "Pelajaran pembuka tingkat HSK 1 ini membimbingmu membangun interaksi sosial pertama yang hangat dan santun dalam bahasa Mandarin. Kamu akan mempelajari sapaan kasual dan formal kepada guru atau orang tua, membiasakan pelafalan sandhi nada yang lentur, serta mempraktikkan etika kesopanan timbal balik yang menjadi fondasi budaya percakapan Tionghoa.",
    vocabCount: 10,
    durationMinutes: 12,
    levelBadge: "HSK 1 · UNIT 01",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["fund-10"],
    skills: [
      "Sapaan Formal & Kasual",
      "Respons Kesantunan",
      "Sandhi Nada ke-3",
      "Etika Sosial",
    ],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "David (Mahasiswa Asing Baru) & Guru Wang (Dosen Senior)",
      location: "Lobi Gedung Akademik Universitas",
      goal: "Menyapa dosen senior dengan bentuk hormat, meminta maaf secara santun karena tidak sengaja menyenggol buku, dan berpamitan dengan sopan.",
      scenarioNotes:
        "David baru saja tiba di kampus dan bertemu Guru Wang di lobi. Ia mempraktikkan sapaan formal 您好, merespons permintaan maaf, dan mengakhiri obrolan dengan ucapan terima kasih.",
    },

    dialogue: [
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "王老师，您好！早上好！",
        pinyin: "Wáng lǎoshī, nín hǎo! Zǎoshang hǎo!",
        translation: "Halo Guru Wang! Selamat pagi!",
      },
      {
        speaker: "Guru Wang",
        role: "Dosen",
        hanzi: "大卫，你好！早上好。请进！",
        pinyin: "Dàwèi, nǐ hǎo! Zǎoshang hǎo. Qǐng jìn!",
        translation: "Halo David! Selamat pagi. Silakan masuk!",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "对不起，老师，我不小心碰了您的书。",
        pinyin: "Duìbuqǐ, lǎoshī, wǒ bù xiǎoxīn pèng le nín de shū.",
        translation: "Maaf, Guru, saya tidak sengaja menyenggol buku Anda.",
      },
      {
        speaker: "Guru Wang",
        role: "Dosen",
        hanzi: "没关系，不要紧。谢谢你帮我拿起来。",
        pinyin: "Méi guānxi, bú yàojǐn. Xièxie nǐ bāng wǒ ná qǐlai.",
        translation:
          "Tidak apa-apa, tidak masalah. Terima kasih sudah membantu mengambilkannya.",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "不客气！老师，明天见！",
        pinyin: "Bú kèqi! Lǎoshī, míngtiān jiàn!",
        translation: "Sama-sama! Guru, sampai jumpa besok!",
      },
      {
        speaker: "Guru Wang",
        role: "Dosen",
        hanzi: "再见，明天见！",
        pinyin: "Zàijiàn, míngtiān jiàn!",
        translation: "Sampai jumpa, sampai jumpa besok!",
      },
    ],

    vocabulary: [
      {
        hanzi: "你",
        pinyin: "nǐ",
        tone: "Nada 3",
        translation: "kamu / engkau",
        partOfSpeech: "pronomina",
        usageNotes:
          "Kata ganti orang kedua tunggal untuk teman sebaya, rekan sejajar, atau orang yang lebih muda.",
        exampleHanzi: "你好！",
        examplePinyin: "Nǐ hǎo!",
        exampleTranslation: "Halo kamu!",
      },
      {
        hanzi: "您",
        pinyin: "nín",
        tone: "Nada 2",
        translation: "Anda (bentuk hormat santun)",
        partOfSpeech: "pronomina",
        usageNotes:
          "Bentuk takzim dari '你'. Wajib digunakan saat menyapa orang tua, guru, atasan, atau pelanggan.",
        exampleHanzi: "老师，您好！",
        examplePinyin: "Lǎoshī, nín hǎo!",
        exampleTranslation: "Halo, Guru!",
      },
      {
        hanzi: "好",
        pinyin: "hǎo",
        tone: "Nada 3",
        translation: "baik / bagus / sehat",
        partOfSpeech: "adjektiva",
        usageNotes: "Digunakan setelah kata sapaan untuk memberi salam (nǐ hǎo, lǎoshī hǎo).",
        exampleHanzi: "早上好！",
        examplePinyin: "Zǎoshang hǎo!",
        exampleTranslation: "Selamat pagi!",
      },
      {
        hanzi: "老师",
        pinyin: "lǎoshī",
        tone: "Nada 3 + Nada 1",
        translation: "guru / pengajar / dosen",
        partOfSpeech: "nomina",
        usageNotes:
          "Diletakkan setelah marga sebagai bentuk panggilan hormat (misal: Wáng lǎoshī).",
        exampleHanzi: "王老师好。",
        examplePinyin: "Wáng lǎoshī hǎo.",
        exampleTranslation: "Halo Guru Wang.",
      },
      {
        hanzi: "早上",
        pinyin: "zǎoshang",
        tone: "Nada 3 + Nada netral",
        translation: "pagi hari (sekitar pukul 06:00 - 09:00)",
        partOfSpeech: "nomina waktu",
        usageNotes:
          "Dapat digabung dengan '好' menjadi ucapan selamat pagi: Zǎoshang hǎo.",
        exampleHanzi: "早上见。",
        examplePinyin: "Zǎoshang jiàn.",
        exampleTranslation: "Sampai jumpa di pagi hari.",
      },
      {
        hanzi: "晚上",
        pinyin: "wǎnshang",
        tone: "Nada 3 + Nada netral",
        translation: "malam hari",
        partOfSpeech: "nomina waktu",
        usageNotes: "Digabung dengan '好' menjadi ucapan selamat malam: Wǎnshang hǎo.",
        exampleHanzi: "晚上好！",
        examplePinyin: "Wǎnshang hǎo!",
        exampleTranslation: "Selamat malam!",
      },
      {
        hanzi: "谢谢",
        pinyin: "xièxie",
        tone: "Nada 4 + Nada netral",
        translation: "terima kasih",
        partOfSpeech: "verba",
        usageNotes: "Suku kata kedua diucapkan ringan pendek (nada netral).",
        exampleHanzi: "谢谢您！",
        examplePinyin: "Xièxie nín!",
        exampleTranslation: "Terima kasih kepada Anda!",
      },
      {
        hanzi: "不客气",
        pinyin: "bú kèqi",
        tone: "Nada 2 + Nada 4 + netral",
        translation: "sama-sama / jangan sungkan",
        partOfSpeech: "frasa idiomatis",
        usageNotes:
          "Jawaban standar ketika seseorang mengucapkan '谢谢'. Kata '不' mengalami sandhi menjadi nada ke-2.",
        exampleHanzi: "不客气，请坐。",
        examplePinyin: "Bú kèqi, qǐng zuò.",
        exampleTranslation: "Sama-sama, silakan duduk.",
      },
      {
        hanzi: "对不起",
        pinyin: "duìbuqǐ",
        tone: "Nada 4 + netral + Nada 3",
        translation: "maaf / permisi",
        partOfSpeech: "frasa idiomatis",
        usageNotes:
          "Diucapkan ketika berbuat kekeliruan atau hendak meminta maaf dengan tulus.",
        exampleHanzi: "对不起，我迟到了。",
        examplePinyin: "Duìbuqǐ, wǒ chídào le.",
        exampleTranslation: "Maaf, saya terlambat.",
      },
      {
        hanzi: "没关系",
        pinyin: "méi guānxi",
        tone: "Nada 2 + Nada 1 + netral",
        translation: "tidak apa-apa / tidak masalah",
        partOfSpeech: "frasa idiomatis",
        usageNotes:
          "Jawaban standar menenteramkan ketika orang lain mengucapkan '对不起'.",
        exampleHanzi: "没关系，慢慢来。",
        examplePinyin: "Méi guānxi, mànman lái.",
        exampleTranslation: "Tidak apa-apa, santai saja perlahan.",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "请",
        pinyin: "qǐng",
        tone: "Nada 3",
        translation: "silakan / tolong",
        isEnrichment: true,
        inclusionReason:
          "Kata pembuka sopan untuk meminta seseorang melakukan sesuatu secara hormat.",
        exampleHanzi: "请进，请坐。",
        examplePinyin: "Qǐng jìn, qǐng zuò.",
        exampleTranslation: "Silakan masuk, silakan duduk.",
      },
      {
        hanzi: "再见",
        pinyin: "zàijiàn",
        tone: "Nada 4 + Nada 4",
        translation: "sampai jumpa lagi / selamat tinggal",
        isEnrichment: true,
        inclusionReason: "Ungkapan penutup perpisahan paling mendasar dan universal.",
        exampleHanzi: "明天再见！",
        examplePinyin: "Míngtiān zàijiàn!",
        exampleTranslation: "Sampai jumpa besok!",
      },
      {
        hanzi: "礼貌",
        pinyin: "lǐmào",
        tone: "Nada 3 + Nada 4",
        translation: "etika kesopanan / sopan santun",
        isEnrichment: true,
        inclusionReason:
          "Konsep kultural mendasar dalam pergaulan sosial masyarakat Tionghoa.",
        exampleHanzi: "说话要有礼貌。",
        examplePinyin: "Shuōhuà yào yǒu lǐmào.",
        exampleTranslation: "Berbicara harus memiliki sopan santun.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Lafalkan 'x' pada 'xièxie' dengan lidah mendatar di belakang gigi bawah. Lafalkan 'sh' pada 'lǎoshī' dengan ujung lidah sedikit diangkat ke atas.",
      tones:
        "Penerapan otomatis Sandhi Nada ke-3 pada 'nǐ hǎo' (dilafalkan 'ní hǎo'). Nada netral yang ringan dan pendek pada suku kata kedua 'xièxie', 'zǎoshang', 'duìbuqǐ', dan 'bú kèqi'.",
      toneCombinations:
        "Perubahan nada kata '不' (tidak): dibaca naik jadi nada 2 ('bú') pada 'bú kèqi' karena kata berikutnya ('kè') bernada 4.",
      commonErrors:
        "Melafalkan 'nǐ hǎo' dengan jeda kaku bernada 3 murni, melafalkan 'xièxie' dengan dua nada 4 yang sama-sama berat, atau menggunakan 'nǐ' kepada pengajar.",
      articulatoryTip:
        "Saat mengucapkan 'ní hǎo', bayangkan suara naik seperti bertanya 'hah?' pada suku kata pertama, lalu turunkan santai pada kata kedua.",
    },

    hanziComponents: [
      {
        hanzi: "您",
        structure: "Atas-Bawah (上下结构)",
        components: "你 (kamu / nǐ) + 心 (hati nurani di bagian bawah)",
        strokeCount: 11,
        strokeOrderRules: [
          "Atas sebelum bawah (从上到下)",
          "Selesaikan komponen 你 dulu baru radikal hati 心",
        ],
        notes:
          "Filosofi karakter: menempatkan orang lain (你) di dalam hati nurani kita (心) sebagai wujud penghormatan tertinggi.",
      },
      {
        hanzi: "好",
        structure: "Kiri-Kanan (左右结构)",
        components: "女 (perempuan/ibu) + 子 (anak/keturunan)",
        strokeCount: 6,
        strokeOrderRules: [
          "Kiri sebelum kanan (从左到右)",
          "Tulis radikal wanita 女 dulu baru anak 子",
        ],
        notes:
          "Ideografis asosiatif kuno: seorang ibu bersama anaknya melambangkan kebaikan, kebahagiaan, dan kedamaian.",
      },
      {
        hanzi: "谢",
        structure: "Kiri-Tengah-Kanan (左中右结构)",
        components:
          "讠 (kata-kata/ucapan) + 身 (tubuh manusia) + 寸 (satuan inci / ketepatan)",
        strokeCount: 12,
        strokeOrderRules: [
          "Kiri ke kanan (从左到右)",
          "Tulis radikal wacana 讠 → 身 di tengah → 寸 di kanan",
        ],
        notes:
          "Melambangkan tindakan membungkukkan tubuh secara terukur disertai ucapan tulus untuk berterima kasih.",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Perbedaan Pronomina '你' (Nǐ) dan '您' (Nín)",
        formula: "Sebaya/Junior: 你 (Nǐ) | Senior/Dosen/Hormat: 您 (Nín)",
        explanation:
          "Bahasa Mandarin memiliki distingsi kesopanan yang tegas pada kata ganti orang kedua. Gunakan 你 (nǐ) untuk teman sebaya, anggota keluarga yang lebih muda, atau dalam suasana santai. Gunakan 您 (nín) untuk menunjukkan takzim dan rasa hormat kepada orang yang lebih tua, guru, dosen, dokter, atau klien bisnis.",
        example: "老师，您好！(Lǎoshī, nín hǎo!: Guru, halo!)",
        positiveExamples: [
          {
            hanzi: "王老师，您好！",
            pinyin: "Wáng lǎoshī, nín hǎo!",
            translation: "Guru Wang, halo (hormat)!",
          },
          {
            hanzi: "大卫，你好！",
            pinyin: "Dàwèi, nǐ hǎo!",
            translation: "David, halo (kasual sebaya)!",
          },
        ],
        usageConstraints:
          "Hindari menyapa pengajar atau lansia hanya dengan 'nǐ hǎo' karena terkesan kurang santun.",
        commonErrors:
          "Menggunakan 'nín' dalam bentuk jamak secara langsung tanpa kata 'men' (bentuk jamak yang tepat: nín gèwèi / nǐmen).",
        communicativeFunction:
          "Menunjukkan etika kesantunan sosial dan kedudukan relasi dalam budaya Tionghoa.",
      },
      {
        ruleTitle: "Kaidah Sandhi Nada ke-3 pada Sapaan '你好' (Nǐ hǎo → Ní hǎo)",
        formula: "Nada 3 + Nada 3 → Nada 2 + Nada 3",
        explanation:
          "Ketika dua karakter yang keduanya bernada ke-3 bertemu berdampingan, karakter pertama otomatis dilafalkan sebagai nada ke-2 (naik menanjak), meskipun dalam ejaan tulisan pinyin tetap ditulis dengan tanda nada ke-3.",
        example: "你好 ejaan tulisan: nǐ hǎo, pelafalan lisan: ní hǎo.",
        positiveExamples: [
          {
            hanzi: "你好",
            pinyin: "nǐ hǎo (dibaca: ní hǎo)",
            translation: "Halo",
          },
          {
            hanzi: "请你",
            pinyin: "qǐng nǐ (dibaca: qíng nǐ)",
            translation: "Silakan kamu",
          },
        ],
        usageConstraints: "Aturan ini wajib diterapkan pada bahasa lisan mengalir.",
        commonErrors:
          "Menulis ejaan pinyin kamus menjadi 'ní hǎo' (ejaan tulisan tetap baku nǐ hǎo).",
        communicativeFunction:
          "Menjamin kelenturan fisik pita suara agar tidak tersendat di nada rendah.",
      },
      {
        ruleTitle: "Pasangan Respons Kesantunan Sosial Timbal Balik",
        formula:
          "对不起 (Maaf) ↔ 没关系 (Tidak apa-apa) | 谢谢 (Terima kasih) ↔ 不客气 (Sama-sama)",
        explanation:
          "Dalam etika percakapan Mandarin, setiap permohonan maaf dan ucapan terima kasih memiliki pasangan respons baku yang wajib dijawab agar tidak dianggap dingin: 1) Saat seseorang berterima kasih '谢谢' (Xièxie), tanggapi dengan '不客气' (Bú kèqi); 2) Saat seseorang meminta maaf '对不起' (Duìbuqǐ), tanggapi dengan '没关系' (Méi guānxi).",
        example: "A: 谢谢你！ — B: 不客气！ | A: 对不起！ — B: 没关系！",
        positiveExamples: [
          {
            hanzi: "谢谢您。— 不客气。",
            pinyin: "Xièxie nín. — Bú kèqi.",
            translation: "Terima kasih kepada Anda. — Sama-sama.",
          },
          {
            hanzi: "对不起。— 没关系。",
            pinyin: "Duìbuqǐ. — Méi guānxi.",
            translation: "Maaf. — Tidak apa-apa.",
          },
        ],
        usageConstraints: "Jangan tertukar menjawab '对不起' dengan '不客气'.",
        commonErrors:
          "Menjawab '对不起' dengan '不客气' (salah pasangan respons).",
        communicativeFunction:
          "Menjaga keharmonisan dan kesantunan interaksi sosial sehari-hari.",
      },
    ],

    culturalNotes:
      "Etika Sapaan & Konsep 'Mianzi' (面子) dalam Budaya Tionghoa: Dalam interaksi sosial masyarakat Tionghoa, menyapa seseorang sering kali mencantumkan gelar profesi atau status kekerabatan di depan kata '好'. Misalnya menyapa guru dengan '老师好' (Lǎoshī hǎo), bukan hanya '你好' (Nǐ hǎo). Tindakan ini mencerminkan rasa hormat dan 'memberi muka' (给面子 - gěi miànzi), yang sangat diapresiasi dalam membangun hubungan interpersonal yang harmonis.",

    listeningActivity: {
      goal: "Mendengarkan audio sapaan situasional dan mengidentifikasi tingkat formalitas serta waktu pengucapannya.",
      audioText: "王老师，您好！早上好！",
      pinyin: "Wáng lǎoshī, nín hǎo! Zǎoshang hǎo!",
      translation: "Guru Wang, halo! Selamat pagi!",
      gistQuestion: {
        question:
          "Berdasarkan audio sapaan di atas, kapan percakapan tersebut berlangsung dan kepada siapakah sapaan ditujukan?",
        options: [
          "Di pagi hari kepada seorang guru dengan sapaan hormat (您好)",
          "Di malam hari kepada teman sebaya dengan sapaan santai (你好)",
          "Di siang hari kepada adik kelas di kantin",
          "Saat berpamitan pulang di sore hari",
        ],
        correctAnswer:
          "Di pagi hari kepada seorang guru dengan sapaan hormat (您好)",
        explanation:
          "Audio memuat kata 'Wáng lǎoshī' (Guru Wang), pronomina hormat 'nín hǎo', dan waktu 'zǎoshang hǎo' (selamat pagi).",
      },
      detailQuestion: {
        question:
          "Manakah ungkapan respons yang PALING TEPAT jika seseorang mengucapkan '对不起' (duìbuqǐ) kepadamu?",
        options: [
          "没关系 (Méi guānxi / Tidak apa-apa)",
          "不客气 (Bú kèqi / Sama-sama)",
          "再见 (Zàijiàn / Sampai jumpa)",
          "早上好 (Zǎoshang hǎo / Selamat pagi)",
        ],
        correctAnswer: "没关系 (Méi guānxi / Tidak apa-apa)",
        explanation:
          "Pasangan respons baku untuk permohonan maaf '对不起' adalah '没关系' (tidak apa-apa).",
      },
    },

    speakingActivity: {
      prompt:
        "Lakukan roleplay percakapan santun dua arah: 1) Sapa pengajarmu di pagi hari dengan menyebut nama marga dan kata ganti hormat (王老师，您好！早上好！); 2) Ucapkan terima kasih dan balas respons kesantunan (谢谢老师！ — 不客气！); 3) Sampaikan salam perpisahan (老师再见！).",
      vocabularySupport: [
        "老师 (lǎoshī: guru)",
        "您好 (nín hǎo: halo hormat)",
        "早上好 (zǎoshang hǎo: selamat pagi)",
        "谢谢 (xièxie: terima kasih)",
        "不客气 (bú kèqi: sama-sama)",
        "再见 (zàijiàn: sampai jumpa)",
      ],
      evaluationRubric:
        "Kriteria Evaluasi: 1) Penerapan kata '您' kepada guru; 2) Kelenturan sandhi nada pada 'ní hǎo'; 3) Nada netral ringan pada 'xièxie' dan 'bú kèqi'; 4) Intonasi yang ramah dan percaya diri.",
    },

    readingActivity: {
      textHanzi:
        "早上好！王老师在学校。大卫对老师说：‘老师，您好！’老师说：‘大卫，你好！’大卫帮老师拿书，老师说：‘谢谢你！’大卫说：‘不客气，再见！’",
      textPinyin:
        "Zǎoshang hǎo! Wáng lǎoshī zài xuéxiào. Dàwèi duì lǎoshī shuō: ‘Lǎoshī, nín hǎo!’ Lǎoshī shuō: ‘Dàwèi, nǐ hǎo!’ Dàwèi bāng lǎoshī ná shū, lǎoshī shuō: ‘Xièxie nǐ!’ Dàwèi shuō: ‘Bú kèqi, zàijiàn!’",
      textTranslation:
        "Selamat pagi! Guru Wang berada di sekolah. David menyapa guru: 'Guru, halo!' Guru berkata: 'David, halo!' David membantu guru membawakan buku, guru berkata: 'Terima kasih!' David menjawab: 'Sama-sama, sampai jumpa!'",
      mainIdea:
        "Interaksi kesantunan sehari-hari antara murid dan guru di lingkungan sekolah.",
      questions: [
        {
          question:
            "Mengapa David menyapa gurunya menggunakan kata '您好' (nín hǎo) sedangkan guru menyapa David dengan '你好' (nǐ hǎo)?",
          options: [
            "Karena '您' adalah bentuk hormat kepada guru, sedangkan '你' adalah bentuk sapaan biasa dari yang lebih tua kepada murid.",
            "Karena kata '您' hanya boleh digunakan oleh laki-laki.",
            "Karena kata '你' hanya digunakan saat hari hujan.",
            "Karena guru tidak mengetahui nama David.",
          ],
          correctAnswer:
            "Karena '您' adalah bentuk hormat kepada guru, sedangkan '你' adalah bentuk sapaan biasa dari yang lebih tua kepada murid.",
          explanation:
            "Pronomina '您' (nín) menunjukkan etika hormat kepada pengajar, sedangkan '你' (nǐ) wajar digunakan pengajar kepada muridnya.",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tuliskan karakter dasar sapaan dan kesantunan berikut dengan urutan goresan yang tepat di buku latihan: '你' (nǐ), '您' (nín), '好' (hǎo), dan '谢' (xiè).",
      minimumCharacters: 4,
      checklist: [
        "Menulis '你': radikal orang samping (亻) di sebelah kiri sebelum bagian kanan (尔).",
        "Menulis '您': tulis komponen atas '你' terlebih dahulu, baru komponen hati '心' di bawah.",
        "Menulis '好': tulis radikal perempuan '女' di sebelah kiri terlebih dahulu, baru komponen '子' di kanan.",
        "Menulis '谢': tulis dari kiri ke kanan: radikal wacana '讠' → komponen tengah '身' → komponen kanan '寸'.",
      ],
      modelAnswer: {
        hanzi: "你好，谢谢您",
        pinyin: "nǐ hǎo, xièxie nín",
        translation: "halo, terima kasih kepada Anda",
      },
    },

    personalizationPrompt:
      "Tuliskan satu sapaan santun lengkap yang ingin kamu ucapkan kepada gurumu atau teman belajarmu besok pagi di catatan Buku Frasa pribadimu.",
    errorJournalHooks: [
      "Menyapa guru atau orang tua menggunakan kata '你' alih-alih kata hormat '您'",
      "Salah memasangkan respons: menjawab permohonan maaf '对不起' dengan '不客气' (seharusnya '没关系')",
      "Melafalkan 'xièxie' dengan nada ke-4 penuh pada kedua suku kata tanpa nada netral di suku kata kedua",
      "Lupa menerapkan sandhi nada ke-2 saat melafalkan 'nǐ hǎo' (dibaca 'ní hǎo')",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna mampu membedakan '你' dan '您', menerapkan sandhi nada lisan 'ní hǎo', serta memasangkan respons '谢谢 ↔ 不客气' dan '对不起 ↔ 没关系' dengan tingkat akurasi minimal 80%.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Tinjau kembali tabel perbedaan kata ganti '你' vs '您' dan latih respons cepat pada menu Latihan Soal Unit 01.",
    },
  },
  // -------------------------------------------------------------
  // HSK 1 Unit 02: Identitas & Perkenalan (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "hsk1-02",
    moduleId: "hsk1",
    slug: "02",
    unitNumber: 2,
    title: "Identitas & Perkenalan",
    hanzi: "自我介绍",
    pinyin: "Zìwǒ Jièshào",
    translation: "Perkenalan Diri, Kebangsaan & Profesi",
    objectives:
      "Menguasai pola kalimat identitas dasar: memperkenalkan diri, menyebut asal negara dan pekerjaan menggunakan kata 'adalah' (A 是 B) dan bentuk sanggahan 'bukan' (A 不是 B), bertanya ya/tidak dengan partikel '吗', serta memakai kata tanya '谁' (siapa), '什么' (apa), dan '哪' (mana).",
    overview:
      "Unit kedua tingkat HSK 1 ini membimbingmu membangun percakapan perkenalan diri yang lugas dan natural. Kamu akan mempelajari penyebutan nama diri, asal negara (Indonesia dan Tiongkok), bahasa yang dipelajari, serta status pelajar atau pengajar. Di samping itu, kamu akan memahami bahwa kata tanya dalam bahasa Mandarin menempati posisi informasi yang dicari tanpa perlu membalik urutan subjek-predikat.",
    vocabCount: 12,
    durationMinutes: 14,
    levelBadge: "HSK 1 · UNIT 02",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["hsk1-01"],
    skills: [
      "Menyebut & Menanyakan Nama",
      "Pola Kalimat 'Adalah' (是) dan 'Bukan' (不是)",
      "Pertanyaan Ya/Tidak dengan 吗",
      "Kata Tanya Informasi 谁 / 什么 / 哪",
      "Penyebutan Kebangsaan & Bahasa",
    ],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "Andi (Mahasiswa Asal Indonesia) & Wang Ping (Mahasiswi Tiongkok Teman Sekelas)",
      location: "Ruang Kelas Bahasa Mandarin di Universitas",
      goal: "Saling memperkenalkan nama, asal negara, bahasa yang dipelajari, dan memastikan status mahasiswa satu sama lain.",
      scenarioNotes:
        "Andi baru masuk kelas dan duduk di samping Wang Ping. Mereka saling menyapa, bertukar nama, mengonfirmasi negara asal, dan menyadari bahwa mereka berdua adalah mahasiswa di kampus yang sama.",
    },

    dialogue: [
      {
        speaker: "Andi",
        role: "Mahasiswa",
        hanzi: "你好！我叫安迪。你叫什么名字？",
        pinyin: "Nǐ hǎo! Wǒ jiào Āndí. Nǐ jiào shénme míngzi?",
        translation: "Halo! Nama saya Andi. Siapa namamu?",
      },
      {
        speaker: "Wang Ping",
        role: "Mahasiswi",
        hanzi: "你好，安迪！我叫王萍。你是哪国人？",
        pinyin: "Nǐ hǎo, Āndí! Wǒ jiào Wáng Píng. Nǐ shì nǎ guó rén?",
        translation: "Halo, Andi! Nama saya Wang Ping. Kamu orang negara mana?",
      },
      {
        speaker: "Andi",
        role: "Mahasiswa",
        hanzi: "我是印度尼西亚人。你是中国人吗？",
        pinyin: "Wǒ shì Yìndùníxīyà rén. Nǐ shì Zhōngguó rén ma?",
        translation: "Saya orang Indonesia. Apakah kamu orang Tiongkok?",
      },
      {
        speaker: "Wang Ping",
        role: "Mahasiswi",
        hanzi: "是，我是中国人。你学习汉语吗？",
        pinyin: "Shì, wǒ shì Zhōngguó rén. Nǐ xuéxí Hànyǔ ma?",
        translation: "Ya, saya orang Tiongkok. Apakah kamu belajar bahasa Mandarin?",
      },
      {
        speaker: "Andi",
        role: "Mahasiswa",
        hanzi: "对，我学习汉语。我也是这里的学生。",
        pinyin: "Duì, wǒ xuéxí Hànyǔ. Wǒ yě shì zhèlǐ de xuésheng.",
        translation: "Benar, saya belajar bahasa Mandarin. Saya juga mahasiswa di sini.",
      },
      {
        speaker: "Wang Ping",
        role: "Mahasiswi",
        hanzi: "太好了！认识你很高兴。",
        pinyin: "Tài hǎo le! Rènshi nǐ hěn gāoxìng.",
        translation: "Bagus sekali! Senang berkenalan denganmu.",
      },
    ],

    vocabulary: [
      {
        hanzi: "我",
        pinyin: "wǒ",
        tone: "Nada 3",
        translation: "saya / aku",
        partOfSpeech: "pronomina",
        usageNotes:
          "Kata ganti orang pertama tunggal paling umum dan universal dalam bahasa Mandarin.",
        exampleHanzi: "我是学生。",
        examplePinyin: "Wǒ shì xuésheng.",
        exampleTranslation: "Saya adalah seorang pelajar.",
      },
      {
        hanzi: "你",
        pinyin: "nǐ",
        tone: "Nada 3",
        translation: "kamu / engkau",
        partOfSpeech: "pronomina",
        usageNotes:
          "Kata ganti orang kedua tunggal santai untuk teman sebaya atau relasi setara.",
        exampleHanzi: "你叫什么？",
        examplePinyin: "Nǐ jiào shénme?",
        exampleTranslation: "Siapa namamu?",
      },
      {
        hanzi: "他",
        pinyin: "tā",
        tone: "Nada 1",
        translation: "dia (laki-laki)",
        partOfSpeech: "pronomina",
        usageNotes:
          "Kata ganti orang ketiga laki-laki. Memiliki radikal orang samping (亻).",
        exampleHanzi: "他是老师。",
        examplePinyin: "Tā shì lǎoshī.",
        exampleTranslation: "Dia adalah seorang guru.",
      },
      {
        hanzi: "她",
        pinyin: "tā",
        tone: "Nada 1",
        translation: "dia (perempuan)",
        partOfSpeech: "pronomina",
        usageNotes:
          "Kata ganti orang ketiga perempuan. Memiliki radikal perempuan (女).",
        exampleHanzi: "她是我的好朋友。",
        examplePinyin: "Tā shì wǒ de hǎo péngyou.",
        exampleTranslation: "Dia adalah sahabat baik saya.",
      },
      {
        hanzi: "叫",
        pinyin: "jiào",
        tone: "Nada 4",
        translation: "bernama / memanggil",
        partOfSpeech: "verba",
        usageNotes:
          "Diikuti langsung oleh nama diri: [Subjek] + 叫 + [Nama].",
        exampleHanzi: "我叫安迪。",
        examplePinyin: "Wǒ jiào Āndí.",
        exampleTranslation: "Nama saya Andi.",
      },
      {
        hanzi: "名字",
        pinyin: "míngzi",
        tone: "Nada 2 + netral",
        translation: "nama",
        partOfSpeech: "nomina",
        usageNotes:
          "Suku kata 'zi' berbunyi nada netral pendek dan ringan.",
        exampleHanzi: "你叫什么名字？",
        examplePinyin: "Nǐ jiào shénme míngzi?",
        exampleTranslation: "Siapa nama lengkapmu?",
      },
      {
        hanzi: "是",
        pinyin: "shì",
        tone: "Nada 4",
        translation: "adalah / ya",
        partOfSpeech: "kata kerja (adalah)",
        usageNotes:
          "Menghubungkan dua entitas nominal: identitas, status, profesi, atau asal negara.",
        exampleHanzi: "我是中国人。",
        examplePinyin: "Wǒ shì Zhōngguó rén.",
        exampleTranslation: "Saya adalah orang Tiongkok.",
      },
      {
        hanzi: "不是",
        pinyin: "bú shì",
        tone: "Nada 2 + Nada 4",
        translation: "bukan / tidak benar",
        partOfSpeech: "frasa verba negasi",
        usageNotes:
          "Karakter '不' otomatis mengalami sandhi nada menjadi 'bú' karena diikuti nada ke-4.",
        exampleHanzi: "他不是老师，他是学生。",
        examplePinyin: "Tā bú shì lǎoshī, tā shì xuésheng.",
        exampleTranslation: "Dia bukan guru, dia adalah pelajar.",
      },
      {
        hanzi: "学生",
        pinyin: "xuésheng",
        tone: "Nada 2 + netral",
        translation: "pelajar / murid / mahasiswa",
        partOfSpeech: "nomina",
        usageNotes:
          "Suku kata kedua 'sheng' dilafalkan ringan dengan nada netral.",
        exampleHanzi: "我们都是学生。",
        examplePinyin: "Wǒmen dōu shì xuésheng.",
        exampleTranslation: "Kami semua adalah pelajar.",
      },
      {
        hanzi: "老师",
        pinyin: "lǎoshī",
        tone: "Nada 3 + Nada 1",
        translation: "guru / pengajar / dosen",
        partOfSpeech: "nomina",
        usageNotes:
          "Sering dipakai sebagai gelar panggilan sopan di belakang marga: 王老师 (Guru Wang).",
        exampleHanzi: "王老师好！",
        examplePinyin: "Wáng lǎoshī hǎo!",
        exampleTranslation: "Halo Guru Wang!",
      },
      {
        hanzi: "人",
        pinyin: "rén",
        tone: "Nada 2",
        translation: "orang / manusia",
        partOfSpeech: "nomina",
        usageNotes:
          "Diletakkan tepat di belakang nama negara untuk menyatakan warga negara: 中国人, 印尼人.",
        exampleHanzi: "印尼人很友好。",
        examplePinyin: "Yìnní rén hěn yǒuhǎo.",
        exampleTranslation: "Orang Indonesia sangat ramah.",
      },
      {
        hanzi: "中国",
        pinyin: "Zhōngguó",
        tone: "Nada 1 + Nada 2",
        translation: "Tiongkok / Cina",
        partOfSpeech: "nomina khusus",
        usageNotes:
          "Secara etimologis berarti 'Negeri Pusat / Kerajaan Tengah'.",
        exampleHanzi: "中国很大。",
        examplePinyin: "Zhōngguó hěn dà.",
        exampleTranslation: "Negeri Tiongkok sangat besar.",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "印度尼西亚",
        pinyin: "Yìndùníxīyà",
        tone: "Nada 4 + Nada 4 + Nada 2 + Nada 1 + Nada 4",
        translation: "Indonesia (sering disingkat 印尼 Yìnní)",
        isEnrichment: true,
        inclusionReason:
          "Kosakata identitas kewarganegaraan utama bagi pelajar pengguna aplikasi ini.",
        exampleHanzi: "我来自印度尼西亚。",
        examplePinyin: "Wǒ láizì Yìndùníxīyà.",
        exampleTranslation: "Saya berasal dari Indonesia.",
      },
      {
        hanzi: "汉语",
        pinyin: "Hànyǔ",
        tone: "Nada 4 + Nada 3",
        translation: "bahasa Mandarin (bahasa lisan etnis Han)",
        isEnrichment: true,
        inclusionReason:
          "Istilah standar untuk merujuk pada bahasa pengajaran Mandarin.",
        exampleHanzi: "学习汉语很有意思。",
        examplePinyin: "Xuéxí Hànyǔ hěn yǒu yìsi.",
        exampleTranslation: "Belajar bahasa Mandarin sangat menarik.",
      },
      {
        hanzi: "中文",
        pinyin: "Zhōngwén",
        tone: "Nada 1 + Nada 2",
        translation: "bahasa & wacana tulisan Mandarin",
        isEnrichment: true,
        inclusionReason:
          "Istilah sinonim umum yang sering dipertukarkan dengan 'Hànyǔ' dalam percakapan.",
        exampleHanzi: "你会说中文吗？",
        examplePinyin: "Nǐ huì shuō Zhōngwén ma?",
        exampleTranslation: "Apakah kamu bisa berbicara bahasa Mandarin?",
      },
      {
        hanzi: "哪",
        pinyin: "nǎ",
        tone: "Nada 3",
        translation: "mana / yang mana",
        isEnrichment: true,
        inclusionReason:
          "Kata tanya pilihan lokasi atau kebangsaan penting (哪国人 - nǎ guó rén).",
        exampleHanzi: "你是哪国人？",
        examplePinyin: "Nǐ shì nǎ guó rén?",
        exampleTranslation: "Kamu berasal dari negara mana?",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Lafalkan 'sh' pada 'shì' dan 'lǎoshī' dengan ujung lidah sedikit melengkung ke atas, sedangkan 's' pada 'xuésheng' dilafalkan dengan lidah mendatar di gigi depan.",
      tones:
        "Perubahan nada kata '不' (tidak): otomatis dibaca naik jadi nada 2 ('bú') saat bertemu kata bernada 4, seperti pada 'bú shì' (不是 = bukan).",
      toneCombinations:
        "Pelafalan nada netral yang ringan dan singkat pada suku kata kedua kata benda dwisuku: 'míngzi' (míng bernada 2 menanjak, zi netral) dan 'xuésheng' (xué bernada 2 menanjak, sheng netral).",
      commonErrors:
        "Melafalkan 'bú shì' dengan dua nada ke-4 yang sama-sama berat ('bù shì'), atau tertukar membunyikan 'sh' dan 's' sehingga 'shì' terdengar seperti 'sì' (angka empat).",
      articulatoryTip:
        "Untuk membunyikan 'shì' dengan bersih, bentuk lidah melengkung seperti huruf 'U' terbalik di langit-langit mulut dan embuskan udara desis tegas sambil mempertahankan nada ke-4 yang menukik.",
    },

    hanziComponents: [
      {
        hanzi: "我",
        structure: "Tunggal / Utuh (独体字)",
        components: "Bentuk piktograf tombak kuno (戈) penopang diri",
        strokeCount: 7,
        strokeOrderRules: [
          "Goresan miring pendek kiri atas (丿) duluan",
          "Garis mendatar (一) → garis tegak kait (丨) → garis miring naik (提)",
          "Goresan melengkung berkait (㇂) di kanan → miring (丿) → titik penutup (丶)",
        ],
        notes:
          "Karakter '我' pada mulanya menggambarkan senjata bertombak yang dipegang erat oleh prajurit untuk melindungi identitas dirinya sendiri.",
      },
      {
        hanzi: "是",
        structure: "Atas-Bawah (上下结构)",
        components: "日 (matahari / terang di atas) + 疋 (kaki penopang tegak lurus di bawah)",
        strokeCount: 9,
        strokeOrderRules: [
          "Atas sebelum bawah (从上到下)",
          "Selesaikan kotak matahari 日 terlebih dahulu, baru garis penopang di bawahnya",
          "Akhiri dengan goresan miring kanan (捺) yang tebal di kanan bawah",
        ],
        notes:
          "Makna filosofis: tegak lurus dan jelas tanpa kebohongan di bawah terangnya sinar matahari (kebenaran / ketegasan 'adalah').",
      },
      {
        hanzi: "中",
        structure: "Tunggal / Simetris (独体字)",
        components: "口 (bingkai kotak penanda wilayah) + 丨 (garis poros tegak lurus)",
        strokeCount: 4,
        strokeOrderRules: [
          "Tulis kotak 口 terlebih dahulu: garis tegak (丨) → sudut patah (𠃍) → penutup (一)",
          "Tusuk garis tegak tengah (丨) dari atas ke bawah tepat membelah simetri",
        ],
        notes:
          "Garis tegak yang tepat menembus titik tengah kotak melambangkan poros keseimbangan dan letak posisi pusat (tengah / kerajaan tengah).",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Pola Kalimat 'Adalah': A 是 B",
        formula: "[Subjek] + 是 (shì) + [Predikat Nominal / Identitas]",
        explanation:
          "Kata 是 (shì) artinya 'adalah' (seperti to-be 'am/is/are'). Berbeda dengan bahasa Indonesia yang bisa langsung bilang 'Saya guru', dalam bahasa Mandarin kata '是' wajib diucapkan: 'Saya ADALAH guru' (我是老师).",
        example: "我是学生。(Wǒ shì xuésheng: Saya adalah seorang pelajar.)",
        positiveExamples: [
          {
            hanzi: "我是印尼人。",
            pinyin: "Wǒ shì Yìnní rén.",
            translation: "Saya adalah orang Indonesia.",
          },
          {
            hanzi: "王老师是中国人。",
            pinyin: "Wáng lǎoshī shì Zhōngguó rén.",
            translation: "Guru Wang adalah orang Tiongkok.",
          },
        ],
        usageConstraints:
          "Kata 是 TIDAK BOLEH digunakan sebelum kata sifat tunggal (misal keliru mengatakan 'Wǒ shì hǎo').",
        commonErrors:
          "Menghilangkan kata '是' saat menyebut status (misal keliru berkata 'Wǒ Yìnní rén').",
        communicativeFunction:
          "Menegaskan identitas diri, profesi, atau asal kebangsaan secara formal maupun kasual.",
      },
      {
        ruleTitle: "Menyatakan 'Bukan': A 不是 B",
        formula: "[Subjek] + 不是 (bú shì) + [Identitas]",
        explanation:
          "Untuk menyatakan bahwa subjek 'bukan' suatu entitas atau identitas, letakkan kata sanggahan 不 (bù) tepat di depan 是 (shì). Karena 是 bernada ke-4, pelafalan 不 otomatis berubah menjadi nada ke-2 (bú).",
        example: "他不是老师。(Tā bú shì lǎoshī: Dia bukan seorang guru.)",
        positiveExamples: [
          {
            hanzi: "我不是中国人。",
            pinyin: "Wǒ bú shì Zhōngguó rén.",
            translation: "Saya bukan orang Tiongkok.",
          },
          {
            hanzi: "她不是我的学生。",
            pinyin: "Tā bú shì wǒ de xuésheng.",
            translation: "Dia bukan murid saya.",
          },
        ],
        usageConstraints:
          "Gunakan '不是' untuk menyangkal nomina identitas. Jangan gunakan '没有' untuk menyangkal identitas.",
        commonErrors:
          "Mengucapkan kata 'bù' dengan nada ke-4 yang kaku alih-alih nada sandhi 'bú'.",
        communicativeFunction:
          "Meluruskan kekeliruan identitas atau menyatakan keanggotaan kelompok yang berbeda.",
      },
      {
        ruleTitle: "Kalimat Tanya Konfirmatori Ya/Tidak dengan Partikel '吗' (Ma)",
        formula: "[Kalimat Pernyataan Lengkap] + 吗 (ma) ？",
        explanation:
          "Untuk mengubah kalimat pernyataan menjadi kalimat tanya konfirmasi (apakah...?), cukup tambahkan partikel nada netral '吗' di ujung kalimat tanpa perlu mengubah atau membalik susunan kata.",
        example: "你是学生吗？(Nǐ shì xuésheng ma?: Apakah kamu seorang pelajar?)",
        positiveExamples: [
          {
            hanzi: "你是中国人吗？",
            pinyin: "Nǐ shì Zhōngguó rén ma?",
            translation: "Apakah kamu orang Tiongkok?",
          },
          {
            hanzi: "王老师是老师吗？",
            pinyin: "Wáng lǎoshī shì lǎoshī ma?",
            translation: "Apakah Guru Wang seorang pengajar?",
          },
        ],
        usageConstraints:
          "Jangan gunakan partikel '吗' bila dalam kalimat tersebut sudah terdapat kata tanya informasi seperti 什么, 谁, atau 哪.",
        commonErrors:
          "Menggabungkan '吗' dengan kata tanya lain (misal salah: 'Nǐ jiào shénme míngzi ma?').",
        communicativeFunction:
          "Meminta konfirmasi kebenaran identitas dari lawan bicara.",
      },
      {
        ruleTitle: "Kata Tanya Informasi Tanpa Inversi: 谁, 什么, 哪",
        formula: "[Subjek] + [Predikat] + [Kata Tanya Informasi: 什么 / 谁 / 哪] ？",
        explanation:
          "Bahasa Mandarin tidak memindahkan kata tanya ke awal kalimat seperti bahasa Inggris (Wh-movement). Kata tanya diletakkan persis pada posisi kata yang ingin ditanyakan dalam kalimat jawaban.",
        example: "你叫什么名字？(Nǐ jiào shénme míngzi?: Siapa namamu?)",
        positiveExamples: [
          {
            hanzi: "他是谁？",
            pinyin: "Tā shì shéi?",
            translation: "Siapakah dia?",
          },
          {
            hanzi: "你是哪国人？",
            pinyin: "Nǐ shì nǎ guó rén?",
            translation: "Kamu orang negara mana?",
          },
        ],
        usageConstraints:
          "Pertahankan susunan Subjek + Predikat + Objek alami tanpa melakukan inversi struktur kalimat.",
        commonErrors:
          "Menempatkan 'shénme' di awal kalimat seperti pola bahasa Inggris (misal: 'Shénme nǐ jiào?').",
        communicativeFunction:
          "Menggali informasi mendalam mengenai nama orang, identitas pihak ketiga, dan asal wilayah.",
      },
    ],

    culturalNotes:
      "Struktur Nama Marga & Etika Perkenalan Tionghoa: Dalam tradisi Tionghoa, nama keluarga (姓 - xìng) selalu diletakkan paling depan sebelum nama diri (名 - míng). Sebagai contoh, pada nama '王萍' (Wáng Píng), marganya adalah '王' (Wáng) dan nama pribadinya adalah '萍' (Píng). Jika baru berkenalan dalam situasi formal, sangat disarankan memanggil dengan marga dan gelar profesinya seperti '王老师' (Guru Wang) untuk menunjukkan takzim sebelum dipersilakan memanggil nama akrab.",

    listeningActivity: {
      goal: "Mendengarkan rekaman perkenalan identitas dan mengidentifikasi nama, kebangsaan, dan status pendidikan penutur.",
      audioText: "你好，我叫大卫。我是印尼人，我也是这里的大学生。",
      pinyin: "Nǐ hǎo, wǒ jiào Dàwèi. Wǒ shì Yìnní rén, wǒ yě shì zhèlǐ de dàxuéshēng.",
      translation: "Halo, nama saya David. Saya orang Indonesia, saya juga mahasiswa di sini.",
      gistQuestion: {
        question:
          "Berdasarkan rekaman perkenalan di atas, siapakah pembicara tersebut dan dari manakah asalnya?",
        options: [
          "David, seorang mahasiswa yang berasal dari Indonesia",
          "Wang Ping, seorang mahasiswi yang berasal dari Tiongkok",
          "Guru Wang, seorang dosen bahasa Mandarin senior",
          "Andi, seorang wisatawan dari Malaysia",
        ],
        correctAnswer: "David, seorang mahasiswa yang berasal dari Indonesia",
        explanation:
          "Pembicara secara gamblang menyebutkan namanya 'wǒ jiào Dàwèi' dan kebangsaannya 'wǒ shì Yìnní rén'.",
      },
      detailQuestion: {
        question:
          "Apakah status yang diungkapkan oleh pembicara mengenai aktivitasnya di kampus?",
        options: [
          "Mahasiswa (大学生 - dàxuéshēng)",
          "Guru pengajar (老师 - lǎoshī)",
          "Dokter rumah sakit (医生 - yīshēng)",
          "Siswa sekolah dasar (小学生 - xiǎoxuéshēng)",
        ],
        correctAnswer: "Mahasiswa (大学生 - dàxuéshēng)",
        explanation:
          "Pembicara menegaskan status pendidikannya dengan ujaran 'wǒ yě shì zhèlǐ de dàxuéshēng'.",
      },
    },

    speakingActivity: {
      prompt:
        "Lakukan rekaman lisan perkenalan dirimu secara runtut dalam 4–5 kalimat bahasa Mandarin: 1) Berikan salam pembuka (你好 / 您好); 2) Sebutkan nama lengkapmu (我叫……); 3) Nyatakan asal negaramu (我是印度尼西亚人); 4) Sebutkan statusmu sebagai pembelajar bahasa Mandarin (我是学生，我学习汉语); 5) Tutup dengan ungkapan senang berkenalan (认识你很高兴).",
      vocabularySupport: [
        "我叫 (wǒ jiào: nama saya...)",
        "我是 (wǒ shì: saya adalah...)",
        "印度尼西亚人 (Yìndùníxīyà rén: orang Indonesia)",
        "学生 (xuésheng: pelajar / mahasiswa)",
        "学习汉语 (xuéxí Hànyǔ: belajar bahasa Mandarin)",
        "很高兴认识你 (hěn gāoxìng rènshi nǐ: sangat senang berkenalan denganmu)",
      ],
      evaluationRubric:
        "Kriteria Penilaian: 1) Kejelasan pengucapan kata 'wǒ jiào' dan 'wǒ shì'; 2) Penerapan sandhi nada pada 'bú shì' dan 'nǐ hǎo'; 3) Nada ke-4 yang tegas pada 'shì' dan 'Hànyǔ'; 4) Kelancaran kalimat tanpa jeda panjang yang canggung.",
    },

    readingActivity: {
      textHanzi:
        "我叫李明，我是中国人。她是安娜，她不是中国人，她是印尼人。我们都是大学生，我们都学习中文。王老师是我们的汉语老师，他是很好的老师。",
      textPinyin:
        "Wǒ jiào Lǐ Míng, wǒ shì Zhōngguó rén. Tā shì Ānnà, tā bú shì Zhōngguó rén, tā shì Yìnní rén. Wǒmen dōu shì dàxuéshēng, wǒmen dōu xuéxí Zhōngwén. Wáng lǎoshī shì wǒmen de Hànyǔ lǎoshī, tā shì hěn hǎo de lǎoshī.",
      textTranslation:
        "Nama saya Li Ming, saya orang Tiongkok. Dia adalah Anna, dia bukan orang Tiongkok, dia orang Indonesia. Kami berdua adalah mahasiswa, kami berdua belajar bahasa Mandarin. Guru Wang adalah guru bahasa Mandarin kami, beliau adalah guru yang sangat baik.",
      mainIdea:
        "Profil perkenalan dua mahasiswa lintas negara yang berteman dan sama-sama mendalami bahasa Mandarin bersama pengajar mereka.",
      questions: [
        {
          question:
            "Berdasarkan teks bacaan di atas, manakah pernyataan yang BENAR mengenai identitas kebangsaan Anna?",
          options: [
            "Anna bukan orang Tiongkok, melainkan orang Indonesia (印尼人).",
            "Anna adalah mahasiswi asal Tiongkok yang tinggal di Beijing.",
            "Anna adalah guru bahasa Mandarin bagi Li Ming.",
            "Anna tidak belajar bahasa Mandarin di universitas.",
          ],
          correctAnswer:
            "Anna bukan orang Tiongkok, melainkan orang Indonesia (印尼人).",
          explanation:
            "Teks menyatakan secara gamblang: 'Tā bú shì Zhōngguó rén, tā shì Yìnní rén.'",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tuliskan 3 karakter Hanzi pembentuk kalimat identitas berikut di buku kotak latihan dengan memperhatikan proporsi dan urutan goresan yang benar: '我' (wǒ - saya), '是' (shì - adalah), dan '中' (zhōng - tengah).",
      minimumCharacters: 3,
      checklist: [
        "Menulis '我': 7 goresan; awali dengan goresan miring pendek (丿) di kiri atas dan akhiri dengan titik (丶) di kanan atas.",
        "Menulis '是': 9 goresan; tulis radikal matahari '日' di atas terlebih dahulu, kemudian rangka penopang bawah dengan goresan miring kanan (捺) yang tebal.",
        "Menulis '中': 4 goresan; buat kotak '口' terlebih dahulu, kemudian tusukkan garis tegak tengah (丨) tepat di sumbu simetri.",
      ],
      modelAnswer: {
        hanzi: "我是中国人",
        pinyin: "wǒ shì Zhōngguó rén",
        translation: "saya adalah orang Tiongkok",
      },
    },

    personalizationPrompt:
      "Tuliskan satu kalimat deklarasi identitas lengkapmu sendiri di Buku Frasa pribadi: '我叫 [Namamu]，我是印度尼西亚人，我也是汉语学生。'",
    errorJournalHooks: [
      "Lupa mengucapkan kata '是' (adalah) saat menyebut asal negara atau profesi (contoh keliru: 'wǒ Yìnní rén', yang benar: 'wǒ shì Yìnní rén')",
      "Melakukan inversi kalimat tanya dengan membalik subjek dan predikat meniru tata bahasa Inggris",
      "Melafalkan 'bú shì' dengan nada ke-4 penuh pada kata 'bù' tanpa sandhi nada ke-2",
      "Salah meletakkan kata tanya 'shénme' di awal kalimat alih-alih menempati posisi objek nominal",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna mampu memperkenalkan nama diri, menyebutkan negara asal dan status pelajar menggunakan pola 'A 是 B' dan 'A 不是 B', serta menjawab pertanyaan identitas '你叫什么名字？' dan '你是哪国人？' dengan akurasi minimal 80%.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Pelajari kembali tabel perbedaan pola '是' vs '不是' dan latih penyusunan kalimat tanya dengan partikel '吗' pada menu Latihan Soal Unit 02.",
    },
  },
  // -------------------------------------------------------------
  // HSK 1 Unit 03: Angka & Kuantitas Mandiri (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "hsk1-03",
    moduleId: "hsk1",
    slug: "03",
    unitNumber: 3,
    title: "Angka & Kuantitas Mandiri",
    hanzi: "数字与数量",
    pinyin: "Shùzì yǔ Shùliàng",
    translation: "Sistem Bilangan Dasar, Ratusan, Ribuan, 万, 亿 & Pengukur Kuantitas",
    objectives:
      "Menguasai sistem bilangan bahasa Mandarin secara komprehensif: angka 0–99, ratusan (百), ribuan (千), pengelompokan empat digit puluhan ribu (万), jutaan hingga ratusan juta (亿), membedakan pemakaian '二' (èr) vs '两' (liǎng), menanyakan jumlah dengan '几' (jǐ) vs '多少' (duōshao), menyusun frasa kuantitas [Angka + Kata Bantu Bilangan + Kata Benda], serta menyebut nomor telepon dan bilangan bertingkat (第).",
    overview:
      "Unit ketiga tingkat HSK 1 ini menyajikan fondasi angka Mandarin yang utuh dan aplikatif. Bahasa Mandarin memiliki logika pembentukan angka yang sangat teratur. Kamu akan memahami cara menyusun angka puluhan hingga ratusan juta dengan memahami konsep unik satuan empat digit '万' (wàn) dan '亿' (yì), serta membiasakan pelafalan angka 1 sebagai 'yāo' pada nomor telepon atau kamar.",
    vocabCount: 14,
    durationMinutes: 15,
    levelBadge: "HSK 1 · UNIT 03",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["hsk1-02"],
    skills: [
      "Angka Dasar 0–99",
      "Sistem Ratusan, Ribuan, 万, 亿",
      "Perbedaan 二 vs 两",
      "Kata Tanya Kuantitas 几 vs 多少",
      "Struktur [Angka + Measure Word + Benda]",
      "Pembacaan Nomor Telepon & Kamar",
    ],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "Mei Mei (Resepsionis Asrama) & Andi (Mahasiswa Baru)",
      location: "Meja Layanan Resepsionis Gedung Asrama Mahasiswa",
      goal: "Memverifikasi nomor kamar asrama, nomor kontak telepon, dan jumlah teman sekamar menggunakan angka dan kata bantu bilangan.",
      scenarioNotes:
        "Andi sedang mengurus administrasi kunci kamar asrama kampus. Resepsionis mengonfirmasi nomor kamar, nomor telepon darurat, dan menanyakan berapa orang teman yang tinggal bersama Andi di kamar tersebut.",
    },

    dialogue: [
      {
        speaker: "Mei Mei",
        role: "Resepsionis",
        hanzi: "你好！请问你的房间是几号？",
        pinyin: "Nǐ hǎo! Qǐngwèn nǐ de fángjiān shì jǐ hào?",
        translation: "Halo! Boleh tanya kamarmu nomor berapa?",
      },
      {
        speaker: "Andi",
        role: "Mahasiswa",
        hanzi: "我的房间是三零八号。这是我的学生证。",
        pinyin: "Wǒ de fángjiān shì sān líng bā hào. Zhè shì wǒ de xuéshengzhèng.",
        translation: "Kamar saya nomor 308. Ini kartu mahasiswa saya.",
      },
      {
        speaker: "Mei Mei",
        role: "Resepsionis",
        hanzi: "好的。请问你的电话号码是多少？",
        pinyin: "Hǎo de. Qǐngwèn nǐ de diànhuà hàomǎ shì duōshao?",
        translation: "Baiklah. Boleh tanya berapa nomor teleponmu?",
      },
      {
        speaker: "Andi",
        role: "Mahasiswa",
        hanzi: "我的电话号码是一三八、零二一四、五六七九。",
        pinyin: "Wǒ de diànhuà hàomǎ shì yāo sān bā, líng èr yāo sì, wǔ liù qī jiǔ.",
        translation: "Nomor telepon saya 138-0214-5679.",
      },
      {
        speaker: "Mei Mei",
        role: "Resepsionis",
        hanzi: "你的房间有几个人住？",
        pinyin: "Nǐ de fángjiān yǒu jǐ gè rén zhù?",
        translation: "Ada berapa orang yang tinggal di kamarmu?",
      },
      {
        speaker: "Andi",
        role: "Mahasiswa",
        hanzi: "我们两个人住，我和一个中国同学。",
        pinyin: "Wǒmen liǎng gè rén zhù, wǒ hé yí gè Zhōngguó tóngxué.",
        translation: "Kami berdua yang tinggal, saya dan seorang teman sekelas asal Tiongkok.",
      },
      {
        speaker: "Mei Mei",
        role: "Resepsionis",
        hanzi: "太好了！这是两把钥匙，请拿好。",
        pinyin: "Tài hǎo le! Zhè shì liǎng bǎ yàoshi, qǐng ná hǎo.",
        translation: "Bagus sekali! Ini dua buah kunci, silakan disimpan baik-baik.",
      },
    ],

    vocabulary: [
      {
        hanzi: "零",
        pinyin: "líng",
        tone: "Nada 2",
        translation: "nol (0)",
        partOfSpeech: "numeralia",
        usageNotes:
          "Digunakan sebagai pembacaan angka 0 pada nomor telepon, suhu, atau pengisi posisi kosong pada ratusan/ribuan (一百零一).",
        exampleHanzi: "三零八房间。",
        examplePinyin: "Sān líng bā fángjiān.",
        exampleTranslation: "Kamar nomor 308.",
      },
      {
        hanzi: "一",
        pinyin: "yī / yāo",
        tone: "Nada 1",
        translation: "satu (1)",
        partOfSpeech: "numeralia",
        usageNotes:
          "Dilafalkan 'yāo' saat membaca digit nomor telepon, kamar, atau plat nomor untuk mencegah kekeliruan dengan '七' (qī).",
        exampleHanzi: "一个苹果。",
        examplePinyin: "Yí gè píngguǒ.",
        exampleTranslation: "Satu buah apel.",
      },
      {
        hanzi: "二",
        pinyin: "èr",
        tone: "Nada 4",
        translation: "dua (2)",
        partOfSpeech: "numeralia",
        usageNotes:
          "Digunakan untuk urutan angka murni (1, 2, 3), penomoran kamar/telepon, dan angka puluhan (二十).",
        exampleHanzi: "一、二、三。",
        examplePinyin: "Yī, èr, sān.",
        exampleTranslation: "Satu, dua, tiga.",
      },
      {
        hanzi: "两",
        pinyin: "liǎng",
        tone: "Nada 3",
        translation: "dua (untuk kuantitas)",
        partOfSpeech: "numeralia",
        usageNotes:
          "Wajib digunakan sebelum kata bantu bilangan (measure word) seperti 两个人 (liǎng gè rén) atau satuan ratus/ribu.",
        exampleHanzi: "两个人。",
        examplePinyin: "Liǎng gè rén.",
        exampleTranslation: "Dua orang.",
      },
      {
        hanzi: "三",
        pinyin: "sān",
        tone: "Nada 1",
        translation: "tiga (3)",
        partOfSpeech: "numeralia",
        usageNotes:
          "Terdiri dari tiga goresan garis mendatar.",
        exampleHanzi: "三个月。",
        examplePinyin: "Sān gè yuè.",
        exampleTranslation: "Tiga bulan.",
      },
      {
        hanzi: "四",
        pinyin: "sì",
        tone: "Nada 4",
        translation: "empat (4)",
        partOfSpeech: "numeralia",
        usageNotes:
          "Berbunyi inisial alveolar 's' dengan nada ke-4 menukik tajam.",
        exampleHanzi: "四天。",
        examplePinyin: "Sì tiān.",
        exampleTranslation: "Empat hari.",
      },
      {
        hanzi: "五",
        pinyin: "wǔ",
        tone: "Nada 3",
        translation: "lima (5)",
        partOfSpeech: "numeralia",
        usageNotes:
          "Memiliki nada ke-3 rendah cekung.",
        exampleHanzi: "五点整。",
        examplePinyin: "Wǔ diǎn zhěng.",
        exampleTranslation: "Jam lima tepat.",
      },
      {
        hanzi: "六",
        pinyin: "liù",
        tone: "Nada 4",
        translation: "enam (6)",
        partOfSpeech: "numeralia",
        usageNotes:
          "Angka keberuntungan yang melambangkan kelancaran segala urusan (六六大顺).",
        exampleHanzi: "六本书。",
        examplePinyin: "Liù běn shū.",
        exampleTranslation: "Enam buah buku.",
      },
      {
        hanzi: "七",
        pinyin: "qī",
        tone: "Nada 1",
        translation: "tujuh (7)",
        partOfSpeech: "numeralia",
        usageNotes:
          "Berbunyi inisial aspirasi 'q' dengan nada ke-1 tinggi mendatar.",
        exampleHanzi: "七个学生。",
        examplePinyin: "Qī gè xuésheng.",
        exampleTranslation: "Tujuh orang siswa.",
      },
      {
        hanzi: "八",
        pinyin: "bā",
        tone: "Nada 1",
        translation: "delapan (8)",
        partOfSpeech: "numeralia",
        usageNotes:
          "Angka paling populer dan membawa rezeki dalam budaya Tionghoa karena berima dengan '发' (makmur).",
        exampleHanzi: "八十八。",
        examplePinyin: "Bāshíbā.",
        exampleTranslation: "Delapan puluh delapan.",
      },
      {
        hanzi: "九",
        pinyin: "jiǔ",
        tone: "Nada 3",
        translation: "sembilan (9)",
        partOfSpeech: "numeralia",
        usageNotes:
          "Melambangkan keabadian dan umur panjang karena berima dengan kata '久' (lama/abadi).",
        exampleHanzi: "九十岁。",
        examplePinyin: "Jiǔshí suì.",
        exampleTranslation: "Sembilan puluh tahun.",
      },
      {
        hanzi: "十",
        pinyin: "shí",
        tone: "Nada 2",
        translation: "sepuluh (10)",
        partOfSpeech: "numeralia",
        usageNotes:
          "Dilafalkan dengan lidah sedikit terangkat ('sh') dan nada 2 naik. Hati-hati jangan tertukar dengan 'sì' (angka 4).",
        exampleHanzi: "十五分钟。",
        examplePinyin: "Shíwǔ fēnzhōng.",
        exampleTranslation: "Lima belas menit.",
      },
      {
        hanzi: "几",
        pinyin: "jǐ",
        tone: "Nada 3",
        translation: "berapa (untuk perkiraan < 10)",
        partOfSpeech: "pronomina interogativa",
        usageNotes:
          "Digunakan untuk menanyakan jumlah kecil yang umumnya diperkirakan kurang dari 10 dan wajib diikuti measure word: 几个人 (jǐ gè rén).",
        exampleHanzi: "你有几本书？",
        examplePinyin: "Nǐ yǒu jǐ běn shū?",
        exampleTranslation: "Kamu punya berapa buah buku?",
      },
      {
        hanzi: "多少",
        pinyin: "duōshao",
        tone: "Nada 1 + netral",
        translation: "berapa (jumlah terbuka / > 10 / nomor / harga)",
        partOfSpeech: "pronomina interogativa",
        usageNotes:
          "Dapat langsung diikuti kata benda tanpa kata bantu bilangan: 多少人 / 多少钱 / 电话号码是多少.",
        exampleHanzi: "你们学校有多少学生？",
        examplePinyin: "Nǐmen xuéxiào yǒu duōshao xuésheng?",
        exampleTranslation: "Berapa banyak siswa di sekolah kalian?",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "百",
        pinyin: "bǎi",
        tone: "Nada 3",
        translation: "ratus / seratus (100)",
        isEnrichment: true,
        inclusionReason:
          "Satuan bilangan ratusan fundamental (100 = 一百, 200 = 两百/二百).",
        exampleHanzi: "一百个学生。",
        examplePinyin: "Yì bǎi gè xuésheng.",
        exampleTranslation: "Seratus orang murid.",
      },
      {
        hanzi: "千",
        pinyin: "qiān",
        tone: "Nada 1",
        translation: "ribu / seribu (1.000)",
        isEnrichment: true,
        inclusionReason:
          "Satuan bilangan ribuan fundamental (1.000 = 一千, 2.000 = 两千).",
        exampleHanzi: "一千块钱。",
        examplePinyin: "Yì qiān kuài qián.",
        exampleTranslation: "Seribu yuan uang.",
      },
      {
        hanzi: "万",
        pinyin: "wàn",
        tone: "Nada 4",
        translation: "sepuluh ribu (10.000 - unit empat digit)",
        isEnrichment: true,
        inclusionReason:
          "Unit dasar sistem kelipatan 4 digit khas Mandarin (10.000 = 一万, 1.000.000 = 一百万).",
        exampleHanzi: "这个城市有一百万人。",
        examplePinyin: "Zhè gè chéngshì yǒu yì bǎi wàn rén.",
        exampleTranslation: "Kota ini memiliki satu juta penduduk.",
      },
      {
        hanzi: "亿",
        pinyin: "yì",
        tone: "Nada 4",
        translation: "seratus juta (100.000.000 - unit delapan digit)",
        isEnrichment: true,
        inclusionReason:
          "Unit dasar kelipatan besar untuk populasi dan statistik resmi (100.000.000 = 一亿, 1,4 miliar = 十四亿).",
        exampleHanzi: "中国有十四亿人口。",
        examplePinyin: "Zhōngguó yǒu shísì yì rénkǒu.",
        exampleTranslation: "Tiongkok memiliki 1,4 miliar populasi.",
      },
      {
        hanzi: "第",
        pinyin: "dì",
        tone: "Nada 4",
        translation: "ke- (awalan bilangan tingkat / ordinal)",
        isEnrichment: true,
        inclusionReason:
          "Membentuk bilangan urutan tingkat seperti 第一 (pertama/juara 1) dan 第二 (kedua).",
        exampleHanzi: "这是第一课。",
        examplePinyin: "Zhè shì dì-yī kè.",
        exampleTranslation: "Ini adalah pelajaran pertama.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Perbedaan bunyi lidah datar 's' pada 'sì' (angka 4) dengan bunyi lidah terangkat 'sh' pada 'shí' (angka 10).",
      tones:
        "Sandhi nada pada kata '一' (yī): dilafalkan 'yí' (nada 2 menanjak) sebelum suku kata bernada ke-4 seperti 'yí gè' (一个) dan 'yí wàn' (一万); dilafalkan 'yì' (nada 4 menukik) sebelum suku kata bernada 1, 2, atau 3 seperti 'yì bǎi' (一百) dan 'yì qiān' (一千).",
      toneCombinations:
        "Kontur nada ke-4 tajam pada 'sì' (4), 'liù' (6), 'èr' (2) vs kontur nada ke-3 rendah pada 'wǔ' (5), 'jiǔ' (9), dan 'liǎng' (2).",
      commonErrors:
        "Melafalkan 'sì' menjadi 'shí' atau sebaliknya sehingga membingungkan antara 4 dan 10; serta salah menggunakan 'èr' sebelum kata bantu bilangan 个.",
      articulatoryTip:
        "Saat melafalkan deretan nomor telepon panjang, lafalkan digit satu per satu dengan jeda bernapas teratur, dan ganti pelafalan angka 1 menjadi 'yāo' agar terdengar jelas oleh lawan bicara.",
    },

    hanziComponents: [
      {
        hanzi: "一",
        structure: "Tunggal / Simetris (独体字)",
        components: "Garis mendatar tunggal (横 - héng)",
        strokeCount: 1,
        strokeOrderRules: ["Goresan mendatar dari kiri ke kanan (从左到右)"],
        notes:
          "Karakter paling dasar dalam sistem penulisan Hanzi; melambangkan kesatuan kosmis dan asal mula segala keberadaan.",
      },
      {
        hanzi: "十",
        structure: "Tunggal / Silang (独体字)",
        components: "Garis mendatar (一) + Garis tegak (丨)",
        strokeCount: 2,
        strokeOrderRules: [
          "Mendatar sebelum tegak (先横后竖)",
          "Tulis garis mendatar 一 terlebih dahulu, baru potong dengan garis tegak 丨",
        ],
        notes:
          "Persilangan sempurna antara sumbu horizontal dan vertikal, melambangkan kelengkapan sepuluh penjuru arah.",
      },
      {
        hanzi: "两",
        structure: "Tunggal dengan Bingkai Penopang (独体字)",
        components: "Rangka atas (一) + Bingkai terbuka (冂) + Sepasang komponen orang (人)",
        strokeCount: 7,
        strokeOrderRules: [
          "Garis mendatar atas (一) terlebih dahulu",
          "Garis tegak kiri (丨) → sudut patah (𠃍) → garis tegak tengah (丨)",
          "Sepasang goresan orang (人) di kiri dan kanan di dalam rongga bingkai",
        ],
        notes:
          "Melambangkan sepasang beban yang seimbang pada timbangan atau kuk pengangkut barang.",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Sistem Pembentukan Bilangan Kombinatif Mandarin (0 s.d. 99.999)",
        formula:
          "11–19: 十 + [Satuan] | Puluhan: [Satuan] + 十 | Puluhan+Satuan: [Digit] + 十 + [Satuan] | Ratusan: [Digit] + 百",
        explanation:
          "Sistem bilangan Mandarin sangat logis dan teratur tanpa pengecualian kata khusus: 11 adalah 十一 (10+1), 20 adalah 二十 (2x10), 25 adalah 二十五 (2x10+5), 100 adalah 一百. Jika ada celah angka nol di tengah pada ratusan atau ribuan, sebutkan karakter 零 (líng) satu kali saja (misal: 105 = 一百零五; 1.008 = 一千零八).",
        example: "九十九 (jiǔshíjiǔ: 99), 一百零一 (yì bǎi líng yī: 101).",
        positiveExamples: [
          {
            hanzi: "我们班有二十五个学生。",
            pinyin: "Wǒmen bān yǒu èrshíwǔ gè xuésheng.",
            translation: "Kelas kami ada 25 orang murid.",
          },
          {
            hanzi: "这本书一百二十块钱。",
            pinyin: "Zhè běn shū yí bǎi èrshí kuài qián.",
            translation: "Buku ini harganya 120 yuan.",
          },
        ],
        usageConstraints:
          "Pada bilangan di atas sepuluh ribu, Mandarin mengelompokkan kelipatan 4 digit (万 - wàn). Angka 50.000 adalah 五万 (5 x 10.000), bukan 50 ribu.",
        commonErrors:
          "Lupa membaca angka '零' pada posisi angka ratusan yang berlubang (misal membaca 105 sebagai 'yì bǎi wǔ' yang sebenarnya berarti 150).",
        communicativeFunction:
          "Menyatakan nominal uang, jumlah benda, kapasitas ruangan, dan penghitungan kuantitatif secara tepat.",
      },
      {
        ruleTitle: "Perbedaan Penggunaan '二' (Èr) dan '两' (Liǎng)",
        formula: "Urutan / Hitungan / Puluhan: 二 (Èr) | Sebelum Measure Word / Kuantitas: 两 (Liǎng)",
        explanation:
          "Keduanya berarti 'dua', tetapi fungsinya berbeda tegas: 1) Gunakan 二 (èr) untuk menghitung angka berurutan (一, 二, 三), angka pecahan, nomor urut, nomor telepon, dan angka puluhan (二十, 二十二); 2) Gunakan 两 (liǎng) jika diikuti kata bantu bilangan (measure word) atau saat menyatakan kuantitas nyata benda/orang (两个, 两把, 两百, 两千, 两点钟).",
        example: "两个人 (Liǎng gè rén: 2 orang) — BUKAN 二个人.",
        positiveExamples: [
          {
            hanzi: "我有两个中国朋友。",
            pinyin: "Wǒ yǒu liǎng gè Zhōngguó péngyou.",
            translation: "Saya memiliki dua orang teman Tiongkok.",
          },
          {
            hanzi: "我的房间是二零二号。",
            pinyin: "Wǒ de fángjiān shì èr líng èr hào.",
            translation: "Kamar saya nomor 202.",
          },
        ],
        usageConstraints:
          "Jangan gunakan '两' untuk menyebut angka 20 (tidak ada '两十', wajib '二十').",
        commonErrors:
          "Menggunakan 'èr' di depan kata bantu bilangan 个 (mengatakan 'èr gè rén').",
        communicativeFunction:
          "Menghindari kekeliruan antara penyebutan urutan digit abstrak vs jumlah fisik entitas.",
      },
      {
        ruleTitle: "Perbedaan Kata Tanya Kuantitas: '几' (Jǐ) vs '多少' (Duōshao)",
        formula: "Jumlah Terduga < 10: 几 + [Measure Word] + [Benda] ？ | Jumlah Terbuka / > 10 / Harga / Nomor: 多少 + [Benda] ？",
        explanation:
          "Untuk menanyakan jumlah: 1) Gunakan 几 (jǐ) jika perkiraan jumlahnya kecil (kurang dari 10) dan WAJIB menyertakan kata bantu bilangan (几个人, 几本书); 2) Gunakan 多少 (duōshao) untuk jumlah yang lebih banyak, jumlah yang tidak dapat diperkirakan, harga (多少钱), atau nomor telepon/identitas, dan kata bantu bilangannya boleh ditiadakan.",
        example: "你家有几口人？ / 你们学校有多少学生？",
        positiveExamples: [
          {
            hanzi: "你有几把钥匙？",
            pinyin: "Nǐ yǒu jǐ bǎ yàoshi?",
            translation: "Kamu punya berapa buah kunci? (perkiraan < 10)",
          },
          {
            hanzi: "你的电话号码是多少？",
            pinyin: "Nǐ de diànhuà hàomǎ shì duōshao?",
            translation: "Berapa nomor teleponmu? (deretan digit terbuka)",
          },
        ],
        usageConstraints:
          "Kata '几' tidak boleh berdiri langsung di depan kata benda tanpa measure word (kecuali kata waktu tertentu seperti 几天, 几年).",
        commonErrors:
          "Menggunakan 'jǐ' untuk menanyakan nomor telepon ('nǐ de diànhuà shì jǐ hào?').",
        communicativeFunction:
          "Menanyakan rincian kuantitas secara presisi sesuai skala jumlah yang diharapkan.",
      },
      {
        ruleTitle: "Struktur Frasa Kuantitas: [Bilangan] + [Kata Bantu Bilangan] + [Kata Benda]",
        formula: "[Angka] + [Measure Word / 量词] + [Kata Benda]",
        explanation:
          "Dalam bahasa Mandarin, kata benda tidak dapat langsung disambungkan dengan angka tanpa adanya kata bantu bilangan (*classifier* atau *measure word*). Kata bantu bilangan paling umum dan universal adalah 个 (gè).",
        example: "三个学生 (Sān gè xuésheng: 3 orang murid).",
        positiveExamples: [
          {
            hanzi: "我有五个好朋友。",
            pinyin: "Wǒ yǒu wǔ gè hǎo péngyou.",
            translation: "Saya memiliki 5 orang sahabat baik.",
          },
          {
            hanzi: "他买了一本书。",
            pinyin: "Tā mǎi le yì běn shū.",
            translation: "Dia membeli satu buah buku.",
          },
        ],
        usageConstraints:
          "Jangan menempelkan angka langsung ke kata benda seperti 'sān xuésheng' (salah).",
        commonErrors:
          "Menghilangkan classifier 'gè' karena pengaruh tata bahasa Indonesia santai ('tiga murid').",
        communicativeFunction:
          "Menghitung dan mengelompokkan satuan barang secara akurat sesuai norma bahasa Mandarin.",
      },
    ],

    culturalNotes:
      "Logika Satuan Bilangan Empat Digit (万 - Wàn): Berbeda dengan sistem penomoran Barat dan Indonesia yang membagi digit angka setiap tiga angka (ribu, juta, miliar), bahasa Mandarin membagi angka besar per empat digit (0000). Satuan dasar setelah seribu (千) adalah sepuluh ribu (万 - wàn). Oleh sebab itu, 100.000 dibaca '十万' (10 wan), 1.000.000 dibaca '一百万' (100 wan), dan 100.000.000 memiliki satuan mandiri yaitu '亿' (yì). Memahami blok 4 digit ini adalah kunci menguasai penerjemahan angka ekonomi dan statistik Mandarin.",

    listeningActivity: {
      goal: "Mendengarkan rekaman konfirmasi reservasi dan mengidentifikasi jumlah tamu serta nomor kamar yang diucapkan.",
      audioText: "你好，我们一共三个人，请给我们三零八号房间，两把钥匙。",
      pinyin: "Nǐ hǎo, wǒmen yígòng sān gè rén, qǐng gěi wǒmen sān líng bā hào fángjiān, liǎng bǎ yàoshi.",
      translation: "Halo, kami total tiga orang, tolong berikan kami kamar nomor 308, dua buah kunci.",
      gistQuestion: {
        question:
          "Berapakah jumlah orang dalam rombongan pembicara dan kamar nomor berapakah yang diminta?",
        options: [
          "3 orang dan kamar nomor 308 (三个人，三零八号房间)",
          "2 orang dan kamar nomor 380 (两个人，三八零号房间)",
          "4 orang dan kamar nomor 302 (四个人，三零二号房间)",
          "1 orang dan kamar nomor 108 (一个人，一零八号房间)",
        ],
        correctAnswer: "3 orang dan kamar nomor 308 (三个人，三零八号房间)",
        explanation:
          "Audio menyatakan: 'wǒmen yígòng sān gè rén' (kami total 3 orang) dan 'sān líng bā hào fángjiān' (kamar nomor 308).",
      },
      detailQuestion: {
        question:
          "Berapa banyak kunci kamar yang diminta oleh pembicara?",
        options: [
          "Dua buah kunci (两把钥匙 - liǎng bǎ yàoshi)",
          "Tiga buah kunci (三把钥匙 - sān bǎ yàoshi)",
          "Satu buah kunci (一把钥匙 - yì bǎ yàoshi)",
          "Empat buah kunci (四把钥匙 - sì bǎ yàoshi)",
        ],
        correctAnswer: "Dua buah kunci (两把钥匙 - liǎng bǎ yàoshi)",
        explanation:
          "Pembicara menggunakan kata '两' (liǎng) sebelum measure word kunci: 'liǎng bǎ yàoshi'.",
      },
    },

    speakingActivity: {
      prompt:
        "Lakukan rekaman lisan yang memuat 3 informasi angka pribadimu dalam bahasa Mandarin: 1) Sebutkan nomor kamarmu atau nomor rumahmu digit per digit (我的房间是……号); 2) Sebutkan nomor telepon kontakmu dengan melafalkan angka 1 sebagai 'yāo' (我的电话号码是……); 3) Sebutkan jumlah teman sekamar atau anggota keluargamu menggunakan kata '两' atau angka lainnya beserta kata bantu bilangan (我有两个人 / 三个朋友).",
      vocabularySupport: [
        "我的房间是 (wǒ de fángjiān shì: kamar saya adalah...)",
        "号 (hào: nomor)",
        "我的电话号码是 (wǒ de diànhuà hàomǎ shì: nomor telepon saya adalah...)",
        "一 (yāo: angka 1 khusus digit nomor)",
        "两个 (liǎng gè: dua buah/orang)",
      ],
      evaluationRubric:
        "Kriteria Penilaian: 1) Ketepatan pelafalan angka 1 menjadi 'yāo' pada nomor telepon; 2) Penggunaan 'liǎng gè' dan bukan 'èr gè'; 3) Pembedaan bunyi 'sì' (4) dan 'shí' (10); 4) Kelancaran ritme pengelompokan angka.",
    },

    readingActivity: {
      textHanzi:
        "这个学校很大，有一千五百个学生，八十个老师。留学生宿舍有五层楼，我在三楼。我的房间是三零二号，我和两个朋友住在一起。我们的电话号码是一八八零零九九。",
      textPinyin:
        "Zhè gè xuéxiào hěn dà, yǒu yì qiān wǔ bǎi gè xuésheng, bāshí gè lǎoshī. Liúxuéshēng sùshè yǒu wǔ céng lóu, wǒ zài sān lóu. Wǒ de fángjiān shì sān líng èr hào, wǒ hé liǎng gè péngyou zhù zài yìqǐ. Wǒmen de diànhuà hàomǎ shì yāo bā bā líng líng jiǔ jiǔ.",
      textTranslation:
        "Sekolah ini sangat besar, ada 1.500 orang murid dan 80 orang guru. Asrama mahasiswa asing memiliki 5 lantai, saya berada di lantai 3. Kamar saya nomor 302, saya tinggal bersama dua orang teman. Nomor telepon kami adalah 1880099.",
      mainIdea:
        "Laporan profil fasilitas asrama dan rincian kuantitas murid, guru, lantai gedung, nomor kamar, serta nomor kontak.",
      questions: [
        {
          question:
            "Berapa banyak siswa yang belajar di sekolah tersebut berdasarkan teks bacaan di atas?",
          options: [
            "1.500 murid (一千五百个学生)",
            "500 murid (五百个学生)",
            "1.050 murid (一千零五十个学生)",
            "80 murid (八十个学生)",
          ],
          correctAnswer: "1.500 murid (一千五百个学生)",
          explanation:
            "Teks menyatakan secara gamblang: 'yǒu yì qiān wǔ bǎi gè xuésheng' (ada 1.500 orang murid).",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tuliskan 3 karakter Hanzi pembentuk bilangan dasar berikut di buku kotak latihan dengan memperhatikan proporsi dan urutan goresan yang benar: '一' (yī - satu), '十' (shí - sepuluh), dan '两' (liǎng - dua kuantitas).",
      minimumCharacters: 3,
      checklist: [
        "Menulis '一': 1 goresan mendatar (横 - héng) dari kiri ke kanan dengan ketebalan yang seimbang.",
        "Menulis '十': 2 goresan; buat garis mendatar (一) terlebih dahulu, baru garis tegak (丨) membelah tepat di tengah.",
        "Menulis '两': 7 goresan; garis mendatar atas (一) → garis tegak kiri (丨) → sudut patah berait (𠃍) → garis tegak tengah (丨) → sepasang goresan orang (人) di kiri dan kanan di dalam bingkai.",
      ],
      modelAnswer: {
        hanzi: "十个人，两个朋友",
        pinyin: "shí gè rén, liǎng gè péngyou",
        translation: "sepuluh orang, dua orang teman",
      },
    },

    personalizationPrompt:
      "Catat nomor telepon pentingmu atau nomor kamarmu dalam bahasa Mandarin di Buku Frasa pribadi: '我的电话号码是 [Nomormu]' dan rekam pelafalannya.",
    errorJournalHooks: [
      "Menggunakan kata '二' di depan kata bantu bilangan 个 alih-alih kata '两' (misal keliru berkata 'èr gè rén')",
      "Tertukar membedakan lafal angka 4 ('sì', nada 4 turun) dengan angka 10 ('shí', nada 2 lidah terangkat)",
      "Melafalkan angka 1 sebagai 'yī' pada deretan nomor telepon panjang yang seharusnya dilafalkan 'yāo' untuk mencegah kebingungan dengan 'qī'",
      "Salah menggunakan '几' untuk menanyakan jumlah benda yang jelas melebihi perkiraan 10 benda (seharusnya menggunakan '多少')",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna mampu membaca dan menyebutkan bilangan 0–99, ratusan, ribuan, membedakan secara tepat kapan menggunakan '二' dan '两', menanyakan kuantitas dengan '几' atau '多少', serta membaca nomor telepon dan kamar dengan akurasi minimal 80%.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Pelajari kembali tabel aturan '二' vs '两' dan latih latihan dictation angka pada menu Latihan Soal Unit 03.",
    },
  },
  // -------------------------------------------------------------
  // HSK 1 Unit 04: Tanggal, Hari & Waktu (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "hsk1-04",
    moduleId: "hsk1",
    slug: "04",
    unitNumber: 4,
    title: "Tanggal, Hari & Waktu",
    hanzi: "日期与时间",
    pinyin: "Rìqī yǔ Shíjiān",
    translation: "Kalender, Hari dalam Pekan, Jam & Menit",
    objectives:
      "Menguasai hierarki penanggalan Mandarin dari unit terbesar ke terkecil (Tahun 年 → Bulan 月 → Tanggal 日/号 → Hari 星期), membaca jam dan menit (点, 分, 半, 刻), menyatakan bagian hari (pagi, siang, sore, malam), menggunakan keterangan waktu relatif (kemarin, hari ini, besok), serta menanyakan waktu dengan '什么时候' (kapan) dan '几点' (jam berapa).",
    overview:
      "Unit keempat tingkat HSK 1 ini mengajarkan sistem penataan waktu yang khas dalam budaya Mandarin: bergerak konsisten dari payung waktu terbesar menuju unit paling kecil. Kamu akan terampil menjadwalkan pertemuan, membaca kalender, menyatakan jam perkuliahan, dan mengutarakan waktu kegiatan harian dengan urutan Subjek + Waktu + Predikat secara natural.",
    vocabCount: 14,
    durationMinutes: 15,
    levelBadge: "HSK 1 · UNIT 04",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["hsk1-03"],
    skills: [
      "Hierarki Penanggalan Tahun-Bulan-Tanggal",
      "Penyebutan Hari dalam Seminggu",
      "Membaca Jam, Menit, dan Setengah Jam",
      "Bagian Hari: Pagi, Siang, Sore, Malam",
      "Struktur Kalimat Subjek + Waktu + Aktivitas",
      "Pertanyaan Waktu 几点 dan 什么时候",
    ],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "David (Mahasiswa) & Chen Hua (Teman Sekelas Tiongkok)",
      location: "Lobi Perpustakaan Kampus",
      goal: "Membuat janji belajar bersama di perpustakaan dengan menentukan hari, tanggal, dan jam pertemuan.",
      scenarioNotes:
        "David bertemu Chen Hua dan ingin mengajaknya belajar bersama untuk persiapan ujian. Mereka mendiskusikan jadwal hari ini, besok, dan menyepakati pertemuan pada hari Rabu sore pukul 15.30.",
    },

    dialogue: [
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "陈华，今天几月几号？",
        pinyin: "Chén Huá, jīntiān jǐ yuè jǐ hào?",
        translation: "Chen Hua, hari ini tanggal berapa bulan berapa?",
      },
      {
        speaker: "Chen Hua",
        role: "Mahasiswa",
        hanzi: "今天是九月二十号，星期三。",
        pinyin: "Jīntiān shì jiǔ yuè èrshí hào, xīngqīsān.",
        translation: "Hari ini tanggal 20 September, hari Rabu.",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "现在几点了？",
        pinyin: "Xiànzài jǐ diǎn le?",
        translation: "Sekarang sudah jam berapa?",
      },
      {
        speaker: "Chen Hua",
        role: "Mahasiswa",
        hanzi: "现在下午两点十分。你下午有课吗？",
        pinyin: "Xiànzài xiàwǔ liǎng diǎn shí fēn. Nǐ xiàwǔ yǒu kè ma?",
        translation: "Sekarang jam dua lewat sepuluh menit siang. Apakah kamu ada kelas siang ini?",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "我下午两点半有汉语课。我们什么时候去图书馆？",
        pinyin: "Wǒ xiàwǔ liǎng diǎn bàn yǒu Hànyǔ kè. Wǒmen shénme shíhou qù túshūguǎn?",
        translation: "Saya ada kelas bahasa Mandarin jam dua siang lewat tiga puluh. Kapan kita pergi ke perpustakaan?",
      },
      {
        speaker: "Chen Hua",
        role: "Mahasiswa",
        hanzi: "我们明天下午三点半去，怎么样？",
        pinyin: "Wǒmen míngtiān xiàwǔ sān diǎn bàn qù, zěnmeyàng?",
        translation: "Bagaimana kalau kita pergi besok sore jam tiga lewat tiga puluh?",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "太好了，明天下午三点半见！",
        pinyin: "Tài hǎo le, míngtiān xiàwǔ sān diǎn bàn jiàn!",
        translation: "Bagus sekali, sampai jumpa besok sore jam tiga lewat tiga puluh!",
      },
    ],

    vocabulary: [
      {
        hanzi: "年",
        pinyin: "nián",
        tone: "Nada 2",
        translation: "tahun",
        partOfSpeech: "nomina",
        usageNotes:
          "Diletakkan tepat di belakang angka tahun: 二零二六年 (tahun 2026). Angka tahun dibaca digit per digit.",
        exampleHanzi: "今年是二零二六年。",
        examplePinyin: "Jīnnián shì èr líng èr liù nián.",
        exampleTranslation: "Tahun ini adalah tahun 2026.",
      },
      {
        hanzi: "月",
        pinyin: "yuè",
        tone: "Nada 4",
        translation: "bulan",
        partOfSpeech: "nomina",
        usageNotes:
          "Nama bulan dibentuk cukup dengan menambahkan angka 1 s.d. 12 di depan 月: 一月 (Januari), 十二月 (Desember).",
        exampleHanzi: "九月开学。",
        examplePinyin: "Jiǔ yuè kāixué.",
        exampleTranslation: "Bulan September mulai masuk sekolah.",
      },
      {
        hanzi: "日",
        pinyin: "rì",
        tone: "Nada 4",
        translation: "hari / tanggal (ragam formal & kalender)",
        partOfSpeech: "nomina",
        usageNotes:
          "Umum digunakan dalam penulisan dokumen resmi, formulir, berita, atau kalender formal.",
        exampleHanzi: "十月一日是国庆节。",
        examplePinyin: "Shí yuè yī rì shì guóqìngjié.",
        exampleTranslation: "Tanggal 1 Oktober adalah Hari Nasional.",
      },
      {
        hanzi: "号",
        pinyin: "hào",
        tone: "Nada 4",
        translation: "tanggal (ragam lisan sehari-hari) / nomor",
        partOfSpeech: "nomina",
        usageNotes:
          "Bentuk lisan santai paling umum untuk menyebut tanggal: 今天几号？(Hari ini tanggal berapa?).",
        exampleHanzi: "今天五号。",
        examplePinyin: "Jīntiān wǔ hào.",
        exampleTranslation: "Hari ini tanggal lima.",
      },
      {
        hanzi: "星期",
        pinyin: "xīngqī",
        tone: "Nada 1 + Nada 1",
        translation: "minggu / pekan / hari dalam seminggu",
        partOfSpeech: "nomina",
        usageNotes:
          "Nama hari dibentuk dengan menambahkan angka 1 s.d. 6 di belakang 星期: 星期一 (Senin) s.d. 星期六 (Sabtu). Hari Minggu adalah 星期天 atau 星期日.",
        exampleHanzi: "今天星期几？",
        examplePinyin: "Jīntiān xīngqī jǐ?",
        exampleTranslation: "Hari ini hari apa?",
      },
      {
        hanzi: "今天",
        pinyin: "jīntiān",
        tone: "Nada 1 + Nada 1",
        translation: "hari ini",
        partOfSpeech: "nomina waktu",
        usageNotes:
          "Dapat diletakkan sebelum atau tepat sesudah subjek kalimat.",
        exampleHanzi: "今天我很忙。",
        examplePinyin: "Jīntiān wǒ hěn máng.",
        exampleTranslation: "Hari ini saya sangat sibuk.",
      },
      {
        hanzi: "昨天",
        pinyin: "zuótiān",
        tone: "Nada 2 + Nada 1",
        translation: "kemarin",
        partOfSpeech: "nomina waktu",
        usageNotes:
          "Menandakan waktu lampau. Memiliki radikal matahari 日 di bagian kiri.",
        exampleHanzi: "昨天你去哪儿了？",
        examplePinyin: "Zuótiān nǐ qù nǎr le?",
        exampleTranslation: "Kemarin kamu pergi ke mana?",
      },
      {
        hanzi: "明天",
        pinyin: "míngtiān",
        tone: "Nada 2 + Nada 1",
        translation: "besok",
        partOfSpeech: "nomina waktu",
        usageNotes:
          "Menandakan waktu masa depan. Sering dipadukan dalam salam perpisahan: 明天见 (sampai jumpa besok).",
        exampleHanzi: "明天见！",
        examplePinyin: "Míngtiān jiàn!",
        exampleTranslation: "Sampai jumpa besok!",
      },
      {
        hanzi: "现在",
        pinyin: "xiànzài",
        tone: "Nada 4 + Nada 4",
        translation: "sekarang / saat ini",
        partOfSpeech: "nomina waktu",
        usageNotes:
          "Menandakan titik waktu kekinian: 现在几点？(Sekarang jam berapa?).",
        exampleHanzi: "现在十点了。",
        examplePinyin: "Xiànzài shí diǎn le.",
        exampleTranslation: "Sekarang sudah jam sepuluh.",
      },
      {
        hanzi: "点",
        pinyin: "diǎn",
        tone: "Nada 3",
        translation: "jam / pukul",
        partOfSpeech: "satuan waktu",
        usageNotes:
          "Diletakkan tepat sesudah angka jam: 三点 (jam 3). Khusus jam dua gunakan 两点 (liǎng diǎn), bukan 二点.",
        exampleHanzi: "下午两点。",
        examplePinyin: "Xiàwǔ liǎng diǎn.",
        exampleTranslation: "Jam dua siang.",
      },
      {
        hanzi: "分",
        pinyin: "fēn",
        tone: "Nada 1",
        translation: "menit",
        partOfSpeech: "satuan waktu",
        usageNotes:
          "Diletakkan sesudah angka menit: 八点十五分 (jam 8 lewat 15 menit).",
        exampleHanzi: "十分钟。",
        examplePinyin: "Shí fēnzhōng.",
        exampleTranslation: "Sepuluh menit.",
      },
      {
        hanzi: "半",
        pinyin: "bàn",
        tone: "Nada 4",
        translation: "setengah / 30 menit",
        partOfSpeech: "numeralia waktu",
        usageNotes:
          "Diletakkan tepat sesudah 点 untuk menyatakan lewat 30 menit: 两点半 (jam 2 lewat 30 menit).",
        exampleHanzi: "三点半下课。",
        examplePinyin: "Sān diǎn bàn xiàkè.",
        exampleTranslation: "Selesai kelas jam setengah empat (15.30).",
      },
      {
        hanzi: "上午",
        pinyin: "shàngwǔ",
        tone: "Nada 4 + Nada 3",
        translation: "pagi hari (antara jam 08.00 s.d. 11.59)",
        partOfSpeech: "nomina waktu",
        usageNotes:
          "Diletakkan sebelum jam: 上午九点 (jam 9 pagi).",
        exampleHanzi: "上午我有三节课。",
        examplePinyin: "Shàngwǔ wǒ yǒu sān jié kè.",
        exampleTranslation: "Pagi hari saya ada tiga sesi kelas.",
      },
      {
        hanzi: "下午",
        pinyin: "xiàwǔ",
        tone: "Nada 4 + Nada 3",
        translation: "siang / sore hari (antara jam 13.00 s.d. 18.00)",
        partOfSpeech: "nomina waktu",
        usageNotes:
          "Diletakkan sebelum jam: 下午四点 (jam 4 sore).",
        exampleHanzi: "下午我们在家。",
        examplePinyin: "Xiàwǔ wǒmen zài jiā.",
        exampleTranslation: "Sore hari kami berada di rumah.",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "晚上",
        pinyin: "wǎnshang",
        tone: "Nada 3 + netral",
        translation: "malam hari (setelah jam 18.00)",
        isEnrichment: true,
        inclusionReason:
          "Bagian waktu malam esensial untuk melengkapi siklus 24 jam.",
        exampleHanzi: "晚上我看电视。",
        examplePinyin: "Wǎnshang wǒ kàn diànshì.",
        exampleTranslation: "Malam hari saya menonton televisi.",
      },
      {
        hanzi: "中午",
        pinyin: "zhōngwǔ",
        tone: "Nada 1 + Nada 3",
        translation: "tengah hari (jam 12.00 s.d. 12.59)",
        isEnrichment: true,
        inclusionReason:
          "Titik pergantian waktu makan siang harian.",
        exampleHanzi: "中午十二点吃午饭。",
        examplePinyin: "Zhōngwǔ shí'èr diǎn chī wǔfàn.",
        exampleTranslation: "Jam 12 siang makan siang.",
      },
      {
        hanzi: "刻",
        pinyin: "kè",
        tone: "Nada 4",
        translation: "seperempat jam (15 menit)",
        isEnrichment: true,
        inclusionReason:
          "Satuan tradisional yang sering dipakai untuk menyebut jam lewat 15 menit (一刻) atau 45 menit (三刻).",
        exampleHanzi: "五点一刻。",
        examplePinyin: "Wǔ diǎn yí kè.",
        exampleTranslation: "Jam 5 lewat 15 menit.",
      },
      {
        hanzi: "什么时候",
        pinyin: "shénme shíhou",
        tone: "Nada 2 + netral + Nada 2 + netral",
        translation: "kapan / waktu apa",
        isEnrichment: true,
        inclusionReason:
          "Kata tanya waktu universal paling penting dalam percakapan sehari-hari.",
        exampleHanzi: "你什么时候去中国？",
        examplePinyin: "Nǐ shénme shíhou qù Zhōngguó?",
        exampleTranslation: "Kapan kamu pergi ke Tiongkok?",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Lafalkan 'r' pada 'rì' dengan ujung lidah sedikit melengkung ke atas tanpa menyentuh gigi depan, bandingkan dengan 'zh' pada 'zhōngwǔ' dan lidah datar 'z' pada 'xiànzài'.",
      tones:
        "Rangkaian nada ke-4 tegas dan mantap pada kata penanggalan: 'yuè' (月), 'rì' (日), 'hào' (号), 'bàn' (半), dan 'xiànzài' (现在).",
      toneCombinations:
        "Pola gabungan nada ke-4 + nada ke-3 pada 'shàngwǔ' (上午) dan 'xiàwǔ' (下午); serta nada netral di akhir kata pada 'wǎnshang' dan 'shénme shíhou'.",
      commonErrors:
        "Menyebutkan tanggal dengan urutan terbalik meniru bahasa Indonesia (misal menyebut tanggal dulu baru bulan: salah berkata '20 hào 9 yuè'); atau lupa menyisipkan kata 'diǎn' saat membaca jam.",
      articulatoryTip:
        "Gunakan prinsip 'piramida terbalik': bayangkan helikopter mendarat, sebutkan unit terbesar terlebih dahulu (tahun → bulan → tanggal → bagian hari → jam → menit).",
    },

    hanziComponents: [
      {
        hanzi: "年",
        structure: "Tunggal / Utuh (独体字)",
        components: "Bentuk evolusi kuno orang memikul seikat panen gandum tahunan (禾)",
        strokeCount: 6,
        strokeOrderRules: [
          "Goresan miring pendek kiri atas (丿)",
          "Garis mendatar (一) → garis tegak pendek (丨) → garis mendatar panjang (一)",
          "Tusukan garis tegak panjang tengah (丨) di akhir",
        ],
        notes:
          "Zaman dahulu, '年' melambangkan siklus lengkap masa panen gandum tahunan para petani.",
      },
      {
        hanzi: "月",
        structure: "Tunggal / Simetris (独体字)",
        components: "Piktograf bentuk bulan sabit di langit malam",
        strokeCount: 4,
        strokeOrderRules: [
          "Goresan miring kiri melengkung (丿)",
          "Sudut patah berait ke bawah (𠃍)",
          "Dua garis mendatar pengisi di dalam rongga (一, 一)",
        ],
        notes:
          "Melambangkan penampakan fase bulan sabit yang berputar setiap 29–30 hari.",
      },
      {
        hanzi: "日",
        structure: "Tunggal / Kotak Tertutup (独体字)",
        components: "Piktograf bentuk bulatan matahari dengan bintik surya di tengahnya",
        strokeCount: 4,
        strokeOrderRules: [
          "Garis tegak kiri (丨)",
          "Sudut patah atas ke kanan lalu ke bawah (𠃍)",
          "Garis mendatar di tengah (一) terlebih dahulu",
          "Tutup kotak dengan garis mendatar bawah (一)",
        ],
        notes:
          "Kotak matahari melambangkan satu putaran terbit hingga terbenam (satu hari).",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Hierarki Penanggalan Mandarin: Besar ke Kecil",
        formula:
          "[Tahun] + 年 + [Bulan] + 月 + [Tanggal] + 号/日 + [Hari] + 星期几",
        explanation:
          "Dalam bahasa Mandarin, urutan penanggalan selalu dimulai dari unit waktu yang paling besar menuju unit yang paling kecil. Ini berkebalikan penuh dengan bahasa Indonesia (hari-tanggal-bulan-tahun).",
        example:
          "二零二六年九月二十号星期三 (2026 nián 9 yuè 20 hào xīngqīsān: Hari Rabu, tanggal 20 September 2026).",
        positiveExamples: [
          {
            hanzi: "今天是五月三号。",
            pinyin: "Jīntiān shì wǔ yuè sān hào.",
            translation: "Hari ini tanggal 3 Mei.",
          },
          {
            hanzi: "明天是星期四。",
            pinyin: "Míngtiān shì xīngqīsì.",
            translation: "Besok adalah hari Kamis.",
          },
        ],
        usageConstraints:
          "Jangan sekali-kali membalik urutan menjadi [Tanggal] + [Bulan] seperti tata bahasa Indonesia.",
        commonErrors:
          "Menyusun kalimat: 'jīntiān shì sān hào wǔ yuè' (salah, wajib wǔ yuè sān hào).",
        communicativeFunction:
          "Menyatakan tanggal lahir, jadwal janji temu, tiket pesawat, dan agenda kegiatan resmi.",
      },
      {
        ruleTitle: "Posisi Keterangan Waktu dalam Kalimat (Time-Before-Verb)",
        formula:
          "Pola 1: [Subjek] + [Waktu] + [Kata Kerja] + [Objek] | Pola 2: [Waktu] + [Subjek] + [Kata Kerja] + [Objek]",
        explanation:
          "Keterangan waktu dalam bahasa Mandarin WAJIB diletakkan SEBELUM kata kerja (aksi). Keterangan waktu boleh diletakkan tepat sesudah subjek, atau di awal kalimat sebelum subjek untuk memberi penekanan. Keterangan waktu TIDAK PERNAH diletakkan di akhir kalimat.",
        example:
          "我明天去学校。(Wǒ míngtiān qù xuéxiào: Saya besok pergi ke sekolah.) — BUKAN '我去学校明天'.",
        positiveExamples: [
          {
            hanzi: "我们下午两点看书。",
            pinyin: "Wǒmen xiàwǔ liǎng diǎn kàn shū.",
            translation: "Kami membaca buku jam 2 siang.",
          },
          {
            hanzi: "昨天他没有来。",
            pinyin: "Zuótiān tā méiyǒu lái.",
            translation: "Kemarin dia tidak datang.",
          },
        ],
        usageConstraints:
          "Jangan meletakkan kata waktu di ujung kalimat seperti pola bahasa Indonesia/Inggris.",
        commonErrors:
          "Menaruh kata waktu di akhir: 'Wǒ qù túshūguǎn xiàwǔ sān diǎn' (salah struktur).",
        communicativeFunction:
          "Menjelaskan kapan suatu aktivitas dilakukan dengan penataan kronologis alami Mandarin.",
      },
      {
        ruleTitle: "Penyebutan Jam, Menit, dan Setengah Jam",
        formula:
          "[Bagian Hari] + [Angka Jam] + 点 (diǎn) + [Angka Menit] + 分 (fēn) / 半 (bàn)",
        explanation:
          "Untuk menyatakan waktu jam: sebutkan bagian hari terlebih dahulu (pagi/siang/malam), diikuti angka jam + 点. Jika ada menit, sebutkan angka menit + 分. Jika tepat lewat 30 menit, gunakan kata 半 (bàn). Khusus untuk jam 2, gunakan '两点' (liǎng diǎn), bukan '二点'.",
        example: "下午三点半 (Xiàwǔ sān diǎn bàn: Jam 3 lewat 30 sore / setengah 4 sore).",
        positiveExamples: [
          {
            hanzi: "现在上午八点十分。",
            pinyin: "Xiànzài shàngwǔ bā diǎn shí fēn.",
            translation: "Sekarang jam 8 lewat 10 menit pagi.",
          },
          {
            hanzi: "我们下午两点半见。",
            pinyin: "Wǒmen xiàwǔ liǎng diǎn bàn jiàn.",
            translation: "Kita bertemu jam 2 lewat 30 menit siang.",
          },
        ],
        usageConstraints:
          "Kata '两' wajib untuk jam 2 (两点), tetapi untuk menit 2 atau 20 tetap memakai '二' (两点二十分).",
        commonErrors:
          "Mengatakan 'èr diǎn' untuk jam 2 (seharusnya 'liǎng diǎn').",
        communicativeFunction:
          "Menyepakati jam janji temu, jam keberangkatan, dan menyusun agenda harian.",
      },
      {
        ruleTitle: "Kata Tanya Waktu: '几点' (Jam Berapa) & '什么时候' (Kapan)",
        formula:
          "Menanyakan Jam: 现在几点？ / [Subjek] + 几点 + [Aksi] ？ | Menanyakan Kapan: [Subjek] + 什么时候 + [Aksi] ？",
        explanation:
          "Gunakan '几点' (jǐ diǎn) untuk menanyakan jam spesifik pada jam dinding. Gunakan '什么时候' (shénme shíhou) untuk menanyakan rentang waktu yang lebih luas (kapan/hari apa/tanggal berapa). Kata tanya waktu diletakkan persis pada posisi kata keterangan waktu.",
        example: "你什么时候去中国？ / 我们几点上课？",
        positiveExamples: [
          {
            hanzi: "现在几点？",
            pinyin: "Xiànzài jǐ diǎn?",
            translation: "Sekarang jam berapa?",
          },
          {
            hanzi: "你们什么时候去图书馆？",
            pinyin: "Nǐmen shénme shíhou qù túshūguǎn?",
            translation: "Kalian kapan pergi ke perpustakaan?",
          },
        ],
        usageConstraints:
          "Jangan menaruh kata tanya '几点' atau '什么时候' di akhir kalimat.",
        commonErrors:
          "Melakukan inversi kalimat tanya: 'Qù xuéxiào jǐ diǎn nǐ?' (salah, harus 'Nǐ jǐ diǎn qù xuéxiào?').",
        communicativeFunction:
          "Menanyakan jam janji temu dan waktu pelaksanaan kegiatan kepada orang lain.",
      },
    ],

    culturalNotes:
      "Filosofi Waktu Makro-ke-Mikro dalam Budaya Tionghoa: Dalam alam pikir masyarakat Tionghoa, keberadaan individu selalu dipahami dalam konteks lingkungan besar yang memayunginya. Cara berpikir ini tercermin kuat dalam tata bahasa: penanggalan bergerak dari semesta waktu yang lebih stabil dan besar (Tahun → Bulan → Tanggal → Hari → Bagian Hari → Jam → Menit). Pola yang sama berlaku pada penulisan alamat (Negara → Provinsi → Kota → Jalan → Nomor Rumah) dan nama orang (Nama Marga Keluarga Besar → Nama Pribadi).",

    listeningActivity: {
      goal: "Mendengarkan rekaman rencana kegiatan dan mengidentifikasi hari serta jam pelaksanaan janji temu.",
      audioText: "陈华，我们明天下午三点半去图书馆看书，好吗？",
      pinyin: "Chén Huá, wǒmen míngtiān xiàwǔ sān diǎn bàn qù túshūguǎn kàn shū, hǎo ma?",
      translation: "Chen Hua, kita besok sore jam tiga lewat tiga puluh pergi ke perpustakaan membaca buku, bagaimana?",
      gistQuestion: {
        question:
          "Kapan pembicara mengajak Chen Hua untuk pergi ke perpustakaan?",
        options: [
          "Besok sore pukul 15.30 (明天下午三点半)",
          "Hari ini pagi pukul 08.30 (今天上午八点半)",
          "Besok pagi pukul 10.00 (明天上午十点)",
          "Hari Rabu siang pukul 12.00 (星期三中午十二点)",
        ],
        correctAnswer: "Besok sore pukul 15.30 (明天下午三点半)",
        explanation:
          "Audio menyatakan: 'míngtiān xiàwǔ sān diǎn bàn' (besok sore jam 3 lewat 30 menit).",
      },
      detailQuestion: {
        question:
          "Aktivitas apa yang direncanakan oleh pembicara di perpustakaan?",
        options: [
          "Membaca buku (看书 - kàn shū)",
          "Makan siang bersama (吃午饭 - chī wǔfàn)",
          "Membeli kunci baru (买钥匙 - mǎi yàoshi)",
          "Menghubungi guru (给老师打电话 - gěi lǎoshī dǎ diànhuà)",
        ],
        correctAnswer: "Membaca buku (看书 - kàn shū)",
        explanation:
          "Pembicara mengatakan: 'qù túshūguǎn kàn shū' (pergi ke perpustakaan membaca buku).",
      },
    },

    speakingActivity: {
      prompt:
        "Lakukan rekaman lisan tentang jadwal harianmu dalam 3 kalimat bahasa Mandarin: 1) Sebutkan hari ini hari apa dan tanggal berapa (今天是……月……号，星期……); 2) Sebutkan jam berapa sekarang lengkap dengan bagian hari (现在是下午……点 / 上午……点); 3) Nyatakan jam berapa kamu besok pergi belajar atau bekerja (我明天上午……点去学校 / 工作).",
      vocabularySupport: [
        "今天是 (jīntiān shì: hari ini adalah...)",
        "月 (yuè: bulan)",
        "号 (hào: tanggal)",
        "星期 (xīngqī: hari)",
        "现在是 (xiànzài shì: sekarang adalah...)",
        "点半 (diǎn bàn: jam... lewat 30 menit)",
      ],
      evaluationRubric:
        "Kriteria Penilaian: 1) Keteraturan hierarki penanggalan (bulan sebelum tanggal); 2) Posisi keterangan waktu sebelum kata kerja (Time-Before-Verb); 3) Penggunaan 'liǎng diǎn' untuk jam 2; 4) Kelancaran intonasi nada ke-4 pada 'yuè', 'hào', dan 'bàn'.",
    },

    readingActivity: {
      textHanzi:
        "今天是九月二十号，星期三。现在是上午十点整。大卫在学校学习汉语。他今天下午两点半去图书馆看书。明天星期四，他上午没有课，他下午三点去中国朋友家喝茶。",
      textPinyin:
        "Jīntiān shì jiǔ yuè èrshí hào, xīngqīsān. Xiànzài shì shàngwǔ shí diǎn zhěng. Dàwèi zài xuéxiào xuéxí Hànyǔ. Tā jīntiān xiàwǔ liǎng diǎn bàn qù túshūguǎn kàn shū. Míngtiān xīngqīsì, tā shàngwǔ méiyǒu kè, tā xiàwǔ sān diǎn qù Zhōngguó péngyou jiā hē chá.",
      textTranslation:
        "Hari ini tanggal 20 September, hari Rabu. Sekarang jam 10 tepat pagi hari. David sedang belajar bahasa Mandarin di sekolah. Siang ini pukul 14.30 dia pergi ke perpustakaan untuk membaca buku. Besok hari Kamis, dia tidak ada kelas di pagi hari, dia pergi ke rumah teman Tiongkok untuk minum teh pada pukul 15.00 sore.",
      mainIdea:
        "Agenda kegiatan harian David pada hari Rabu dan rencana kegiatannya untuk hari Kamis.",
      questions: [
        {
          question:
            "Jam berapakah David berencana pergi ke perpustakaan pada hari Rabu?",
          options: [
            "Pukul 14.30 siang (下午两点半)",
            "Pukul 10.00 pagi (上午十点)",
            "Pukul 15.00 sore (下午三点)",
            "Pukul 12.00 siang (中午十二点)",
          ],
          correctAnswer: "Pukul 14.30 siang (下午两点半)",
          explanation:
            "Teks menyatakan: 'Tā jīntiān xiàwǔ liǎng diǎn bàn qù túshūguǎn kàn shū.'",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tuliskan 3 karakter Hanzi pembentuk penanggalan dasar berikut di buku kotak latihan dengan memperhatikan proporsi dan urutan goresan yang benar: '年' (nián - tahun), '月' (yuè - bulan), dan '日' (rì - hari/tanggal).",
      minimumCharacters: 3,
      checklist: [
        "Menulis '年': 6 goresan; awali dari goresan miring kiri atas (丿), dua goresan mendatar (一), garis tegak pendek (丨), garis mendatar panjang (一), dan ditutup garis tegak panjang tengah (丨).",
        "Menulis '月': 4 goresan; garis miring kiri melengkung (丿) → sudut patah berait (𠃍) → dua garis mendatar penutup di dalam rongga (一, 一).",
        "Menulis '日': 4 goresan; garis tegak kiri (丨) → sudut patah kanan bawah (𠃍) → garis mendatar tengah (一) → garis penutup bawah (一).",
      ],
      modelAnswer: {
        hanzi: "二零二六年九月二十日",
        pinyin: "èr líng èr liù nián jiǔ yuè èrshí rì",
        translation: "tanggal 20 September tahun 2026",
      },
    },

    personalizationPrompt:
      "Tuliskan tanggal hari ini dan jam kamu biasanya mulai belajar bahasa Mandarin di Buku Frasa pribadi: '今天是……月……号，我每天……点学习汉语。'",
    errorJournalHooks: [
      "Menyusun tanggal terbalik dari kecil ke besar meniru bahasa Indonesia (misal: '20 hào 9 yuè')",
      "Meletakkan keterangan waktu di akhir kalimat setelah kata kerja (misal: 'Wǒ qù xuéxiào jīntiān')",
      "Mengucapkan jam dua dengan kata 'èr diǎn' alih-alih bentuk baku 'liǎng diǎn'",
      "Melupakan kata satuan jam 'diǎn' saat menyatakan pukul waktu",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna mampu menyebutkan hierarki tanggal (Tahun-Bulan-Tanggal-Hari) dengan benar, membaca jam dan menit dengan tepat (termasuk penggunaan '两点' dan '半'), serta menempatkan keterangan waktu sebelum kata kerja dalam kalimat dengan tingkat akurasi minimal 80%.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Pelajari kembali tabel hierarki penanggalan dan latih latihan penataan waktu (Time-Before-Verb) pada menu Latihan Soal Unit 04.",
    },
  },
  // -------------------------------------------------------------
  // HSK 1 Unit 05: Keluarga & Kepemilikan (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "hsk1-05",
    moduleId: "hsk1",
    slug: "05",
    unitNumber: 5,
    title: "Keluarga & Kepemilikan",
    hanzi: "家庭与所属",
    pinyin: "Jiātíng yǔ Suǒshǔ",
    translation: "Anggota Keluarga, Relasi Sosial, Kepemilikan & Usia",
    objectives:
      "Menguasai panggilan anggota keluarga inti dalam bahasa Mandarin (ayah, ibu, kakak/adik laki-laki/perempuan), menyatakan hubungan kepemilikan menggunakan partikel '的' (de), menyatakan kepemilikan dan keberadaan dengan '有' (yǒu) serta sanggahannya '没有' (méiyǒu), menunjuk objek dengan '这' (ini) dan '那' (itu), serta menanyakan jumlah anggota keluarga (几口人) dan usia (几岁 / 多大).",
    overview:
      "Unit kelima tingkat HSK 1 ini membawamu menyelami kehangatan relasi keluarga dalam kebudayaan Tionghoa. Kamu akan belajar memperkenalkan seluruh anggota keluargamu, menceritakan profesi dan usia mereka, menggunakan partikel kepemilikan '的' secara presisi, serta menyatakan keberadaan tanpa kekeliruan negasi.",
    vocabCount: 14,
    durationMinutes: 15,
    levelBadge: "HSK 1 · UNIT 05",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["hsk1-04"],
    skills: [
      "Panggilan Anggota Keluarga Inti",
      "Partikel Kepemilikan 的",
      "Pola Keberadaan 有 dan 没有",
      "Kata Penunjuk Jarak 这 dan 那",
      "Menanyakan Jumlah Keluarga (几口人)",
      "Menyatakan Usia (岁)",
    ],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "Andi (Mahasiswa) & Li Ming (Sahabat Tiongkok)",
      location: "Kamar Asrama Mahasiswa",
      goal: "Memperlihatkan foto keluarga Andi di meja belajar dan saling menceritakan anggota keluarga, profesi, serta usia mereka.",
      scenarioNotes:
        "Li Ming berkunjung ke kamar asrama Andi dan melihat foto berbingkai di meja. Andi menceritakan ayah, ibu, seorang adik perempuan, dan Li Ming menanyakan profesi serta usia adik Andi.",
    },

    dialogue: [
      {
        speaker: "Li Ming",
        role: "Mahasiswa",
        hanzi: "安迪，这是你的家庭照片吗？",
        pinyin: "Āndí, zhè shì nǐ de jiātíng zhàopiàn ma?",
        translation: "Andi, apakah ini foto keluargamu?",
      },
      {
        speaker: "Andi",
        role: "Mahasiswa",
        hanzi: "是的，这是我家人的合影。",
        pinyin: "Shì de, zhè shì wǒ jiārén de héyǐng.",
        translation: "Benar, ini foto bersama keluarga saya.",
      },
      {
        speaker: "Li Ming",
        role: "Mahasiswa",
        hanzi: "你家有几口人？",
        pinyin: "Nǐ jiā yǒu jǐ kǒu rén?",
        translation: "Keluargamu ada berapa orang?",
      },
      {
        speaker: "Andi",
        role: "Mahasiswa",
        hanzi: "我家有四口人：爸爸、妈妈、一个妹妹和我。你呢？",
        pinyin: "Wǒ jiā yǒu sì kǒu rén: bàba, māma, yí gè mèimei hé wǒ. Nǐ ne?",
        translation:
          "Keluarga saya ada 4 orang: ayah, ibu, seorang adik perempuan, dan saya. Bagaimana denganmu?",
      },
      {
        speaker: "Li Ming",
        role: "Mahasiswa",
        hanzi: "我家有三口人，我没有哥哥姐姐，也没有弟弟妹妹。",
        pinyin: "Wǒ jiā yǒu sān kǒu rén, wǒ méiyǒu gēge jiějie, yě méiyǒu dìdi mèimei.",
        translation:
          "Keluarga saya ada 3 orang, saya tidak punya kakak laki-laki/perempuan, juga tidak punya adik.",
      },
      {
        speaker: "Andi",
        role: "Mahasiswa",
        hanzi: "这个小女孩是谁？",
        pinyin: "Zhè gè xiǎo nǚhái shì shéi?",
        translation: "Anak perempuan kecil ini siapa?",
      },
      {
        speaker: "Li Ming",
        role: "Mahasiswa",
        hanzi: "那是我妹妹，她今年八岁，是小学生。",
        pinyin: "Nà shì wǒ mèimei, tā jīnnián bā suì, shì xiǎoxuéshēng.",
        translation: "Itu adik perempuan saya, tahun ini dia berusia 8 tahun, seorang murid SD.",
      },
    ],

    vocabulary: [
      {
        hanzi: "家",
        pinyin: "jiā",
        tone: "Nada 1",
        translation: "rumah / keluarga",
        partOfSpeech: "nomina",
        usageNotes:
          "Dapat merujuk pada bangunan fisik rumah maupun entitas keluarga: 我家 (keluarga/rumah saya).",
        exampleHanzi: "我爱我的家。",
        examplePinyin: "Wǒ ài wǒ de jiā.",
        exampleTranslation: "Saya mencintai keluarga saya.",
      },
      {
        hanzi: "爸爸",
        pinyin: "bàba",
        tone: "Nada 4 + netral",
        translation: "ayah / bapak",
        partOfSpeech: "nomina",
        usageNotes:
          "Suku kata kedua dilafalkan ringan dengan nada netral. Bentuk singkatnya adalah 爸 (bà).",
        exampleHanzi: "我爸爸在工作。",
        examplePinyin: "Wǒ bàba zài gōngzuò.",
        exampleTranslation: "Ayah saya sedang bekerja.",
      },
      {
        hanzi: "妈妈",
        pinyin: "māma",
        tone: "Nada 1 + netral",
        translation: "ibu / mama",
        partOfSpeech: "nomina",
        usageNotes:
          "Suku kata kedua bernada netral. Memiliki radikal wanita 女 di sebelah kiri.",
        exampleHanzi: "妈妈喜欢喝茶。",
        examplePinyin: "Māma xǐhuan hē chá.",
        exampleTranslation: "Ibu suka minum teh.",
      },
      {
        hanzi: "哥哥",
        pinyin: "gēge",
        tone: "Nada 1 + netral",
        translation: "kakak laki-laki",
        partOfSpeech: "nomina",
        usageNotes:
          "Panggilan untuk saudara laki-laki yang lebih tua.",
        exampleHanzi: "他是我哥哥。",
        examplePinyin: "Tā shì wǒ gēge.",
        exampleTranslation: "Dia adalah kakak laki-laki saya.",
      },
      {
        hanzi: "姐姐",
        pinyin: "jiějie",
        tone: "Nada 3 + netral",
        translation: "kakak perempuan",
        partOfSpeech: "nomina",
        usageNotes:
          "Panggilan untuk saudara perempuan yang lebih tua.",
        exampleHanzi: "姐姐很漂亮。",
        examplePinyin: "Jiějie hěn piàoliang.",
        exampleTranslation: "Kakak perempuan sangat cantik.",
      },
      {
        hanzi: "弟弟",
        pinyin: "dìdi",
        tone: "Nada 4 + netral",
        translation: "adik laki-laki",
        partOfSpeech: "nomina",
        usageNotes:
          "Panggilan untuk saudara laki-laki yang lebih muda.",
        exampleHanzi: "弟弟今年六岁。",
        examplePinyin: "Dìdi jīnnián liù suì.",
        exampleTranslation: "Adik laki-laki tahun ini berusia 6 tahun.",
      },
      {
        hanzi: "妹妹",
        pinyin: "mèimei",
        tone: "Nada 4 + netral",
        translation: "adik perempuan",
        partOfSpeech: "nomina",
        usageNotes:
          "Panggilan untuk saudara perempuan yang lebih muda.",
        exampleHanzi: "那是我的妹妹。",
        examplePinyin: "Nà shì wǒ de mèimei.",
        exampleTranslation: "Itu adalah adik perempuan saya.",
      },
      {
        hanzi: "有",
        pinyin: "yǒu",
        tone: "Nada 3",
        translation: "mempunyai / ada",
        partOfSpeech: "verba",
        usageNotes:
          "Menyatakan kepemilikan atau eksistensi keberadaan sesuatu.",
        exampleHanzi: "我家有四口人。",
        examplePinyin: "Wǒ jiā yǒu sì kǒu rén.",
        exampleTranslation: "Keluarga saya ada 4 orang.",
      },
      {
        hanzi: "没有",
        pinyin: "méiyǒu",
        tone: "Nada 2 + Nada 3",
        translation: "tidak mempunyai / tidak ada",
        partOfSpeech: "verba negasi",
        usageNotes:
          "Bentuk sangkalan mutlak untuk '有'. PANTANGAN: Jangan pernah mengucapkan '不有'.",
        exampleHanzi: "我没有哥哥。",
        examplePinyin: "Wǒ méiyǒu gēge.",
        exampleTranslation: "Saya tidak memiliki kakak laki-laki.",
      },
      {
        hanzi: "的",
        pinyin: "de",
        tone: "Nada netral",
        translation: "partikel kepemilikan / penjelas",
        partOfSpeech: "partikel struktural",
        usageNotes:
          "Menghubungkan pemilik dengan yang dimiliki: 我的书 (buku saya). Boleh dilesapkan untuk hubungan keluarga sangat intim: 我妈妈 (ibu saya).",
        exampleHanzi: "这是谁的书？",
        examplePinyin: "Zhè shì shéi de shū?",
        exampleTranslation: "Ini buku milik siapa?",
      },
      {
        hanzi: "这",
        pinyin: "zhè",
        tone: "Nada 4",
        translation: "ini",
        partOfSpeech: "pronomina demonstrativa",
        usageNotes:
          "Menunjuk entitas yang berada dekat dengan pembicara. Sering dipadukan dengan kata bantu: 这个 (zhè gè: yang ini).",
        exampleHanzi: "这是我爸爸。",
        examplePinyin: "Zhè shì wǒ bàba.",
        exampleTranslation: "Ini adalah ayah saya.",
      },
      {
        hanzi: "那",
        pinyin: "nà",
        tone: "Nada 4",
        translation: "itu",
        partOfSpeech: "pronomina demonstrativa",
        usageNotes:
          "Menunjuk entitas yang berada jauh dari pembicara: 那个 (nà gè: yang itu). Jangan tertukar dengan '哪' (nǎ - nada 3, mana).",
        exampleHanzi: "那是谁的电脑？",
        examplePinyin: "Nà shì shéi de diànnǎo?",
        exampleTranslation: "Itu komputer milik siapa?",
      },
      {
        hanzi: "岁",
        pinyin: "suì",
        tone: "Nada 4",
        translation: "tahun umur / usia",
        partOfSpeech: "satuan usia",
        usageNotes:
          "Diletakkan langsung sesudah angka umur tanpa kata bantu: 二十岁 (20 tahun).",
        exampleHanzi: "他今年十八岁。",
        examplePinyin: "Tā jīnnián shíbā suì.",
        exampleTranslation: "Dia tahun ini berusia 18 tahun.",
      },
      {
        hanzi: "和",
        pinyin: "hé",
        tone: "Nada 2",
        translation: "dan / bersama",
        partOfSpeech: "konjungsi",
        usageNotes:
          "HANYA digunakan untuk menghubungkan dua kata benda atau frasa nominal (A 和 B). Tidak boleh menghubungkan dua anak kalimat verbal.",
        exampleHanzi: "爸爸和妈妈。",
        examplePinyin: "Bàba hé māma.",
        exampleTranslation: "Ayah dan ibu.",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "口",
        pinyin: "kǒu",
        tone: "Nada 3",
        translation: "orang (kata bantu bilangan khusus anggota keluarga)",
        isEnrichment: true,
        inclusionReason:
          "Kata bantu bilangan tradisional untuk menghitung jumlah mulut yang diberi makan dalam satu atap keluarga (几口人).",
        exampleHanzi: "一家三口人。",
        examplePinyin: "Yì jiā sān kǒu rén.",
        exampleTranslation: "Satu keluarga beranggotakan tiga orang.",
      },
      {
        hanzi: "多大",
        pinyin: "duō dà",
        tone: "Nada 1 + Nada 4",
        translation: "berapa usia / seberapa besar",
        isEnrichment: true,
        inclusionReason:
          "Pertanyaan standar untuk menanyakan usia orang sebaya atau dewasa (kamu umur berapa?).",
        exampleHanzi: "你今年多大？",
        examplePinyin: "Nǐ jīnnián duō dà?",
        exampleTranslation: "Berapa usiamu tahun ini?",
      },
      {
        hanzi: "照片",
        pinyin: "zhàopiàn",
        tone: "Nada 4 + Nada 4",
        translation: "foto / potret",
        isEnrichment: true,
        inclusionReason:
          "Benda kontekstual paling lazim saat memulai obrolan perkenalan keluarga.",
        exampleHanzi: "请看这张照片。",
        examplePinyin: "Qǐng kàn zhè zhāng zhàopiàn.",
        exampleTranslation: "Silakan lihat foto ini.",
      },
      {
        hanzi: "女儿",
        pinyin: "nǚ'ér",
        tone: "Nada 3 + Nada 2",
        translation: "anak perempuan",
        isEnrichment: true,
        inclusionReason:
          "Sebutan status keturunan penting melengkapi kosakata keluarga.",
        exampleHanzi: "王老师有一个女儿。",
        examplePinyin: "Wáng lǎoshī yǒu yí gè nǚ'ér.",
        exampleTranslation: "Guru Wang memiliki seorang anak perempuan.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Perhatikan perbedaan bunyi 'd' pada 'dìdi' dengan bunyi 'zh' pada 'zhè' dan 's' pada 'suì'.",
      tones:
        "Pelafalan nada netral yang ringan dan pendek pada suku kata kedua nama relasi keluarga: 'bàba', 'māma', 'gēge', 'jiějie', 'dìdi', 'mèimei'.",
      toneCombinations:
        "Frasa negasi 'méiyǒu' (nada 2 naik + nada 3 rendah turun-naik). Pastikan tidak melafalkan kata 'méi' dengan nada datar.",
      commonErrors:
        "Mengucapkan 'bù yǒu' untuk menolak kepemilikan (PANTANGAN MUTLAK: bahasa Mandarin hanya mengenal 'méiyǒu'); atau tertukar antara 'zhè' (ini) dan 'nà' (itu).",
      articulatoryTip:
        "Saat menyebutkan panggilan keluarga dwisuku berulang, tekan suku kata pertama sedikit lebih kuat, lalu jatuhkan suku kata kedua seringan desah napas.",
    },

    hanziComponents: [
      {
        hanzi: "家",
        structure: "Atas-Bawah (上下结构)",
        components: "宀 (atap rumah di atas) + 豕 (babi ternak / sumber pangan di bawah)",
        strokeCount: 10,
        strokeOrderRules: [
          "Atas sebelum bawah (从上到下)",
          "Tulis radikal atap 宀 terlebih dahulu: titik atas (丶) → titik kiri (丶) → sudut kait (㇇)",
          "Tulis komponen hewan ternak 豕 di bawah atap",
        ],
        notes:
          "Dalam masyarakat agraris Tiongkok kuno, sebuah tempat tinggal baru layak disebut 'rumah keluarga' (家) jika memiliki atap pelindung (宀) dan hewan ternak (豕) sebagai sumber kehidupan yang stabil.",
      },
      {
        hanzi: "爸",
        structure: "Atas-Bawah (上下结构)",
        components: "父 (radikal ayah / kepala keluarga di atas) + 巴 (komponen fonetik bā di bawah)",
        strokeCount: 8,
        strokeOrderRules: [
          "Atas sebelum bawah (从上到下)",
          "Selesaikan radikal ayah 父 di bagian atas",
          "Tulis komponen 巴 di bagian bawah",
        ],
        notes:
          "Radikal '父' menggambarkan tangan memegang tongkat batu sebagai simbol wewenang pelindung keluarga.",
      },
      {
        hanzi: "妈",
        structure: "Kiri-Kanan (左右结构)",
        components: "女 (radikal perempuan / ibu di kiri) + 马 (kuda / fonetik mǎ di kanan)",
        strokeCount: 6,
        strokeOrderRules: [
          "Kiri sebelum kanan (从左到右)",
          "Tulis radikal wanita 女 di sebelah kiri terlebih dahulu",
          "Tulis karakter kuda 马 di sebelah kanan",
        ],
        notes:
          "Karakter fono-semantik sempurna: radikal perempuan '女' memberikan makna ibu, dan karakter '马' (mǎ) memberikan bunyi pelafalan dasar mā.",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Partikel Kepemilikan & Penjelas: 的 (De)",
        formula: "[Pemilik] + 的 (de) + [Benda / Hubungan yang Dimiliki]",
        explanation:
          "Partikel 的 menghubungkan entitas pemilik dengan yang dimiliki. Namun, dalam bahasa Mandarin lisan, jika hubungan tersebut merupakan hubungan keluarga inti yang sangat dekat atau instansi tempat bernaung, kata 的 boleh dilesapkan demi keakraban.",
        example:
          "这是我的书 (Ini buku saya) | 我妈妈 (Ibu saya - 的 dilesapkan untuk keluarga dekat).",
        positiveExamples: [
          {
            hanzi: "这是李明的电脑。",
            pinyin: "Zhè shì Lǐ Míng de diànnǎo.",
            translation: "Ini adalah komputer milik Li Ming.",
          },
          {
            hanzi: "我爸爸是老师。",
            pinyin: "Wǒ bàba shì lǎoshī.",
            translation: "Ayah saya adalah seorang guru (tanpa 的 karena keluarga inti).",
          },
        ],
        usageConstraints:
          "Jangan gunakan partikel 的 pada kata sifat bersuku kata tunggal yang langsung menerangkan benda (misal: hǎo péngyou, bukan hǎo de péngyou).",
        commonErrors:
          "Menyusun terbalik: 'shū de wǒ' meniru pola bahasa Indonesia (wajib 'wǒ de shū').",
        communicativeFunction:
          "Menjelaskan hak kepemilikan barang dan kehangatan ikatan kekeluargaan.",
      },
      {
        ruleTitle: "Menyatakan Keberadaan & Kepemilikan: 有 (Yǒu) vs 没有 (Méiyǒu)",
        formula:
          "Pernyataan Positif: [Subjek] + 有 + [Objek] | Pernyataan Negatif: [Subjek] + 没有 + [Objek]",
        explanation:
          "Gunakan kata kerja 有 (yǒu) untuk menyatakan 'mempunyai' atau 'ada'. Untuk menyatakan 'tidak punya' atau 'tidak ada', gunakan kata negasi mutlak 没有 (méiyǒu). PANTANGAN BESAR: Bahasa Mandarin TIDAK PERNAH menggunakan '不有'.",
        example: "我家有四口人。 / 我没有姐姐。(BUKAN '我不仅有姐姐').",
        positiveExamples: [
          {
            hanzi: "他有两个哥哥。",
            pinyin: "Tā yǒu liǎng gè gēge.",
            translation: "Dia memiliki dua orang kakak laki-laki.",
          },
          {
            hanzi: "我们学校没有中国老师。",
            pinyin: "Wǒmen xuéxiào méiyǒu Zhōngguó lǎoshī.",
            translation: "Sekolah kami tidak ada guru asal Tiongkok.",
          },
        ],
        usageConstraints:
          "Kata kerja '有' hanya boleh dinegasikan oleh '没' (méi), tidak pernah oleh '不' (bù).",
        commonErrors:
          "Mengatakan 'wǒ bù yǒu' (salah fatal, wajib 'wǒ méiyǒu').",
        communicativeFunction:
          "Menyatakan kepemilikan aset, relasi kerabat, dan ketersediaan fasilitas.",
      },
      {
        ruleTitle: "Kata Tunjuk Spasial Jarak: 这 (Zhè / Ini) vs 那 (Nà / Itu)",
        formula: "Dekat: 这 (zhè) + [是 / Measure Word] | Jauh: 那 (nà) + [是 / Measure Word]",
        explanation:
          "Gunakan 这 (zhè) untuk menunjuk benda atau orang yang dekat dengan pembicara. Gunakan 那 (nà) untuk menunjuk benda atau orang yang jauh dari pembicara. Jika diikuti kata benda, wajib disisipi kata bantu bilangan: 这个人 (orang ini) / 那本书 (buku itu).",
        example: "这是我弟弟，那是我妹妹。(Ini adik laki-lakiku, itu adik perempuanku.)",
        positiveExamples: [
          {
            hanzi: "这个照片很好看。",
            pinyin: "Zhè gè zhàopiàn hěn hǎokàn.",
            translation: "Foto ini sangat bagus.",
          },
          {
            hanzi: "那个人是谁？",
            pinyin: "Nà gè rén shì shéi?",
            translation: "Orang itu siapa?",
          },
        ],
        usageConstraints:
          "Jangan menaruh 'zhè' atau 'nà' langsung di depan kata benda tanpa measure word dalam ragam lisan baku.",
        commonErrors:
          "Tertukar antara 'nà' (itu - nada 4) dengan kata tanya 'nǎ' (mana - nada 3).",
        communicativeFunction:
          "Mengarahkan fokus perhatian lawan bicara terhadap objek visual di sekitar.",
      },
      {
        ruleTitle: "Menanyakan Jumlah Anggota Keluarga dan Usia",
        formula:
          "Keluarga: [Subjek] + 家有几口人？ | Usia Anak (< 10 thn): [Subjek] + 几岁？ | Usia Umum/Dewasa: [Subjek] + 多大？",
        explanation:
          "Untuk menanyakan jumlah keluarga, gunakan frasa khusus '几口人' (jǐ kǒu rén). Untuk menanyakan usia: 1) Gunakan '几岁' (jǐ suì) untuk anak kecil di bawah 10 tahun; 2) Gunakan '多大' (duō dà) untuk teman sebaya, remaja, atau orang dewasa.",
        example: "你家有几口人？ / 你妹妹今年几岁？ / 你今年多大？",
        positiveExamples: [
          {
            hanzi: "你弟弟几岁了？",
            pinyin: "Nǐ dìdi jǐ suì le?",
            translation: "Berapa umur adik laki-lakimu? (anak kecil)",
          },
          {
            hanzi: "李老师今年多大？",
            pinyin: "Lǐ lǎoshī jīnnián duō dà?",
            translation: "Berapa usia Guru Li tahun ini? (dewasa)",
          },
        ],
        usageConstraints:
          "Jangan gunakan '几岁' kepada orang tua atau lansia (gunakan '多大年纪' untuk bentuk hormat).",
        commonErrors:
          "Menggunakan 'duōshao suì' untuk menanyakan umur (salah, gunakan 'jǐ suì' atau 'duō dà').",
        communicativeFunction:
          "Menggali informasi demografis keluarga dan usia lawan bicara secara sopan.",
      },
    ],

    culturalNotes:
      "Struktur Keluarga Tradisional vs Modern di Tiongkok: Dalam kebudayaan Tiongkok tradisional, konsep keluarga besar (大家庭 - dàjiātíng) yang terdiri dari beberapa generasi tinggal bersama di bawah satu atap sangat dihargai. Namun, akibat penerapan Kebijakan Satu Anak (独生子女政策) pada dekade 1980–2015, banyak pemuda Tiongkok masa kini tumbuh tanpa saudara kandung (tidak memiliki 哥哥, 姐姐, 弟弟, 妹妹). Oleh karena itu, istilah sahabat karib sering kali dianggap setara saudara kandung.",

    listeningActivity: {
      goal: "Mendengarkan rekaman perkenalan anggota keluarga dan mengidentifikasi jumlah serta status relasi keluarga penutur.",
      audioText: "我家有四口人：爸爸、妈妈、一个妹妹和我。我爸爸是医生，我妈妈是老师。",
      pinyin: "Wǒ jiā yǒu sì kǒu rén: bàba, māma, yí gè mèimei hé wǒ. Wǒ bàba shì yīshēng, wǒ māma shì lǎoshī.",
      translation: "Keluarga saya ada 4 orang: ayah, ibu, seorang adik perempuan, dan saya. Ayah saya adalah dokter, ibu saya adalah guru.",
      gistQuestion: {
        question:
          "Berapakah jumlah anggota keluarga pembicara dan siapakah saudara kandung yang dimilikinya?",
        options: [
          "4 orang, memiliki seorang adik perempuan (四口人，一个妹妹)",
          "3 orang, memiliki seorang kakak laki-laki (三口人，一个哥哥)",
          "5 orang, memiliki dua orang kakak perempuan (五口人，两个姐姐)",
          "4 orang, tidak memiliki saudara kandung (四口人，没有兄弟姐妹)",
        ],
        correctAnswer: "4 orang, memiliki seorang adik perempuan (四口人，一个妹妹)",
        explanation:
          "Audio menyatakan: 'Wǒ jiā yǒu sì kǒu rén: bàba, māma, yí gè mèimei hé wǒ.'",
      },
      detailQuestion: {
        question:
          "Apakah profesi dari ayah dan ibu pembicara berdasarkan rekaman di atas?",
        options: [
          "Ayah seorang dokter dan ibu seorang guru (爸爸是医生，妈妈是老师)",
          "Ayah dan ibu keduanya adalah dosen universitas",
          "Ayah seorang guru dan ibu seorang pedagang",
          "Ayah seorang pelajar dan ibu seorang dokter",
        ],
        correctAnswer: "Ayah seorang dokter dan ibu seorang guru (爸爸是医生，妈妈是老师)",
        explanation:
          "Audio menyatakan: 'wǒ bàba shì yīshēng, wǒ māma shì lǎoshī'.",
      },
    },

    speakingActivity: {
      prompt:
        "Lakukan rekaman lisan perkenalan keluargamu secara runtut dalam 4–5 kalimat bahasa Mandarin: 1) Nyatakan jumlah anggota keluargamu (我家有……口人); 2) Sebutkan siapa saja mereka (爸爸、妈妈……和我); 3) Sebutkan satu saudara kandungmu beserta usianya atau nyatakan bahwa kamu anak tunggal (我有一个……，他/她今年……岁 / 我没有兄弟姐妹); 4) Sebutkan profesi salah satu orang tuamu (我爸爸/妈妈是……).",
      vocabularySupport: [
        "我家有 (wǒ jiā yǒu: keluarga saya ada...)",
        "口人 (kǒu rén: anggota keluarga)",
        "哥哥 / 姐姐 / 弟弟 / 妹妹 (saudara kandung)",
        "岁 (suì: tahun umur)",
        "老师 / 医生 / 学生 (profesi)",
      ],
      evaluationRubric:
        "Kriteria Penilaian: 1) Penggunaan classifier 'kǒu' untuk keluarga; 2) Pengucapan nada netral pada sebutan keluarga (bàba, māma, dll.); 3) Ketepatan pola kepemilikan dan usia; 4) Kelancaran penuturan tanpa jeda canggung.",
    },

    readingActivity: {
      textHanzi:
        "李明的家在北京，他家有三口人：爸爸、妈妈和他。李明的爸爸是汉语老师，他今年四十五岁。李明的妈妈也是老师。李明没有哥哥，也没有弟弟。他有一个好朋友叫安迪，安迪是印尼人。",
      textPinyin:
        "Lǐ Míng de jiā zài Běijīng, tā jiā yǒu sān kǒu rén: bàba, māma hé tā. Lǐ Míng de bàba shì Hànyǔ lǎoshī, tā jīnnián sìshíwǔ suì. Lǐ Míng de māma yě shì lǎoshī. Lǐ Míng méiyǒu gēge, yě méiyǒu dìdi. Tā yǒu yí gè hǎo péngyou jiào Āndí, Āndí shì Yìnní rén.",
      textTranslation:
        "Keluarga Li Ming tinggal di Beijing, keluarganya ada tiga orang: ayah, ibu, dan dia. Ayah Li Ming adalah guru bahasa Mandarin, tahun ini beliau berusia 45 tahun. Ibu Li Ming juga seorang guru. Li Ming tidak memiliki kakak laki-laki, juga tidak memiliki adik laki-laki. Dia memiliki seorang sahabat baik bernama Andi, Andi adalah orang Indonesia.",
      mainIdea:
        "Profil susunan keluarga inti Li Ming di Beijing beserta profesi orang tua dan relasi persahabatannya.",
      questions: [
        {
          question:
            "Berapakah usia ayah Li Ming dan apakah profesi ibunya menurut teks?",
          options: [
            "Ayahnya berusia 45 tahun dan ibunya adalah seorang guru (四十五岁，妈妈是老师)",
            "Ayahnya berusia 50 tahun dan ibunya adalah seorang dokter",
            "Ayahnya berusia 40 tahun dan ibunya tidak bekerja",
            "Ayahnya berusia 35 tahun dan ibunya adalah mahasiswa",
          ],
          correctAnswer: "Ayahnya berusia 45 tahun dan ibunya adalah seorang guru (四十五岁，妈妈是老师)",
          explanation:
            "Teks menyatakan: 'tā jīnnián sìshíwǔ suì. Lǐ Míng de māma yě shì lǎoshī.'",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tuliskan 3 karakter Hanzi pembentuk sebutan keluarga berikut di buku kotak latihan dengan memperhatikan proporsi dan urutan goresan yang benar: '家' (jiā - rumah/keluarga), '爸' (bà - ayah), dan '妈' (mā - ibu).",
      minimumCharacters: 3,
      checklist: [
        "Menulis '家': 10 goresan; tulis radikal atap '宀' di atas terlebih dahulu, kemudian komponen '豕' di bawahnya.",
        "Menulis '爸': 8 goresan; tulis radikal ayah '父' di bagian atas terlebih dahulu, kemudian komponen '巴' di bawahnya.",
        "Menulis '妈': 6 goresan; tulis radikal wanita '女' di sebelah kiri terlebih dahulu, baru komponen kuda '马' di sebelah kanan.",
      ],
      modelAnswer: {
        hanzi: "这是我的家，我爱爸爸妈妈",
        pinyin: "zhè shì wǒ de jiā, wǒ ài bàba māma",
        translation: "ini adalah keluarga saya, saya mencintai ayah dan ibu",
      },
    },

    personalizationPrompt:
      "Tuliskan profil singkat keluargamu sendiri di Buku Frasa pribadi: '我家有……口人，我爸爸是……，我妈妈是……，我爱我的家。' dan rekam pelafalannya.",
    errorJournalHooks: [
      "Menggunakan 'bù yǒu' untuk menyatakan tidak punya (PANTANGAN MUTLAK: wajib 'méiyǒu')",
      "Menyusun frasa kepemilikan terbalik meniru bahasa Indonesia (misal: 'shū de wǒ')",
      "Melupakan kata bantu bilangan keluarga 'kǒu' saat menyebut 'sì kǒu rén'",
      "Tertukar antara kata tunjuk 'zhè' (ini) dan 'nà' (itu)",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna mampu menyebutkan nama-nama anggota keluarga inti dengan nada netral yang tepat, menyatakan kepemilikan dengan partikel '的', menggunakan '有' dan '没有' secara benar tanpa kesalahan '不有', serta menanyakan jumlah anggota keluarga dan usia dengan tingkat akurasi minimal 80%.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Pelajari kembali tabel pemakaian '有' vs '没有' dan latih latihan sebutan keluarga pada menu Latihan Soal Unit 05.",
    },
  },
  // -------------------------------------------------------------
  // HSK 1 Unit 06: Rutinitas Harian & Jadwal (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "hsk1-06",
    moduleId: "hsk1",
    slug: "06",
    unitNumber: 6,
    title: "Rutinitas Harian & Jadwal",
    hanzi: "日常作息",
    pinyin: "Rìcháng Zuòxī",
    translation: "Jadwal Kegiatan Harian, Jam Operasional & Rencana",
    objectives:
      "Menguasai penataan jadwal aktivitas harian dalam urutan baku [Subjek + Waktu + Predikat + Objek], menyangkal kebiasaan rutin menggunakan kata negasi '不' (bù), membalik topik percakapan secara ringkas dengan partikel '呢' (ne), menyatakan keinginan dan rencana dengan kata kerja modal '想' (xiǎng) dan '要' (yào), serta menggunakan adverbia '也' (juga) dan '都' (semua).",
    overview:
      "Unit keenam tingkat HSK 1 ini menyatukan konsep waktu dan aktivitas sehari-hari. Kamu akan mampu menceritakan satu hari penuh dalam hidupmu mulai dari bangun pagi, sarapan, jadwal kelas atau kerja, hingga tidur malam, serta membiasakan penggunaan modal dan adverbia yang membuat tutur kalimatmu mengalir wajar layaknya penutur asli.",
    vocabCount: 14,
    durationMinutes: 15,
    levelBadge: "HSK 1 · UNIT 06",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["hsk1-05"],
    skills: [
      "Pola Subjek + Waktu + Verba + Objek",
      "Negasi Kebiasaan dengan 不",
      "Pertanyaan Resiprokal dengan 呢",
      "Modal Keinginan 想 dan Rencana 要",
      "Adverbia Cakupan 也 (juga) dan 都 (semua)",
    ],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "Lin Na (Mahasiswi) & David (Mahasiswa)",
      location: "Kantin Kampus saat Sarapan Pagi",
      goal: "Saling menanyakan rutinitas jam bangun tidur, jadwal kuliah harian, dan kegiatan waktu luang di sore hari.",
      scenarioNotes:
        "Lin Na dan David sarapan bersama di kantin kampus sebelum jam kuliah pagi. Mereka membandingkan jam bangun pagi mereka, jadwal kelas hari itu, dan rencana belajar mandiri di perpustakaan pada sore hari.",
    },

    dialogue: [
      {
        speaker: "Lin Na",
        role: "Mahasiswi",
        hanzi: "大卫，你每天早上几点起床？",
        pinyin: "Dàwèi, nǐ měitiān zǎoshang jǐ diǎn qǐchuáng?",
        translation: "David, kamu setiap pagi bangun jam berapa?",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "我通常早上七点起床，七点半吃早饭。你呢？",
        pinyin: "Wǒ tōngcháng zǎoshang qī diǎn qǐchuáng, qī diǎn bàn chī zǎofàn. Nǐ ne?",
        translation: "Saya biasanya bangun jam 7 pagi, jam 7 lewat 30 sarapan. Bagaimana denganmu?",
      },
      {
        speaker: "Lin Na",
        role: "Mahasiswi",
        hanzi: "我也七点起床。你今天上午有课吗？",
        pinyin: "Wǒ yě qī diǎn qǐchuáng. Nǐ jīntiān shàngwǔ yǒu kè ma?",
        translation: "Saya juga bangun jam 7. Apakah kamu ada kelas pagi ini?",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "有，我上午八点到十二点都有课。下午我想去图书馆看书。",
        pinyin: "Yǒu, wǒ shàngwǔ bā diǎn dào shí'èr diǎn dōu yǒu kè. Xiàwǔ wǒ xiǎng qù túshūguǎn kàn shū.",
        translation: "Ada, saya pagi hari dari jam 8 sampai 12 semuanya ada kelas. Sore hari saya ingin pergi ke perpustakaan membaca buku.",
      },
      {
        speaker: "Lin Na",
        role: "Mahasiswi",
        hanzi: "下午我也去图书馆，我们一起去吧！你晚上几点睡觉？",
        pinyin: "Xiàwǔ wǒ yě qù túshūguǎn, wǒmen yìqǐ qù ba! Nǐ wǎnshang jǐ diǎn shuìjiào?",
        translation: "Sore hari saya juga pergi ke perpustakaan, ayo kita pergi bersama! Kamu malam hari tidur jam berapa?",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "我晚上十一点半睡觉。我不喜欢熬夜。",
        pinyin: "Wǒ wǎnshang shíyī diǎn bàn shuìjiào. Wǒ bù xǐhuan áoyè.",
        translation: "Saya tidur malam jam sebelas lewat tiga puluh. Saya tidak suka begadang.",
      },
    ],

    vocabulary: [
      {
        hanzi: "起床",
        pinyin: "qǐchuáng",
        tone: "Nada 3 + Nada 2",
        translation: "bangun tidur",
        partOfSpeech: "verba berobjek",
        usageNotes:
          "Secara harfiah berarti 'bangkit dari ranjang'.",
        exampleHanzi: "我早上七点起床。",
        examplePinyin: "Wǒ zǎoshang qī diǎn qǐchuáng.",
        exampleTranslation: "Saya bangun jam 7 pagi.",
      },
      {
        hanzi: "睡觉",
        pinyin: "shuìjiào",
        tone: "Nada 4 + Nada 4",
        translation: "tidur",
        partOfSpeech: "verba berobjek",
        usageNotes:
          "Kedua suku kata berbunyi nada ke-4 menukik tajam.",
        exampleHanzi: "他晚上十点睡觉。",
        examplePinyin: "Tā wǎnshang shí diǎn shuìjiào.",
        exampleTranslation: "Dia tidur pukul 10 malam.",
      },
      {
        hanzi: "吃",
        pinyin: "chī",
        tone: "Nada 1",
        translation: "makan",
        partOfSpeech: "verba",
        usageNotes:
          "Diikuti langsung oleh nama makanan: 吃饭 (makan nasi/makan), 吃苹果 (makan apel).",
        exampleHanzi: "你想吃什么？",
        examplePinyin: "Nǐ xiǎng chī shénme?",
        exampleTranslation: "Kamu ingin makan apa?",
      },
      {
        hanzi: "喝",
        pinyin: "hē",
        tone: "Nada 1",
        translation: "minum",
        partOfSpeech: "verba",
        usageNotes:
          "Diikuti langsung oleh minuman: 喝水 (minum air), 喝茶 (minum teh).",
        exampleHanzi: "请喝茶。",
        examplePinyin: "Qǐng hē chá.",
        exampleTranslation: "Silakan minum teh.",
      },
      {
        hanzi: "去",
        pinyin: "qù",
        tone: "Nada 4",
        translation: "pergi ke",
        partOfSpeech: "verba",
        usageNotes:
          "Menandakan pergerakan menjauhi pembicara: 去学校 (pergi ke sekolah).",
        exampleHanzi: "明天我去学校。",
        examplePinyin: "Míngtiān wǒ qù xuéxiào.",
        exampleTranslation: "Besok saya pergi ke sekolah.",
      },
      {
        hanzi: "来",
        pinyin: "lái",
        tone: "Nada 2",
        translation: "datang / kemari",
        partOfSpeech: "verba",
        usageNotes:
          "Menandakan pergerakan mendekati pembicara: 他来了 (dia sudah datang).",
        exampleHanzi: "请来我家。",
        examplePinyin: "Qǐng lái wǒ jiā.",
        exampleTranslation: "Silakan datang ke rumah saya.",
      },
      {
        hanzi: "回",
        pinyin: "huí",
        tone: "Nada 2",
        translation: "kembali / pulang",
        partOfSpeech: "verba",
        usageNotes:
          "Sering dipadukan dengan kata tempat asal: 回家 (pulang ke rumah), 回国 (pulang ke tanah air).",
        exampleHanzi: "下午五点我回家。",
        examplePinyin: "Xiàwǔ wǔ diǎn wǒ huí jiā.",
        exampleTranslation: "Pukul 5 sore saya pulang ke rumah.",
      },
      {
        hanzi: "看",
        pinyin: "kàn",
        tone: "Nada 4",
        translation: "melihat / membaca / menonton",
        partOfSpeech: "verba",
        usageNotes:
          "Verba visual serbaguna: 看书 (membaca buku), 看电影 (menonton film), 看朋友 (menjenguk teman).",
        exampleHanzi: "我看书。",
        examplePinyin: "Wǒ kàn shū.",
        exampleTranslation: "Saya membaca buku.",
      },
      {
        hanzi: "工作",
        pinyin: "gōngzuò",
        tone: "Nada 1 + Nada 4",
        translation: "bekerja / pekerjaan",
        partOfSpeech: "verba / nomina",
        usageNotes:
          "Bisa berfungsi sebagai kata kerja (saya bekerja) maupun kata benda (pekerjaan saya).",
        exampleHanzi: "我爸爸在工作。",
        examplePinyin: "Wǒ bàba zài gōngzuò.",
        exampleTranslation: "Ayah saya sedang bekerja.",
      },
      {
        hanzi: "学习",
        pinyin: "xuéxí",
        tone: "Nada 2 + Nada 2",
        translation: "belajar / menuntut ilmu",
        partOfSpeech: "verba",
        usageNotes:
          "Bisa disingkat menjadi 学 (xué): 学习汉语 / 学汉语.",
        exampleHanzi: "我们都学习汉语。",
        examplePinyin: "Wǒmen dōu xuéxí Hànyǔ.",
        exampleTranslation: "Kami semua belajar bahasa Mandarin.",
      },
      {
        hanzi: "想",
        pinyin: "xiǎng",
        tone: "Nada 3",
        translation: "ingin / berniat / rindu / berpikir",
        partOfSpeech: "verba modal",
        usageNotes:
          "Menyatakan niat atau keinginan lembut dalam hati: 我想去 (saya ingin pergi).",
        exampleHanzi: "我想喝茶。",
        examplePinyin: "Wǒ xiǎng hē chá.",
        exampleTranslation: "Saya ingin minum teh.",
      },
      {
        hanzi: "要",
        pinyin: "yào",
        tone: "Nada 4",
        translation: "mau / hendak / akan / harus",
        partOfSpeech: "verba modal",
        usageNotes:
          "Menyatakan rencana kuat yang pasti akan dijalankan atau keharusan: 我要去学校 (saya harus/akan pergi ke sekolah).",
        exampleHanzi: "明天我要考试。",
        examplePinyin: "Míngtiān wǒ yào kǎoshì.",
        exampleTranslation: "Besok saya mau ujian.",
      },
      {
        hanzi: "不",
        pinyin: "bù",
        tone: "Nada 4",
        translation: "tidak / bukan",
        partOfSpeech: "adverbia negasi",
        usageNotes:
          "Menyangkal aksi masa kini, kebiasaan rutin, atau kemauan masa depan: 我不去 (saya tidak mau pergi).",
        exampleHanzi: "我不喝咖啡。",
        examplePinyin: "Wǒ bù hē kāfēi.",
        exampleTranslation: "Saya tidak minum kopi.",
      },
      {
        hanzi: "呢",
        pinyin: "ne",
        tone: "Nada netral",
        translation: "bagaimana dengan...?",
        partOfSpeech: "partikel interogativa",
        usageNotes:
          "Diletakkan di belakang kata benda/pronomina untuk membalik pertanyaan singkat: 你呢？(Bagaimana denganmu?).",
        exampleHanzi: "我是学生，你呢？",
        examplePinyin: "Wǒ shì xuésheng, nǐ ne?",
        exampleTranslation: "Saya adalah pelajar, bagaimana denganmu?",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "也",
        pinyin: "yě",
        tone: "Nada 3",
        translation: "juga / pula",
        isEnrichment: true,
        inclusionReason:
          "Adverbia penting untuk menyatakan kesamaan tindakan (Subjek + 也 + Predikat).",
        exampleHanzi: "我也去学校。",
        examplePinyin: "Wǒ yě qù xuéxiào.",
        exampleTranslation: "Saya juga pergi ke sekolah.",
      },
      {
        hanzi: "都",
        pinyin: "dōu",
        tone: "Nada 1",
        translation: "semua / seluruhnya / keduanya",
        isEnrichment: true,
        inclusionReason:
          "Adverbia cakupan jamak esensial (Subjek Jamak + 都 + Predikat).",
        exampleHanzi: "他们都是中国人。",
        examplePinyin: "Tāmen dōu shì Zhōngguó rén.",
        exampleTranslation: "Mereka semua adalah orang Tiongkok.",
      },
      {
        hanzi: "早饭",
        pinyin: "zǎofàn",
        tone: "Nada 3 + Nada 4",
        translation: "sarapan pagi",
        isEnrichment: true,
        inclusionReason:
          "Kosakata menu makanan harian penting melengkapi rutinitas.",
        exampleHanzi: "早上七点吃早饭。",
        examplePinyin: "Zǎoshang qī diǎn chī zǎofàn.",
        exampleTranslation: "Jam 7 pagi sarapan pagi.",
      },
      {
        hanzi: "每天",
        pinyin: "měitiān",
        tone: "Nada 3 + Nada 1",
        translation: "setiap hari",
        isEnrichment: true,
        inclusionReason:
          "Penanda frekuensi rutinitas paling mendasar dalam percakapan.",
        exampleHanzi: "他每天都看书。",
        examplePinyin: "Tā měitiān dōu kàn shū.",
        exampleTranslation: "Dia setiap hari membaca buku.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Perhatikan hembusan udara pada huruf 'q' (qǐchuáng) dan 'ch' (chī), sedangkan 'x' (xuéxí) dilafalkan dengan desisan halus tanpa semburan udara.",
      tones:
        "Sandhi nada pada kata '不' (bù): otomatis berubah menjadi nada ke-2 'bú' jika diikuti kata kerja bernada ke-4 seperti pada 'bú qù' (不去) dan 'bú kàn' (不看).",
      toneCombinations:
        "Kombinasi nada ke-4 + nada ke-4 yang tegas dan mantap pada 'shuìjiào' (睡觉) dan 'gōngzuò' (工作); serta nada netral santai pada partikel 'ne' (呢).",
      commonErrors:
        "Melafalkan 'qǐchuáng' dengan inisial 'k' atau 'c' bahasa Indonesia; atau meletakkan kata negasi '不' sesudah kata kerja.",
      articulatoryTip:
        "Untuk membunyikan 'q' (seperti pada qù dan qǐchuáng), letakkan lidah pada posisi membunyikan 'ci', lalu hembuskan semburan udara kuat melalui sela lidah dan langit-langit keras.",
    },

    hanziComponents: [
      {
        hanzi: "吃",
        structure: "Kiri-Kanan (左右结构)",
        components: "口 (radikal mulut di kiri) + 乞 (meminta / komponen fonetik di kanan)",
        strokeCount: 6,
        strokeOrderRules: [
          "Kiri sebelum kanan (从左到右)",
          "Tulis radikal mulut 口 di sebelah kiri terlebih dahulu",
          "Tulis garis miring (丿) → garis mendatar (一) → garis lengkung kait (乙) di kanan",
        ],
        notes:
          "Radikal mulut '口' menandakan aktivitas memasukkan makanan ke dalam rongga mulut untuk bersantap.",
      },
      {
        hanzi: "去",
        structure: "Atas-Bawah (上下结构)",
        components: "土 (tanah / tempat berpijak di atas) + 厶 (gerak melangkah pergi di bawah)",
        strokeCount: 5,
        strokeOrderRules: [
          "Atas sebelum bawah (从上到下)",
          "Garis mendatar (一) → garis tegak (丨) → garis mendatar penutup tanah (一)",
          "Garis sudut miring patah (ㄥ) → titik penutup (丶)",
        ],
        notes:
          "Melambangkan tindakan seseorang yang meninggalkan tanah pijakannya saat ini untuk melangkah menuju tempat lain.",
      },
      {
        hanzi: "看",
        structure: "Atas-Bawah (上下结构)",
        components: "手 (tangan menaungi di bagian atas) + 目 (mata di bagian bawah)",
        strokeCount: 9,
        strokeOrderRules: [
          "Atas sebelum bawah (从上到下)",
          "Tulis bentuk modifikasi tangan 手 di atas",
          "Tulis kotak mata 目 di bawahnya secara tegak lurus",
        ],
        notes:
          "Piktograf ideografis yang sangat indah: menggambarkan seseorang yang meletakkan telapak tangan di atas alis matanya untuk melihat ke kejauhan di bawah terik sinar matahari.",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Kaidah Baku Urutan Kalimat Rutinitas: Subjek + Waktu + Verba + Objek",
        formula:
          "[Subjek] + [Keterangan Waktu] + [Kata Kerja] + [Objek]",
        explanation:
          "Bahasa Mandarin menganut urutan waktu tindakan yang tegas: pelaku disebutkan terlebih dahulu, kapan tindakan dilakukan, baru kemudian tindakan dan sasaran aksinya. Keterangan waktu TIDAK PERNAH diletakkan di akhir kalimat.",
        example:
          "我早上七点吃早饭。(Wǒ zǎoshang qī diǎn chī zǎofàn: Saya sarapan pukul 7 pagi.) — BUKAN '我吃早饭早上七点'.",
        positiveExamples: [
          {
            hanzi: "他下午三点去图书馆。",
            pinyin: "Tā xiàwǔ sān diǎn qù túshūguǎn.",
            translation: "Dia pergi ke perpustakaan pukul 3 sore.",
          },
          {
            hanzi: "我们晚上十点睡觉。",
            pinyin: "Wǒmen wǎnshang shí diǎn shuìjiào.",
            translation: "Kami tidur pada pukul 10 malam.",
          },
        ],
        usageConstraints:
          "Jangan meletakkan keterangan waktu di belakang objek seperti pola bahasa Indonesia/Inggris.",
        commonErrors:
          "Menyusun kalimat: 'Wǒ qǐchuáng qī diǎn' (salah, harus 'Wǒ qī diǎn qǐchuáng').",
        communicativeFunction:
          "Menjelaskan alur kronologis kegiatan harian secara logis dan runtut.",
      },
      {
        ruleTitle: "Kata Negasi Kebiasaan & Sikap: 不 (Bù)",
        formula: "[Subjek] + 不 (bù / bú) + [Kata Kerja / Kata Sifat]",
        explanation:
          "Gunakan kata negasi 不 (bù) untuk menyatakan: 1) Penolakan atau ketidaksediaan melakukan sesuatu; 2) Kebiasaan rutin yang tidak dilakukan (saya tidak merokok / tidak minum kopi); 3) Fakta masa kini atau rencana masa depan. Letakkan '不' tepat sebelum kata kerja.",
        example: "我不喝咖啡。(Wǒ bù hē kāfēi: Saya tidak minum kopi.)",
        positiveExamples: [
          {
            hanzi: "今天下午我不去学校。",
            pinyin: "Jīntiān xiàwǔ wǒ bú qù xuéxiào.",
            translation: "Siang ini saya tidak pergi ke sekolah.",
          },
          {
            hanzi: "他不喜欢看电视。",
            pinyin: "Tā bù xǐhuan kàn diànshì.",
            translation: "Dia tidak suka menonton televisi.",
          },
        ],
        usageConstraints:
          "Jangan gunakan '不' untuk menegasikan kata kerja '有' (wajib menggunakan '没有').",
        commonErrors:
          "Menaruh kata 'bù' sesudah kata kerja: 'wǒ hē bù chá' (salah struktur).",
        communicativeFunction:
          "Menolak ajakan, menyatakan batasan pribadi, dan kebiasaan sehari-hari.",
      },
      {
        ruleTitle: "Pertanyaan Lanjutan & Pembalik Topik: '…… 呢？' (Ne)",
        formula: "[Subjek / Topik Baru] + 呢 (ne) ？",
        explanation:
          "Partikel 呢 (ne) digunakan untuk menanyakan pertanyaan yang sama kembali kepada lawan bicara tanpa perlu mengulang seluruh kalimat pertanyaan sebelumnya. Ini setara dengan 'Bagaimana dengan...?' dalam bahasa Indonesia.",
        example: "我七点起床，你呢？(Saya bangun jam 7, bagaimana denganmu?)",
        positiveExamples: [
          {
            hanzi: "我是中国人，你呢？",
            pinyin: "Wǒ shì Zhōngguó rén, nǐ ne?",
            translation: "Saya orang Tiongkok, bagaimana denganmu?",
          },
          {
            hanzi: "我想喝茶，他呢？",
            pinyin: "Wǒ xiǎng hē chá, tā ne?",
            translation: "Saya ingin minum teh, bagaimana dengan dia?",
          },
        ],
        usageConstraints:
          "Partikel '呢' hanya digunakan jika konteks pertanyaan sebelumnya sudah jelas dan dipahami kedua pihak.",
        commonErrors:
          "Menggunakan 'ma' alih-alih 'ne' untuk membalik pertanyaan ringkas ('nǐ ma?' adalah salah).",
        communicativeFunction:
          "Menjaga interaksi percakapan dua arah agar tetap dinamis dan santun.",
      },
      {
        ruleTitle: "Posisi Adverbia Cakupan: 也 (Yě / Juga) dan 都 (Dōu / Semua)",
        formula: "[Subjek] + 也 (yě) / 都 (dōu) + [Kata Kerja / Predikat]",
        explanation:
          "Adverbia 也 (juga) dan 都 (semua) WAJIB diletakkan SEBELUM kata kerja atau kata sifat, tepat sesudah subjek. Jika keduanya muncul bersamaan dalam satu kalimat, urutan bakunya selalu 也 + 都 (juga semuanya).",
        example: "我们也去学校。(Kami juga pergi ke sekolah.) | 我们都去。(Kami semua pergi.)",
        positiveExamples: [
          {
            hanzi: "他们都是学生。",
            pinyin: "Tāmen dōu shì xuésheng.",
            translation: "Mereka semua adalah pelajar.",
          },
          {
            hanzi: "明天下午我也想去图书馆。",
            pinyin: "Míngtiān xiàwǔ wǒ yě xiǎng qù túshūguǎn.",
            translation: "Besok sore saya juga ingin pergi ke perpustakaan.",
          },
        ],
        usageConstraints:
          "Jangan meletakkan 'yě' atau 'dōu' di awal kalimat sebelum subjek seperti kata 'juga' dalam bahasa Indonesia.",
        commonErrors:
          "Mengatakan 'Yě wǒ qù' (salah struktur, wajib 'Wǒ yě qù').",
        communicativeFunction:
          "Menyatakan keselarasan tindakan kelompok dan merangkum kesamaan fakta.",
      },
    ],

    culturalNotes:
      "Etika Ritme Kerja & Budaya Istirahat Siang (午休 - Wǔxiū) di Tiongkok: Di lingkungan sekolah dan kantor di Tiongkok, ritme harian sangat teratur. Antara pukul 12.00 hingga 14.00 adalah waktu istirahat siang resmi (午休 - wǔxiū). Setelah makan siang, para siswa dan pekerja biasanya tidur siang singkat (午睡 - wǔshuì) selama 30–45 menit untuk memulihkan energi sebelum melanjutkan aktivitas sore hari hingga malam.",

    listeningActivity: {
      goal: "Mendengarkan jadwal rutinitas harian penutur dan mengidentifikasi jam bangun, makan, serta waktu tidur.",
      audioText: "我每天早上六点半起床，七点吃早饭，下午去图书馆看书，晚上十点睡觉。",
      pinyin: "Wǒ měitiān zǎoshang liù diǎn bàn qǐchuáng, qī diǎn chī zǎofàn, xiàwǔ qù túshūguǎn kàn shū, wǎnshang shí diǎn shuìjiào.",
      translation: "Saya setiap hari bangun jam 6.30 pagi, jam 7 sarapan, sore hari pergi ke perpustakaan membaca buku, malam hari tidur jam 10.",
      gistQuestion: {
        question:
          "Jam berapakah pembicara bangun tidur dan jam berapakah ia tidur di malam hari?",
        options: [
          "Bangun jam 06.30 pagi dan tidur jam 22.00 malam (六点半起床，十点睡觉)",
          "Bangun jam 07.00 pagi dan tidur jam 23.00 malam (七点起床，十一点睡觉)",
          "Bangun jam 08.00 pagi dan tidur jam 21.00 malam (八点起床，九点睡觉)",
          "Bangun jam 05.30 pagi dan tidur jam 24.00 malam (五点半起床，十二点睡觉)",
        ],
        correctAnswer: "Bangun jam 06.30 pagi dan tidur jam 22.00 malam (六点半起床，十点睡觉)",
        explanation:
          "Audio menyatakan: 'zǎoshang liù diǎn bàn qǐchuáng' dan 'wǎnshang shí diǎn shuìjiào'.",
      },
      detailQuestion: {
        question:
          "Ke manakah pembicara pergi pada sore hari?",
        options: [
          "Pergi ke perpustakaan membaca buku (去图书馆看书)",
          "Pergi ke rumah sakit mengunjungi teman",
          "Pergi ke restoran makan malam",
          "Pergi ke toko membeli buku baru",
        ],
        correctAnswer: "Pergi ke perpustakaan membaca buku (去图书馆看书)",
        explanation:
          "Pembicara mengatakan: 'xiàwǔ qù túshūguǎn kàn shū'.",
      },
    },

    speakingActivity: {
      prompt:
        "Lakukan rekaman lisan tentang satu hari rutinitas pribadimu dalam 4 kalimat bahasa Mandarin: 1) Sebutkan jam kamu bangun pagi (我每天早上……点起床); 2) Sebutkan jam sarapan atau makan siangmu (我……点吃早饭/午饭); 3) Sebutkan aktivitas utamamu di siang atau sore hari (我下午去……); 4) Sebutkan jam kamu tidur di malam hari (我晚上……点睡觉).",
      vocabularySupport: [
        "起床 (qǐchuáng: bangun tidur)",
        "吃早饭 (chī zǎofàn: sarapan pagi)",
        "去学校 / 工作 (qù xuéxiào / gōngzuò: pergi ke sekolah / kerja)",
        "看书 (kàn shū: membaca buku)",
        "睡觉 (shuìjiào: tidur)",
      ],
      evaluationRubric:
        "Kriteria Penilaian: 1) Penerapan urutan baku [Subjek + Waktu + Predikat]; 2) Nada ke-4 yang tegas pada 'shuìjiào'; 3) Penggunaan kata 'bàn' untuk paruh jam; 4) Kelancaran kalimat tanpa terbata-bata.",
    },

    readingActivity: {
      textHanzi:
        "李明每天都很忙。他早上七点起床，七点半吃早饭。上午八点到十二点他在学校学习汉语。中午十二点他和同学一起吃午饭。下午两点他去图书馆看书，他不喝咖啡，他喜欢喝中国茶。晚上十点半他回家睡觉。",
      textPinyin:
        "Lǐ Míng měitiān dōu hěn máng. Tā zǎoshang qī diǎn qǐchuáng, qī diǎn bàn chī zǎofàn. Shàngwǔ bā diǎn dào shí'èr diǎn tā zài xuéxiào xuéxí Hànyǔ. Zhōngwǔ shí'èr diǎn tā hé tóngxué yìqǐ chī wǔfàn. Xiàwǔ liǎng diǎn tā qù túshūguǎn kàn shū, tā bù hē kāfēi, tā xǐhuan hē Zhōngguó chá. Wǎnshang shí diǎn bàn tā huí jiā shuìjiào.",
      textTranslation:
        "Li Ming setiap hari sangat sibuk. Dia bangun pukul 7 pagi, pukul 7.30 sarapan. Pagi hari pukul 8 hingga 12 dia belajar bahasa Mandarin di sekolah. Pukul 12 siang dia makan siang bersama teman sekelas. Pukul 2 siang dia pergi ke perpustakaan membaca buku, dia tidak minum kopi, dia suka minum teh Tiongkok. Pukul 22.30 malam dia pulang ke rumah untuk tidur.",
      mainIdea:
        "Jadwal rutinitas harian Li Ming dari pagi hingga malam hari di kampus dan rumah.",
      questions: [
        {
          question:
            "Minuman apa yang disukai oleh Li Ming dan minuman apa yang tidak ia minum?",
          options: [
            "Dia tidak minum kopi, melainkan suka minum teh Tiongkok (不喝咖啡，喜欢喝中国茶)",
            "Dia sangat suka minum kopi dan tidak suka minum teh",
            "Dia suka minum susu sapi dan tidak minum air putih",
            "Dia tidak minum teh dan tidak minum air",
          ],
          correctAnswer: "Dia tidak minum kopi, melainkan suka minum teh Tiongkok (不喝咖啡，喜欢喝中国茶)",
          explanation:
            "Teks menyatakan secara gamblang: 'tā bù hē kāfēi, tā xǐhuan hē Zhōngguó chá'.",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tuliskan 3 karakter Hanzi pembentuk aktivitas harian berikut di buku kotak latihan dengan memperhatikan proporsi dan urutan goresan yang benar: '吃' (chī - makan), '去' (qù - pergi), dan '看' (kàn - membaca/melihat).",
      minimumCharacters: 3,
      checklist: [
        "Menulis '吃': 6 goresan; tulis radikal mulut '口' di sebelah kiri terlebih dahulu, baru komponen '乞' di kanan.",
        "Menulis '去': 5 goresan; tulis komponen tanah '土' di atas (一, 丨, 一), baru sudut patah miring (ㄥ) dan titik (丶) di bawah.",
        "Menulis '看': 9 goresan; tulis bentuk tangan '手' menaungi di atas terlebih dahulu, kemudian kotak mata '目' di bawahnya.",
      ],
      modelAnswer: {
        hanzi: "我去图书馆看书吃饭",
        pinyin: "wǒ qù túshūguǎn kàn shū chī fàn",
        translation: "saya pergi ke perpustakaan membaca buku dan makan",
      },
    },

    personalizationPrompt:
      "Tuliskan satu kalimat jadwal rutinitas harian yang paling kamu nikmati di Buku Frasa pribadi: '我每天下午……点去……，我很喜欢。'",
    errorJournalHooks: [
      "Meletakkan keterangan waktu di akhir kalimat sesudah kata kerja (misal: 'Wǒ qǐchuáng qī diǎn')",
      "Menaruh kata negasi 'bù' sesudah kata kerja (misal: 'wǒ chī bù')",
      "Meletakkan kata 'yě' atau 'dōu' di awal kalimat sebelum subjek (misal: 'Yě wǒ qù')",
      "Menggunakan partikel tanya 'ma' alih-alih 'ne' untuk membalik pertanyaan ringkas resiprokal",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna mampu menyusun kalimat rutinitas harian dalam urutan [Subjek + Waktu + Predikat + Objek], menggunakan kata negasi '不' dengan tepat, membalik pertanyaan dengan '……呢？', serta menempatkan adverbia '也' dan '都' sebelum kata kerja dengan akurasi minimal 80%.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Pelajari kembali tabel urutan kata kerja dan latihan Time-Before-Verb pada menu Latihan Soal Unit 06.",
    },
  },
  // -------------------------------------------------------------
  // HSK 1 Unit 07: Makanan & Minuman (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "hsk1-07",
    moduleId: "hsk1",
    slug: "07",
    unitNumber: 7,
    title: "Makanan & Minuman",
    hanzi: "餐饮美食",
    pinyin: "Cānyǐn Měishí",
    translation: "Memesan Menu, Cita Rasa, Porsi & Preferensi Kuliner",
    objectives:
      "Menguasai kosakata kuliner dasar Mandarin: memesan makanan dan minuman di restoran atau kantin, menyatakan preferensi rasa (好吃, 好喝, 喜欢), menggunakan kata kerja modal '想吃 / 想喝' dan permohonan santun '请给我……', menerapkan kata bantu bilangan wadah makanan (杯, 碗, 瓶, 个), serta menyusun kalimat tanya pilihan '要不要……'.",
    overview:
      "Unit ketujuh tingkat HSK 1 ini membuka pintu ke dunia kuliner Tionghoa yang kaya. Kamu akan belajar menjadi pemesan yang percaya diri di restoran: menyebutkan menu pokok seperti nasi, mie, teh, dan air mineral, memesan porsi yang tepat dengan kata bantu bilangan khusus, serta mengungkapkan rasa puas dan apresiasi kepada pelayan.",
    vocabCount: 14,
    durationMinutes: 15,
    levelBadge: "HSK 1 · UNIT 07",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["hsk1-06"],
    skills: [
      "Memesan Makanan & Minuman di Restoran",
      "Menyatakan Preferensi dengan 喜欢 & 想",
      "Permohonan Santun dengan 请给我",
      "Penggunaan Measure Words: 杯, 碗, 瓶, 个",
      "Pertanyaan Pilihan A-not-A: 要不要",
    ],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "Pelayan Restoran (Fúwùyuán) & David (Pelanggan)",
      location: "Restoran Masakan Tiongkok di Dekat Kampus",
      goal: "Memesan makanan pokok, lauk sayur, minuman teh panas, dan menanyakan total porsi yang disajikan.",
      scenarioNotes:
        "David mengajak temannya makan siang di restoran dekat kampus. Pelayan menyambut dengan ramah, memberikan buku menu, mencatat pesanan nasi, mie, sayuran, dan teh Tiongkok.",
    },

    dialogue: [
      {
        speaker: "Pelayan",
        role: "Pelayan",
        hanzi: "你好！请进，两位想吃什么？这是菜单。",
        pinyin: "Nǐ hǎo! Qǐng jìn, liǎng wèi xiǎng chī shénme? Zhè shì càidān.",
        translation: "Halo! Silakan masuk, berdua ingin makan apa? Ini buku menunya.",
      },
      {
        speaker: "David",
        role: "Pelanggan",
        hanzi: "服务员，我们点菜。我们要一碗米饭和一碗牛肉面。",
        pinyin: "Fúwùyuán, wǒmen diǎn cài. Wǒmen yào yì wǎn mǐfàn hé yì wǎn niúròumiàn.",
        translation: "Pelayan, kami pesan makanan. Kami mau satu mangkuk nasi dan satu mangkuk mie sapi.",
      },
      {
        speaker: "Pelayan",
        role: "Pelayan",
        hanzi: "好的。你们要不要中国菜？这里的菜很好吃。",
        pinyin: "Hǎo de. Nǐmen yào bu yào Zhōngguó cài? Zhèlǐ de cài hěn hǎochī.",
        translation: "Baiklah. Kalian mau atau tidak hidangan khas Tiongkok? Sayuran di sini sangat enak.",
      },
      {
        speaker: "David",
        role: "Pelanggan",
        hanzi: "要一个炒青菜。请问你们有什么饮料？",
        pinyin: "Yào yí gè chǎo qīngcài. Qǐngwèn nǐmen yǒu shénme yǐnliào?",
        translation: "Mau satu porsi tumis sayur hijau. Boleh tanya kalian punya minuman apa?",
      },
      {
        speaker: "Pelayan",
        role: "Pelayan",
        hanzi: "我们有中国茶、咖啡和矿泉水。",
        pinyin: "Wǒmen yǒu Zhōngguó chá, kāfēi hé kuàngquánshuǐ.",
        translation: "Kami punya teh Tiongkok, kopi, dan air mineral.",
      },
      {
        speaker: "David",
        role: "Pelanggan",
        hanzi: "请给我们两杯热茶，一瓶水。谢谢！",
        pinyin: "Qǐng gěi wǒmen liǎng bēi rè chá, yì píng shuǐ. Xièxie!",
        translation: "Tolong berikan kami dua cangkir teh panas dan satu botol air mineral. Terima kasih!",
      },
    ],

    vocabulary: [
      {
        hanzi: "米饭",
        pinyin: "mǐfàn",
        tone: "Nada 3 + Nada 4",
        translation: "nasi putih",
        partOfSpeech: "nomina",
        usageNotes:
          "Makanan pokok paling mendasar. Sering dihitung dengan kata bantu 碗 (mangkuk): 一碗米饭.",
        exampleHanzi: "我想吃米饭。",
        examplePinyin: "Wǒ xiǎng chī mǐfàn.",
        exampleTranslation: "Saya ingin makan nasi.",
      },
      {
        hanzi: "面条",
        pinyin: "miàntiáo",
        tone: "Nada 4 + Nada 2",
        translation: "mie",
        partOfSpeech: "nomina",
        usageNotes:
          "Makanan pokok kedua paling populer di Tiongkok: 牛肉面 (mie sapi), 鸡蛋面 (mie telur).",
        exampleHanzi: "中国面条很好吃。",
        examplePinyin: "Zhōngguó miàntiáo hěn hǎochī.",
        exampleTranslation: "Mie Tiongkok sangat enak dimakan.",
      },
      {
        hanzi: "菜",
        pinyin: "cài",
        tone: "Nada 4",
        translation: "hidangan lauk / masakan / sayuran",
        partOfSpeech: "nomina",
        usageNotes:
          "Bisa bermakna sayuran mentah maupun hidangan masakan siap saji: 中国菜 (masakan Tiongkok).",
        exampleHanzi: "这个菜不太辣。",
        examplePinyin: "Zhè gè cài bú tài là.",
        exampleTranslation: "Hidangan ini tidak terlalu pedas.",
      },
      {
        hanzi: "水",
        pinyin: "shuǐ",
        tone: "Nada 3",
        translation: "air",
        partOfSpeech: "nomina",
        usageNotes:
          "Air minum secara umum: 喝水 (minum air), 热水 (air panas), 开水 (air matang).",
        exampleHanzi: "请喝水。",
        examplePinyin: "Qǐng hē shuǐ.",
        exampleTranslation: "Silakan minum air.",
      },
      {
        hanzi: "茶",
        pinyin: "chá",
        tone: "Nada 2",
        translation: "teh",
        partOfSpeech: "nomina",
        usageNotes:
          "Minuman nasional Tiongkok: 绿茶 (teh hijau), 红茶 (teh hitam), 喝茶 (minum teh).",
        exampleHanzi: "中国茶很好喝。",
        examplePinyin: "Zhōngguó chá hěn hǎohē.",
        exampleTranslation: "Teh Tiongkok enak sekali diminum.",
      },
      {
        hanzi: "咖啡",
        pinyin: "kāfēi",
        tone: "Nada 1 + Nada 1",
        translation: "kopi",
        partOfSpeech: "nomina",
        usageNotes:
          "Kata serapan fonetik dari bahasa Barat (coffee).",
        exampleHanzi: "一杯热咖啡。",
        examplePinyin: "Yì bēi rè kāfēi.",
        exampleTranslation: "Secangkir kopi panas.",
      },
      {
        hanzi: "牛奶",
        pinyin: "niúnǎi",
        tone: "Nada 2 + Nada 3",
        translation: "susu sapi",
        partOfSpeech: "nomina",
        usageNotes:
          "Gabungan dari kata 牛 (sapi) + 奶 (susu).",
        exampleHanzi: "早饭我喝牛奶。",
        examplePinyin: "Zǎofàn wǒ hē niúnǎi.",
        exampleTranslation: "Saat sarapan saya minum susu sapi.",
      },
      {
        hanzi: "好吃",
        pinyin: "hǎochī",
        tone: "Nada 3 + Nada 1",
        translation: "enak (untuk makanan)",
        partOfSpeech: "adjektiva",
        usageNotes:
          "HANYA digunakan untuk sesuatu yang dimakan. Jangan gunakan untuk minuman.",
        exampleHanzi: "米饭很好吃。",
        examplePinyin: "Mǐfàn hěn hǎochī.",
        exampleTranslation: "Nasinya enak sekali.",
      },
      {
        hanzi: "好喝",
        pinyin: "hǎohē",
        tone: "Nada 3 + Nada 1",
        translation: "enak (untuk minuman / kuah)",
        partOfSpeech: "adjektiva",
        usageNotes:
          "HANYA digunakan untuk minuman cair, sup, atau kuah seduh.",
        exampleHanzi: "这个茶真好喝。",
        examplePinyin: "Zhè gè chá zhēn hǎohē.",
        exampleTranslation: "Teh ini sungguh nikmat diminum.",
      },
      {
        hanzi: "喜欢",
        pinyin: "xǐhuan",
        tone: "Nada 3 + netral",
        translation: "suka / gemar",
        partOfSpeech: "verba",
        usageNotes:
          "Menyatakan kegemaran terhadap makanan, hobi, atau seseorang. Suku kata kedua bernada netral.",
        exampleHanzi: "我喜欢吃中国菜。",
        examplePinyin: "Wǒ xǐhuan chī Zhōngguó cài.",
        exampleTranslation: "Saya suka makan masakan Tiongkok.",
      },
      {
        hanzi: "点菜",
        pinyin: "diǎncài",
        tone: "Nada 3 + Nada 4",
        translation: "memesan menu masakan",
        partOfSpeech: "verba berobjek",
        usageNotes:
          "Diucapkan kepada pelayan restoran: 服务员，点菜！(Pelayan, mau pesan menu!).",
        exampleHanzi: "我们现在点菜吧。",
        examplePinyin: "Wǒmen xiànzài diǎncài ba.",
        exampleTranslation: "Mari kita pesan menu sekarang.",
      },
      {
        hanzi: "杯",
        pinyin: "bēi",
        tone: "Nada 1",
        translation: "cangkir / gelas (kata bantu bilangan)",
        partOfSpeech: "measure word",
        usageNotes:
          "Pengukur untuk minuman per gelas/cangkir: 一杯茶 (secangkir teh), 两杯咖啡 (dua cangkir kopi).",
        exampleHanzi: "请给我一杯水。",
        examplePinyin: "Qǐng gěi wǒ yì bēi shuǐ.",
        exampleTranslation: "Tolong berikan saya segelas air.",
      },
      {
        hanzi: "碗",
        pinyin: "wǎn",
        tone: "Nada 3",
        translation: "mangkuk (kata bantu bilangan)",
        partOfSpeech: "measure word",
        usageNotes:
          "Pengukur untuk nasi, mie, dan sup: 一碗米饭 (semangkuk nasi), 两碗面条 (dua mangkuk mie).",
        exampleHanzi: "我要一碗牛肉面。",
        examplePinyin: "Wǒ yào yì wǎn niúròumiàn.",
        exampleTranslation: "Saya mau semangkuk mie sapi.",
      },
      {
        hanzi: "瓶",
        pinyin: "píng",
        tone: "Nada 2",
        translation: "botol (kata bantu bilangan)",
        partOfSpeech: "measure word",
        usageNotes:
          "Pengukur untuk kemasan botol: 一瓶水 (sebotol air), 两瓶可乐 (dua botol cola).",
        exampleHanzi: "买两瓶水。",
        examplePinyin: "Mǎi liǎng píng shuǐ.",
        exampleTranslation: "Membeli dua botol air mineral.",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "请给我",
        pinyin: "qǐng gěi wǒ",
        tone: "Nada 3 + Nada 3 + Nada 3",
        translation: "tolong berikan saya / mohon berikan saya",
        isEnrichment: true,
        inclusionReason:
          "Frasa santun paling aplikatif saat memesan sesuatu di gerai kuliner.",
        exampleHanzi: "请给我菜单。",
        examplePinyin: "Qǐng gěi wǒ càidān.",
        exampleTranslation: "Tolong berikan saya buku menu.",
      },
      {
        hanzi: "服务员",
        pinyin: "fúwùyuán",
        tone: "Nada 2 + Nada 4 + Nada 2",
        translation: "pelayan / pramusaji restoran",
        isEnrichment: true,
        inclusionReason:
          "Panggilan sopan standar untuk memanggil staf pelayanan restoran di Tiongkok.",
        exampleHanzi: "服务员，买单！",
        examplePinyin: "Fúwùyuán, mǎidān!",
        exampleTranslation: "Pelayan, minta bon pembayaran!",
      },
      {
        hanzi: "苹果",
        pinyin: "píngguǒ",
        tone: "Nada 2 + Nada 3",
        translation: "apel (buah apel)",
        isEnrichment: true,
        inclusionReason:
          "Buah standar yang sering menjadi contoh kuantitas dalam latihan HSK 1.",
        exampleHanzi: "我想吃一个苹果。",
        examplePinyin: "Wǒ xiǎng chī yí gè píngguǒ.",
        exampleTranslation: "Saya ingin makan sebuah apel.",
      },
      {
        hanzi: "热",
        pinyin: "rè",
        tone: "Nada 4",
        translation: "panas / hangat",
        isEnrichment: true,
        inclusionReason:
          "Adjektiva suhu kuliner mendasar: 热茶 (teh panas), 热水 (air panas).",
        exampleHanzi: "请给我一杯热茶。",
        examplePinyin: "Qǐng gěi wǒ yì bēi rè chá.",
        exampleTranslation: "Tolong berikan saya secangkir teh panas.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Perhatikan hembusan udara pada 'c' (cài) dan 'ch' (chī), sedangkan 'sh' (shuǐ) dilafalkan dengan suara desis lidah terangkat.",
      tones:
        "Rangkaian tiga nada ke-3 berurutan pada 'qǐng gěi wǒ' (请给我): dilafalkan mengalir sebagai 'qíng géi wǒ' (nada 2 + nada 2 + nada 3).",
      toneCombinations:
        "Pembedaan kata sifat sensoris: 'hǎochī' (3+1) untuk rasa lezat makanan padat vs 'hǎohē' (3+1) untuk rasa lezat minuman cair.",
      commonErrors:
        "Mengatakan 'hǎochī' untuk kopi atau teh (salah, wajib 'hǎohē'); atau lupa menyertakan kata bantu bilangan wadah (misal: keliru berkata 'yào yī chá').",
      articulatoryTip:
        "Saat mengucapkan 'cài' (sayur), tempelkan ujung lidah ke gigi seri atas lalu lepaskan dengan letupan udara desis yang tajam dan nada ke-4 menukik.",
    },

    hanziComponents: [
      {
        hanzi: "水",
        structure: "Tunggal / Simetris (独体字)",
        components: "Garis tengah lekuk kait (亅) + goresan lipatan kiri dan sepasang goresan air kanan",
        strokeCount: 4,
        strokeOrderRules: [
          "Tengah sebelum kedua sisi (先中间后两边)",
          "Garis tegak kait tengah (亅) terlebih dahulu",
          "Goresan lipat kiri (㇇) → goresan miring kanan (丿) dan garis tebal (捺)",
        ],
        notes:
          "Piktograf kuno yang melukiskan riak arus air sungai yang mengalir deras di tengah dua tebing.",
      },
      {
        hanzi: "茶",
        structure: "Atas-Tengah-Bawah (上中下结构)",
        components: "艹 (radikal rumput / pucuk daun teh di atas) + 人 (manusia di tengah) + 木 (batang pohon di bawah)",
        strokeCount: 9,
        strokeOrderRules: [
          "Atas ke bawah (从上到下)",
          "Tulis radikal daun teh 艹 di atas",
          "Tulis komponen manusia 人 di tengah",
          "Tulis komponen pohon 木 di bagian dasar",
        ],
        notes:
          "Makna filosofis teh dalam budaya Tionghoa: manusia (人) yang hidup berdampingan harmonis di antara pucuk daun herbal (艹) dan pepohonan alam (木).",
      },
      {
        hanzi: "点",
        structure: "Atas-Bawah (上下结构)",
        components: "占 (komponen menempati / memilih di atas) + 灬 (empat titik radikal api di bawah)",
        strokeCount: 9,
        strokeOrderRules: [
          "Atas sebelum bawah (从上到下)",
          "Selesaikan komponen 占 di atas: garis tegak (丨) → garis mendatar (一) → kotak (口)",
          "Tulis empat titik radikal api 灬 dari kiri ke kanan di bagian bawah",
        ],
        notes:
          "Awalnya melambangkan tetesan api kecil penanda fokus; kini berkembang menjadi memilih/menunjuk item (memesan menu - 点菜).",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Pola Memesan Menu Santun: 请给我 + [Jumlah + Measure Word + Makanan/Minuman]",
        formula: "请给我 (Qǐng gěi wǒ) + [Angka] + [Measure Word: 碗 / 杯 / 瓶 / 个] + [Nomina]",
        explanation:
          "Untuk memesan makanan secara sopan dan jelas, awali dengan '请给我' (tolong berikan saya), sebutkan angka jumlah porsi beserta wadahnya, lalu nama makanannya. Jangan langsung menyebut nama makanan tanpa kata bantu bilangan.",
        example:
          "请给我两杯茶。(Qǐng gěi wǒ liǎng bēi chá: Tolong berikan kami dua cangkir teh.)",
        positiveExamples: [
          {
            hanzi: "请给我一碗米饭。",
            pinyin: "Qǐng gěi wǒ yì wǎn mǐfàn.",
            translation: "Tolong berikan saya semangkuk nasi.",
          },
          {
            hanzi: "请给我两瓶水。",
            pinyin: "Qǐng gěi wǒ liǎng píng shuǐ.",
            translation: "Tolong berikan saya dua botol air mineral.",
          },
        ],
        usageConstraints:
          "Gunakan '两' (liǎng) bukan '二' (èr) saat memesan dua porsi: 两碗 (liǎng wǎn), bukan 二碗.",
        commonErrors:
          "Menghilangkan measure word: 'Qǐng gěi wǒ èr mǐfàn' (salah ganda, wajib 'liǎng wǎn mǐfàn').",
        communicativeFunction:
          "Melakukan transaksi pemesanan kuliner di restoran, kafe, atau kantin secara beradab.",
      },
      {
        ruleTitle: "Menyatakan Penilaian Cita Rasa: 好吃 (Makanan) vs 好喝 (Minuman)",
        formula: "[Makanan] + 很 / 非常 + 好吃 | [Minuman/Sup] + 很 / 非常 + 好喝",
        explanation:
          "Bahasa Mandarin membedakan secara tegas rasa enak indera pencecap: 1) Gunakan 好吃 (hǎochī) HANYA untuk makanan padat yang dikunyah; 2) Gunakan 好喝 (hǎohē) HANYA untuk minuman cair, kuah sup, atau kaldu yang diteguk. Keduanya diawali kata keterangan derajat seperti 很 (hěn).",
        example:
          "中国菜很好吃，中国茶很好喝。(Masakan Tiongkok sangat enak, teh Tiongkok sangat nikmat.)",
        positiveExamples: [
          {
            hanzi: "这个面条很好吃。",
            pinyin: "Zhè gè miàntiáo hěn hǎochī.",
            translation: "Mie ini sangat enak dimakan.",
          },
          {
            hanzi: "热牛奶很好喝。",
            pinyin: "Rè niúnǎi hěn hǎohē.",
            translation: "Susu panas sangat nikmat diminum.",
          },
        ],
        usageConstraints:
          "PANTANGAN: Jangan pernah mengatakan 'kāfēi hěn hǎochī' (kopi enak dimakan - salah!).",
        commonErrors:
          "Menggunakan 'hǎochī' untuk memuji minuman kopi, jus, atau sup.",
        communicativeFunction:
          "Memberikan apresiasi dan ulasan cita rasa kuliner secara tepat sasaran.",
      },
      {
        ruleTitle: "Kata Bantu Bilangan Wadah Kuliner: 杯, 碗, 瓶, 个",
        formula: "[Angka] + 杯 (gelas) / 碗 (mangkuk) / 瓶 (botol) / 个 (satuan umum) + [Menu]",
        explanation:
          "Setiap jenis makanan memiliki kata bantu bilangan wadah yang khas: 1) 杯 (bēi) untuk cangkir/gelas (kopi, teh); 2) 碗 (wǎn) untuk mangkuk (nasi, mie, sup); 3) 瓶 (píng) untuk botol (air mineral, bir); 4) 个 (gè) untuk satuan umum atau porsi piring hidangan (一个菜, 一个苹果).",
        example: "一碗米饭 (semangkuk nasi), 一杯咖啡 (secangkir kopi), 一瓶水 (sebotol air).",
        positiveExamples: [
          {
            hanzi: "我们要两碗面条。",
            pinyin: "Wǒmen yào liǎng wǎn miàntiáo.",
            translation: "Kami mau dua mangkuk mie.",
          },
          {
            hanzi: "他喝了三杯茶。",
            pinyin: "Tā hē le sān bēi chá.",
            translation: "Dia minum tiga cangkir teh.",
          },
        ],
        usageConstraints:
          "Jangan menukar measure word wadah, misalnya menyebut semangkuk teh (一碗茶 terkesan sangat arkais).",
        commonErrors:
          "Menggunakan kata bantu 'gè' untuk segala makanan cair (misal: 'yí gè chá').",
        communicativeFunction:
          "Menentukan takaran porsi pesanan agar tidak terjadi salah paham kuantitas.",
      },
      {
        ruleTitle: "Pola Kalimat Tanya Pilihan Afirmatif-Negatif (A-not-A): 要不要",
        formula: "[Subjek] + 要不要 (yào bu yào) + [Objek] ？",
        explanation:
          "Pola tanya A-not-A menggabungkan bentuk positif dan negatif dari kata kerja untuk menanyakan pilihan ya atau tidak secara langsung dan alami tanpa perlu menambahkan partikel '吗'. Suku kata kedua 'bu' dilafalkan ringan dengan nada netral.",
        example: "你要不要喝茶？(Kamu mau atau tidak minum teh?) — Setara dengan '你要喝茶吗？'.",
        positiveExamples: [
          {
            hanzi: "你们要不要米饭？",
            pinyin: "Nǐmen yào bu yào mǐfàn?",
            translation: "Apakah kalian mau nasi atau tidak?",
          },
          {
            hanzi: "他想不想去？",
            pinyin: "Tā xiǎng bu xiǎng qù?",
            translation: "Apakah dia ingin pergi atau tidak?",
          },
        ],
        usageConstraints:
          "PANTANGAN: Jangan pernah menambahkan partikel '吗' di ujung kalimat berpola A-not-A (salah: 'Nǐ yào bu yào chá ma?').",
        commonErrors:
          "Menggabungkan pola 'yào bu yào' dengan partikel tanya 'ma' di akhir kalimat.",
        communicativeFunction:
          "Menawarkan pilihan hidangan atau bantuan secara langsung dan akrab.",
      },
    ],

    culturalNotes:
      "Etika Budaya Makan Bersama (合餐制) & Budaya Teh Tionghoa: Masyarakat Tionghoa umumnya bersantap dengan sistem berbagi (合餐制 - hécānzhì), di mana hidangan lauk diletakkan di tengah meja bundar untuk dinikmati bersama, sementara setiap orang memegang mangkuk nasinya sendiri (一碗米饭). Teh hangat selalu disajikan secara cuma-cuma atau sebagai pembuka obrolan. Ketika seseorang menuangkan teh untukmu, ketukkan dua jari tangan kananmu secara halus ke meja sebagai gestur ucapan terima kasih tanpa menyela obrolan (扣指礼 - kòuzhǐlǐ).",

    listeningActivity: {
      goal: "Mendengarkan rekaman pesanan makanan di restoran dan mengidentifikasi menu serta jumlah porsi yang dipesan.",
      audioText: "服务员，我们点菜。我们要两碗牛肉面，一个菜，请给我们两杯热茶。",
      pinyin: "Fúwùyuán, wǒmen diǎn cài. Wǒmen yào liǎng wǎn niúròumiàn, yí gè cài, qǐng gěi wǒmen liǎng bēi rè chá.",
      translation: "Pelayan, kami pesan makanan. Kami mau dua mangkuk mie sapi, satu porsi sayur, tolong berikan kami dua cangkir teh panas.",
      gistQuestion: {
        question:
          "Berapa mangkuk mie sapi dan berapa cangkir teh panas yang dipesan oleh pelanggan?",
        options: [
          "Dua mangkuk mie sapi dan dua cangkir teh panas (两碗牛肉面，两杯热茶)",
          "Satu mangkuk mie sapi dan tiga cangkir kopi",
          "Tiga mangkuk nasi dan dua botol air mineral",
          "Dua porsi nasi goreng dan satu cangkir teh dingin",
        ],
        correctAnswer: "Dua mangkuk mie sapi dan dua cangkir teh panas (两碗牛肉面，两杯热茶)",
        explanation:
          "Audio menyebutkan: 'liǎng wǎn niúròumiàn' (dua mangkuk mie sapi) dan 'liǎng bēi rè chá' (dua cangkir teh panas).",
      },
      detailQuestion: {
        question:
          "Kata bantu bilangan (measure word) apakah yang digunakan pelanggan saat memesan mie sapi?",
        options: [
          "Mangkuk (碗 - wǎn)",
          "Cangkir (杯 - bēi)",
          "Botol (瓶 - píng)",
          "Buah (个 - gè)",
        ],
        correctAnswer: "Mangkuk (碗 - wǎn)",
        explanation:
          "Pelanggan menggunakan kata '碗' (wǎn) untuk porsi mie: 'liǎng wǎn niúròumiàn'.",
      },
    },

    speakingActivity: {
      prompt:
        "Lakukan roleplay rekaman lisan memesan makanan di restoran dalam 4 kalimat: 1) Panggil pelayan dan nyatakan ingin memesan makanan (服务员，我们点菜); 2) Pesan satu makanan pokok beserta takaran mangkuknya (我们要一碗……); 3) Pesan satu minuman panas/dingin dengan takaran cangkir/botol (请给我们一杯/瓶……); 4) Puji cita rasa hidangan tersebut (这里的菜很好吃/很好喝).",
      vocabularySupport: [
        "服务员 (fúwùyuán: pelayan)",
        "点菜 (diǎn cài: memesan makanan)",
        "一碗米饭 / 面条 (yì wǎn mǐfàn / miàntiáo)",
        "一杯茶 / 咖啡 (yì bēi chá / kāfēi)",
        "好吃 / 好喝 (hǎochī / hǎohē)",
      ],
      evaluationRubric:
        "Kriteria Penilaian: 1) Penggunaan measure words 'wǎn' dan 'bēi' yang tepat; 2) Pembedaan pemakaian 'hǎochī' untuk makanan dan 'hǎohē' untuk minuman; 3) Kelancaran intonasi sandhi nada pada 'qǐng gěi wǒ'; 4) Kesantunan tutur kata.",
    },

    readingActivity: {
      textHanzi:
        "中午十二点，大卫和李明去学校饭馆吃饭。大卫喜欢吃米饭和中国菜，他点了一碗米饭和一个牛肉。李明想吃面条，他要了一碗面条。饭馆的服务员很热情。大卫喝中国茶，他说中国茶很好喝。他们一共花了五十块钱。",
      textPinyin:
        "Zhōngwǔ shí'èr diǎn, Dàwèi hé Lǐ Míng qù xuéxiào fànguǎn chī fàn. Dàwèi xǐhuan chī mǐfàn hé Zhōngguó cài, tā diǎn le yì wǎn mǐfàn hé yí gè niúròu. Lǐ Míng xiǎng chī miàntiáo, tā yào le yì wǎn miàntiáo. Fànguǎn de fúwùyuán hěn rèqíng. Dàwèi hē Zhōngguó chá, tā shuō Zhōngguó chá hěn hǎohē. Tāmen yígòng huā le wǔshí kuài qián.",
      textTranslation:
        "Pukul 12 siang, David dan Li Ming pergi makan di restoran sekolah. David suka makan nasi dan masakan Tiongkok, dia memesan semangkuk nasi dan seporsi daging sapi. Li Ming ingin makan mie, dia memesan semangkuk mie. Pelayan restoran sangat ramah. David minum teh Tiongkok, dia berkata teh Tiongkok sangat enak diminum. Mereka total menghabiskan 50 yuan.",
      mainIdea:
        "Pengalaman makan siang bersama antara David dan Li Ming di restoran kampus beserta pilihan menu mereka.",
      questions: [
        {
          question:
            "Makanan apakah yang dipesan oleh David dan Li Ming masing-masing menurut teks bacaan?",
          options: [
            "David memesan nasi dan daging sapi, sedangkan Li Ming memesan mie (大卫吃米饭牛肉，李明吃面条)",
            "David dan Li Ming keduanya memesan mie sapi",
            "David memesan mie dan Li Ming memesan roti",
            "David hanya minum kopi dan Li Ming tidak makan",
          ],
          correctAnswer: "David memesan nasi dan daging sapi, sedangkan Li Ming memesan mie (大卫吃米饭牛肉，李明吃面条)",
          explanation:
            "Teks menyatakan: 'Dàwèi diǎn le yì wǎn mǐfàn hé yí gè niúròu. Lǐ Míng yào le yì wǎn miàntiáo.'",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tuliskan 3 karakter Hanzi bertema kuliner berikut di buku kotak latihan dengan memperhatikan proporsi dan urutan goresan yang benar: '水' (shuǐ - air), '茶' (chá - teh), dan '点' (diǎn - memesan/titik).",
      minimumCharacters: 3,
      checklist: [
        "Menulis '水': 4 goresan; buat garis tegak kait tengah (亅) terlebih dahulu, baru goresan sisi kiri dan sepasang goresan sisi kanan.",
        "Menulis '茶': 9 goresan; tulis radikal pucuk daun '艹' di atas, lalu komponen orang '人' di tengah, dan komponen kayu '木' di bawah.",
        "Menulis '点': 9 goresan; tulis komponen atas '占' terlebih dahulu (丨, 一, 口), baru empat titik api '灬' di bagian dasar dari kiri ke kanan.",
      ],
      modelAnswer: {
        hanzi: "我想喝水喝茶点菜",
        pinyin: "wǒ xiǎng hē shuǐ hē chá diǎn cài",
        translation: "saya ingin minum air, minum teh dan memesan menu",
      },
    },

    personalizationPrompt:
      "Tuliskan makanan dan minuman favoritmu dalam bahasa Mandarin di Buku Frasa pribadi: '我最喜欢吃……，最喜欢喝……。' dan latih pengucapannya.",
    errorJournalHooks: [
      "Menggunakan 'hǎochī' untuk memuji rasa minuman kopi atau teh (wajib 'hǎohē')",
      "Menghilangkan measure word saat memesan menu (misal: 'wǒ yào èr mǐfàn' yang salah)",
      "Menggabungkan pola A-not-A 'yào bu yào' dengan partikel tanya 'ma' di akhir kalimat",
      "Menggunakan kata 'èr' alih-alih 'liǎng' sebelum kata bantu bilangan wadah makanan (两碗 / 两杯)",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna mampu memesan minimal dua jenis makanan dan minuman menggunakan kata bantu bilangan wadah yang tepat (杯, 碗, 瓶), membedakan pemakaian '好吃' dan '好喝', serta menyusun kalimat penawaran pilihan '要不要' tanpa partikel '吗' dengan akurasi minimal 80%.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Pelajari kembali tabel pembedaan kata bantu bilangan kuliner dan latihan roleplay pemesanan menu pada menu Latihan Soal Unit 07.",
    },
  },
  // -------------------------------------------------------------
  // HSK 1 Unit 08: Tempat, Posisi & Arah Dasar (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "hsk1-08",
    moduleId: "hsk1",
    slug: "08",
    unitNumber: 8,
    title: "Tempat, Posisi & Arah Dasar",
    hanzi: "方位与处所",
    pinyin: "Fāngwèi yǔ Chùsuǒ",
    translation: "Lokasi Fasilitas, Arah Spasial & Posisi Benda",
    objectives:
      "Menguasai penunjukan lokasi dan posisi spasial: menyatakan keberadaan orang/benda di suatu tempat dengan kata kerja '在' (zài), menyatakan keberadaan isi ruang dengan '有' (yǒu), menanyakan lokasi fasilitas dengan kata tanya '哪儿 / 哪里' (di mana), menggunakan kata posisi ruang (atas 上, bawah 下, dalam 里, depan 前, belakang 后), serta merangkai struktur lokasi sebelum tindakan [Subjek + 在 (Tempat) + Predikat].",
    overview:
      "Unit kedelapan tingkat HSK 1 ini membekalimu keterampilan navigasi ruang yang krusial. Kamu akan mampu menanyakan lokasi fasilitas umum seperti sekolah, rumah sakit, toko, toilet, dan perpustakaan, menjelaskan posisi barang di atas meja atau di dalam tas, serta menerapkan kaidah fundamental tata bahasa Mandarin: tempat selalu mendahului aksi.",
    vocabCount: 14,
    durationMinutes: 15,
    levelBadge: "HSK 1 · UNIT 08",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["hsk1-07"],
    skills: [
      "Menanyakan Lokasi Fasilitas (哪儿 / 哪里)",
      "Pola Keberadaan Lokasi: Subjek + 在 + Tempat",
      "Kaidah Tempat Sebelum Aksi: 在 + Tempat + Verba",
      "Kata Arah Spasial: 上, 下, 里, 前, 后",
      "Pola Eksistensi: Tempat + 有 + Benda",
    ],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "David (Mahasiswa Baru) & Chen Hua (Mahasiswa Senior)",
      location: "Koridor Gedung Perkuliahan Kampus",
      goal: "Menanyakan lokasi fasilitas kamar kecil/toilet, perpustakaan, dan letak buku pelajaran yang tertinggal di atas meja.",
      scenarioNotes:
        "David baru selesai kelas dan kebingungan mencari letak kamar mandi dan perpustakaan. Chen Hua memandu arah jalannya, lalu David menyadari buku catatannya tertinggal di atas meja ruang kelas.",
    },

    dialogue: [
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "请问，洗手间在哪儿？",
        pinyin: "Qǐngwèn, xǐshǒujiān zài nǎr?",
        translation: "Permisi, toilet berada di mana?",
      },
      {
        speaker: "Chen Hua",
        role: "Mahasiswa",
        hanzi: "洗手间在前面，就在图书馆的后面。",
        pinyin: "Xǐshǒujiān zài qiánmian, jiù zài túshūguǎn de hòumian.",
        translation: "Toilet ada di depan sana, tepat di belakang gedung perpustakaan.",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "好的，谢谢！我的汉语书在哪儿？你看到了吗？",
        pinyin: "Hǎo de, xièxie! Wǒ de Hànyǔ shū zài nǎr? Nǐ kàndào le ma?",
        translation: "Baiklah, terima kasih! Buku bahasa Mandarinku ada di mana? Apakah kamu melihatnya?",
      },
      {
        speaker: "Chen Hua",
        role: "Mahasiswa",
        hanzi: "你的书在教室里的桌子上，椅子下也有一支笔。",
        pinyin: "Nǐ de shū zài jiàoshì lǐ de zhuōzi shang, yǐzi xià yě yǒu yì zhī bǐ.",
        translation: "Bukumu ada di atas meja di dalam kelas, di bawah kursi juga ada sebatang pulpen.",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "太谢谢你了！下午你在哪儿学习？",
        pinyin: "Tài xièxie nǐ le! Xiàwǔ nǐ zài nǎr xuéxí?",
        translation: "Terima kasih banyak! Sore hari kamu belajar di mana?",
      },
      {
        speaker: "Chen Hua",
        role: "Mahasiswa",
        hanzi: "我在图书馆看书。你也可以来这儿。",
        pinyin: "Wǒ zài túshūguǎn kàn shū. Nǐ yě kěyǐ lái zhèr.",
        translation: "Saya membaca buku di perpustakaan. Kamu juga boleh datang ke sini.",
      },
    ],

    vocabulary: [
      {
        hanzi: "学校",
        pinyin: "xuéxiào",
        tone: "Nada 2 + Nada 4",
        translation: "sekolah / kampus",
        partOfSpeech: "nomina lokasi",
        usageNotes:
          "Merujuk pada institusi atau kompleks lembaga pendidikan.",
        exampleHanzi: "我们学校很大。",
        examplePinyin: "Wǒmen xuéxiào hěn dà.",
        exampleTranslation: "Sekolah kami sangat besar.",
      },
      {
        hanzi: "商店",
        pinyin: "shāngdiàn",
        tone: "Nada 1 + Nada 4",
        translation: "toko / warung",
        partOfSpeech: "nomina lokasi",
        usageNotes:
          "Tempat berbelanja barang kebutuhan sehari-hari: 去商店买水.",
        exampleHanzi: "商店在学校里面。",
        examplePinyin: "Shāngdiàn zài xuéxiào lǐmian.",
        exampleTranslation: "Toko berada di dalam lingkungan sekolah.",
      },
      {
        hanzi: "饭馆",
        pinyin: "fànguǎn",
        tone: "Nada 4 + Nada 3",
        translation: "restoran / rumah makan",
        partOfSpeech: "nomina lokasi",
        usageNotes:
          "Tempat makan umum: 中国饭馆 (restoran masakan Tiongkok).",
        exampleHanzi: "饭馆里人很多。",
        examplePinyin: "Fànguǎn lǐ rén hěn duō.",
        exampleTranslation: "Di dalam restoran orangnya banyak sekali.",
      },
      {
        hanzi: "医院",
        pinyin: "yīyuàn",
        tone: "Nada 1 + Nada 4",
        translation: "rumah sakit",
        partOfSpeech: "nomina lokasi",
        usageNotes:
          "Tempat dokter dan tenaga medis bekerja: 医生在医院工作.",
        exampleHanzi: "他在医院看医生。",
        examplePinyin: "Tā zài yīyuàn kàn yīshēng.",
        exampleTranslation: "Dia periksa dokter di rumah sakit.",
      },
      {
        hanzi: "哪儿",
        pinyin: "nǎr",
        tone: "Nada 3",
        translation: "di mana / ke mana",
        partOfSpeech: "pronomina interogativa",
        usageNotes:
          "Bentuk serapan dialek utara dengan akhiran 'er' (setara dengan 哪里 nǎlǐ).",
        exampleHanzi: "你在哪儿？",
        examplePinyin: "Nǐ zài nǎr?",
        exampleTranslation: "Kamu ada di mana?",
      },
      {
        hanzi: "这儿",
        pinyin: "zhèr",
        tone: "Nada 4",
        translation: "di sini / ke sini",
        partOfSpeech: "pronomina penunjuk lokasi",
        usageNotes:
          "Menunjuk lokasi dekat dengan pembicara (setara dengan 这里 zhèlǐ).",
        exampleHanzi: "请坐在这儿。",
        examplePinyin: "Qǐng zuò zài zhèr.",
        exampleTranslation: "Silakan duduk di sini.",
      },
      {
        hanzi: "那儿",
        pinyin: "nàr",
        tone: "Nada 4",
        translation: "di sana / ke sana",
        partOfSpeech: "pronomina penunjuk lokasi",
        usageNotes:
          "Menunjuk lokasi jauh dari pembicara (setara dengan 那里 nàlǐ).",
        exampleHanzi: "洗手间在那儿。",
        examplePinyin: "Xǐshǒujiān zài nàr.",
        exampleTranslation: "Toilet ada di sana.",
      },
      {
        hanzi: "上",
        pinyin: "shang / shàng",
        tone: "Nada 4 / netral",
        translation: "atas / di atas",
        partOfSpeech: "nomina posisi / arah",
        usageNotes:
          "Diletakkan tepat di belakang kata benda untuk menyatakan 'di atas': 桌子上 (di atas meja).",
        exampleHanzi: "书在桌子上。",
        examplePinyin: "Shū zài zhuōzi shang.",
        exampleTranslation: "Buku ada di atas meja.",
      },
      {
        hanzi: "下",
        pinyin: "xia / xià",
        tone: "Nada 4 / netral",
        translation: "bawah / di bawah",
        partOfSpeech: "nomina posisi / arah",
        usageNotes:
          "Diletakkan tepat di belakang kata benda: 椅子下 (di bawah kursi).",
        exampleHanzi: "小猫在椅子下。",
        examplePinyin: "Xiǎomāo zài yǐzi xià.",
        exampleTranslation: "Kucing kecil ada di bawah kursi.",
      },
      {
        hanzi: "里",
        pinyin: "li / lǐ",
        tone: "Nada 3 / netral",
        translation: "dalam / di dalam",
        partOfSpeech: "nomina posisi / arah",
        usageNotes:
          "Diletakkan tepat di belakang kata benda ruang: 家里 (di dalam rumah), 学校里 (di sekolah).",
        exampleHanzi: "水在杯子里。",
        examplePinyin: "Shuǐ zài bēizi li.",
        exampleTranslation: "Air ada di dalam gelas.",
      },
      {
        hanzi: "前",
        pinyin: "qián",
        tone: "Nada 2",
        translation: "depan / bagian depan",
        partOfSpeech: "nomina posisi / arah",
        usageNotes:
          "Bisa dipadukan dengan kata benda: 前面 (bagian depan), 门前 (di depan pintu).",
        exampleHanzi: "学校前面有一家商店。",
        examplePinyin: "Xuéxiào qiánmian yǒu yì jiā shāngdiàn.",
        exampleTranslation: "Di depan sekolah ada sebuah toko.",
      },
      {
        hanzi: "后",
        pinyin: "hòu",
        tone: "Nada 4",
        translation: "belakang / bagian belakang",
        partOfSpeech: "nomina posisi / arah",
        usageNotes:
          "Bisa dipadukan: 后面 (bagian belakang), 医院后面 (di belakang rumah sakit).",
        exampleHanzi: "图书馆在教室后面。",
        examplePinyin: "Túshūguǎn zài jiàoshì hòumian.",
        exampleTranslation: "Perpustakaan ada di belakang ruang kelas.",
      },
      {
        hanzi: "在",
        pinyin: "zài",
        tone: "Nada 4",
        translation: "berada di / di (verba & preposisi)",
        partOfSpeech: "verba / preposisi",
        usageNotes:
          "Fungsi ganda: 1) Sebagai verba mandiri (di mana); 2) Sebagai preposisi pengantar aksi (di suatu tempat melakukan sesuatu).",
        exampleHanzi: "我在学校看书。",
        examplePinyin: "Wǒ zài xuéxiào kàn shū.",
        exampleTranslation: "Saya membaca buku di sekolah.",
      },
      {
        hanzi: "桌子",
        pinyin: "zhuōzi",
        tone: "Nada 1 + netral",
        translation: "meja",
        partOfSpeech: "nomina",
        usageNotes:
          "Suku kata kedua 'zi' berbunyi nada netral ringan.",
        exampleHanzi: "桌子上有一本书。",
        examplePinyin: "Zhuōzi shang yǒu yì běn shū.",
        exampleTranslation: "Di atas meja ada sebuah buku.",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "洗手间",
        pinyin: "xǐshǒujiān",
        tone: "Nada 3 + Nada 3 + Nada 1",
        translation: "toilet / kamar kecil",
        isEnrichment: true,
        inclusionReason:
          "Fasilitas sanitasi darurat yang paling sering ditanyakan oleh siapa pun di tempat umum.",
        exampleHanzi: "请问洗手间在哪儿？",
        examplePinyin: "Qǐngwèn xǐshǒujiān zài nǎr?",
        exampleTranslation: "Permisi, toilet ada di sebelah mana?",
      },
      {
        hanzi: "图书馆",
        pinyin: "túshūguǎn",
        tone: "Nada 2 + Nada 1 + Nada 3",
        translation: "perpustakaan",
        isEnrichment: true,
        inclusionReason:
          "Lokasi akademik penting melengkapi latar percakapan mahasiswa.",
        exampleHanzi: "我们在图书馆看书。",
        examplePinyin: "Wǒmen zài túshūguǎn kàn shū.",
        exampleTranslation: "Kami membaca buku di perpustakaan.",
      },
      {
        hanzi: "椅子",
        pinyin: "yǐzi",
        tone: "Nada 3 + netral",
        translation: "kursi",
        isEnrichment: true,
        inclusionReason:
          "Pasangan perabot mendasar mendampingi meja (桌子).",
        exampleHanzi: "请坐在椅子上。",
        examplePinyin: "Qǐng zuò zài yǐzi shang.",
        exampleTranslation: "Silakan duduk di atas kursi.",
      },
      {
        hanzi: "上面",
        pinyin: "shàngmian",
        tone: "Nada 4 + netral",
        translation: "bagian atas / sebelah atas",
        isEnrichment: true,
        inclusionReason:
          "Bentuk lengkap dwisuku dari kata penunjuk arah atas.",
        exampleHanzi: "桌子上面有电脑。",
        examplePinyin: "Zhuōzi shàngmian yǒu diànnǎo.",
        exampleTranslation: "Di sebelah atas meja ada komputer.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Perhatikan bunyi lidah terangkat 'zh' pada 'zhèr' (di sini) dan 'zhuōzi' (meja) dibanding bunyi lidah datar 'z' pada 'zài'.",
      tones:
        "Pembedaan kontur nada kata penunjuk posisi: 'shàng' (nada 4), 'xià' (nada 4), 'lǐ' (nada 3), 'qián' (nada 2), 'hòu' (nada 4).",
      toneCombinations:
        "Pemberian akhiran erhua '哪儿' (nǎr) dan '这儿' (zhèr) yang diucapkan menyatu dalam satu suku kata dengan lidah melengkung ke belakang.",
      commonErrors:
        "Meletakkan keterangan tempat di akhir kalimat (misal: 'Wǒ kàn shū zài xuéxiào' — SALAH FATAL, wajib 'Wǒ zài xuéxiào kàn shū').",
      articulatoryTip:
        "Saat melafalkan 'nǎr' atau 'zhèr', jangan membunyikan 'er' secara terpisah dua ketukan; gulung ujung lidah ke atas tepat saat vokal utama selesai dibunyikan.",
    },

    hanziComponents: [
      {
        hanzi: "在",
        structure: "Setengah Terbuka (半包围结构)",
        components: "𠂇 (komponen tangan/penopang di kiri atas) + 土 (tanah berpijak di dasar)",
        strokeCount: 6,
        strokeOrderRules: [
          "Garis mendatar (一) → garis miring kiri (丿)",
          "Garis tegak (丨) → garis mendatar (一) → garis tegak (丨) → garis penutup bawah tanah (一)",
        ],
        notes:
          "Menggambarkan benih tanaman atau manusia yang berakar kokoh di atas tanah bumi (eksistensi keberadaan).",
      },
      {
        hanzi: "上",
        structure: "Tunggal / Simbolik (独体字 / 指事字)",
        components: "Garis dasar acuan (一) + Garis tegak ke atas (丨) + Garis pendek di atas acuan (一)",
        strokeCount: 3,
        strokeOrderRules: [
          "Garis tegak (丨) di tengah",
          "Garis mendatar pendek di atas (一)",
          "Garis mendatar panjang di dasar (一)",
        ],
        notes:
          "Karakter ideografis murni: sebuah garis acuan bawah dengan tanda penunjuk menjulang ke arah atas.",
      },
      {
        hanzi: "下",
        structure: "Tunggal / Simbolik (独体字 / 指事字)",
        components: "Garis dasar acuan di atas (一) + Garis tegak menggantung ke bawah (丨) + Titik penunjuk (丶)",
        strokeCount: 3,
        strokeOrderRules: [
          "Garis mendatar panjang di atas (一)",
          "Garis tegak menggantung ke bawah (丨)",
          "Titik miring ke kanan bawah (丶)",
        ],
        notes:
          "Kebalikan visual dari '上': garis acuan berada di bagian atas dan penunjuk menggantung di bawahnya.",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Kaidah Mutlak Tempat Sebelum Aksi: [Subjek] + 在 (Tempat) + [Kata Kerja] + [Objek]",
        formula: "[Subjek] + 在 (zài) + [Tempat] + [Kata Kerja] + [Objek]",
        explanation:
          "Dalam tata bahasa Mandarin, tempat di mana suatu perbuatan berlangsung WAJIB diletakkan SEBELUM tindakan dilakukan. Rumus ini mutlak dan tidak boleh ditawar. Pembicara bahasa Indonesia sering salah meletakkan tempat di belakang.",
        example:
          "我在学校看书。(Wǒ zài xuéxiào kàn shū: Saya membaca buku di sekolah.) — BUKAN '我看书在学校'.",
        positiveExamples: [
          {
            hanzi: "他在医院工作。",
            pinyin: "Tā zài yīyuàn gōngzuò.",
            translation: "Dia bekerja di rumah sakit.",
          },
          {
            hanzi: "我们中午在饭馆吃面条。",
            pinyin: "Wǒmen zhōngwǔ zài fànguǎn chī miàntiáo.",
            translation: "Kami makan mie di restoran saat tengah hari.",
          },
        ],
        usageConstraints:
          "Jangan pernah meletakkan frasa '在 + Tempat' di ujung kalimat setelah kata kerja dan objek.",
        commonErrors:
          "Menyusun kalimat: 'Wǒ chī fàn zài jiā' (salah struktur, wajib 'Wǒ zài jiā chī fàn').",
        communicativeFunction:
          "Mendeskripsikan lokasi terjadinya aktivitas harian dengan susunan kronologis alami Mandarin.",
      },
      {
        ruleTitle: "Verba Keberadaan Lokasi Mandiri: [Subjek] + 在 + [Tempat]",
        formula: "[Subjek] + 在 (zài) + [Tempat / Posisi]",
        explanation:
          "Ketika kata '在' (zài) berdiri sendiri sebagai kata kerja utama tanpa diikuti kata kerja lain, maknanya adalah 'berada di'. Untuk bentuk negasinya, letakkan kata '不' tepat di depannya: 不在 (bú zài - tidak ada di tempat).",
        example: "王老师在学校。(Guru Wang berada di sekolah.) | 他不在家。(Dia tidak ada di rumah.)",
        positiveExamples: [
          {
            hanzi: "我的书在桌子上。",
            pinyin: "Wǒ de shū zài zhuōzi shang.",
            translation: "Buku saya berada di atas meja.",
          },
          {
            hanzi: "今天爸爸不在医院。",
            pinyin: "Jīntiān bàba bú zài yīyuàn.",
            translation: "Hari ini ayah tidak berada di rumah sakit.",
          },
        ],
        usageConstraints:
          "Gunakan '不' untuk menegasikan '在' (bú zài). Jangan gunakan '没有' (méiyǒu zài terkesan rancu).",
        commonErrors:
          "Mengatakan 'méiyǒu zài' alih-alih bentuk baku 'bú zài'.",
        communicativeFunction:
          "Menyatakan keberadaan orang atau letak benda pada titik ruang tertentu.",
      },
      {
        ruleTitle: "Menanyakan Lokasi Fasilitas: [Objek/Tempat] + 在哪儿 / 在哪里 ？",
        formula: "[Entitas / Fasilitas] + 在 (zài) + 哪儿 (nǎr) / 哪里 (nǎlǐ) ？",
        explanation:
          "Untuk menanyakan letak suatu fasilitas umum, ruangan, atau barang, sebutkan nama fasilitasnya terlebih dahulu, diikuti kata kerja 在, lalu kata tanya 哪儿 (nǎr) atau 哪里 (nǎlǐ).",
        example: "洗手间在哪儿？(Xǐshǒujiān zài nǎr?: Toilet berada di mana?)",
        positiveExamples: [
          {
            hanzi: "你的学校在哪里？",
            pinyin: "Nǐ de xuéxiào zài nǎlǐ?",
            translation: "Sekolahmu berada di mana?",
          },
          {
            hanzi: "请问，商店在哪儿？",
            pinyin: "Qǐngwèn, shāngdiàn zài nǎr?",
            translation: "Permisi, toko ada di sebelah mana?",
          },
        ],
        usageConstraints:
          "Jangan gunakan partikel tanya '吗' di akhir pertanyaan yang sudah memiliki kata tanya '哪儿'.",
        commonErrors:
          "Menanyakan: 'Zài nǎr xǐshǒujiān?' meniru tata bahasa Inggris (Where is the toilet?).",
        communicativeFunction:
          "Meminta petunjuk arah dan letak fasilitas kepada masyarakat di tempat umum.",
      },
      {
        ruleTitle: "Pola Eksistensi Keberadaan Isi Ruang: [Tempat / Posisi] + 有 + [Benda / Orang]",
        formula: "[Tempat + Posisi: 上 / 下 / 里 / 前 / 后] + 有 (yǒu) + [Benda / Orang]",
        explanation:
          "Jika fokus kalimat adalah menyatakan apa saja yang 'ada' di dalam suatu tempat atau posisi (setara dengan 'There is/are'), letakkan lokasi posisi di awal kalimat sebagai subjek topik, diikuti 有 (yǒu). Negasinya menggunakan 没有 (méiyǒu).",
        example:
          "桌子上有一本书。(Zhuōzi shang yǒu yì běn shū: Di atas meja ada sebuah buku.)",
        positiveExamples: [
          {
            hanzi: "学校里有很多学生。",
            pinyin: "Xuéxiào lǐ yǒu hěn duō xuésheng.",
            translation: "Di dalam sekolah ada banyak sekali murid.",
          },
          {
            hanzi: "椅子下没有东西。",
            pinyin: "Yǐzi xià méiyǒu dōngxi.",
            translation: "Di bawah kursi tidak ada barang apa pun.",
          },
        ],
        usageConstraints:
          "Jangan menambahkan kata depan '在' di awal pola eksistensi ini jika ingin membuat kalimat keberadaan alami (cukup langsung: Zhuōzi shang yǒu shū).",
        commonErrors:
          "Menyusun: 'Yǒu yì běn shū zài zhuōzi shang' (kurang natural, utamakan lokasi di depan).",
        communicativeFunction:
          "Mendeskripsikan inventaris ruangan dan isi perabotan secara visual.",
      },
    ],

    culturalNotes:
      "Tata Ruang Tradisional Siheyuan (四合院) & Etika Bertanya Arah: Dalam arsitektur tradisional Tionghoa seperti rumah pekarangan empat sisi (Siheyuan), orientasi arah mata angin dan posisi depan-belakang, dalam-luar memiliki hierarki etika yang sangat ketat: ruangan utama menghadap ke selatan dan dihuni oleh kepala keluarga, sedangkan generasi muda menempati sayap samping. Saat bertanya arah di Tiongkok, awali selalu dengan sapaan takzim '请问' (qǐngwèn: bolehkah saya bertanya) untuk mencerminkan etika kesopanan yang tinggi.",

    listeningActivity: {
      goal: "Mendengarkan rekaman petunjuk arah fasilitas dan posisi barang untuk mengidentifikasi letak lokasi yang tepat.",
      audioText: "洗手间在前面，就在图书馆后面。你的汉语书在桌子上。",
      pinyin: "Xǐshǒujiān zài qiánmian, jiù zài túshūguǎn hòumian. Nǐ de Hànyǔ shū zài zhuōzi shang.",
      translation: "Toilet ada di depan sana, tepat di belakang perpustakaan. Buku bahasa Mandarimu ada di atas meja.",
      gistQuestion: {
        question:
          "Di manakah letak toilet dan di manakah buku bahasa Mandarin berada?",
        options: [
          "Toilet di belakang perpustakaan, buku di atas meja (洗手间在图书馆后面，书在桌子上)",
          "Toilet di dalam toko, buku di bawah kursi",
          "Toilet di rumah sakit, buku di dalam tas",
          "Toilet di lantai atas, buku di perpustakaan",
        ],
        correctAnswer: "Toilet di belakang perpustakaan, buku di atas meja (洗手间在图书馆后面，书在桌子上)",
        explanation:
          "Audio menyatakan: 'xǐshǒujiān... zài túshūguǎn hòumian' dan 'shū zài zhuōzi shang'.",
      },
      detailQuestion: {
        question:
          "Kata posisi manakah yang digunakan untuk menerangkan letak toilet terhadap gedung perpustakaan?",
        options: [
          "Belakang (后面 - hòumian)",
          "Depan (前面 - qiánmian)",
          "Dalam (里面 - lǐmian)",
          "Atas (上面 - shàngmian)",
        ],
        correctAnswer: "Belakang (后面 - hòumian)",
        explanation:
          "Audio secara tegas menggunakan frasa: 'túshūguǎn hòumian' (di belakang perpustakaan).",
      },
    },

    speakingActivity: {
      prompt:
        "Lakukan rekaman lisan tentang letak 3 benda dan 1 fasilitas di sekitarmu dalam bahasa Mandarin: 1) Tanyakan letak toilet atau perpustakaan (请问，洗手间/图书馆在哪儿？); 2) Nyatakan di mana kamu sedang berada sekarang (我现在在……); 3) Sebutkan posisi bukumu dan komputermu di atas meja atau dalam tas (我的书在桌子上，电脑在……); 4) Nyatakan di mana kamu besok akan belajar (我明天在学校学习).",
      vocabularySupport: [
        "请问……在哪儿？ (Qǐngwèn... zài nǎr?)",
        "在桌子上 / 椅子下 (zài zhuōzi shang / yǐzi xià)",
        "在学校 / 图书馆 (zài xuéxiào / túshūguǎn)",
        "在……学习 / 看书 (zài... xuéxí / kàn shū)",
      ],
      evaluationRubric:
        "Kriteria Penilaian: 1) Penempatan keterangan tempat sebelum kata kerja; 2) Pengucapan 'zài nǎr' tanpa inversi; 3) Nada ke-4 yang tegas pada 'zài', 'shàng', dan 'xià'; 4) Kelancaran penuturan lokasi spasial.",
    },

    readingActivity: {
      textHanzi:
        "这是一个大大学。学校里有教学楼、图书馆和一个大医院。图书馆在教学楼前面，商店在教学楼后面。大卫的教室在二楼。现在教室里没有人，大卫的书在桌子上，他的水杯在桌子下。大卫现在在图书馆看书。",
      textPinyin:
        "Zhè shì yí gè dà dàxué. Xuéxiào lǐ yǒu jiàoxuélóu, túshūguǎn hé yí gè dà yīyuàn. Túshūguǎn zài jiàoxuélóu qiánmian, shāngdiàn zài jiàoxuélóu hòumian. Dàwèi de jiàoshì zài èr lóu. Xiànzài jiàoshì lǐ méiyǒu rén, Dàwèi de shū zài zhuōzi shang, tā de shuǐbēi zài zhuōzi xià. Dàwèi xiànzài zài túshūguǎn kàn shū.",
      textTranslation:
        "Ini adalah sebuah universitas besar. Di dalam kampus ada gedung perkuliahan, perpustakaan, dan sebuah rumah sakit besar. Perpustakaan berada di depan gedung perkuliahan, toko berada di belakang gedung perkuliahan. Ruang kelas David berada di lantai dua. Saat ini di dalam kelas tidak ada orang, buku David ada di atas meja, cangkir airnya ada di bawah meja. David saat ini sedang membaca buku di perpustakaan.",
      mainIdea:
        "Tata letak fasilitas kampus universitas dan posisi barang David yang tertinggal di ruang kelas.",
      questions: [
        {
          question:
            "Di manakah posisi perpustakaan terhadap gedung perkuliahan menurut teks?",
          options: [
            "Perpustakaan berada di depan gedung perkuliahan (在教学楼前面)",
            "Perpustakaan berada di belakang gedung perkuliahan",
            "Perpustakaan berada di dalam rumah sakit",
            "Perpustakaan berada di lantai dua ruang kelas",
          ],
          correctAnswer: "Perpustakaan berada di depan gedung perkuliahan (在教学楼前面)",
          explanation:
            "Teks menyatakan: 'Túshūguǎn zài jiàoxuélóu qiánmian.'",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tuliskan 3 karakter Hanzi pembentuk arah dan posisi spasial berikut di buku kotak latihan dengan memperhatikan proporsi dan urutan goresan yang benar: '在' (zài - berada di), '上' (shàng - atas), dan '下' (xià - bawah).",
      minimumCharacters: 3,
      checklist: [
        "Menulis '在': 6 goresan; garis mendatar (一) → garis miring (丿) → garis tegak (丨) → garis mendatar tengah (一) → garis tegak (丨) → garis penutup bawah (一).",
        "Menulis '上': 3 goresan; garis tegak tengah (丨) → garis mendatar pendek di kanan (一) → garis mendatar panjang di dasar (一).",
        "Menulis '下': 3 goresan; garis mendatar panjang di atas (一) → garis tegak menggantung (丨) → titik penutup di kanan bawah (丶).",
      ],
      modelAnswer: {
        hanzi: "在桌子上，在椅子下",
        pinyin: "zài zhuōzi shang, zài yǐzi xià",
        translation: "di atas meja, di bawah kursi",
      },
    },

    personalizationPrompt:
      "Tuliskan posisi tiga barang penting di meja belajarmu dalam bahasa Mandarin di Buku Frasa pribadi: '我的桌子上有……，电脑在……，书在……。' dan rekam suaramu.",
    errorJournalHooks: [
      "Meletakkan keterangan tempat di akhir kalimat sesudah kata kerja (misal: 'Wǒ xuéxí zài xuéxiào')",
      "Melakukan inversi kalimat tanya lokasi (misal: 'Zài nǎr xǐshǒujiān?')",
      "Menggunakan 'méiyǒu zài' alih-alih kata negasi baku 'bú zài'",
      "Menghilangkan kata bantu posisi seperti 'shang' saat menyebut di atas meja",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna mampu menanyakan lokasi fasilitas dengan '在哪儿', menempatkan keterangan tempat sebelum kata kerja dalam kalimat [Subjek + 在 (Tempat) + Verba], menggunakan kata arah spasial (上, 下, 里, 前, 后), serta mendeskripsikan keberadaan isi ruang dengan '有' dengan tingkat akurasi minimal 80%.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Pelajari kembali kaidah Tempat Sebelum Aksi dan latih penunjukan posisi barang pada menu Latihan Soal Unit 08.",
    },
  },
  // -------------------------------------------------------------
  // HSK 1 Unit 09: Belanja & Harga (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "hsk1-09",
    moduleId: "hsk1",
    slug: "09",
    unitNumber: 9,
    title: "Belanja & Harga",
    hanzi: "购物与价格",
    pinyin: "Gòuwù yǔ Jiàgé",
    translation: "Transaksi Jual Beli, Nominal Harga & Penawaran",
    objectives:
      "Menguasai transaksi belanja dan menanyakan harga dalam bahasa Mandarin: menanyakan harga dengan '多少钱' (duōshao qián), menyebutkan mata uang yuan/kuai (块/元) dan jiao/mao (毛/角), menunjuk barang dengan '这个' dan '那个', menggunakan kata penegas '太……了' (terlalu...) untuk tawar-menawar, serta menggunakan kalimat predikat adjektiva dengan kata penguat '很' (hěn) dan '一点儿' (yìdiǎnr).",
    overview:
      "Unit kesembilan tingkat HSK 1 ini membawa kamu langsung ke pasar dan toko di Tiongkok. Kamu akan menguasai cara menanyakan harga barang, memahami nilai pecahan mata uang Renminbi dalam percakapan lisan (块 kuài dan 毛 máo), membedakan ukuran besar-kecil (大 dà dan 小 xiǎo), serta mengungkapkan pendapat bahwa suatu barang terlalu mahal atau sangat murah secara natural.",
    vocabCount: 14,
    durationMinutes: 15,
    levelBadge: "HSK 1 · UNIT 09",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["hsk1-08"],
    skills: [
      "Menanyakan Harga dengan 多少钱",
      "Mata Uang Renminbi (块 / 元, 毛 / 角)",
      "Penunjuk Barang 这个 & 那个",
      "Struktur Derajat 太……了 (Terlalu...)",
      "Predikat Adjektiva dengan 很 (Sangat)",
      "Tawar-Menawar Sederhana",
    ],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "Pemilik Toko (Lǎobǎn) & David (Pembeli)",
      location: "Kios Buku dan Alat Tulis di Kampus",
      goal: "Menanyakan harga buku catatan, menawar harga karena merasa terlalu mahal, dan membayar dengan uang tunai.",
      scenarioNotes:
        "David ingin membeli buku catatan baru dan sebuah cangkir air di toko kampus. Ia menanyakan harga beberapa barang, membandingkan ukuran besar dan kecil, lalu menuntaskan transaksi pembayaran.",
    },

    dialogue: [
      {
        speaker: "Pemilik Toko",
        role: "Penjual",
        hanzi: "你好！想买什么东西？随便看看。",
        pinyin: "Nǐ hǎo! Xiǎng mǎi shénme dōngxi? Suíbiàn kànkan.",
        translation: "Halo! Ingin membeli barang apa? Silakan lihat-lihat santai.",
      },
      {
        speaker: "David",
        role: "Pembeli",
        hanzi: "老板，请问这个大杯子多少钱？",
        pinyin: "Lǎobǎn, qǐngwèn zhè gè dà bēizi duōshao qián?",
        translation: "Bos, boleh tanya cangkir besar ini berapa harganya?",
      },
      {
        speaker: "Pemilik Toko",
        role: "Penjual",
        hanzi: "那个大杯子二十五块钱。这个小的十五块。",
        pinyin: "Nà gè dà bēizi èrshíwǔ kuài qián. Zhè gè xiǎo de shíwǔ kuài.",
        translation: "Cangkir besar itu 25 yuan. Yang kecil ini 15 yuan.",
      },
      {
        speaker: "David",
        role: "Pembeli",
        hanzi: "二十五块太贵了！能不能便宜一点儿？",
        pinyin: "Èrshíwǔ kuài tài guì le! Néng bu néng piányi yìdiǎnr?",
        translation: "25 yuan terlalu mahal! Bisa tidak lebih murah sedikit?",
      },
      {
        speaker: "Pemilik Toko",
        role: "Penjual",
        hanzi: "给你便宜两块，二十三块钱，怎么样？",
        pinyin: "Gěi nǐ piányi liǎng kuài, èrshísān kuài qián, zěnmeyàng?",
        translation: "Saya beri diskon 2 yuan, jadi 23 yuan, bagaimana?",
      },
      {
        speaker: "David",
        role: "Pembeli",
        hanzi: "太好了，我要这个大杯子。给你三十块钱。",
        pinyin: "Tài hǎo le, wǒ yào zhè gè dà bēizi. Gěi nǐ sānshí kuài qián.",
        translation: "Bagus sekali, saya mau cangkir besar ini. Ini uangnya 30 yuan.",
      },
      {
        speaker: "Pemilik Toko",
        role: "Penjual",
        hanzi: "找你七块钱。谢谢！",
        pinyin: "Zhǎo nǐ qī kuài qián. Xièxie!",
        translation: "Kembalianmu 7 yuan. Terima kasih!",
      },
    ],

    vocabulary: [
      {
        hanzi: "买",
        pinyin: "mǎi",
        tone: "Nada 3",
        translation: "membeli",
        partOfSpeech: "verba",
        usageNotes:
          "Berlawanan dengan 卖 (mài - nada 4, menjual). Selalu diucapkan bernada 3 rendah turun-naik.",
        exampleHanzi: "你想买什么？",
        examplePinyin: "Nǐ xiǎng mǎi shénme?",
        exampleTranslation: "Kamu ingin membeli apa?",
      },
      {
        hanzi: "钱",
        pinyin: "qián",
        tone: "Nada 2",
        translation: "uang",
        partOfSpeech: "nomina",
        usageNotes:
          "Sering dipadukan dalam pertanyaan harga: 多少钱 (berapa uangnya / berapa harganya).",
        exampleHanzi: "我没有很多钱。",
        examplePinyin: "Wǒ méiyǒu hěn duō qián.",
        exampleTranslation: "Saya tidak punya banyak uang.",
      },
      {
        hanzi: "块",
        pinyin: "kuài",
        tone: "Nada 4",
        translation: "yuan (satuan mata uang ragam lisan)",
        partOfSpeech: "satuan mata uang",
        usageNotes:
          "Bentuk lisan santai paling umum untuk mata uang Tiongkok Renminbi (setara dengan 元 yuán).",
        exampleHanzi: "十块钱。",
        examplePinyin: "Shí kuài qián.",
        exampleTranslation: "Sepuluh yuan.",
      },
      {
        hanzi: "元",
        pinyin: "yuán",
        tone: "Nada 2",
        translation: "yuan (satuan mata uang ragam tertulis/formal)",
        partOfSpeech: "satuan mata uang",
        usageNotes:
          "Digunakan pada label harga tertulis di supermarket, uang kertas, dan laporan keuangan.",
        exampleHanzi: "售价五元。",
        examplePinyin: "Shòujià wǔ yuán.",
        exampleTranslation: "Harga jual lima yuan.",
      },
      {
        hanzi: "多少",
        pinyin: "duōshao",
        tone: "Nada 1 + netral",
        translation: "berapa / seberapa banyak",
        partOfSpeech: "pronomina interogativa",
        usageNotes:
          "Kata tanya harga standar: 多少钱 (duōshao qián).",
        exampleHanzi: "这个多少钱？",
        examplePinyin: "Zhè gè duōshao qián?",
        exampleTranslation: "Yang ini berapa harganya?",
      },
      {
        hanzi: "大",
        pinyin: "dà",
        tone: "Nada 4",
        translation: "besar",
        partOfSpeech: "adjektiva",
        usageNotes:
          "Ukuran dimensi besar: 大苹果 (apel besar), 大学校 (kampus besar).",
        exampleHanzi: "这个杯子很大。",
        examplePinyin: "Zhè gè bēizi hěn dà.",
        exampleTranslation: "Cangkir ini sangat besar.",
      },
      {
        hanzi: "小",
        pinyin: "xiǎo",
        tone: "Nada 3",
        translation: "kecil",
        partOfSpeech: "adjektiva",
        usageNotes:
          "Ukuran dimensi kecil: 小猫 (kucing kecil), 小房间 (kamar kecil).",
        exampleHanzi: "苹果很小。",
        examplePinyin: "Píngguǒ hěn xiǎo.",
        exampleTranslation: "Apelnya sangat kecil.",
      },
      {
        hanzi: "贵",
        pinyin: "guì",
        tone: "Nada 4",
        translation: "mahal",
        partOfSpeech: "adjektiva",
        usageNotes:
          "Menyatakan harga tinggi: 太贵了 (terlalu mahal).",
        exampleHanzi: "这本书太贵了。",
        examplePinyin: "Zhè běn shū tài guì le.",
        exampleTranslation: "Buku ini terlalu mahal.",
      },
      {
        hanzi: "便宜",
        pinyin: "piányi",
        tone: "Nada 2 + netral",
        translation: "murah",
        partOfSpeech: "adjektiva",
        usageNotes:
          "Suku kata kedua 'yi' berbunyi nada netral pendek. Lawan kata dari 贵 (guì).",
        exampleHanzi: "商店的东西很便宜。",
        examplePinyin: "Shāngdiàn de dōngxi hěn piányi.",
        exampleTranslation: "Barang di toko sangat murah.",
      },
      {
        hanzi: "东西",
        pinyin: "dōngxi",
        tone: "Nada 1 + netral",
        translation: "barang / benda",
        partOfSpeech: "nomina",
        usageNotes:
          "Kombinasi kata timur (东) dan barat (西) yang bermakna 'barang': 买东西 (berbelanja barang).",
        exampleHanzi: "我想去买东西。",
        examplePinyin: "Wǒ xiǎng qù mǎi dōngxi.",
        exampleTranslation: "Saya ingin pergi belanja barang.",
      },
      {
        hanzi: "太",
        pinyin: "tài",
        tone: "Nada 4",
        translation: "terlalu / amat",
        partOfSpeech: "adverbia derajat",
        usageNotes:
          "Berpasangan dengan partikel 了 di akhir kalimat: 太……了 (terlalu...!).",
        exampleHanzi: "太好了！",
        examplePinyin: "Tài hǎo le!",
        exampleTranslation: "Bagus sekali!",
      },
      {
        hanzi: "很",
        pinyin: "hěn",
        tone: "Nada 3",
        translation: "sangat / amat",
        partOfSpeech: "adverbia derajat",
        usageNotes:
          "Penghubung alami subjek dengan predikat adjektiva. Berfungsi melekatkan kata sifat tanpa arti 'sangat' yang berlebihan.",
        exampleHanzi: "衣服很漂亮。",
        examplePinyin: "Yīfu hěn piàoliang.",
        exampleTranslation: "Pakaiannya sangat cantik.",
      },
      {
        hanzi: "这个",
        pinyin: "zhè gè",
        tone: "Nada 4 + netral",
        translation: "yang ini",
        partOfSpeech: "pronomina demonstrativa",
        usageNotes:
          "Dipakai saat menunjuk barang yang dekat: 我要这个 (saya mau yang ini).",
        exampleHanzi: "这个多少钱？",
        examplePinyin: "Zhè gè duōshao qián?",
        exampleTranslation: "Berapa harga yang ini?",
      },
      {
        hanzi: "那个",
        pinyin: "nà gè",
        tone: "Nada 4 + netral",
        translation: "yang itu",
        partOfSpeech: "pronomina demonstrativa",
        usageNotes:
          "Dipakai saat menunjuk barang yang jauh: 那个多少钱？(Yang itu berapa harganya?).",
        exampleHanzi: "那个太小了。",
        examplePinyin: "Nà gè tài xiǎo le.",
        exampleTranslation: "Yang itu terlalu kecil.",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "毛",
        pinyin: "máo",
        tone: "Nada 2",
        translation: "sepuluh sen (0,1 yuan - ragam lisan)",
        isEnrichment: true,
        inclusionReason:
          "Pecahan sen lisan yang umum dijumpai di pasar (1 kuai = 10 mao).",
        exampleHanzi: "两块五毛钱。",
        examplePinyin: "Liǎng kuài wǔ máo qián.",
        exampleTranslation: "Dua yuan lima puluh sen (2,5 yuan).",
      },
      {
        hanzi: "一共",
        pinyin: "yígòng",
        tone: "Nada 2 + Nada 4",
        translation: "total keseluruhan / semuanya",
        isEnrichment: true,
        inclusionReason:
          "Kata penjumlahan penting saat kasir menghitung total belanjaan.",
        exampleHanzi: "一共五十块钱。",
        examplePinyin: "Yígòng wǔshí kuài qián.",
        exampleTranslation: "Total semuanya lima puluh yuan.",
      },
      {
        hanzi: "一点儿",
        pinyin: "yìdiǎnr",
        tone: "Nada 4 + Nada 3",
        translation: "sedikit / agak",
        isEnrichment: true,
        inclusionReason:
          "Digunakan di belakang kata sifat saat menawar: 便宜一点儿 (murah sedikit).",
        exampleHanzi: "能不能便宜一点儿？",
        examplePinyin: "Néng bu néng piányi yìdiǎnr?",
        exampleTranslation: "Bisa tidak lebih murah sedikit?",
      },
      {
        hanzi: "衣服",
        pinyin: "yīfu",
        tone: "Nada 1 + netral",
        translation: "pakaian / baju",
        isEnrichment: true,
        inclusionReason:
          "Komoditas belanja harian paling mendasar melengkapi kosakata belanja.",
        exampleHanzi: "这件衣服很贵。",
        examplePinyin: "Zhè jiàn yīfu hěn guì.",
        exampleTranslation: "Baju ini sangat mahal.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Pembedaan inisial dental bersuara 'd' pada 'dà' dan 'dōngxi' vs inisial affricate 'c' pada 'cài' vs inisial desis alveolar 's' pada 'suíbiàn'.",
      tones:
        "Pembedaan nada ke-3 pada 'mǎi' (买 - membeli) vs nada ke-4 pada 'mài' (卖 - menjual). Tertukar nada akan membalik makna dari pembeli menjadi penjual.",
      toneCombinations:
        "Struktur seruan 'tài... le': 'tài' berbunyi nada 4 menukik tegas dan 'le' meluncur ringan netral (太贵了 tài guì le / 太好了 tài hǎo le).",
      commonErrors:
        "Memasukkan kata 'adalah' (是 - shì) sebelum kata sifat (misal keliru berkata: 'Zhè běn shū shì guì' — PANTANGAN BESAR, cukup gunakan 'hěn': 'Zhè běn shū hěn guì').",
      articulatoryTip:
        "Saat menawar 'piányi yìdiǎnr', bunyikan akhiran erhua dengan membulatkan lidah ke belakang di ujung kata 'diǎnr' seperti bersiul lembut.",
    },

    hanziComponents: [
      {
        hanzi: "买",
        structure: "Atas-Bawah (上下结构)",
        components: "乛 (kait kait jaring penangkap di atas) + 头 (kepala/tangan penampung barang di bawah)",
        strokeCount: 6,
        strokeOrderRules: [
          "Garis mendatar kait (乛) di bagian atas",
          "Titik miring (丶) → garis mendatar (一) → garis miring (丿) → titik kanan (丶)",
        ],
        notes:
          "Evolusi dari piktograf jaring penangkap kerang kauri (uang kuno) untuk ditukarkan dengan barang kebutuhan.",
      },
      {
        hanzi: "大",
        structure: "Tunggal / Simetris (独体字)",
        components: "Garis mendatar (一) + Komponen orang merentangkan tangan (人)",
        strokeCount: 3,
        strokeOrderRules: [
          "Garis mendatar (一) terlebih dahulu",
          "Garis miring kiri panjang (丿) dari atas menembus tengah",
          "Garis miring kanan tebal (捺) seimbang di sisi kanan",
        ],
        notes:
          "Piktograf sosok manusia dewasa yang merentangkan kedua tangan dan kakinya selebar mungkin untuk menggambarkan ukuran yang besar.",
      },
      {
        hanzi: "小",
        structure: "Tunggal / Simetris (独体字)",
        components: "Garis tegak kait tengah (亅) + Dua titik pembagi di kiri dan kanan (八)",
        strokeCount: 3,
        strokeOrderRules: [
          "Tengah sebelum kedua sisi (先中间后两边)",
          "Garis tegak kait tengah (亅) terlebih dahulu",
          "Titik miring kiri (丶) → titik miring kanan (丶)",
        ],
        notes:
          "Kebalikan dari '大': melambangkan sebutir partikel kecil yang terbelah dua menjadi serpihan debu mini.",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Menanyakan Harga Barang: [Benda] + 多少钱 ？",
        formula: "[Nama Benda / 这个 / 那个] + 多少钱 (duōshao qián) ？",
        explanation:
          "Pola universal untuk menanyakan harga segala barang di Tiongkok. Sebutkan barang yang ditunjuk, lalu tambahkan frasa '多少钱' tanpa perlu mengubah susunan kalimat.",
        example: "这个苹果多少钱？(Zhè gè píngguǒ duōshao qián?: Apel ini berapa harganya?)",
        positiveExamples: [
          {
            hanzi: "这本书多少钱？",
            pinyin: "Zhè běn shū duōshao qián?",
            translation: "Buku ini berapa harganya?",
          },
          {
            hanzi: "那个杯子多少钱？",
            pinyin: "Nà gè bēizi duōshao qián?",
            translation: "Cangkir itu berapa harganya?",
          },
        ],
        usageConstraints:
          "Jangan gunakan kata '几' untuk menanyakan uang (salah: 'jǐ qián?'). Wajib menggunakan '多少钱'.",
        commonErrors:
          "Menanyakan 'jǐ kuài qián' alih-alih bentuk baku 'duōshao qián'.",
        communicativeFunction:
          "Memulai negosiasi transaksi belanja dan menanyakan rincian tarif belanja.",
      },
      {
        ruleTitle: "Struktur Derajat Seruan & Penolakan: 太 + [Adjektiva] + 了",
        formula: "太 (tài) + [Kata Sifat] + 了 (le) ！",
        explanation:
          "Digunakan untuk menyatakan derajat yang melampaui batas normal, baik berkonotasi negatif (terlalu mahal, terlalu besar) maupun seruan apresiasi positif (bagus sekali, enak sekali). Partikel 了 di akhir berfungsi mengunci seruan.",
        example: "太贵了！(Tài guì le!: Terlalu mahal!) | 太好了！(Tài hǎo le!: Bagus sekali!)",
        positiveExamples: [
          {
            hanzi: "这个杯子太大了。",
            pinyin: "Zhè gè bēizi tài dà le.",
            translation: "Cangkir ini terlalu besar.",
          },
          {
            hanzi: "这里的面条太好吃了！",
            pinyin: "Zhèlǐ de miàntiáo tài hǎochī le!",
            translation: "Mie di sini enak sekali!",
          },
        ],
        usageConstraints:
          "Jangan melupakan partikel '了' di ujung pola seruan ini.",
        commonErrors:
          "Menghilangkan 'le' saat berseru: berkata 'tài guì' (kurang lengkap secara idiomatis).",
        communicativeFunction:
          "Mengekspresikan keberatan harga atau apresiasi terhadap kualitas barang.",
      },
      {
        ruleTitle: "Kata Sifat Tanpa '是': Gunakan [Subjek] + 很 (hěn) + [Kata Sifat]",
        formula: "[Subjek] + 很 (hěn) + [Kata Sifat]",
        explanation:
          "Dalam bahasa Mandarin, kata sifat dapat langsung berfungsi sebagai predikat tanpa kata kerja penghubung '是' (shì). Kata '很' (hěn) berfungsi sebagai jembatan struktural wajib agar kalimat terdengar seimbang dan netral, bukan bermakna 'amat sangat' secara hiperbolis.",
        example: "这本书很贵。(Buku ini mahal.) — PANTANGAN BESAR: BUKAN '这本书是贵'.",
        positiveExamples: [
          {
            hanzi: "那个苹果很大。",
            pinyin: "Nà gè píngguǒ hěn dà.",
            translation: "Apel itu besar.",
          },
          {
            hanzi: "商店的东西很便宜。",
            pinyin: "Shāngdiàn de dōngxi hěn piányi.",
            translation: "Barang di toko murah.",
          },
        ],
        usageConstraints:
          "PANTANGAN BESAR: Jangan pernah menyisipkan kata '是' sebelum kata sifat tunggal.",
        commonErrors:
          "Mengatakan 'Zhè gè shì guì' (salah fatal, wajib 'Zhè gè hěn guì').",
        communicativeFunction:
          "Mendeskripsikan ciri fisik barang dan harga secara objektif.",
      },
      {
        ruleTitle: "Permohonan Penawaran Harga: [Adjektiva] + 一点儿",
        formula: "能不能 (Néng bu néng) + 便宜一点儿 (piányi yìdiǎnr) ？",
        explanation:
          "Frasa '一点儿' (yìdiǎnr) yang diletakkan di belakang kata sifat berfungsi menyatakan perbandingan moderat (lebih... sedikit). Dalam konteks belanja, rumus '便宜一点儿' adalah frasa tawar-menawar paling santun dan efektif di pasar Tiongkok.",
        example: "便宜一点儿，好吗？(Lebih murah sedikit, boleh ya?)",
        positiveExamples: [
          {
            hanzi: "能不能便宜一点儿？",
            pinyin: "Néng bu néng piányi yìdiǎnr?",
            translation: "Bisakah lebih murah sedikit?",
          },
          {
            hanzi: "我想看大一点儿的。",
            pinyin: "Wǒ xiǎng kàn dà yìdiǎnr de.",
            translation: "Saya ingin melihat yang agak lebih besar sedikit.",
          },
        ],
        usageConstraints:
          "Posisi 'yìdiǎnr' selalu di belakang kata sifat, berbeda dengan 'yǒu yìdiǎnr' yang diletakkan di depan kata sifat untuk keluhan.",
        commonErrors:
          "Menaruh 'yìdiǎnr' di depan kata sifat saat menawar: 'yìdiǎnr piányi' (salah).",
        communicativeFunction:
          "Melakukan tawar-menawar harga secara santun dan luwes.",
      },
    ],

    culturalNotes:
      "Seni Menawar (讲价 - Jiǎngjià) & Pembayaran Nontunai di Tiongkok: Di pasar tradisional atau kios cinderamata di Tiongkok, tawar-menawar (讲价) adalah bagian dari interaksi sosial yang lumrah. Namun, di pusat perbelanjaan modern atau supermarket resmi, harga sudah pas (明码标价 - míngmǎ biāojià) dan tidak dapat ditawar. Selain itu, hampir seluruh transaksi di Tiongkok kini menggunakan sistem nontunai (WeChat Pay / Alipay) dengan memindai kode QR (扫码支付 - sǎomǎ zhīfù).",

    listeningActivity: {
      goal: "Mendengarkan rekaman tawar-menawar barang dan mengidentifikasi harga awal, harga diskon, serta uang kembalian.",
      audioText: "老板，这个大杯子多少钱？——那个二十五块。——太贵了，能不能便宜一点儿？——二十块卖给你吧！",
      pinyin: "Lǎobǎn, zhè gè dà bēizi duōshao qián? —— Nà gè èrshíwǔ kuài. —— Tài guì le, néng bu néng piányi yìdiǎnr? —— Èrshí kuài mài gěi nǐ ba!",
      translation: "Bos, cangkir besar ini berapa harganya? —— Yang itu 25 yuan. —— Terlalu mahal, bisa lebih murah sedikit? —— 20 yuan saya jual padamu!",
      gistQuestion: {
        question:
          "Berapakah harga akhir cangkir besar tersebut setelah ditawar oleh pembeli?",
        options: [
          "20 yuan (二十块钱)",
          "25 yuan (二十五块钱)",
          "15 yuan (十五块钱)",
          "30 yuan (三十块钱)",
        ],
        correctAnswer: "20 yuan (二十块钱)",
        explanation:
          "Penjual akhirnya sepakat memberikan harga diskon: 'Èrshí kuài mài gěi nǐ ba!' (20 yuan saya jual padamu).",
      },
      detailQuestion: {
        question:
          "Ungkapan apakah yang digunakan pembeli saat menolak harga awal karena dirasa mahal?",
        options: [
          "太贵了！ (Tài guì le! / Terlalu mahal!)",
          "太好了！ (Tài hǎo le! / Bagus sekali!)",
          "太大了！ (Tài dà le! / Terlalu besar!)",
          "太少了！ (Tài shǎo le! / Terlalu sedikit!)",
        ],
        correctAnswer: "太贵了！ (Tài guì le! / Terlalu mahal!)",
        explanation:
          "Pembeli berseru: 'Tài guì le! Néng bu néng piányi yìdiǎnr?'.",
      },
    },

    speakingActivity: {
      prompt:
        "Lakukan roleplay rekaman lisan tawar-menawar di pasar dalam 4 kalimat: 1) Tanyakan harga barang yang kamu tunjuk (老板，这个……多少钱？); 2) Nyatakan bahwa harganya terlalu mahal (……块太贵了！); 3) Ajukan penawaran harga lebih murah (能不能便宜一点儿？……块可以吗？); 4) Sepakati pembelian (好的，我要买这个).",
      vocabularySupport: [
        "多少钱 (duōshao qián: berapa harganya)",
        "块 / 元 (kuài / yuán: mata uang)",
        "太贵了 (tài guì le: terlalu mahal)",
        "便宜一点儿 (piányi yìdiǎnr: lebih murah sedikit)",
        "买这个 (mǎi zhè gè: beli yang ini)",
      ],
      evaluationRubric:
        "Kriteria Penilaian: 1) Ketepatan nada ke-3 pada 'mǎi' (membeli); 2) Penerapan struktur seruan 'tài guì le'; 3) Pengucapan 'piányi yìdiǎnr'; 4) Kelancaran alur tawar-menawar.",
    },

    readingActivity: {
      textHanzi:
        "今天下午大卫去商店买东西。商店里有很多好看的衣服。大卫看中了一件黑色的衣服，他问老板：‘这件衣服多少钱？’老板说：‘一百八十块钱。’大卫说：‘太贵了，能不能便宜一点儿？一百五十块可以吗？’老板笑了笑说：‘行，一百五十块卖给你。’大卫很高兴，他买下了这件衣服。",
      textPinyin:
        "Jīntiān xiàwǔ Dàwèi qù shāngdiàn mǎi dōngxi. Shāngdiàn lǐ yǒu hěn duō hǎokàn de yīfu. Dàwèi kànzhòng le yí jiàn hēisè de yīfu, tā wèn lǎobǎn: ‘Zhè jiàn yīfu duōshao qián?’ Lǎobǎn shuō: ‘Yì bǎi bāshí kuài qián.’ Dàwèi shuō: ‘Tài guì le, néng bu néng piányi yìdiǎnr? Yì bǎi wǔshí kuài kěyǐ ma?’ Lǎobǎn xiàole xiào shuō: ‘Xíng, yì bǎi wǔshí kuài mài gěi nǐ.’ Dàwèi hěn gāoxìng, tā mǎixià le zhè jiàn yīfu.",
      textTranslation:
        "Sore ini David pergi ke toko untuk berbelanja. Di dalam toko ada banyak baju yang bagus. David menyukai sehelai pakaian berwarna hitam, dia bertanya kepada pemilik toko: 'Baju ini berapa harganya?' Pemilik toko berkata: '180 yuan.' David berkata: 'Terlalu mahal, bisa lebih murah sedikit? 150 yuan boleh tidak?' Pemilik toko tersenyum dan berkata: 'Boleh, 150 yuan saya jual padamu.' David sangat senang, dia membeli baju tersebut.",
      mainIdea:
        "Pengalaman David berbelanja pakaian di toko kampus dan keberhasilannya menawar harga dari 180 menjadi 150 yuan.",
      questions: [
        {
          question:
            "Berapakah harga awal yang ditawarkan pemilik toko dan berapa harga akhir yang dibayar oleh David?",
          options: [
            "Harga awal 180 yuan, harga akhir 150 yuan (一百八十块，一百五十块)",
            "Harga awal 200 yuan, harga akhir 100 yuan",
            "Harga awal 150 yuan, harga akhir 180 yuan",
            "Harga awal 80 yuan, harga akhir 50 yuan",
          ],
          correctAnswer: "Harga awal 180 yuan, harga akhir 150 yuan (一百八十块，一百五十块)",
          explanation:
            "Teks menyatakan: 'Lǎobǎn shuō: Yì bǎi bāshí kuài... Xíng, yì bǎi wǔshí kuài mài gěi nǐ.'",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tuliskan 3 karakter Hanzi pembentuk transaksi belanja berikut di buku kotak latihan dengan memperhatikan proporsi dan urutan goresan yang benar: '买' (mǎi - membeli), '大' (dà - besar), dan '小' (xiǎo - kecil).",
      minimumCharacters: 3,
      checklist: [
        "Menulis '买': 6 goresan; garis mendatar kait (乛) di atas, lalu titik (丶), mendatar (一), miring (丿), dan titik kanan (丶).",
        "Menulis '大': 3 goresan; garis mendatar (一) → garis miring kiri (丿) menembus tengah → goresan miring kanan tebal (捺).",
        "Menulis '小': 3 goresan; garis tegak kait tengah (亅) terlebih dahulu, baru dua titik pembagi di kiri dan kanan.",
      ],
      modelAnswer: {
        hanzi: "我想买大杯子和小苹果",
        pinyin: "wǒ xiǎng mǎi dà bēizi hé xiǎo píngguǒ",
        translation: "saya ingin membeli cangkir besar dan apel kecil",
      },
    },

    personalizationPrompt:
      "Tuliskan satu barang impian yang ingin kamu beli di Tiongkok beserta perkiraan harganya di Buku Frasa pribadi: '我想买……，大约……块钱。'",
    errorJournalHooks: [
      "Menyelipkan kata '是' (shì) sebelum kata sifat (contoh salah: 'zhè běn shū shì guì', yang benar gunakan 'hěn': 'zhè běn shū hěn guì')",
      "Tertukar nada antara 'mǎi' (买 - nada 3, membeli) dan 'mài' (卖 - nada 4, menjual)",
      "Menanyakan harga menggunakan kata 'jǐ' alih-alih 'duōshao qián'",
      "Melupakan partikel 'le' pada seruan 'tài guì le'",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna mampu menanyakan harga dengan '多少钱', menyebutkan nominal harga dengan mata uang '块 / 元', menggunakan pola predikat adjektiva dengan '很' tanpa kata '是', serta melakukan penawaran harga dengan '太贵了' dan '便宜一点儿' dengan akurasi minimal 80%.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Pelajari kembali kaidah Predikat Adjektiva Tanpa 是 dan latih latihan transaksi belanja pada menu Latihan Soal Unit 09.",
    },
  },
  // -------------------------------------------------------------
  // HSK 1 Unit 10: Cuaca & Kondisi (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "hsk1-10",
    moduleId: "hsk1",
    slug: "10",
    unitNumber: 10,
    title: "Cuaca & Kondisi",
    hanzi: "天气与状态",
    pinyin: "Tiānqì yǔ Zhuàngtài",
    translation: "Kondisi Cuaca, Suhu Udara & Keadaan Fisik/Perasaan",
    objectives:
      "Menguasai deskripsi cuaca dan kondisi keadaan diri: menanyakan dan mendeskripsikan cuaca harian (panas 热, dingin 冷, hujan 下雨), mengevaluasi situasi dengan kata tanya '怎么样' (zěnmeyàng: bagaimana?), menyatakan kondisi fisik dan emosional (sibuk 忙, lelah 累, senang 高兴, sehat/baik 好), serta menggunakan pola sanggahan derajat '不太……' (tidak terlalu...).",
    overview:
      "Unit kesepuluh tingkat HSK 1 ini menghubungkan pengamatan fenomena alam dengan perasaan manusia. Dalam budaya Tionghoa, membicarakan cuaca adalah topik basa-basi pembuka yang sangat ramah. Kamu akan belajar mengomentari cuaca hari ini, mengekspresikan apakah kamu sedang lelah atau sibuk dengan pola kalimat adjektiva murni, dan saling bertukar kabar secara akrab.",
    vocabCount: 14,
    durationMinutes: 15,
    levelBadge: "HSK 1 · UNIT 10",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["hsk1-09"],
    skills: [
      "Mendeskripsikan Cuaca (天气, 热, 冷, 下雨)",
      "Kata Tanya Evaluasi 怎么样",
      "Menyatakan Kondisi Diri (忙, 累, 高兴)",
      "Kaidah Predikat Adjektiva Tanpa 是",
      "Tingkat Derajat: 很, 太……了, 不太",
    ],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "Chen Hua & David",
      location: "Panggilan Telepon Sore Hari",
      goal: "Menanyakan kondisi cuaca di luar ruangan dan menanyakan kabar kesehatan/stamina fisik setelah sepekan perkuliahan padat.",
      scenarioNotes:
        "Chen Hua menelepon David untuk mengajaknya berolahraga di luar kampus. Namun hari itu hujan turun dan udara sangat dingin, sementara David sedang merasa lelah setelah menyelesaikan ujian.",
    },

    dialogue: [
      {
        speaker: "Chen Hua",
        role: "Mahasiswa",
        hanzi: "喂，大卫！今天天气怎么样？",
        pinyin: "Wéi, Dàwèi! Jīntiān tiānqì zěnmeyàng?",
        translation: "Halo, David! Bagaimana cuaca hari ini?",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "今天天气不太好，外面下雨了，很冷。",
        pinyin: "Jīntiān tiānqì bú tài hǎo, wàimiàn xiàyǔ le, hěn lěng.",
        translation: "Cuaca hari ini tidak terlalu bagus, di luar turun hujan, sangat dingin.",
      },
      {
        speaker: "Chen Hua",
        role: "Mahasiswa",
        hanzi: "下雨了啊！明天天气怎么样？",
        pinyin: "Xiàyǔ le a! Míngtiān tiānqì zěnmeyàng?",
        translation: "Turun hujan ya! Besok bagaimana cuacanya?",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "明天不下雨，天气很好，不太冷也不太热。",
        pinyin: "Míngtiān bú xiàyǔ, tiānqì hěn hǎo, bú tài lěng yě bú tài rè.",
        translation: "Besok tidak hujan, cuaca sangat baik, tidak terlalu dingin dan juga tidak terlalu panas.",
      },
      {
        speaker: "Chen Hua",
        role: "Mahasiswa",
        hanzi: "你今天身体怎么样？你忙不忙？",
        pinyin: "Nǐ jīntiān shēntǐ zěnmeyàng? Nǐ máng bu máng?",
        translation: "Bagaimana kondisimu hari ini? Apakah kamu sibuk?",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "我今天有点儿累，今天我很忙。明天我很想去跑步！",
        pinyin: "Wǒ jīntiān yǒudiǎnr lèi, jīntiān wǒ hěn máng. Míngtiān wǒ hěn xiǎng qù pǎobù!",
        translation: "Hari ini saya agak lelah, hari ini saya sangat sibuk. Besok saya sangat ingin pergi lari pagi!",
      },
      {
        speaker: "Chen Hua",
        role: "Mahasiswa",
        hanzi: "好的，多喝热水，早点儿睡觉！明天见！",
        pinyin: "Hǎo de, duō hē rè shuǐ, zǎo diǎnr shuìjiào! Míngtiān jiàn!",
        translation: "Baiklah, minumlah banyak air hangat dan tidurlah lebih awal! Sampai jumpa besok!",
      },
    ],

    vocabulary: [
      {
        hanzi: "天气",
        pinyin: "tiānqì",
        tone: "Nada 1 + Nada 4",
        translation: "cuaca / iklim harian",
        partOfSpeech: "nomina",
        usageNotes:
          "Sering dipadukan: 天气很好 (cuacanya sangat bagus), 天气预报 (ramalan cuaca).",
        exampleHanzi: "今天天气很好。",
        examplePinyin: "Jīntiān tiānqì hěn hǎo.",
        exampleTranslation: "Hari ini cuaca sangat cerah.",
      },
      {
        hanzi: "怎么样",
        pinyin: "zěnmeyàng",
        tone: "Nada 3 + netral + Nada 4",
        translation: "bagaimana / seperti apa",
        partOfSpeech: "pronomina interogativa",
        usageNotes:
          "Diletakkan di akhir topik untuk meminta pendapat atau penilaian kondisi: [Topik] + 怎么样？",
        exampleHanzi: "你今天怎么样？",
        examplePinyin: "Nǐ jīntiān zěnmeyàng?",
        exampleTranslation: "Bagaimana kabarmu hari ini?",
      },
      {
        hanzi: "热",
        pinyin: "rè",
        tone: "Nada 4",
        translation: "panas",
        partOfSpeech: "adjektiva",
        usageNotes:
          "Menyatakan suhu udara panas atau makanan panas: 今天太热了 (hari ini terlalu panas).",
        exampleHanzi: "夏天很热。",
        examplePinyin: "Xiàtiān hěn rè.",
        exampleTranslation: "Musim panas sangatlah panas.",
      },
      {
        hanzi: "冷",
        pinyin: "lěng",
        tone: "Nada 3",
        translation: "dingin",
        partOfSpeech: "adjektiva",
        usageNotes:
          "Memiliki radikal dua titik es (冫) di sebelah kiri.",
        exampleHanzi: "外面很冷。",
        examplePinyin: "Wàimiàn hěn lěng.",
        exampleTranslation: "Di luar sangat dingin.",
      },
      {
        hanzi: "下雨",
        pinyin: "xiàyǔ",
        tone: "Nada 4 + Nada 3",
        translation: "turun hujan",
        partOfSpeech: "verba berobjek",
        usageNotes:
          "Kombinasi kata 下 (turun) + 雨 (hujan): 明天下雨 (besok hujan). Negasinya adalah 不下雨.",
        exampleHanzi: "今天下雨了。",
        examplePinyin: "Jīntiān xiàyǔ le.",
        exampleTranslation: "Hari ini turun hujan.",
      },
      {
        hanzi: "雨",
        pinyin: "yǔ",
        tone: "Nada 3",
        translation: "hujan (air hujan)",
        partOfSpeech: "nomina",
        usageNotes:
          "Piktograf tetesan air hujan dari awan langit: 大雨 (hujan lebat).",
        exampleHanzi: "雨很大。",
        examplePinyin: "Yǔ hěn dà.",
        exampleTranslation: "Hujannya sangat lebat.",
      },
      {
        hanzi: "好",
        pinyin: "hǎo",
        tone: "Nada 3",
        translation: "baik / bagus / cerah",
        partOfSpeech: "adjektiva",
        usageNotes:
          "Saat menerangkan cuaca, bermakna cuaca cerah bersahabat (天气好).",
        exampleHanzi: "明天天气好。",
        examplePinyin: "Míngtiān tiānqì hǎo.",
        exampleTranslation: "Besok cuaca bagus.",
      },
      {
        hanzi: "忙",
        pinyin: "máng",
        tone: "Nada 2",
        translation: "sibuk",
        partOfSpeech: "adjektiva",
        usageNotes:
          "Menyatakan banyaknya urusan: 我很忙 (saya sangat sibuk). Memiliki radikal hati berdiri 忄.",
        exampleHanzi: "他最近很忙。",
        examplePinyin: "Tā zuìjìn hěn máng.",
        exampleTranslation: "Akhir-akhir ini dia sangat sibuk.",
      },
      {
        hanzi: "累",
        pinyin: "lèi",
        tone: "Nada 4",
        translation: "lelah / capek",
        partOfSpeech: "adjektiva",
        usageNotes:
          "Menandakan keletihan fisik: 我很累 (saya sangat lelah).",
        exampleHanzi: "工作了一天，我很累。",
        examplePinyin: "Gōngzuò le yì tiān, wǒ hěn lèi.",
        exampleTranslation: "Setelah bekerja seharian, saya sangat lelah.",
      },
      {
        hanzi: "高兴",
        pinyin: "gāoxìng",
        tone: "Nada 1 + Nada 4",
        translation: "senang / gembira",
        partOfSpeech: "adjektiva",
        usageNotes:
          "Menyatakan suasana hati sukacita: 认识你很高兴 (senang berkenalan denganmu).",
        exampleHanzi: "今天我们很高兴。",
        examplePinyin: "Jīntiān wǒmen hěn gāoxìng.",
        exampleTranslation: "Hari ini kami sangat gembira.",
      },
      {
        hanzi: "身体",
        pinyin: "shēntǐ",
        tone: "Nada 1 + Nada 3",
        translation: "tubuh / kesehatan fisik",
        partOfSpeech: "nomina",
        usageNotes:
          "Sering ditanyakan saat menanyakan kabar kesehatan: 身体好吗？(Kesehatannya baik?).",
        exampleHanzi: "我身体很好。",
        examplePinyin: "Wǒ shēntǐ hěn hǎo.",
        exampleTranslation: "Kesehatan saya sangat prima.",
      },
      {
        hanzi: "不太",
        pinyin: "bú tài",
        tone: "Nada 2 + Nada 4",
        translation: "tidak terlalu / kurang begitu",
        partOfSpeech: "frasa adverbia derajat",
        usageNotes:
          "Sanggahan derajat sopan: 不太冷 (tidak terlalu dingin), 不太忙 (tidak terlalu sibuk).",
        exampleHanzi: "今天不太热。",
        examplePinyin: "Jīntiān bú tài rè.",
        exampleTranslation: "Hari ini tidak terlalu panas.",
      },
      {
        hanzi: "今天",
        pinyin: "jīntiān",
        tone: "Nada 1 + Nada 1",
        translation: "hari ini",
        partOfSpeech: "nomina waktu",
        usageNotes:
          "Menandai waktu hari sekarang.",
        exampleHanzi: "今天冷吗？",
        examplePinyin: "Jīntiān lěng ma?",
        exampleTranslation: "Apakah hari ini dingin?",
      },
      {
        hanzi: "明天",
        pinyin: "míngtiān",
        tone: "Nada 2 + Nada 1",
        translation: "besok",
        partOfSpeech: "nomina waktu",
        usageNotes:
          "Menandai waktu satu hari ke depan.",
        exampleHanzi: "明天不下雨。",
        examplePinyin: "Míngtiān bú xiàyǔ.",
        exampleTranslation: "Besok tidak turun hujan.",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "多喝水",
        pinyin: "duō hē shuǐ",
        tone: "Nada 1 + Nada 1 + Nada 3",
        translation: "banyaklah minum air",
        isEnrichment: true,
        inclusionReason:
          "Ungkapan perhatian dan empati paling universal dalam kebudayaan percakapan Tionghoa.",
        exampleHanzi: "天气很冷，多喝热水。",
        examplePinyin: "Tiānqì hěn lěng, duō hē rè shuǐ.",
        exampleTranslation: "Cuaca sangat dingin, banyaklah minum air hangat.",
      },
      {
        hanzi: "舒服",
        pinyin: "shūfu",
        tone: "Nada 1 + netral",
        translation: "nyaman / enak badan",
        isEnrichment: true,
        inclusionReason:
          "Menyatakan kondisi stamina tubuh: 不舒服 (kurang enak badan / tidak sehat).",
        exampleHanzi: "我今天身体不舒服。",
        examplePinyin: "Wǒ jīntiān shēntǐ bù shūfu.",
        exampleTranslation: "Hari ini tubuh saya kurang enak badan.",
      },
      {
        hanzi: "外面",
        pinyin: "wàimiàn",
        tone: "Nada 4 + netral",
        translation: "di luar / bagian luar",
        isEnrichment: true,
        inclusionReason:
          "Pembeda lokasi krusial saat membicarakan cuaca di luar ruangan (外面下雨).",
        exampleHanzi: "外面很冷，请进。",
        examplePinyin: "Wàimiàn hěn lěng, qǐng jìn.",
        exampleTranslation: "Di luar sangat dingin, silakan masuk.",
      },
      {
        hanzi: "下雪",
        pinyin: "xiàxuě",
        tone: "Nada 4 + Nada 3",
        translation: "turun salju",
        isEnrichment: true,
        inclusionReason:
          "Fenomena cuaca musim dingin khas Tiongkok utara yang melengkapi kosakata cuaca.",
        exampleHanzi: "北京冬天常下雪。",
        examplePinyin: "Běijīng dōngtiān cháng xiàxuě.",
        exampleTranslation: "Musim dingin di Beijing sering turun salju.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Pembedaan inisial alveolar 't' pada 'tiānqì' vs inisial affricate 'q' pada 'qì' (desis palatal berhembus kuat) vs 'x' pada 'xiàyǔ' dan 'xuéxí'.",
      tones:
        "Sandhi nada pada kata '不' (bù): dilafalkan 'bú' (nada 2 menanjak) sebelum suku kata bernada ke-4 seperti pada frasa 'bú tài' (不太) dan 'bú rè' (不热).",
      toneCombinations:
        "Pola kontur nada pada 'zěnmeyàng': 'zěn' (nada 3 rendah), 'me' (nada netral melayang), 'yàng' (nada 4 menukik tegas).",
      commonErrors:
        "Menyisipkan kata '是' sebelum kata sifat cuaca (misal salah berkata: 'Jīntiān tiānqì shì hěn lěng' — PANTANGAN BESAR, kata 'shì' TIDAK BOLEH digunakan sebelum kata sifat).",
      articulatoryTip:
        "Saat melafalkan 'rè' (panas), bulatkan bibir sedikit dan bunyikan huruf 'r' dengan ujung lidah melengkung ke atas.",
    },

    hanziComponents: [
      {
        hanzi: "天",
        structure: "Tunggal / Simetris (独体字)",
        components: "Garis kubah langit atas (一) + Komponen manusia besar merentang (大)",
        strokeCount: 4,
        strokeOrderRules: [
          "Garis mendatar atas (一)",
          "Garis mendatar tengah (一)",
          "Garis miring kiri (丿) → garis miring kanan (捺)",
        ],
        notes:
          "Melambangkan kanopi kubah langit biru yang membentang luas tepat di atas kepala manusia (大).",
      },
      {
        hanzi: "雨",
        structure: "Tunggal / Bingkai Alami (独体字)",
        components: "Garis langit atas (一) + Kotak bingkai awan mendung (冂) + Empat titik tetesan air hujan",
        strokeCount: 8,
        strokeOrderRules: [
          "Garis mendatar atas (一)",
          "Garis tegak tengah (丨) → sudut patah (𠃍)",
          "Tusukan garis tegak pembagi langit (丨)",
          "Empat titik air hujan: dua di kiri (丶, 丶) dan dua di kanan (丶, 丶)",
        ],
        notes:
          "Piktograf murni yang menggambarkan tetesan air hujan yang berjatuhan dari gumpalan awan langit.",
      },
      {
        hanzi: "冷",
        structure: "Kiri-Kanan (左右结构)",
        components: "冫 (radikal dua titik es di kiri) + 令 (perintah / komponen fonetik di kanan)",
        strokeCount: 7,
        strokeOrderRules: [
          "Kiri sebelum kanan (从左到右)",
          "Tulis radikal dua titik es 冫 terlebih dahulu: titik atas (丶) dan goresan miring naik (提)",
          "Tulis komponen 令 di sebelah kanan (丿, 捺, 一, ㇇, 丶)",
        ],
        notes:
          "Radikal '冫' (dua titik es) menandakan pembekuan air oleh suhu dingin ekstrem.",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Kaidah Predikat Adjektiva Murni: [Subjek] + 很 / 太 / 不太 + [Adjektiva]",
        formula: "[Subjek / Cuaca / Seseorang] + [Adverbia Derajat: 很 / 太 / 不太] + [Kata Sifat]",
        explanation:
          "Kata sifat dalam bahasa Mandarin dapat berfungsi langsung sebagai predikat kalimat tanpa kata kerja '是' (shì). Untuk membentuk kalimat afirmatif netral, letakkan '很' (hěn) sebelum kata sifat. Untuk derajat berlebih, gunakan '太……了'. Untuk sanggahan moderat, gunakan '不太' (tidak terlalu).",
        example:
          "今天很冷。(Hari ini dingin.) | 今天太热了！(Hari ini terlalu panas!) | 今天不太忙。(Hari ini tidak terlalu sibuk.)",
        positiveExamples: [
          {
            hanzi: "天气很好。",
            pinyin: "Tiānqì hěn hǎo.",
            translation: "Cuacanya sangat bagus.",
          },
          {
            hanzi: "我今天不太累。",
            pinyin: "Wǒ jīntiān bú tài lèi.",
            translation: "Saya hari ini tidak terlalu lelah.",
          },
        ],
        usageConstraints:
          "PANTANGAN BESAR: Jangan gunakan kata '是' sebelum kata sifat (SALAH: 'Tiānqì shì hǎo', BENAR: 'Tiānqì hěn hǎo').",
        commonErrors:
          "Menyisipkan 'shì' meniru pola bahasa Inggris 'The weather is good' (is = 是).",
        communicativeFunction:
          "Mendeskripsikan fenomena iklim alam dan kondisi stamina fisik secara tepat.",
      },
      {
        ruleTitle: "Kata Tanya Evaluasi Kondisi: [Topik] + 怎么样 ？",
        formula: "[Subjek / Kondisi / Cuaca] + 怎么样 (zěnmeyàng) ？",
        explanation:
          "Pola tanya standar untuk meminta evaluasi, deskripsi kondisi, atau saran dari lawan bicara. Artinya setara dengan 'Bagaimana cuaca...?' atau 'Bagaimana kondisimu?'.",
        example:
          "今天天气怎么样？(Bagaimana cuaca hari ini?) | 你的身体怎么样？(Bagaimana kesehatanmu?)",
        positiveExamples: [
          {
            hanzi: "明天天气怎么样？",
            pinyin: "Míngtiān tiānqì zěnmeyàng?",
            translation: "Bagaimana cuaca besok?",
          },
          {
            hanzi: "这个中国菜怎么样？",
            pinyin: "Zhè gè Zhōngguó cài zěnmeyàng?",
            translation: "Bagaimana rasa hidangan Tiongkok ini?",
          },
        ],
        usageConstraints:
          "Jangan menambahkan partikel '吗' di akhir kalimat yang sudah menggunakan '怎么样'.",
        commonErrors:
          "Menanyakan 'zěnmeyàng ma?' (salah, cukup 'zěnmeyàng?').",
        communicativeFunction:
          "Membuka topik obrolan ramah tamah sehari-hari dan meminta ulasan situasi.",
      },
      {
        ruleTitle: "Menyatakan Fenomena Alam Cuaca: 下雨 (Turun Hujan) & Negasinya 不下雨",
        formula:
          "Pernyataan Ada Hujan: [Waktu] + 下雨 (xiàyǔ) + [了] | Negasi Tidak Hujan: [Waktu] + 不下雨 (bú xiàyǔ)",
        explanation:
          "Dalam bahasa Mandarin, fenomena turun hujan dinyatakan dengan verba-objek '下雨' (xiàyǔ). Jika hujan baru saja mulai turun atau sedang terjadi, tambahkan partikel perubahan status '了' di akhir (下雨了). Untuk menyatakan tidak hujan, gunakan negasi '不' (不下雨).",
        example: "外面下雨了。(Di luar turun hujan.) | 明天不下雨。(Besok tidak hujan.)",
        positiveExamples: [
          {
            hanzi: "今天下雨，我不去学校。",
            pinyin: "Jīntiān xiàyǔ, wǒ bú qù xuéxiào.",
            translation: "Hari ini turun hujan, saya tidak pergi ke sekolah.",
          },
          {
            hanzi: "昨天没有下雨。",
            pinyin: "Zuótiān méiyǒu xiàyǔ.",
            translation: "Kemarin tidak turun hujan (lampau menggunakan 没有).",
          },
        ],
        usageConstraints:
          "Gunakan '不' untuk masa kini/masa depan (不下雨) dan '没有' untuk waktu lampau (昨天没有下雨).",
        commonErrors:
          "Menyusun kalimat 'yǔ xià' (salah, urutan baku selalu kata kerja di depan: xiàyǔ).",
        communicativeFunction:
          "Menginformasikan kondisi cuaca riil untuk pertimbangan rencana perjalanan.",
      },
      {
        ruleTitle: "Pola Sanggahan Derajat Moderat: 不太 + [Kata Sifat]",
        formula: "[Subjek] + 不太 (bú tài) + [Kata Sifat]",
        explanation:
          "Frasa '不太' berfungsi memperhalus ungkapan penolakan atau keluhan. Daripada mengatakan secara kasar 'tidak baik' (不好), penutur Mandarin lebih memilih mengatakan 'tidak terlalu baik' (不太好) untuk menjaga keharmonisan tutur sosial.",
        example: "今天不太冷，也不太热。(Hari ini tidak terlalu dingin dan juga tidak terlalu panas.)",
        positiveExamples: [
          {
            hanzi: "我今天不太忙。",
            pinyin: "Wǒ jīntiān bú tài máng.",
            translation: "Saya hari ini tidak terlalu sibuk.",
          },
          {
            hanzi: "这个菜不太辣。",
            pinyin: "Zhè gè cài bú tài là.",
            translation: "Masakan ini tidak terlalu pedas.",
          },
        ],
        usageConstraints:
          "Karakter '不' otomatis mengalami sandhi nada menjadi 'bú' karena diikuti nada ke-4 pada 'tài'.",
        commonErrors:
          "Melafalkan 'bù tài' dengan nada ke-4 kaku tanpa sandhi nada ke-2.",
        communicativeFunction:
          "Menyampaikan kritik atau keluhan kondisi secara halus dan beretika.",
      },
    ],

    culturalNotes:
      "Budaya Berbincang Cuaca & Filosofi 'Banyak Minum Air Hangat' (多喝热水): Di Tiongkok, menanyakan cuaca bukan sekadar basa-basi, melainkan wujud kepedulian terhadap kesehatan orang lain. Dalam pengobatan tradisional Tiongkok (TCM), tubuh manusia sangat dipengaruhi oleh keseimbangan unsur dingin (寒 - hán) dan panas (热 - rè). Oleh karena itu, masyarakat Tiongkok memiliki kebiasaan universal meminum air hangat (热水 - rèshuǐ) dalam segala cuaca, dan frasa '多喝热水' (banyaklah minum air hangat) adalah bentuk perhatian paling tulus saat seseorang merasa lelah atau kurang enak badan.",

    listeningActivity: {
      goal: "Mendengarkan rekaman percakapan telepon mengenai cuaca dan kondisi stamina untuk menentukan fakta cuaca dan rencana kegiatan.",
      audioText: "大卫，今天外面下雨了，很冷。明天天气很好，不下雨，我们明天下午去跑步，怎么样？",
      pinyin: "Dàwèi, jīntiān wàimiàn xiàyǔ le, hěn lěng. Míngtiān tiānqì hěn hǎo, bú xiàyǔ, wǒmen míngtiān xiàwǔ qù pǎobù, zěnmeyàng?",
      translation: "David, hari ini di luar turun hujan, sangat dingin. Besok cuaca sangat bagus, tidak hujan, bagaimana kalau besok sore kita pergi lari?",
      gistQuestion: {
        question:
          "Bagaimana kondisi cuaca hari ini dan besok menurut percakapan rekaman di atas?",
        options: [
          "Hari ini hujan dan dingin, besok cuaca bagus tidak hujan (今天下雨很冷，明天天气好不下雨)",
          "Hari ini dan besok dua-duanya hujan lebat",
          "Hari ini sangat panas, besok turun salju",
          "Hari ini cerah, besok badai petir",
        ],
        correctAnswer: "Hari ini hujan dan dingin, besok cuaca bagus tidak hujan (今天下雨很冷，明天天气好不下雨)",
        explanation:
          "Audio menyatakan: 'jīntiān wàimiàn xiàyǔ le, hěn lěng. Míngtiān tiānqì hěn hǎo, bú xiàyǔ.'",
      },
      detailQuestion: {
        question:
          "Kapan pembicara mengajak David untuk pergi lari bersama?",
        options: [
          "Besok sore (明天下午 - míngtiān xiàwǔ)",
          "Hari ini pagi (今天上午 - jīntiān shàngwǔ)",
          "Hari ini malam (今天晚上 - jīntiān wǎnshang)",
          "Besok subuh (明天早上 - míngtiān zǎoshang)",
        ],
        correctAnswer: "Besok sore (明天下午 - míngtiān xiàwǔ)",
        explanation:
          "Audio secara gamblang menyebutkan: 'wǒmen míngtiān xiàwǔ qù pǎobù'.",
      },
    },

    speakingActivity: {
      prompt:
        "Lakukan rekaman lisan tentang laporan cuaca dan kondisimu hari ini dalam 4 kalimat bahasa Mandarin: 1) Deskripsikan cuaca hari ini apakah hujan, dingin, atau panas (今天天气……，很冷/热/下雨); 2) Ungkapkan kondisi staminamu apakah sedang lelah, sibuk, atau gembira (我今天很忙/有点儿累/很高兴); 3) Prediksikan cuaca besok (明天不下雨，天气很好); 4) Berikan pesan kepedulian kepada kawanmu (多喝水，明天见).",
      vocabularySupport: [
        "今天天气 (jīntiān tiānqì: cuaca hari ini)",
        "很冷 / 很热 / 下雨 (hěn lěng / hěn rè / xiàyǔ)",
        "很忙 / 累 / 高兴 (hěn máng / lèi / gāoxìng)",
        "身体很好 (shēntǐ hěn hǎo: kesehatan sangat baik)",
        "多喝水 (duō hē shuǐ: banyaklah minum air)",
      ],
      evaluationRubric:
        "Kriteria Penilaian: 1) Tidak menggunakan kata 'shì' sebelum kata sifat; 2) Pengucapan 'xiàyǔ' dengan nada yang tepat; 3) Penerapan sandhi nada pada 'bú tài'; 4) Kelancaran pelafalan intonasi empati.",
    },

    readingActivity: {
      textHanzi:
        "北京的冬天很冷。今天上午十点，外面下雪了，天气很冷，只有两度。大卫在宿舍里看书，他身体不太好，觉得有点儿累。李明给大卫打电话，李明说：‘大卫，外面冷，你多喝点儿热水，多穿点儿衣服，早点儿睡觉。’大卫听了很高兴，他说：‘谢谢你，我的好朋友！’",
      textPinyin:
        "Běijīng de dōngtiān hěn lěng. Jīntiān shàngwǔ shí diǎn, wàimiàn xiàxuě le, tiānqì hěn lěng, zhǐyǒu liǎng dù. Dàwèi zài sùshè lǐ kàn shū, tā shēntǐ bú tài hǎo, juéde yǒudiǎnr lèi. Lǐ Míng gěi Dàwèi dǎ diànhuà, Lǐ Míng shuō: ‘Dàwèi, wàimiàn lěng, nǐ duō hē diǎnr rè shuǐ, duō chuān diǎnr yīfu, zǎo diǎnr shuìjiào.’ Dàwèi tīng le hěn gāoxìng, tā shuō: ‘Xièxie nǐ, wǒ de hǎo péngyou!’",
      textTranslation:
        "Musim dingin di Beijing sangat dingin. Pukul 10 pagi hari ini, di luar turun salju, cuacanya sangat dingin, suhunya hanya 2 derajat. David sedang membaca buku di dalam asrama, staminanya kurang enak badan, merasa agak lelah. Li Ming menelepon David dan berkata: 'David, di luar dingin, kamu minumlah banyak air hangat, pakailah lebih banyak pakaian, dan tidurlah lebih awal.' David mendengar hal itu merasa sangat senang, dia berkata: 'Terima kasih, sahabat baikku!'",
      mainIdea:
        "Kondisi cuaca dingin bersalju di Beijing dan perhatian hangat Li Ming terhadap David yang sedang kurang enak badan di asrama.",
      questions: [
        {
          question:
            "Saran kepedulian apakah yang diberikan oleh Li Ming kepada David saat menelepon?",
          options: [
            "Banyak minum air hangat, pakai banyak baju, dan tidur lebih awal (多喝热水，多穿衣服，早点睡觉)",
            "Pergi ke restoran makan es krim bersama",
            "Pergi ke perpustakaan membeli komputer baru",
            "Segera pergi ke rumah sakit mencari guru",
          ],
          correctAnswer: "Banyak minum air hangat, pakai banyak baju, dan tidur lebih awal (多喝热水，多穿衣服，早点睡觉)",
          explanation:
            "Teks menyatakan: 'Lǐ Míng shuō: nǐ duō hē diǎnr rè shuǐ, duō chuān diǎnr yīfu, zǎo diǎnr shuìjiào.'",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tuliskan 3 karakter Hanzi bertema cuaca berikut di buku kotak latihan dengan memperhatikan proporsi dan urutan goresan yang benar: '天' (tiān - langit/cuaca), '雨' (yǔ - hujan), dan '冷' (lěng - dingin).",
      minimumCharacters: 3,
      checklist: [
        "Menulis '天': 4 goresan; dua garis mendatar di atas (一, 一) → garis miring kiri (丿) → garis miring kanan tebal (捺).",
        "Menulis '雨': 8 goresan; garis mendatar atas (一) → kotak awan mendung (丨, 𠃍) → garis tegak tengah (丨) → empat titik air hujan di dalam rongga.",
        "Menulis '冷': 7 goresan; radikal dua titik es '冫' di sebelah kiri terlebih dahulu, baru komponen '令' di kanan.",
      ],
      modelAnswer: {
        hanzi: "今天冷下雨，明天天气好",
        pinyin: "jīntiān lěng xiàyǔ, míngtiān tiānqì hǎo",
        translation: "hari ini dingin dan hujan, besok cuacanya bagus",
      },
    },

    personalizationPrompt:
      "Tuliskan laporan cuaca kotamu saat ini beserta perasaanmu dalam bahasa Mandarin di Buku Frasa pribadi: '我的城市今天天气……，我觉得很……。'",
    errorJournalHooks: [
      "Menyelipkan kata 'shì' sebelum kata sifat cuaca (contoh salah: 'Jīntiān tiānqì shì lěng', yang benar: 'Jīntiān tiānqì hěn lěng')",
      "Menambahkan partikel tanya 'ma' setelah kata tanya 'zěnmeyàng'",
      "Menyusun kata terbalik 'yǔ xià' alih-alih bentuk baku verba-objek 'xiàyǔ'",
      "Melafalkan 'bù tài' dengan nada ke-4 kaku tanpa menerapkan sandhi nada ke-2 'bú tài'",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna mampu menanyakan cuaca dan kondisi dengan '怎么样', mendeskripsikan cuaca harian (冷, 热, 下雨), menyatakan kondisi fisik tanpa menyisipkan kata '是' sebelum kata sifat, serta menggunakan sanggahan halus '不太' dengan tingkat akurasi minimal 80%.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Pelajari kembali aturan kalimat predikat adjektiva dan latihan kata sifat cuaca pada menu Latihan Soal Unit 10.",
    },
  },

  // -------------------------------------------------------------
  // HSK 1 Unit 11: Kemampuan & Permintaan Santun (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "hsk1-11",
    moduleId: "hsk1",
    slug: "11",
    unitNumber: 11,
    title: "Kemampuan & Permintaan Santun",
    hanzi: "能力与礼貌表达",
    pinyin: "Nénglì yǔ Lǐmào Biǎodá",
    translation: "Kemampuan Berbahasa, Permohonan Santun & Pemulihan Komunikasi",
    objectives:
      "Menguasai perbedaan pemakaian tiga kata kerja bantu modal 'bisa' (会 huì untuk keahlian hasil belajar, 能 néng untuk kapasitas fisik/situasi objektif, 可以 kěyǐ untuk kebolehan/izin); menyusun permohonan santun dengan '请' (qǐng); serta menguasai 5 kalimat pemulihan komunikasi kritis (我听不懂, 请再说一遍, 请说慢一点儿, 这个怎么说, 这是什么意思) saat berinteraksi dengan penutur asli.",
    overview:
      "Pelajaran kesebelas HSK 1 ini memberikan instrumen krusial bagi kelangsungan komunikasi di dunia nyata. Kamu akan belajar membedakan ragam makna 'bisa' dalam bahasa Mandarin—antara kemahiran hasil belajar (会), kapasitas fisik/kondisi objektif (能), dan izin sosial (可以)—serta memperlengkapi diri dengan 'tali pengaman percakapan' agar tetap tenang dan percaya diri ketika belum memahami tuturan lawan bicara.",
    vocabCount: 14,
    durationMinutes: 15,
    levelBadge: "HSK 1 · UNIT 11",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["hsk1-10"],
    skills: [
      "Kata Kerja Modal (会/能/可以)",
      "Permohonan Santun (请)",
      "Pemulihan Komunikasi (我听不懂)",
      "Ekspresi Tanya Maksud (什么意思)",
    ],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "David (Mahasiswa Asing) & Guru Wang (Dosen Bahasa)",
      location: "Ruang Konsultasi Dosen",
      goal: "Meminta izin berkonsultasi, menyatakan kendala membaca Hanzi, meminta pelafalan diperlambat, dan menanyakan pelafalan serta arti kata baru secara santun.",
      scenarioNotes:
        "David menemui Guru Wang di ruang kerja untuk mengonsultasikan teks bacaannya. Melalui dialog ini, David mempraktikkan bentuk santun 可以...吗, kata kerja bantu modal, dan frasa pemulihan komunikasi secara kontekstual.",
    },

    dialogue: [
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "王老师，请问，我可以进来吗？",
        pinyin: "Wáng lǎoshī, qǐngwèn, wǒ kěyǐ jìnlái ma?",
        translation: "Guru Wang, numpang tanya, bolehkah saya masuk?",
      },
      {
        speaker: "Guru Wang",
        role: "Dosen",
        hanzi: "请进！大卫，你有什么事？",
        pinyin: "Qǐng jìn! Dàwèi, nǐ yǒu shénme shì?",
        translation: "Silakan masuk! David, ada urusan apa?",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "我想请教您几个汉字。我会说一点儿汉语，但是我读得慢，也不会写这个字。",
        pinyin:
          "Wǒ xiǎng qǐngjiào nín jǐ gè hànzì. Wǒ huì shuō yìdiǎnr Hànyǔ, dànshì wǒ dú de màn, yě bú huì xiě zhè gè zì.",
        translation:
          "Saya ingin memohon petunjuk beberapa karakter Hanzi. Saya bisa berbicara sedikit Mandarin, tetapi saya membacanya pelan, dan juga belum bisa menulis karakter ini.",
      },
      {
        speaker: "Guru Wang",
        role: "Dosen",
        hanzi: "没问题，这个字读‘德’，意思是道德。",
        pinyin: "Méi wèntí, zhè gè zì dú ‘dé’, yìsi shì dàodé.",
        translation: "Tidak masalah, karakter ini dibaca 'dé', artinya kebajikan moral.",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "对不起，老师，我听不懂。请您说慢一点儿，可以吗？",
        pinyin: "Duìbuqǐ, lǎoshī, wǒ tīng bu dǒng. Qǐng nín shuō màn yìdiǎnr, kěyǐ ma?",
        translation:
          "Maaf, Guru, saya tidak paham mendengar ini. Bisakah Anda berbicara lebih pelan sedikit?",
      },
      {
        speaker: "Guru Wang",
        role: "Dosen",
        hanzi: "好，没关系。这个字用汉语怎么读？你可以读：‘dé’。懂了吗？",
        pinyin: "Hǎo, méi guānxi. Zhè gè zì yòng Hànyǔ zěnme dú? Nǐ kěyǐ dú: ‘dé’. Dǒng le ma?",
        translation:
          "Baik, tidak apa-apa. Karakter ini bagaimana membacanya dalam Mandarin? Kamu bisa membaca: 'dé'. Apakah sudah paham?",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "我懂了！请再说一遍，我写下来。谢谢老师！",
        pinyin: "Wǒ dǒng le! Qǐng zài shuō yí biàn, wǒ xiě xiàlái. Xièxie lǎoshī!",
        translation:
          "Saya paham! Tolong katakan sekali lagi, saya akan mencatatnya. Terima kasih Guru!",
      },
    ],

    vocabulary: [
      {
        hanzi: "会",
        pinyin: "huì",
        tone: "Nada 4",
        toneNumber: 4,
        translation: "bisa / dapat (karena keterampilan yang dipelajari)",
        partOfSpeech: "kata kerja bantu modal",
        usageNotes:
          "Digunakan khusus untuk kecakapan yang diperoleh melalui proses belajar atau latihan (misal: 会说汉语, 会写汉字, 会游泳).",
        exampleHanzi: "我会说一点儿汉语。",
        examplePinyin: "Wǒ huì shuō yìdiǎnr Hànyǔ.",
        exampleTranslation: "Saya bisa berbicara sedikit bahasa Mandarin.",
      },
      {
        hanzi: "能",
        pinyin: "néng",
        tone: "Nada 2",
        toneNumber: 2,
        translation: "bisa / sanggup (karena kondisi fisik atau situasi objektif)",
        partOfSpeech: "kata kerja bantu modal",
        usageNotes:
          "Menyatakan kesanggupan fisik, stamina, waktu, atau kondisi objektif yang memungkinkan terjadinya aksi (misal: 我今天能来, 你能吃辣吗).",
        exampleHanzi: "你明天能来学校吗？",
        examplePinyin: "Nǐ míngtiān néng lái xuéxiào ma?",
        exampleTranslation: "Apakah besok kamu bisa datang ke sekolah?",
      },
      {
        hanzi: "可以",
        pinyin: "kěyǐ",
        tone: "Nada 3 + Nada 3",
        toneNumber: 3,
        translation: "boleh / dapat (izin atau kelayakan sosial)",
        partOfSpeech: "kata kerja bantu modal",
        usageNotes:
          "Digunakan untuk memohon atau memberikan izin, serta menyatakan kebolehan tindakan secara sopan (misal: 我可以坐这儿吗？).",
        exampleHanzi: "我可以看一下你的书吗？",
        examplePinyin: "Wǒ kěyǐ kàn yíxià nǐ de shū ma?",
        exampleTranslation: "Bolehkah saya melihat bukumu sebentar?",
      },
      {
        hanzi: "请",
        pinyin: "qǐng",
        tone: "Nada 3",
        toneNumber: 3,
        translation: "silakan / tolong / mohon",
        partOfSpeech: "kata kerja / partikel kesantunan",
        usageNotes:
          "Diletakkan sebelum kata kerja untuk mengubah tuturan imperatif menjadi permohonan yang santun dan beradab.",
        exampleHanzi: "请进，请坐，请喝茶。",
        examplePinyin: "Qǐng jìn, qǐng zuò, qǐng hē chá.",
        exampleTranslation: "Silakan masuk, silakan duduk, silakan minum teh.",
      },
      {
        hanzi: "说",
        pinyin: "shuō",
        tone: "Nada 1",
        toneNumber: 1,
        translation: "berbicara / berkata / mengucapkan",
        partOfSpeech: "kata kerja",
        usageNotes:
          "Kata kerja vokal utama untuk komunikasi lisan. Sering berpadu dengan bahasa: 说汉语, 说英语.",
        exampleHanzi: "请您说慢一点儿。",
        examplePinyin: "Qǐng nín shuō màn yìdiǎnr.",
        exampleTranslation: "Tolong Anda berbicara lebih pelan sedikit.",
      },
      {
        hanzi: "听",
        pinyin: "tīng",
        tone: "Nada 1",
        toneNumber: 1,
        translation: "mendengar / menyimak",
        partOfSpeech: "kata kerja",
        usageNotes:
          "Biasa dikombinasikan dengan komplemen hasil atau potensi: 听见 (terdengar), 听懂 (paham mendengar), 听不懂 (tidak paham mendengar).",
        exampleHanzi: "对不起，我听不懂。",
        examplePinyin: "Duìbuqǐ, wǒ tīng bu dǒng.",
        exampleTranslation: "Maaf, saya tidak paham mendengar ini.",
      },
      {
        hanzi: "写",
        pinyin: "xiě",
        tone: "Nada 3",
        toneNumber: 3,
        translation: "menulis",
        partOfSpeech: "kata kerja",
        usageNotes:
          "Menulis karakter atau teks: 写汉字 (menulis Hanzi), 写字 (menulis huruf), 写下来 (mencatatnya).",
        exampleHanzi: "你会写这个汉字吗？",
        examplePinyin: "Nǐ huì xiě zhè gè hànzì ma?",
        exampleTranslation: "Apakah kamu bisa menulis karakter Hanzi ini?",
      },
      {
        hanzi: "读",
        pinyin: "dú",
        tone: "Nada 2",
        toneNumber: 2,
        translation: "membaca / melafalkan bersuara",
        partOfSpeech: "kata kerja",
        usageNotes:
          "Dapat bermakna membaca teks dengan suara lantang (朗读) atau membaca melafalkan suku kata (读音).",
        exampleHanzi: "请大家跟我读一遍。",
        examplePinyin: "Qǐng dàjiā gēn wǒ dú yí biàn.",
        exampleTranslation: "Silakan semuanya membaca bersama saya satu kali.",
      },
      {
        hanzi: "汉字",
        pinyin: "hànzì",
        tone: "Nada 4 + Nada 4",
        toneNumber: 4,
        translation: "karakter Hanzi / aksara Tionghoa",
        partOfSpeech: "kata benda",
        usageNotes:
          "Merujuk pada sistem aksara logografis Tionghoa (汉 - Suku Han / Tiongkok; 字 - karakter tulisan).",
        exampleHanzi: "学汉字很有意思，但是不容易。",
        examplePinyin: "Xué hànzì hěn yǒu yìsi, dànshì bù róngyì.",
        exampleTranslation: "Belajar karakter Hanzi sangat menarik, tetapi tidak mudah.",
      },
      {
        hanzi: "懂",
        pinyin: "dǒng",
        tone: "Nada 3",
        toneNumber: 3,
        translation: "mengerti / memahami",
        partOfSpeech: "kata kerja",
        usageNotes:
          "Menandakan pemahaman kognitif atas konsep atau ujaran lisan: 我懂了 (saya sudah paham), 你懂不懂？ (apakah kamu paham?).",
        exampleHanzi: "老师的话，我都懂了。",
        examplePinyin: "Lǎoshī de huà, wǒ dōu dǒng le.",
        exampleTranslation: "Perkataan dosen, semuanya sudah saya pahami.",
      },
      {
        hanzi: "慢",
        pinyin: "màn",
        tone: "Nada 4",
        toneNumber: 4,
        translation: "lambat / pelan",
        partOfSpeech: "kata sifat",
        usageNotes:
          "Lawan kata dari 快 (kuài). Dalam permohonan santun, dipasangkan dengan 一点儿 (màn yìdiǎnr = lebih pelan sedikit).",
        exampleHanzi: "请走慢一点儿。",
        examplePinyin: "Qǐng zǒu màn yìdiǎnr.",
        exampleTranslation: "Silakan berjalan lebih pelan sedikit.",
      },
      {
        hanzi: "快",
        pinyin: "kuài",
        tone: "Nada 4",
        toneNumber: 4,
        translation: "cepat",
        partOfSpeech: "kata sifat / kata keterangan",
        usageNotes:
          "Menyatakan laju pergerakan atau kecepatan waktu: 说得太快 (berbicara terlalu cepat), 快来 (cepat ke sini).",
        exampleHanzi: "他说得太快了，我听不懂。",
        examplePinyin: "Tā shuō de tài kuài le, wǒ tīng bu dǒng.",
        exampleTranslation: "Ia berbicara terlalu cepat, saya tidak paham.",
      },
      {
        hanzi: "意思",
        pinyin: "yìsi",
        tone: "Nada 4 + Nada netral",
        toneNumber: 4,
        translation: "arti / makna / maksud",
        partOfSpeech: "kata benda",
        usageNotes:
          "Sering dipakai dalam pola tanya arti: 这是什么意思？ (Ini apa artinya?); atau colokasi 有意思 (menarik).",
        exampleHanzi: "这个词是什么意思？",
        examplePinyin: "Zhè gè cí shì shénme yìsi?",
        exampleTranslation: "Kosakata ini apa artinya?",
      },
      {
        hanzi: "怎么",
        pinyin: "zěnme",
        tone: "Nada 3 + Nada netral",
        toneNumber: 3,
        translation: "bagaimana (cara melakukan perbuatan)",
        partOfSpeech: "kata tanya",
        usageNotes:
          "Diletakkan sebelum kata kerja untuk menanyakan metode aksi: 怎么读 (bagaimana membacanya), 怎么写 (bagaimana menulisnya), 怎么去 (bagaimana menuju ke sana).",
        exampleHanzi: "这个汉字怎么写？",
        examplePinyin: "Zhè gè hànzì zěnme xiě?",
        exampleTranslation: "Karakter Hanzi ini bagaimana cara menulisnya?",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "再",
        pinyin: "zài",
        tone: "Nada 4",
        toneNumber: 4,
        translation: "lagi / kembali (untuk tindakan mendatang)",
        partOfSpeech: "kata keterangan",
        isEnrichment: true,
        inclusionReason: "Penting untuk meminta pengulangan tuturan (再说一遍).",
        exampleHanzi: "请再说一遍。",
        examplePinyin: "Qǐng zài shuō yí biàn.",
        exampleTranslation: "Tolong katakan sekali lagi.",
      },
      {
        hanzi: "一遍",
        pinyin: "yí biàn",
        tone: "Nada 2 + Nada 4",
        toneNumber: 2,
        translation: "satu kali (dari awal hingga akhir)",
        partOfSpeech: "kata bantu ukur aksi",
        isEnrichment: true,
        inclusionReason: "Kombinasi baku bersama 再 untuk pengulangan putaran aksi lengkap.",
        exampleHanzi: "我想再听一遍录音。",
        examplePinyin: "Wǒ xiǎng zài tīng yí biàn lùyīn.",
        exampleTranslation: "Saya ingin mendengarkan rekaman sekali lagi.",
      },
      {
        hanzi: "用",
        pinyin: "yòng",
        tone: "Nada 4",
        toneNumber: 4,
        translation: "menggunakan / memakai / dengan",
        partOfSpeech: "kata kerja / preposisi instrumen",
        isEnrichment: true,
        inclusionReason: "Pola baku menanyakan bahasa: 用汉语怎么说 (bagaimana mengatakannya dalam Mandarin).",
        exampleHanzi: "这个用汉语怎么说？",
        examplePinyin: "Zhè gè yòng Hànyǔ zěnme shuō?",
        exampleTranslation: "Ini bagaimana mengatakannya dalam bahasa Mandarin?",
      },
      {
        hanzi: "没问题",
        pinyin: "méi wèntí",
        tone: "Nada 2 + Nada 4 + Nada 2",
        toneNumber: 2,
        translation: "tidak masalah / tentu saja",
        partOfSpeech: "frasa idiomatis",
        isEnrichment: true,
        inclusionReason: "Respons santun paling sering dipakai oleh penutur asli saat menyetujui permohonan.",
        exampleHanzi: "没问题，我可以帮助你。",
        examplePinyin: "Méi wèntí, wǒ kěyǐ bāngzhù nǐ.",
        exampleTranslation: "Tidak masalah, saya bisa membantumu.",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Perhatikan hembusan udara kuat pada huruf 'q' (请 - qǐng) vs desisan halus pada 'x' (写 - xiě), serta akhiran lidah melengkung 'er' pada 'yìdiǎnr' (一点儿).",
      tones:
        "Perubahan sandhi nada pada negasi '不': di depan nada ke-3 '懂' (dǒng), kata '不' tetap bernada ke-4 penuh 'bù dǒng'. Namun dalam konstruksi komplementer potensi '听不懂' (tīng bu dǒng), suku kata 'bu' dilafalkan sangat ringan dan netral.",
      toneCombinations:
        "Kombinasi Nada 3 + Nada 3 pada 'kěyǐ' (可以): suku kata 'kě' wajib diucapkan berubah menjadi Nada ke-2 naik ('kéyǐ').",
      commonErrors:
        "Mempertahankan nada ke-4 kaku pada suku kata tengah 'bu' dalam frasa 'tīng bu dǒng' sehingga terdengar terputus-putus, serta lupa menyemburkan udara saat melafalkan inisial 'q' pada 'qǐng'.",
      articulatoryTip:
        "Ucapkan 'tīng bu dǒng' sebagai satu kesatuan ritme musikal: ketukan 'tīng' tinggi datar, 'bu' meluncur ringan cepat, lalu 'dǒng' turun-naik rendah mantap.",
    },

    hanziComponents: [
      {
        hanzi: "会",
        structure: "Atas-Bawah",
        components: "人 (manusia) di atas + 云 (awan) di bawah",
        strokeCount: 6,
        strokeOrderRules: ["Atas ke bawah", "Miring kiri lalu miring kanan (人)", "Garis mendatar lalu kait (云)"],
        notes:
          "Dalam bentuk aksara tradisional '會', melambangkan pertemuan wadah bertutup. Karakter modern disederhanakan dengan komponen '云' di bawah naungan '人'.",
      },
      {
        hanzi: "说",
        structure: "Kiri-Kanan",
        components: "讠 (radikal wicara) di kiri + 兑 (komponen suara duì) di kanan",
        strokeCount: 9,
        strokeOrderRules: [
          "Kiri ke kanan",
          "Radikal wicara '讠' terlebih dahulu: titik (点), garis patah naik (横折提)",
          "Komponen '兑': dua titik atas, kotak tengah, garis melengkung bawah",
        ],
        notes:
          "Radikal semantik 讠 menandakan segala aktivitas yang berkaitan erat dengan kata-kata, percakapan, dan ucapan lisan manusia.",
      },
      {
        hanzi: "写",
        structure: "Atas-Bawah",
        components: "冖 (radikal penutup atap datar) di atas + 与 (memberi / dan) di bawah",
        strokeCount: 5,
        strokeOrderRules: [
          "Atas ke bawah",
          "Radikal penutup '冖': titik kiri (点), garis mendatar kait (横钩)",
          "Komponen bawah: garis mendatar (横), garis patah dua kali kait (竖折折钩), garis penutup (横)",
        ],
        notes:
          "Dalam bentuk kuno melambangkan meletakkan benda atau menorehkan tinta di bawah naungan meja penulisan.",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Perbedaan Tiga Modal 'Bisa': 会 vs 能 vs 可以",
        formula: "[Subjek] + [会 / 能 / 可以] + [Kata Kerja] + [Objek]",
        explanation:
          "Bahasa Indonesia memiliki kata 'bisa' atau 'dapat' yang serbaguna, namun bahasa Mandarin membedakannya ke dalam 3 spektrum makna: 1) '会' (huì) khusus untuk keterampilan/keahlian yang diperoleh melalui belajar atau latihan (misal: 会说汉语, 会写汉字, 会开车); 2) '能' (néng) untuk kemampuan fisik, kapasitas stamina, atau kemungkinan situasi objektif (misal: 我能吃辣, 我今天能来); 3) '可以' (kěyǐ) untuk izin atau kelayakan sosial (misal: 我可以坐这儿吗？).",
        example:
          "我会说汉语，但是我今天不能去上课，我可以请假吗？ (Wǒ huì shuō Hànyǔ, dànshì wǒ jīntiān bù néng qù shàngkè, wǒ kěyǐ qǐngjià ma? : Saya bisa bicara Mandarin, tetapi hari ini saya tidak bisa pergi kuliah karena sakit, bolehkah saya minta izin?)",
      },
      {
        ruleTitle: "Permohonan Santun & Permintaan Izin dengan '请' dan '可以……吗？'",
        formula: "请 / 请问 + [Kata Kerja]   |   [Subjek] + 可以 + [Kata Kerja] + 吗？",
        explanation:
          "Kata '请' (qǐng) adalah pelembut komunikasi paling penting dalam bahasa Mandarin. Menaruh '请' di depan kata kerja mengubah instruksi menjadi ajakan santun (请坐 = silakan duduk, 请喝茶 = silakan minum teh). Untuk meminta izin kepada lawan bicara, gunakan formula 'Subjek + 可以 + Kata Kerja + 吗？' (我可以进来吗？ = bolehkah saya masuk?).",
        example:
          "王老师，请问，我可以看一下这个汉字吗？ (Wáng lǎoshī, qǐngwèn, wǒ kěyǐ kàn yíxià zhè gè hànzì ma? : Guru Wang, numpang tanya, bolehkah saya melihat karakter Hanzi ini sebentar?)",
      },
      {
        ruleTitle: "Menanyakan Cara Melakukan Sesuatu dengan '怎么 + Kata Kerja'",
        formula: "[Benda/Hal] + 怎么 + [Kata Kerja]？",
        explanation:
          "Kata tanya '怎么' (zěnme) diletakkan tepat mendahului kata kerja untuk menanyakan metode atau tata cara melakukan perbuatan tersebut. Jangan menambahkan kata bantu lain di antara '怎么' dan kata kerja.",
        example:
          "这个字怎么读？ (Zhè gè zì zěnme dú? : Karakter ini bagaimana membacanya?) | 这个用汉语怎么说？ (Zhè gè yòng Hànyǔ zěnme shuō? : Ini bagaimana mengatakannya dalam bahasa Mandarin?)",
      },
      {
        ruleTitle: "Lima Formula Pemulihan Komunikasi Kritis (Survival Repair Patterns)",
        formula: "对不起 + [我听不懂 / 请说慢一点儿 / 请再说一遍 / 这是什么意思]",
        explanation:
          "Saat berhadapan dengan penutur asli yang berbicara terlalu cepat atau menggunakan kosakata asing, pembelajar wajib menguasai frasa pemulihan komunikasi untuk menjaga alur interaksi tetap santun dan tidak putus: 1) 我听不懂 (Saya tidak paham); 2) 请说慢一点儿 (Tolong bicara lebih pelan sedikit); 3) 请再说一遍 (Tolong katakan sekali lagi); 4) 这是什么意思？ (Ini apa artinya?); 5) 这个用汉语怎么说？ (Ini bagaimana mengatakannya dalam Mandarin?).",
        example:
          "对不起，我听不懂，请您说慢一点儿。 (Duìbuqǐ, wǒ tīng bu dǒng, qǐng nín shuō màn yìdiǎnr. : Maaf, saya tidak mengerti mendengar ini, tolong Anda berbicara lebih pelan sedikit.)",
      },
    ],

    culturalNotes:
      "Dalam budaya komunikasi Tionghoa, bertanya kepada guru atau senior diiringi oleh tata krama '请教' (qǐngjiào - memohon petunjuk). Mengakui ketidakpahaman secara jujur dan santun melalui frasa '我听不懂，请说慢一点儿' dipandang sebagai bukti kesungguhan belajar yang beradab dan sangat diapresiasi oleh penutur asli. Frasa pemulihan komunikasi ini adalah instrumen kepercayaan diri, bukan tanda kelemahan.",

    listeningActivity: {
      goal: "Memahami permohonan santun, membedakan makna kata kerja modal, serta mengidentifikasi penggunaan frasa pemulihan komunikasi dari dialog guru-murid.",
      audioText: "王老师，对不起，我听不懂。请您说慢一点儿，再读一遍，好吗？",
      pinyin: "Wáng lǎoshī, duìbuqǐ, wǒ tīng bu dǒng. Qǐng nín shuō màn yìdiǎnr, zài dú yí biàn, hǎo ma?",
      translation: "Guru Wang, maaf, saya tidak paham. Tolong Anda berbicara lebih pelan sedikit, dan membacanya sekali lagi, bolehkah?",
      gistQuestion: {
        question: "Apa kendala yang dialami oleh pembicara dalam rekaman audio di atas dan apa yang ia mohonkan kepada guru?",
        options: [
          "Pembicara tidak paham mendengar penjelasan, lalu memohon guru berbicara lebih pelan dan membaca sekali lagi",
          "Pembicara terlambat masuk kuliah dan meminta izin pulang lebih awal",
          "Pembicara ingin meminjam buku kamus di perpustakaan kampus",
          "Pembicara mengajak guru pergi makan siang bersama di kafetaria",
        ],
        correctAnswer:
          "Pembicara tidak paham mendengar penjelasan, lalu memohon guru berbicara lebih pelan dan membaca sekali lagi",
        explanation:
          "Pembicara menyatakan 'wǒ tīng bu dǒng' (saya tidak paham) dan memohon 'qǐng nín shuō màn yìdiǎnr, zài dú yí biàn' (tolong bicara lebih pelan dan baca sekali lagi).",
      },
      detailQuestion: {
        question: "Frasa manakah yang digunakan pembicara untuk meminta gurunya mengulang bacaan satu kali lagi?",
        options: [
          "再读一遍 (zài dú yí biàn)",
          "对不起 (duìbuqǐ)",
          "没关系 (méi guānxi)",
          "请进 (qǐng jìn)",
        ],
        correctAnswer: "再读一遍 (zài dú yí biàn)",
        explanation:
          "Kata '再' (lagi) dipadukan dengan kata kerja '读' (membaca) dan kata bantu ukur '一遍' (satu putaran penuh) untuk menyusun permintaan pengulangan bacaan.",
      },
    },

    speakingActivity: {
      prompt:
        "Lakukan rekaman lisan permohonan santun dan pemulihan komunikasi dalam 4 kalimat bahasa Mandarin: 1) Beri salam santun dan mohon izin masuk/bertanya (王老师好，请问我可以进来吗？); 2) Nyatakan keterampilan dan kendalamu secara jujur (我会说一点儿汉语，但是读得慢 / 不会写); 3) Gunakan frasa pemulihan komunikasi jika guru berbicara terlalu cepat (对不起，我听不懂，请说慢一点儿); 4) Tanyakan makna atau pelafalan karakter baru (这个字是什么意思？谢谢老师).",
      vocabularySupport: [
        "请问，我可以……吗？ (qǐngwèn, wǒ kěyǐ ... ma?)",
        "我会说……但是不会写…… (wǒ huì shuō ... dànshì bú huì xiě ...)",
        "我听不懂，请说慢一点儿 (wǒ tīng bu dǒng, qǐng shuō màn yìdiǎnr)",
        "这是什么意思？ (zhè shì shénme yìsi?)",
        "请再说一遍 (qǐng zài shuō yí biàn)",
      ],
      evaluationRubric:
        "Kriteria Penilaian: 1) Pemilihan kata kerja modal 'kěyǐ' yang tepat untuk meminta izin; 2) Pengucapan 'tīng bu dǒng' dengan nada netral yang alami pada 'bu'; 3) Kelancaran pelafalan frasa santun 'qǐng shuō màn yìdiǎnr'; 4) Intonasi santun, percaya diri, dan artikulasi vokal yang jelas.",
    },

    readingActivity: {
      textHanzi:
        "大卫是大学的一年级学生。他很喜欢学习汉语，他觉得汉字很有意思。大卫会说一点儿汉语，也能听懂老师的简单问题。但是有的汉字很难，大卫不会写，读得也很慢。今天上课的时候，老师说得很快，大卫听不懂。大卫举手说：‘王老师，请问，您可以说慢一点儿吗？’王老师微笑着说：‘没问题！大家看黑板，请跟我读一遍。’大卫很高兴，他学习很认真。",
      textPinyin:
        "Dàwèi shì dàxué de yī niánjí xuésheng. Tā hěn xǐhuan xuéxí Hànyǔ, tā juéde hànzì hěn yǒu yìsi. Dàwèi huì shuō yìdiǎnr Hànyǔ, yě néng tīng dǒng lǎoshī de jiǎndān wèntí. Dànshì yǒude hànzì hěn nán, Dàwèi bú huì xiě, dú de yě hěn màn. Jīntiān shàngkè de shíhou, lǎoshī shuō de hěn kuài, Dàwèi tīng bu dǒng. Dàwèi jǔshǒu shuō: ‘Wáng lǎoshī, qǐngwèn, nín kěyǐ shuō màn yìdiǎnr ma?’ Wáng lǎoshī wēixiào zhe shuō: ‘Méi wèntí! Dàjiā kàn hēibǎn, qǐng gēn wǒ dú yí biàn.’ Dàwèi hěn gāoxìng, tā xuéxí hěn rènzhēn.",
      textTranslation:
        "David adalah mahasiswa tahun pertama di universitas. Ia sangat suka belajar bahasa Mandarin, ia merasa karakter Hanzi sangat menarik. David bisa berbicara sedikit Mandarin, dan juga mampu memahami pertanyaan sederhana dari dosen. Namun beberapa karakter Hanzi sangat sulit, David belum bisa menulisnya, dan membacanya pun sangat lambat. Saat jam kuliah hari ini, dosen berbicara sangat cepat, David tidak mengerti. David mengangkat tangan dan berkata: 'Guru Wang, numpang tanya, bisakah Anda berbicara lebih pelan sedikit?' Guru Wang tersenyum dan berkata: 'Tidak masalah! Semuanya lihat papan tulis, silakan membaca bersama saya satu kali.' David merasa sangat gembira, ia belajar dengan sangat sungguh-sungguh.",
      mainIdea:
        "Pengalaman David di kelas bahasa Mandarin saat mengatasi kendala kecepatan bicara dosen dengan mengajukan permohonan santun secara terbuka.",
      questions: [
        {
          question:
            "Bagaimana cara David mengatasi situasi saat Guru Wang berbicara terlalu cepat di kelas?",
          options: [
            "Mengangkat tangan dan memohon dengan santun agar dosen berbicara lebih pelan (举手请老师说慢一点儿)",
            "Diam saja dan langsung keluar meninggalkan ruang kuliah",
            "Menyuruh teman sebangkunya untuk menjawab semua pertanyaan",
            "Berhenti mencatat dan tidur di atas meja kelas",
          ],
          correctAnswer:
            "Mengangkat tangan dan memohon dengan santun agar dosen berbicara lebih pelan (举手请老师说慢一点儿)",
          explanation:
            "Teks secara eksplisit menyatakan: 'Dàwèi jǔshǒu shuō: Wáng lǎoshī, qǐngwèn, nín kěyǐ shuō màn yìdiǎnr ma?'.",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tuliskan 3 karakter Hanzi bertema kemampuan dan komunikasi berikut di buku kotak latihan dengan memperhatikan proporsi dan urutan goresan: '会' (huì - bisa/keahlian), '说' (shuō - berbicara), dan '写' (xiě - menulis).",
      minimumCharacters: 3,
      checklist: [
        "Menulis '会': 6 goresan; struktur atas-bawah; radikal manusia di atas (撇, 捺) menaungi karakter '云' di bawah (一, 一, 撇折, 点).",
        "Menulis '说': 9 goresan; struktur kiri-kanan; radikal wicara '讠' di sebelah kiri terlebih dahulu (点, 横折提), baru menyusun komponen '兑' di sebelah kanan.",
        "Menulis '写': 5 goresan; radikal penutup atap '冖' di atas (点, 横钩) lalu komponen '与' di bawah (横, 竖折折钩, 横).",
      ],
      modelAnswer: {
        hanzi: "我会说汉语，写汉字",
        pinyin: "wǒ huì shuō Hànyǔ, xiě hànzì",
        translation: "saya bisa berbicara Mandarin dan menulis karakter Hanzi",
      },
    },

    personalizationPrompt:
      "Tuliskan 2 hal yang kamu BISA lakukan dalam bahasa Mandarin dan simpan 1 kalimat pemulihan komunikasi favoritmu di Buku Frasa pribadi: '我会说一点儿汉语，请说慢一点儿。'",
    errorJournalHooks: [
      "Menggunakan '会' untuk memohon izin (misal: '我会社坐这儿吗？' alih-alih bentuk tepat '我可以坐这儿吗？')",
      "Menghilangkan kata '请' saat memohon sehingga kalimat terdengar seperti instruksi perintah yang kaku",
      "Lupa menerapkan nada netral pada 'bu' dalam frasa komplementer '听不懂' (tīng bu dǒng)",
      "Menyusun urutan kata 'zài shuō yí biàn' terbalik menjadi 'yí biàn zài shuō'",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna mampu membedakan pemakaian kata kerja modal 会, 能, dan 可以 dengan tepat; mampu mengajukan permohonan santun dengan '请' dan '可以……吗？'; serta menguasai 5 frasa pemulihan komunikasi dasar dengan tingkat akurasi minimal 80%.",
      masteryThresholdPercent: 80,
      remedialRecommendation:
        "Pelajari kembali tabel perbandingan kata kerja bantu modal dan lakukan latihan peran komunikasi di menu Latihan Soal Unit 11.",
    },
  },

  // -------------------------------------------------------------
  // HSK 1 Unit 12: Review Integratif HSK 1 & Ujian Akhir Level (Template 16 Komponen Lengkap)
  // -------------------------------------------------------------
  {
    id: "hsk1-12",
    moduleId: "hsk1",
    slug: "12",
    unitNumber: 12,
    title: "Review Integratif HSK 1 & Ujian Akhir Level",
    hanzi: "综合复习与期末评估",
    pinyin: "Zōnghé Fùxí yǔ Qīmò Pínggū",
    translation: "Ulasan Menyeluruh, Portofolio Diri & Ujian Kelulusan HSK 1",
    objectives:
      "Mengintegrasikan 8 domain kompetensi inti HSK 1 (identitas perkenalan, kuantitas angka, waktu/kalender, relasi keluarga, rutinitas aktivitas, kuliner/pesanan, lokasi/navigasi, dan belanja/cuaca); menyusun portofolio profil personal mandiri tertulis dan lisan; serta menyelesaikan evaluasi komprehensif kelulusan level HSK 1 mencakup 5 pilar (Mendengar, Kosakata, Tata Bahasa, Membaca, dan Menulis Hanzi) dengan tingkat penguasaan minimal 85%.",
    overview:
      "Selamat tiba di garis akhir tingkat HSK 1! Pelajaran kedua belas ini adalah titik temu agung dari seluruh keterampilan yang telah kamu bangun secara tekun sejak Unit 01 hingga Unit 11. Kamu akan menguji daya ingat dan ketangkasan berbahasa melalui proyek mandiri perkenalan utuh, membedah teks profil paragraf panjang, merampungkan simulasi evaluasi kelulusan 5 pilar, serta memvalidasi kesiapan fondasimu untuk melangkah mantap menuju tingkat HSK 2.",
    vocabCount: 16,
    durationMinutes: 25,
    levelBadge: "HSK 1 · UNIT 12",
    status: "published",
    reviewer: "Tim Kurikulum KepoMandarin",
    prerequisites: ["hsk1-11"],
    skills: [
      "Integrasi 150 Kosakata HSK 1",
      "Produksi Profil Diri Komprehensif",
      "Analisis Wacana Paragraf Mandarin",
      "Evaluasi Kelulusan Tingkat HSK 1",
    ],
    curriculumVersion: "1.0.0",

    dialogueContext: {
      participants: "David (Mahasiswa Peserta Ujian) & Guru Wang (Dosen Penguji Kelulusan)",
      location: "Ruang Wawancara Evaluasi Lisan Akhir Semester",
      goal: "Menyampaikan profil diri lengkap, merespons pertanyaan spontan penguji seputar keluarga, rutinitas, dan makanan kesukaan, serta memaparkan refleksi kemajuan belajar.",
      scenarioNotes:
        "Wawancara ujian kelulusan lisan HSK 1 antara dosen penguji dan mahasiswa. Melalui interaksi ini, seluruh pola sintaksis dan perbendaharaan kata dari unit 01 hingga 11 dirajut secara mengalir.",
    },

    dialogue: [
      {
        speaker: "Guru Wang",
        role: "Dosen Penguji",
        hanzi: "大卫，你好！请坐。今天是 HSK 1 的期末考试，请你用汉语介绍一下你自己。",
        pinyin:
          "Dàwèi, nǐ hǎo! Qǐng zuò. Jīntiān shì HSK 1 de qīmò kǎoshì, qǐng nǐ yòng Hànyǔ jièshào yíxià nǐ zìjǐ.",
        translation:
          "Halo David! Silakan duduk. Hari ini adalah ujian akhir HSK 1, silakan perkenalkan dirimu dalam bahasa Mandarin.",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "王老师好！我叫大卫，我是印尼人，今年二十岁。我现在在大学学习汉语。",
        pinyin:
          "Wáng lǎoshī hǎo! Wǒ jiào Dàwèi, wǒ shì Yìnní rén, jīnnián èrshí suì. Wǒ xiànzài zài dàxué xuéxí Hànyǔ.",
        translation:
          "Halo Guru Wang! Nama saya David, saya orang Indonesia, tahun ini berusia 20 tahun. Sekarang saya belajar Mandarin di universitas.",
      },
      {
        speaker: "Guru Wang",
        role: "Dosen Penguji",
        hanzi: "很好。请介绍一下你的家人和每天的生活。",
        pinyin: "Hěn hǎo. Qǐng jièshào yíxià nǐ de jiārén hé měitiān de shēnghuó.",
        translation: "Sangat bagus. Tolong perkenalkan keluargamu dan kehidupan sehari-harimu.",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi:
          "我家有四口人：爸爸、妈妈、一个妹妹和我。我爸爸是医生，妈妈是老师。我每天早上七点起床，八点去上课。中午我和朋友在学校吃米饭和中国菜。下午我在图书馆看书。",
        pinyin:
          "Wǒ jiā yǒu sì kǒu rén: bàba, māma, yí gè mèimei hé wǒ. Wǒ bàba shì yīshēng, māma shì lǎoshī. Wǒ měitiān zǎoshang qī diǎn qǐchuáng, bā diǎn qù shàngkè. Zhōngwǔ wǒ hé péngyou zài xuéxiào chī mǐfàn hé Zhōngguó cài. Xiàwǔ wǒ zài túshūguǎn kàn shū.",
        translation:
          "Keluarga saya ada 4 orang: ayah, ibu, seorang adik perempuan, dan saya. Ayah saya dokter, ibu saya guru. Setiap hari saya bangun jam 7 pagi, jam 8 pergi kuliah. Siang hari saya dan teman makan nasi dan masakan Tiongkok di kampus. Sore hari saya membaca buku di perpustakaan.",
      },
      {
        speaker: "Guru Wang",
        role: "Dosen Penguji",
        hanzi: "北京今天天气怎么样？你喜欢在这里生活吗？",
        pinyin: "Běijīng jīntiān tiānqì zěnmeyàng? Nǐ xǐhuan zài zhèlǐ shēnghuó ma?",
        translation: "Bagaimana cuaca Beijing hari ini? Apakah kamu suka tinggal di sini?",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi:
          "今天天气很好，不太冷。我很喜欢北京，这里的东西不贵，中国朋友也很好，经常帮助我学习汉语。",
        pinyin:
          "Jīntiān tiānqì hěn hǎo, bú tài lěng. Wǒ hěn xǐhuan Běijīng, zhèlǐ de dōngxi bú guì, Zhōngguó péngyou yě hěn hǎo, jīngcháng bāngzhù wǒ xuéxí Hànyǔ.",
        translation:
          "Hari ini cuaca sangat bagus, tidak terlalu dingin. Saya sangat suka Beijing, barang-barang di sini tidak mahal, teman-teman Tiongkok juga sangat baik, sering membantu saya belajar Mandarin.",
      },
      {
        speaker: "Guru Wang",
        role: "Dosen Penguji",
        hanzi: "太棒了！你的发音很准，句子也很完整。恭喜你顺利通过 HSK 1 考试！",
        pinyin:
          "Tài bàng le! Nǐ de fāyīn hěn zhǔn, jùzi yě hěn wánzhěng. Gōngxǐ nǐ shùnlì tōngguò HSK 1 kǎoshì!",
        translation:
          "Luar biasa! Pelafalanmu sangat tepat, kalimatmu juga sangat lengkap. Selamat kamu berhasil lulus ujian HSK 1!",
      },
      {
        speaker: "David",
        role: "Mahasiswa",
        hanzi: "谢谢王老师！我会继续努力复习，准备学习 HSK 2！",
        pinyin: "Xièxie Wáng lǎoshī! Wǒ huì jìxù nǔlì fùxí, zhǔnbèi xuéxí HSK 2!",
        translation:
          "Terima kasih Guru Wang! Saya akan terus giat mengulang kaji dan bersiap belajar HSK 2!",
      },
    ],

    vocabulary: [
      {
        hanzi: "学习",
        pinyin: "xuéxí",
        tone: "Nada 2 + Nada 2",
        toneNumber: 2,
        translation: "belajar / menuntut ilmu",
        partOfSpeech: "kata kerja",
        usageNotes:
          "Dapat berdiri sendiri sebagai kata kerja aktif atau dipadukan dengan objek bidang ilmu (misal: 学习汉语).",
        exampleHanzi: "我们每天都在认真学习汉语。",
        examplePinyin: "Wǒmen měitiān dōu zài rènzhēn xuéxí Hànyǔ.",
        exampleTranslation: "Setiap hari kami belajar bahasa Mandarin dengan sungguh-sungguh.",
      },
      {
        hanzi: "介绍",
        pinyin: "jièshào",
        tone: "Nada 4 + Nada 4",
        toneNumber: 4,
        translation: "memperkenalkan / mengenalkan",
        partOfSpeech: "kata kerja",
        usageNotes:
          "Biasa berpadu dengan pelembut tindakan: 介绍一下 (mengenalkan sebentar), 自我介绍 (perkenalan diri).",
        exampleHanzi: "请你介绍一下你的朋友。",
        examplePinyin: "Qǐng nǐ jièshào yíxià nǐ de péngyou.",
        exampleTranslation: "Silakan perkenalkan temanmu sebentar.",
      },
      {
        hanzi: "自己",
        pinyin: "zìjǐ",
        tone: "Nada 4 + Nada 3",
        toneNumber: 4,
        translation: "diri sendiri / mandiri",
        partOfSpeech: "kata ganti refleksif",
        usageNotes:
          "Dapat diletakkan setelah kata ganti orang: 我自己 (saya sendiri), 你自己 (kamu sendiri).",
        exampleHanzi: "每个人都要做好自己的工作。",
        examplePinyin: "Měi gè rén dōu yào zuò hǎo zìjǐ de gōngzuò.",
        exampleTranslation: "Setiap orang harus melakukan pekerjaannya sendiri dengan baik.",
      },
      {
        hanzi: "岁",
        pinyin: "suì",
        tone: "Nada 4",
        toneNumber: 4,
        translation: "tahun (satuan umur / usia)",
        partOfSpeech: "kata bantu ukur",
        usageNotes:
          "Diletakkan langsung di belakang angka umur tanpa menyisipkan kata '个' (misal: 二十岁, bukan 二十个数).",
        exampleHanzi: "李明的妹妹今年七岁了。",
        examplePinyin: "Lǐ Míng de mèimei jīnnián qī suì le.",
        exampleTranslation: "Adik perempuan Li Ming tahun ini sudah berusia 7 tahun.",
      },
      {
        hanzi: "考试",
        pinyin: "kǎoshì",
        tone: "Nada 3 + Nada 4",
        toneNumber: 3,
        translation: "ujian / tes / asesmen",
        partOfSpeech: "kata benda / kata kerja",
        usageNotes:
          "Menyatakan evaluasi akademik: 期末考试 (ujian akhir semester), 参加考试 (mengikuti ujian).",
        exampleHanzi: "明天上午我们有汉语考试。",
        examplePinyin: "Míngtiān shàngwǔ wǒmen yǒu Hànyǔ kǎoshì.",
        exampleTranslation: "Besok pagi kami ada ujian bahasa Mandarin.",
      },
      {
        hanzi: "复习",
        pinyin: "fùxí",
        tone: "Nada 4 + Nada 2",
        toneNumber: 4,
        translation: "mengulang kaji / meninjau kembali pelajaran",
        partOfSpeech: "kata kerja",
        usageNotes:
          "Lawan atau pasangan dari 预习 (pratinjau). Meninjau materi lama untuk memantapkan pemahaman.",
        exampleHanzi: "考试前我们要认真复习功课。",
        examplePinyin: "Kǎoshì qián wǒmen yào rènzhēn fùxí gōngkè.",
        exampleTranslation: "Sebelum ujian kita harus meninjau pelajaran dengan sungguh-sungguh.",
      },
      {
        hanzi: "认识",
        pinyin: "rènshi",
        tone: "Nada 4 + Nada netral",
        toneNumber: 4,
        translation: "mengenal / kenal",
        partOfSpeech: "kata kerja",
        usageNotes:
          "Mengenal orang atau mengenali tulisan: 很高兴认识你 (senang mengenalmu), 认识这个字 (mengenali karakter ini).",
        exampleHanzi: "你认识那个中国学生吗？",
        examplePinyin: "Nǐ rènshi nà gè Zhōngguó xuésheng ma?",
        exampleTranslation: "Apakah kamu kenal mahasiswa Tiongkok itu?",
      },
      {
        hanzi: "朋友",
        pinyin: "péngyou",
        tone: "Nada 2 + Nada netral",
        toneNumber: 2,
        translation: "teman / sahabat",
        partOfSpeech: "kata benda",
        usageNotes:
          "Dapat diawali penjelas atributif: 好朋友 (sahabat baik), 新朋友 (teman baru), 中国朋友 (teman Tiongkok).",
        exampleHanzi: "大卫在大学认识了很多新朋友。",
        examplePinyin: "Dàwèi zài dàxué rènshi le hěn duō xīn péngyou.",
        exampleTranslation: "David telah mengenal banyak teman baru di universitas.",
      },
      {
        hanzi: "大家",
        pinyin: "dàjiā",
        tone: "Nada 4 + Nada 1",
        toneNumber: 4,
        translation: "semua orang / hadirin sekalian",
        partOfSpeech: "kata ganti jamak",
        usageNotes:
          "Menyapa forum atau kumpulan audiens secara hangat: 大家好 (halo semuanya), 请大家坐下 (silakan hadirin duduk).",
        exampleHanzi: "大家好，欢迎来到中文课！",
        examplePinyin: "Dàjiā hǎo, huānyíng lái dào Zhōngwén kè!",
        exampleTranslation: "Halo semuanya, selamat datang di kelas bahasa Mandarin!",
      },
      {
        hanzi: "帮助",
        pinyin: "bāngzhù",
        tone: "Nada 1 + Nada 4",
        toneNumber: 1,
        translation: "membantu / menolong / bantuan",
        partOfSpeech: "kata kerja / kata benda",
        usageNotes:
          "Menolong orang lain: 帮助我学习 (membantu saya belajar), 谢谢你的帮助 (terima kasih atas bantuanmu).",
        exampleHanzi: "老师经常在课后帮助我们解答问题。",
        examplePinyin: "Lǎoshī jīngcháng zài kèhòu bāngzhù wǒmen jiědá wèntí.",
        exampleTranslation: "Dosen sering membantu kami menjawab pertanyaan setelah jam kuliah.",
      },
      {
        hanzi: "问题",
        pinyin: "wèntí",
        tone: "Nada 4 + Nada 2",
        toneNumber: 4,
        translation: "pertanyaan / soal / masalah",
        partOfSpeech: "kata benda",
        usageNotes:
          "Dapat bermakna pertanyaan akademis (问问题) atau kendala/masalah hidup (没问题).",
        exampleHanzi: "请问，你有什么问题吗？",
        examplePinyin: "Qǐngwèn, nǐ yǒu shénme wèntí ma?",
        exampleTranslation: "Numpang tanya, apakah kamu ada pertanyaan?",
      },
      {
        hanzi: "完",
        pinyin: "wán",
        tone: "Nada 2",
        toneNumber: 2,
        translation: "selesai / tuntas / habis",
        partOfSpeech: "kata kerja / komplemen hasil",
        usageNotes:
          "Sering diletakkan tepat di belakang kata kerja utama untuk menandakan tuntasnya aksi: 学完 (selesai belajar), 看完 (selesai membaca).",
        exampleHanzi: "我学完了 HSK 1 的全部课文。",
        examplePinyin: "Wǒ xuéwán le HSK 1 de quánbù kèwén.",
        exampleTranslation: "Saya telah menyelesaikan seluruh teks pelajaran HSK 1.",
      },
      {
        hanzi: "高兴",
        pinyin: "gāoxìng",
        tone: "Nada 1 + Nada 4",
        toneNumber: 1,
        translation: "senang / gembira / bahagia",
        partOfSpeech: "kata sifat",
        usageNotes:
          "Menyatakan emosi bahagia. Pola kalimat: 很高兴 (sangat senang), 很高兴认识你 (sangat senang mengenalmu).",
        exampleHanzi: "今天听到这个好消息，大家都很高兴。",
        examplePinyin: "Jīntiān tīngdào zhè gè hǎo xiāoxi, dàjiā dōu hěn gāoxìng.",
        exampleTranslation: "Mendengar kabar baik hari ini, semuanya merasa sangat senang.",
      },
      {
        hanzi: "进步",
        pinyin: "jìnbù",
        tone: "Nada 4 + Nada 4",
        toneNumber: 4,
        translation: "kemajuan / berkembang pesat",
        partOfSpeech: "kata kerja / kata benda",
        usageNotes:
          "Menyatakan perkembangan kemampuan: 进步很大 (kemajuannya sangat besar), 祝你进步 (semoga kamu terus maju).",
        exampleHanzi: "经过努力，他的汉语水平进步很大。",
        examplePinyin: "Jīngguò nǔlì, tā de Hànyǔ shuǐpíng jìnbù hěn dà.",
        exampleTranslation: "Melalui ketekunan, kemahiran bahasa Mandarinnya berkembang sangat pesat.",
      },
      {
        hanzi: "祝",
        pinyin: "zhù",
        tone: "Nada 4",
        toneNumber: 4,
        translation: "mendoakan / mengucapkan selamat / semoga",
        partOfSpeech: "kata kerja",
        usageNotes:
          "Mengawali ucapan doa restu atau harapan baik: 祝你考试顺利 (semoga ujianmu lancar), 祝你天天开心 (semoga bahagia setiap hari).",
        exampleHanzi: "祝你学习进步，生活愉快！",
        examplePinyin: "Zhù nǐ xuéxí jìnbù, shēnghuó yúkuài!",
        exampleTranslation: "Semoga belajarmu kian maju dan hidupmu menyenangkan!",
      },
      {
        hanzi: "谢谢",
        pinyin: "xièxie",
        tone: "Nada 4 + Nada netral",
        toneNumber: 4,
        translation: "terima kasih",
        partOfSpeech: "kata kerja santun",
        usageNotes:
          "Ungkapan terima kasih universal: 谢谢你 (terima kasih kepadamu), 谢谢老师 (terima kasih Guru).",
        exampleHanzi: "非常谢谢大家的帮助！",
        examplePinyin: "Fēicháng xièxie dàjiā de bāngzhù!",
        exampleTranslation: "Sangat berterima kasih atas bantuan hadirin sekalian!",
      },
    ],

    enrichmentVocabulary: [
      {
        hanzi: "恭喜",
        pinyin: "gōngxǐ",
        tone: "Nada 1 + Nada 3",
        toneNumber: 1,
        translation: "selamat! / memberi selamat",
        partOfSpeech: "kata seru / kata kerja",
        isEnrichment: true,
        inclusionReason: "Ucapan kelulusan level resmi dalam tradisi Mandarin.",
        exampleHanzi: "恭喜你顺利通过期末考试！",
        examplePinyin: "Gōngxǐ nǐ shùnlì tōngguò qīmò kǎoshì!",
        exampleTranslation: "Selamat kamu berhasil lulus ujian akhir!",
      },
      {
        hanzi: "通过",
        pinyin: "tōngguò",
        tone: "Nada 1 + Nada 4",
        toneNumber: 1,
        translation: "lulus / melewati",
        partOfSpeech: "kata kerja",
        isEnrichment: true,
        inclusionReason: "Kosakata penentu kelulusan ujian akademik.",
        exampleHanzi: "大卫通过了第一阶段的考核。",
        examplePinyin: "Dàwèi tōngguò le dì-yī jiēduàn de kǎohé.",
        exampleTranslation: "David telah lulus asesmen tahap pertama.",
      },
      {
        hanzi: "准备",
        pinyin: "zhǔnbèi",
        tone: "Nada 3 + Nada 4",
        toneNumber: 3,
        translation: "bersiap / mempersiapkan",
        partOfSpeech: "kata kerja",
        isEnrichment: true,
        inclusionReason: "Penting untuk menyatakan perencanaan studi lanjutan (准备学习 HSK 2).",
        exampleHanzi: "我已经准备好学习新课了。",
        examplePinyin: "Wǒ yǐjīng zhǔnbèi hǎo xuéxí xīn kè le.",
        exampleTranslation: "Saya sudah siap mempelajari pelajaran baru.",
      },
      {
        hanzi: "顺利",
        pinyin: "shùnlì",
        tone: "Nada 4 + Nada 4",
        toneNumber: 4,
        translation: "lancar / sukses tanpa kendala",
        partOfSpeech: "kata sifat / kata keterangan",
        isEnrichment: true,
        inclusionReason: "Ungkapan harapan keberhasilan proses belajar.",
        exampleHanzi: "祝大家的学习一切顺利！",
        examplePinyin: "Zhù dàjiā de xuéxí yíqiè shùnlì!",
        exampleTranslation: "Semoga studi kalian semua berjalan serba lancar!",
      },
    ],

    pronunciationFocus: {
      sounds:
        "Kestabilan membedakan bunyi lidah terangkat (zh, ch, sh) vs bunyi gigi datar (z, c, s) saat berbicara santai, serta kejelasan vokal 'ü' pada 'xuéxí' dan 'fùxí'.",
      tones:
        "Konsistensi pemeliharaan 4 kontur nada sepanjang narasi beruntun: hindari kecenderungan melemahkan nada ke-4 menjadi nada netral pada kata kerja majemuk beruntun (misal: 'xuéxí', 'jièshào', 'jìnbù').",
      toneCombinations:
        "Transisi sandhi nada ke-3 pada 'kǎoshì' (考试): nada ke-3 separuh rendah (half-third tone) sebelum nada ke-4 jatuh tegas.",
      commonErrors:
        "Pernapasan terputus-putus di tengah kata majemuk (mengambil jeda di antara suku kata yang menyatu), serta menyamakan intonasi kalimat Mandarin dengan intonasi aksen bahasa daerah asal.",
      articulatoryTip:
        "Terapkan teknik 'pengelompokan jeda alami' (thought group / 意群): ambil jeda mikro setelah keterangan waktu dan tempat, jangan pernah memotong kata di antara angka dan kata bantu ukur.",
    },

    hanziComponents: [
      {
        hanzi: "学",
        structure: "Atas-Bawah",
        components: "Tiga titik mahkota atas (点, 点, 撇) + atap datar (冖) + 子 (anak) di bawah",
        strokeCount: 8,
        strokeOrderRules: [
          "Atas ke bawah",
          "Tiga goresan mahkota atas terlebih dahulu",
          "Garis penutup atap '冖'",
          "Komponen anak '子': garis mendatar kait belok, garis tegak kait, garis melintang penutup",
        ],
        notes:
          "Melambangkan seorang anak (子) yang tekun menimba ilmu di bawah naungan atap ruang perguruan.",
      },
      {
        hanzi: "期",
        structure: "Kiri-Kanan",
        components: "其 (komponen fonetik qí) di kiri + 月 (radikal bulan yuè) di kanan",
        strokeCount: 12,
        strokeOrderRules: [
          "Kiri ke kanan",
          "Komponen '其' di sebelah kiri terlebih dahulu (8 goresan)",
          "Radikal bulan '月' di sebelah kanan (4 goresan)",
        ],
        notes:
          "Radikal bulan (月) menandakan peredaran waktu kalender dan kurun waktu tertentu (seperti 学期 = masa semester).",
      },
      {
        hanzi: "完",
        structure: "Atas-Bawah",
        components: "宀 (radikal penutup atap beratap runcing) di atas + 元 (awal / mata uang) di bawah",
        strokeCount: 7,
        strokeOrderRules: [
          "Atas ke bawah",
          "Radikal penutup atap '宀': titik atas (点), titik kiri (点), garis mendatar kait (横钩)",
          "Komponen '元': garis mendatar (横), garis mendatar panjang (横), garis miring (撇), garis tegak melengkung kait (竖弯钩)",
        ],
        notes:
          "Menggambarkan tuntasnya pembangunan rumah hingga ke bagian atap pelindung.",
      },
    ],

    grammarRules: [
      {
        ruleTitle: "Matriks Urutan Kata Sintaksis Universal Bahasa Mandarin (SVO Blueprint)",
        formula: "[Subjek] + [Waktu] + [di Mana 在 + Tempat] + [Bersama Siapa 和 + Orang] + [Modal 想/要/能/会] + [Kata Kerja Utama] + [Objek]",
        explanation:
          "Bahasa Mandarin adalah bahasa yang sangat teratur secara waktu dan ruang (chronological order). Prinsip dasarnya: 'Latar situasi (kapan & di mana) selalu mendahului aksi utama yang diperbuat oleh pelaku'. Jangan pernah menaruh keterangan waktu atau tempat di ujung akhir kalimat seperti dalam bahasa Indonesia atau Inggris.",
        example:
          "我和朋友今天下午在学校图书馆认真学习汉语。 (Wǒ hé péngyou jīntiān xiàwǔ zài xuéxiào túshūguǎn rènzhēn xuéxí Hànyǔ. : Saya dan teman membaca/belajar Mandarin dengan sungguh-sungguh di perpustakaan sekolah pada sore hari ini.)",
      },
      {
        ruleTitle: "Sintesis Sistem Empat Partikel Kalimat Esensial HSK 1",
        formula: "[Atribut] + 的 + [Benda]   |   [Kalimat] + 了   |   [Kalimat] + 吗？   |   [Topik] + 呢？",
        explanation:
          "Empat partikel inti HSK 1 memegang peranan vital dalam membentuk nuansa kalimat: 1) '的' (de) sebagai penanda relasi kepemilikan dan modifikasi kata benda; 2) '了' (le) menandakan perubahan keadaan baru atau selesainya perbuatan; 3) '吗' (ma) mengubah kalimat deklaratif menjadi kalimat tanya ya/tidak; 4) '呢' (ne) untuk menanyakan keberadaan benda atau menanyakan balik topik obrolan secara santun.",
        example:
          "我的书呢？— 你的书在这里，我已经看完了。 (Wǒ de shū ne? — Nǐ de shū zài zhèlǐ, wǒ yǐjīng kànwán le. : Di mana buku saya? — Bukumu ada di sini, saya sudah selesai membacanya.)",
      },
      {
        ruleTitle: "Matriks 8 Kata Tanya Universal Tingkat HSK 1",
        formula: "什么 (apa) | 谁 (siapa) | 哪儿 (di mana) | 哪 (yang mana) | 几 (<10) | 多少 (umum) | 怎么 (bagaimana cara) | 怎么样 (bagaimana kondisi)",
        explanation:
          "Dalam bahasa Mandarin, kata tanya diletakkan tepat pada posisi informasi yang ditanyakan (in-situ question words), tanpa perlu membalik struktur kalimat menjadi bentuk inversi.",
        example:
          "你叫什么名字？(Nama) | 这是谁的书？(Pemilik) | 你在哪儿？(Tempat) | 你家有几口人？(Angka kecil) | 这个多少钱？(Harga) | 这个怎么写？(Cara) | 天气怎么样？(Kondisi)",
      },
      {
        ruleTitle: "Kalimat Kata Sifat Tanpa '是' (Gunakan 很 / Hěn)",
        formula: "[Subjek] + [很 / 太……了 / 不太] + [Kata Sifat]",
        explanation:
          "Pantangan terbesar pembelajar adalah menyisipkan kata '是' sebelum kata sifat tunggal. Bahasa Mandarin menghubungkan subjek langsung dengan kata sifat menggunakan kata penguat '很' (hěn), bentuk evaluasi '太……了' (tài ... le), atau sanggahan halus '不太' (bú tài).",
        example:
          "北京很冷，这里的苹果不太贵，很好吃。 (Běijīng hěn lěng, zhèlǐ de píngguǒ bú tài guì, hěn hǎochī. : Beijing sangat dingin, apel di sini tidak terlalu mahal, sangat lezat.)",
      },
    ],

    culturalNotes:
      "Dalam peribahasa pendidikan Tionghoa, dikatakan: '学无止境，温故知新' (Xué wú zhǐjìng, wēn gù zhī xīn - Belajar tiada batas akhirnya; dengan mengulang pelajaran lama, kita memahami hikmah yang baru). Menyelesaikan tingkat HSK 1 adalah tonggak sejarah penting: kamu bukan sekadar menghafal 150 kosakata mandiri, melainkan telah menata fondasi berpikir logis untuk berdialog secara terhormat dan penuh empati dengan masyarakat penutur bahasa Mandarin di seluruh dunia.",

    listeningActivity: {
      goal: "Memahami monolog evaluasi perkenalan diri komprehensif berdurasi 40 detik yang memadukan identitas, waktu, keluarga, dan rutinitas harian.",
      audioText:
        "大家好！我叫大卫，我是印尼人，在大学学习汉语。我家有四口人。我每天早上七点起床，下午去图书馆看书。我很喜欢吃北京烤鸭，也喜欢喝中国茶。今天天气很好，我很高兴认识大家！",
      pinyin:
        "Dàjiā hǎo! Wǒ jiào Dàwèi, wǒ shì Yìnní rén, zài dàxué xuéxí Hànyǔ. Wǒ jiā yǒu sì kǒu rén. Wǒ měitiān zǎoshang qī diǎn qǐchuáng, xiàwǔ qù túshūguǎn kàn shū. Wǒ hěn xǐhuan chī Běijīng kǎoyā, yě xǐhuan hē Zhōngguó chá. Jīntiān tiānqì hěn hǎo, wǒ hěn gāoxìng rènshi dàjiā!",
      translation:
        "Halo semuanya! Nama saya David, saya orang Indonesia, belajar bahasa Mandarin di universitas. Keluarga saya ada 4 orang. Setiap hari saya bangun jam 7 pagi, sore hari pergi ke perpustakaan membaca buku. Saya sangat suka makan Bebek Panggang Beijing, dan juga suka minum teh Tiongkok. Hari ini cuaca sangat bagus, saya sangat senang berkenalan dengan hadirin sekalian!",
      gistQuestion: {
        question:
          "Apa isi pokok yang dipaparkan dalam monolog perkenalan David di atas?",
        options: [
          "Profil komprehensif mencakup asal negara, status belajar, jumlah keluarga, rutinitas harian, dan kuliner favorit",
          "Pengalaman berbelanja pakaian musim dingin di pusat pertokoan Beijing",
          "Keluhan mengenai kondisi fisik yang sedang demam di dalam kamar asrama",
          "Daftar rincian biaya SPP kuliah dan harga buku pelajaran di kampus",
        ],
        correctAnswer:
          "Profil komprehensif mencakup asal negara, status belajar, jumlah keluarga, rutinitas harian, dan kuliner favorit",
        explanation:
          "Monolog tersebut merangkum seluruh domain HSK 1: identitas kewarganegaraan, keluarga (sì kǒu rén), rutinitas (qī diǎn qǐchuáng), dan kegemaran kuliner (Běijīng kǎoyā).",
      },
      detailQuestion: {
        question:
          "Pukul berapa David bangun setiap pagi dan apa yang ia lakukan pada sore hari menurut audio?",
        options: [
          "Bangun jam 7 pagi, dan membaca buku di perpustakaan pada sore hari (七点起床，下午去图书馆看书)",
          "Bangun jam 9 pagi, dan tidur siang di asrama pada sore hari",
          "Bangun jam 5 subuh, dan memasak makanan di kafetaria pada sore hari",
          "Bangun jam 11 siang, dan pergi ke rumah sakit menemui dokter",
        ],
        correctAnswer:
          "Bangun jam 7 pagi, dan membaca buku di perpustakaan pada sore hari (七点起床，下午去图书馆看书)",
        explanation:
          "Audio secara gamblang menyebutkan: 'Wǒ měitiān zǎoshang qī diǎn qǐchuáng, xiàwǔ qù túshūguǎn kàn shū'.",
      },
    },

    speakingActivity: {
      prompt:
        "Proyek Akhir Mandiri HSK 1: Rekam perkenalan diri lengkapmu selama 60 detik dalam bahasa Mandarin tanpa membaca teks: 1) Salam pembuka dan identitas nama serta kewarganegaraan (大家好，我叫……我是……人); 2) Jumlah dan profesi anggota keluargamu (我家有……口人，我爸爸是……); 3) Jadwal rutinitas harianmu (jam bangun, belajar, dan waktu istirahat); 4) Makanan atau minuman favoritmu beserta taksiran harganya; 5) Deskripsi cuaca kotamu hari ini dan kesan belajar Mandarin; 6) Salam penutup yang santun dan hangat.",
      vocabularySupport: [
        "大家好，我叫……我是……人 (dàjiā hǎo, wǒ jiào ... wǒ shì ... rén)",
        "我家有……口人，我爸爸是…… (wǒ jiā yǒu ... kǒu rén, wǒ bàba shì ...)",
        "我每天……点起床，下午在…… (wǒ měitiān ... diǎn qǐchuáng, xiàwǔ zài ...)",
        "我喜欢吃……，这个……块钱 (wǒ xǐhuan chī ..., zhè gè ... kuài qián)",
        "今天天气很……，很高兴认识大家，谢谢！ (jīntiān tiānqì hěn ..., hěn gāoxìng rènshi dàjiā, xièxie!)",
      ],
      evaluationRubric:
        "Rubrik Asesmen Kelulusan Lisan HSK 1: 1) Akurasi nada dan artikulasi inisial/final (bobot 30%); 2) Ketepatan urutan kata sintaksis S+Waktu+Tempat+V+O (bobot 30%); 3) Kelancaran pelafalan tanpa jeda canggung (bobot 20%); 4) Kelengkapan cakupan informasi profil diri (bobot 20%). Nilai kelulusan minimal: 85%.",
    },

    readingActivity: {
      textHanzi:
        "王老师是北京一所大学的汉语老师。她今年四十五岁，人非常好。王老师每天早上七点半到学校，八点给外国学生上课。今天上午，教室里有十个学生，他们来自不同的国家：有的来自印尼，有的来自美国。学生们都很喜欢王老师，因为她说得慢，汉字写得很好看，也经常帮助学生解答问题。中午十二点，王老师和学生们一起去食堂吃饺子。王老师说：‘学习汉语需要每天复习，大家进步都很大，恭喜大家完成第一阶段的学习！’学生们齐声说：‘谢谢王老师！’",
      textPinyin:
        "Wáng lǎoshī shì Běijīng yī suǒ dàxué de Hànyǔ lǎoshī. Tā jīnnián sìshíwǔ suì, rén fēicháng hǎo. Wáng lǎoshī měitiān zǎoshang qī diǎn bàn dào xuéxiào, bā diǎn gěi wàiguó xuésheng shàngkè. Jīntiān shàngwǔ, jiàoshì lǐ yǒu shí gè xuésheng, tāmen láizì bùtóng de guójiā: yǒude láizì Yìnní, yǒude láizì Měiguó. Xuéshengmen dōu hěn xǐhuan Wáng lǎoshī, yīnwèi tā shuō de màn, hànzì xiě de hěn hǎokàn, yě jīngcháng bāngzhù xuésheng jiědá wèntí. Zhōngwǔ shí'èr diǎn, Wáng lǎoshī hé xuéshengmen yìqǐ qù shítáng chī jiǎozi. Wáng lǎoshī shuō: ‘Xuéxí Hànyǔ xūyào měitiān fùxí, dàjiā jìnbù dōu hěn dà, gōngxǐ dàjiā wánchéng dì-yī jiēduàn de xuéxí!’ Xuéshengmen qíshēng shuō: ‘Xièxie Wáng lǎoshī!’",
      textTranslation:
        "Guru Wang adalah dosen bahasa Mandarin di salah satu universitas di Beijing. Tahun ini beliau berusia 45 tahun, pembawaannya sangat baik. Setiap hari Guru Wang tiba di kampus pukul 7.30 pagi, dan pukul 8 mengajar mahasiswa asing. Pagi hari ini, di ruang kelas ada 10 orang mahasiswa yang berasal dari beragam negara yang berbeda: ada yang berasal dari Indonesia, ada yang dari Amerika Serikat. Para mahasiswa sangat menyukai Guru Wang karena beliau berbicara pelan, tulisan Hanzi-nya sangat bagus, dan beliau sering membantu mahasiswa menjawab pertanyaan. Pukul 12 siang, Guru Wang dan mahasiswa bersama-sama pergi ke kantin makan pangsit. Guru Wang berkata: 'Belajar Mandarin memerlukan pengulangan (review) setiap hari, kemajuan kalian semua sangat pesat, selamat kalian telah menuntaskan pembelajaran tahap pertama!' Para mahasiswa serempak menjawab: 'Terima kasih Guru Wang!'",
      mainIdea:
        "Dedikasi Guru Wang dalam mengajar mahasiswa internasional di Beijing hingga sukses menuntaskan pembelajaran kurikulum tahap pertama (HSK 1).",
      questions: [
        {
          question:
            "Mengapa para mahasiswa internasional sangat menyukai Guru Wang dalam proses belajar mengajar?",
          options: [
            "Karena beliau berbicara dengan pelan, tulisan Hanzi-nya indah, dan rajin membantu menjawab pertanyaan (说话慢，汉字好看，经常帮助解答问题)",
            "Karena beliau jarang masuk kelas dan sering membatalkan ujian",
            "Karena ruang kelasnya berada di pusat perbelanjaan pakaian",
            "Karena beliau tidak pernah mengajarkan urutan goresan karakter Hanzi",
          ],
          correctAnswer:
            "Karena beliau berbicara dengan pelan, tulisan Hanzi-nya indah, dan rajin membantu menjawab pertanyaan (说话慢，汉字好看，经常帮助解答问题)",
          explanation:
            "Teks secara eksplisit menyebutkan: 'yīnwèi tā shuō de màn, hànzì xiě de hěn hǎokàn, yě jīngcháng bāngzhù xuésheng jiědá wèntí'.",
        },
      ],
    },

    writingActivity: {
      prompt:
        "Tuliskan 3 karakter Hanzi penutup kelulusan level HSK 1 berikut di buku kotak latihan dengan memperhatikan proporsi dan urutan goresan yang benar: '学' (xué - belajar), '期' (qī - kurun waktu/periode), dan '完' (wán - tuntas/selesai).",
      minimumCharacters: 3,
      checklist: [
        "Menulis '学': 8 goresan; tiga titik mahkota atas (点, 点, 撇) → garis atap (冖) → komponen anak di bawah (横撇/弯钩, 竖钩, 横).",
        "Menulis '期': 12 goresan; komponen '其' di sebelah kiri terlebih dahulu (8 goresan) lalu radikal bulan '月' di sebelah kanan (4 goresan).",
        "Menulis '完': 7 goresan; radikal penutup atap '宀' di atas (点, 点, 横钩) lalu karakter '元' di bawah (横, 横, 撇, 竖弯钩).",
      ],
      modelAnswer: {
        hanzi: "学期完了，我学会了汉语",
        pinyin: "xuéqī wán le, wǒ xuéhuì le Hànyǔ",
        translation: "semester telah selesai, saya telah berhasil menguasai bahasa Mandarin",
      },
    },

    personalizationPrompt:
      "Tuliskan portofolio refleksi 6 kalimat profil utuh dirimu di Buku Frasa pribadi sebagai sertifikat mandiri kelulusan HSK 1: cantumkan namamu, asalmu, kegiatan favoritmu, makanan kesukaanmu, dan tekadmu untuk melangkah ke tingkat HSK 2!",
    errorJournalHooks: [
      "Meletakkan keterangan waktu di belakang kalimat (interferensi bahasa ibu: 'Saya belajar Mandarin kemarin' disalin 'Wǒ xué Hànyǔ zuótiān' alih-alih bentuk baku 'Wǒ zuótiān xué Hànyǔ')",
      "Lupa menyertakan kata bantu ukur (classifier) antara bilangan dan kata benda (misal: '四人' alih-alih bentuk baku '四口人' atau '四个学生')",
      "Menyelipkan kata 'shì' sebelum kata sifat (contoh salah: 'Běijīng shì hěn lěng', yang benar: 'Běijīng hěn lěng')",
      "Tertukar pemakaian kata tanya '几' (kuantitas kecil <10) dengan '多少' (kuantitas umum/besar)",
    ],
    checkpoint: {
      completionCriteria:
        "Pengguna berhasil menuntaskan seluruh 12 unit HSK 1, mengintegrasikan kosakata dan pola kalimat lintas domain komunikasi secara tepat, serta memperoleh nilai minimal 85% pada evaluasi formatif akhir level.",
      masteryThresholdPercent: 85,
      remedialRecommendation:
        "Tinjau kembali jurnal kesalahan pribadi dan buku frasa tersimpan pada modul HSK 1 sebelum membuka kurikulum tingkat HSK 2.",
    },
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
      "Sembilan unit pembelajaran esensial dan satu ujian evaluasi integratif sebelum masuk ke HSK 1: Pelajari mekanisme bahasa Mandarin, inisial dasar & lanjutan, final tunggal & sengau, 4 kontur nada, tone sandhi, aturan ejaan pinyin, kaidah goresan Hanzi, serta Mini Proyek perkenalan lisan.",
    unitsCount: FUNDAMENTALS_UNITS.length,
    totalVocab: 75,
    status: "active",
    units: FUNDAMENTALS_UNITS,
  },
  {
    id: "hsk1",
    slug: "hsk1",
    title: "Tingkat HSK 1",
    hanziTitle: "初级汉语一",
    pinyinTitle: "Chūjí Hànyǔ Yī",
    subtitle: "Komunikasi Dasar & Integrasi Kontekstual",
    levelNumber: 1,
    badge: "KURIKULUM UTAMA",
    description:
      "Dua belas unit pembelajaran kontekstual komprehensif yang menghubungkan sapaan, identitas, angka, waktu, keluarga, rutinitas, kuliner, lokasi, belanja, cuaca, kemampuan, dan evaluasi integratif tingkat HSK 1.",
    unitsCount: HSK1_UNITS.length,
    totalVocab: 150,
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
    badge: "PETA JALAN DRAF",
    description:
      "Struktur kurikulum terencana 12 unit untuk memperluas percakapan harian: perbandingan cuaca, tawar-menawar belanja, petunjuk arah jalan, dan menceritakan pengalaman masa lalu.",
    unitsCount: HSK2_UNITS.length,
    totalVocab: 300,
    status: "roadmap",
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
