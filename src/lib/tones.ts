/**
 * tones.ts
 * Fondasi dataset dan utilitas untuk Modul 9.2: Tone Coach (Pelatih Nada Mandarin).
 * Mencakup:
 * 1. Data Kontur 5-Skala Y.R. Chao (Nada 1, 2, 3, 4, dan Netral)
 * 2. Matriks 4 Kaidah Tone Sandhi Utama HSK 1 (3+3, Setengah Nada 3, Sandhi 不, Sandhi 一)
 * 3. Latihan Uji Nada & Identifikasi Sandhi
 */

export interface PitchPoint {
  x: number; // 0 sampai 100 (persentase waktu pengucapan)
  pitch: number; // 1 (terendah) sampai 5 (tertinggi)
}

export interface ToneContourData {
  toneNumber: number;
  nameIndonesian: string;
  nameChinese: string;
  pinyinChinese: string;
  chaoScale: string; // Misal: "55", "35", "214", "51"
  symbol: string; // Tanda diakritik: ¯, ˊ, ˇ, ˋ
  colorClass: string; // Warna De Stijl / Bauhaus
  hexColor: string;
  description: string;
  articulatoryMechanism: string;
  indonesianAnalogy: string;
  exampleWords: {
    hanzi: string;
    pinyin: string;
    translation: string;
    audioText: string;
  }[];
  curvePoints: PitchPoint[];
}

export const TONE_CONTOURS: ToneContourData[] = [
  {
    toneNumber: 1,
    nameIndonesian: "Nada 1 (Datar Tinggi)",
    nameChinese: "阴平",
    pinyinChinese: "Yīnpíng",
    chaoScale: "55",
    symbol: "¯ (mā)",
    colorClass: "text-accent-yellow",
    hexColor: "#E5A93C",
    description: "Tinggi, stabil, dan dipertahankan konstan di register vokal puncak.",
    articulatoryMechanism:
      "Tegangkan pita suara secara konstan pada register pitch tertinggi (skala 5). Panjang suara tidak boleh berfluktuasi atau turun di akhir suku kata.",
    indonesianAnalogy:
      "Mirip seperti dokter meminta pasien membuka mulut dan berkata 'Aaa...' yang panjang, stabil, dan datar.",
    exampleWords: [
      { hanzi: "妈", pinyin: "mā", translation: "ibu", audioText: "妈" },
      { hanzi: "八", pinyin: "bā", translation: "delapan", audioText: "八" },
      { hanzi: "吃", pinyin: "chī", translation: "makan", audioText: "吃" },
      { hanzi: "书", pinyin: "shū", translation: "buku", audioText: "书" },
    ],
    curvePoints: [
      { x: 0, pitch: 5 },
      { x: 50, pitch: 5 },
      { x: 100, pitch: 5 },
    ],
  },
  {
    toneNumber: 2,
    nameIndonesian: "Nada 2 (Naik)",
    nameChinese: "阳平",
    pinyinChinese: "Yángpíng",
    chaoScale: "35",
    symbol: "ˊ (má)",
    colorClass: "text-accent-blue",
    hexColor: "#1D4ED8",
    description: "Meluncur naik dari nada tengah ke register vokal tinggi.",
    articulatoryMechanism:
      "Dimulai dari register tengah (skala 3), kemudian pita suara dikencangkan secara halus sehingga frekuensi suara menanjak tajam menuju puncak (skala 5).",
    indonesianAnalogy:
      "Sangat identik dengan intonasi bertanya kaget dalam bahasa Indonesia: 'Hah?!' atau 'Apa?!'.",
    exampleWords: [
      { hanzi: "十", pinyin: "shí", translation: "sepuluh", audioText: "十" },
      { hanzi: "国", pinyin: "guó", translation: "negara", audioText: "国" },
      { hanzi: "茶", pinyin: "chá", translation: "teh", audioText: "茶" },
      { hanzi: "谁", pinyin: "shéi", translation: "siapa", audioText: "谁" },
    ],
    curvePoints: [
      { x: 0, pitch: 3 },
      { x: 50, pitch: 3.8 },
      { x: 100, pitch: 5 },
    ],
  },
  {
    toneNumber: 3,
    nameIndonesian: "Nada 3 (Turun-Meliuk Rendah)",
    nameChinese: "上声",
    pinyinChinese: "Shǎngshēng",
    chaoScale: "214",
    symbol: "ˇ (mǎ)",
    colorClass: "text-ink",
    hexColor: "#111111",
    description: "Menukik ke dasar rongga suara sebelum meliuk naik secara halus.",
    articulatoryMechanism:
      "Mulai dari nada agak rendah (skala 2), turunkan ke titik terendah rongga vokal (skala 1) sampai terasa getaran berat di dada, lalu liukkan sedikit naik ke skala 4 saat diucapkan terisolasi.",
    indonesianAnalogy:
      "Mirip intonasi saat seseorang berpikir ragu atau mengiyakan dengan berat: 'Hmm... begitu ya'.",
    exampleWords: [
      { hanzi: "我", pinyin: "wǒ", translation: "saya", audioText: "我" },
      { hanzi: "好", pinyin: "hǎo", translation: "baik", audioText: "好" },
      { hanzi: "你", pinyin: "nǐ", translation: "kamu", audioText: "你" },
      { hanzi: "买", pinyin: "mǎi", translation: "membeli", audioText: "买" },
    ],
    curvePoints: [
      { x: 0, pitch: 2.2 },
      { x: 40, pitch: 1 },
      { x: 75, pitch: 1.8 },
      { x: 100, pitch: 4 },
    ],
  },
  {
    toneNumber: 4,
    nameIndonesian: "Nada 4 (Turun Tegas)",
    nameChinese: "去声",
    pinyinChinese: "Qùshēng",
    chaoScale: "51",
    symbol: "ˋ (mà)",
    colorClass: "text-accent-red",
    hexColor: "#D02020",
    description: "Jatuh cepat dari puncak ke dasar, tegas dan menghentak.",
    articulatoryMechanism:
      "Lepaskan vokal langsung dari nada tertinggi (skala 5) dan jatuhkan pita suara secara mendadak ke titik terendah (skala 1). Durasi pengucapan paling singkat di antara keempat nada.",
    indonesianAnalogy:
      "Mirip perintah tegas atau seruan larangan membentak dalam bahasa Indonesia: 'Stop!', 'Jangan!', atau 'Gak!'.",
    exampleWords: [
      { hanzi: "是", pinyin: "shì", translation: "adalah", audioText: "是" },
      { hanzi: "不", pinyin: "bù", translation: "tidak", audioText: "不" },
      { hanzi: "看", pinyin: "kàn", translation: "melihat", audioText: "看" },
      { hanzi: "大", pinyin: "dà", translation: "besar", audioText: "大" },
    ],
    curvePoints: [
      { x: 0, pitch: 5 },
      { x: 45, pitch: 3.2 },
      { x: 100, pitch: 1 },
    ],
  },
  {
    toneNumber: 0,
    nameIndonesian: "Nada Netral (Ringan)",
    nameChinese: "轻声",
    pinyinChinese: "Qīngshēng",
    chaoScale: "-",
    symbol: "• (ma)",
    colorClass: "text-muted",
    hexColor: "#71717A",
    description: "Pendek, ringan, dan tidak memiliki diakritik nada.",
    articulatoryMechanism:
      "Diucapkan secara lemas dan cepat tanpa tekanan artikulasi. Tinggi pitchnya dipengaruhi oleh nada suku kata yang mendahuluinya.",
    indonesianAnalogy:
      "Mirip partikel tanya '-kah' atau '-kan' yang diucapkan sangat ringan di ujung kata bahasa Indonesia: 'iya kan?'.",
    exampleWords: [
      { hanzi: "吗", pinyin: "ma", translation: "partikel tanya", audioText: "吗" },
      { hanzi: "呢", pinyin: "ne", translation: "bagaimana dengan...", audioText: "呢" },
      { hanzi: "的", pinyin: "de", translation: "partikel kepemilikan", audioText: "的" },
      { hanzi: "爸爸", pinyin: "bàba", translation: "ayah (suku kata kedua)", audioText: "爸爸" },
    ],
    curvePoints: [
      { x: 20, pitch: 2.5 },
      { x: 50, pitch: 2.3 },
      { x: 70, pitch: 2 },
    ],
  },
];

export interface ToneSandhiRule {
  id: string;
  name: string;
  formula: string;
  triggerCondition: string;
  description: string;
  whyItMatters: string;
  examples: {
    writtenHanzi: string;
    writtenPinyin: string;
    spokenPinyin: string;
    translation: string;
    audioText: string;
  }[];
}

export const TONE_SANDHI_RULES: ToneSandhiRule[] = [
  {
    id: "sandhi-33",
    name: "Sandhi Nada 3 (Dua Nada 3 Berturutan)",
    formula: "Nada 3 + Nada 3 → Nada 2 + Nada 3",
    triggerCondition: "Terjadi ketika dua suku kata bertanda Nada 3 bertemu secara berurutan.",
    description:
      "Dalam percakapan mengalir, mengucapkan dua nada yang sama-sama menukik ke dasar vokal (214 + 214) memerlukan energi fisik yang terlalu berat bagi pita suara. Karena itu, suku kata pertama otomatis berubah menjadi Nada 2 (naik 35).",
    whyItMatters:
      "Pinyin resmi tetap ditulis dengan Nada 3 asli untuk menjaga etimologi, namun lidah wajib melafalkannya sebagai Nada 2.",
    examples: [
      {
        writtenHanzi: "你好",
        writtenPinyin: "nǐ hǎo (3 + 3)",
        spokenPinyin: "ní hǎo (2 + 3)",
        translation: "Halo / apa kabar",
        audioText: "你好",
      },
      {
        writtenHanzi: "可以",
        writtenPinyin: "kě yǐ (3 + 3)",
        spokenPinyin: "ké yǐ (2 + 3)",
        translation: "bisa / boleh",
        audioText: "可以",
      },
      {
        writtenHanzi: "很好",
        writtenPinyin: "hěn hǎo (3 + 3)",
        spokenPinyin: "hén hǎo (2 + 3)",
        translation: "sangat baik",
        audioText: "很好",
      },
      {
        writtenHanzi: "水果",
        writtenPinyin: "shuǐ guǒ (3 + 3)",
        spokenPinyin: "shuí guǒ (2 + 3)",
        translation: "buah-buahan",
        audioText: "水果",
      },
    ],
  },
  {
    id: "sandhi-half-3",
    name: "Sandhi Setengah Nada 3 (Half Third Tone)",
    formula: "Nada 3 + (Nada 1/2/4/Netral) → Rendah Datar (21)",
    triggerCondition:
      "Terjadi ketika suku kata Nada 3 diikuti oleh suku kata bertanda Nada 1, Nada 2, Nada 4, atau Nada Netral.",
    description:
      "Ketika Nada 3 mendahului nada selain Nada 3, pembelajar TIDAK meliukkan suaranya naik ke skala 4. Pembicara hanya mengucapkan paruh pertama yang rendah (turun dari skala 2 ke 1) lalu langsung menyambung ke kata berikutnya.",
    whyItMatters:
      "Inilah rahasia mengapa penutur asli terdengar fasih dan tidak kaku saat berbicara cepat.",
    examples: [
      {
        writtenHanzi: "北京",
        writtenPinyin: "Běijīng (3 + 1)",
        spokenPinyin: "Běi (hanya 21 rendah) + jīng",
        translation: "Kota Beijing",
        audioText: "北京",
      },
      {
        writtenHanzi: "很忙",
        writtenPinyin: "hěn máng (3 + 2)",
        spokenPinyin: "hěn (rendah 21) + máng",
        translation: "sangat sibuk",
        audioText: "很忙",
      },
      {
        writtenHanzi: "很大",
        writtenPinyin: "hěn dà (3 + 4)",
        spokenPinyin: "hěn (rendah 21) + dà",
        translation: "sangat besar",
        audioText: "很大",
      },
    ],
  },
  {
    id: "sandhi-bu",
    name: "Sandhi Kata Negasi '不' (bù)",
    formula: "不 (bù) + Nada 4 → bú (Nada 2) + Nada 4",
    triggerCondition: "Terjadi khusus pada kata '不' ketika bertemu suku kata bertanda Nada 4.",
    description:
      "Secara mandiri, kata '不' bertanda Nada 4 (bù). Namun bila diikuti oleh kata lain yang juga bertanda Nada 4, '不' berubah menjadi Nada 2 (bú) agar dua hentakan tajam tidak saling berbenturan.",
    whyItMatters:
      "Bila diikuti Nada 1, 2, atau 3, kata '不' tetap diucapkan dengan nada aslinya (Nada 4: bù hē, bù lái, bù hǎo).",
    examples: [
      {
        writtenHanzi: "不是",
        writtenPinyin: "bù shì (4 + 4)",
        spokenPinyin: "bú shì (2 + 4)",
        translation: "bukan / tidak benar",
        audioText: "不是",
      },
      {
        writtenHanzi: "不要",
        writtenPinyin: "bù yào (4 + 4)",
        spokenPinyin: "bú yào (2 + 4)",
        translation: "jangan / tidak mau",
        audioText: "不要",
      },
      {
        writtenHanzi: "不对",
        writtenPinyin: "bù duì (4 + 4)",
        spokenPinyin: "bú duì (2 + 4)",
        translation: "salah / tidak tepat",
        audioText: "不对",
      },
      {
        writtenHanzi: "不好 (Kontras)",
        writtenPinyin: "bù hǎo (4 + 3)",
        spokenPinyin: "bù hǎo (tetap Nada 4)",
        translation: "tidak bagus (tidak ada perubahan sandhi)",
        audioText: "不好",
      },
    ],
  },
  {
    id: "sandhi-yi",
    name: "Sandhi Kata Bilangan '一' (yī)",
    formula: "一 + Nada 4 → yí (Nada 2) | 一 + Nada 1/2/3 → yì (Nada 4)",
    triggerCondition:
      "Terjadi khusus pada kata '一' saat digabungkan dengan kata penggolong atau benda.",
    description:
      "Aslinya '一' bertanda Nada 1 (yī) saat berhitung mandiri (yī, èr, sān). Ketika melekat pada kata Nada 4, ia berubah menjadi Nada 2 (yí). Ketika melekat pada kata Nada 1, 2, atau 3, ia berubah menjadi Nada 4 (yì).",
    whyItMatters:
      "Penguasaan sandhi '一' membedakan pembelajar pemula dengan penutur yang menguasai ritme alami Mandarin.",
    examples: [
      {
        writtenHanzi: "一个",
        writtenPinyin: "yī gè (1 + 4)",
        spokenPinyin: "yí gè (berubah ke Nada 2)",
        translation: "sebuah / satu buah",
        audioText: "一个",
      },
      {
        writtenHanzi: "一天",
        writtenPinyin: "yī tiān (1 + 1)",
        spokenPinyin: "yì tiān (berubah ke Nada 4)",
        translation: "satu hari",
        audioText: "一天",
      },
      {
        writtenHanzi: "一年",
        writtenPinyin: "yī nián (1 + 2)",
        spokenPinyin: "yì nián (berubah ke Nada 4)",
        translation: "satu tahun",
        audioText: "一年",
      },
      {
        writtenHanzi: "一起",
        writtenPinyin: "yī qǐ (1 + 3)",
        spokenPinyin: "yì qǐ (berubah ke Nada 4)",
        translation: "bersama-sama",
        audioText: "一起",
      },
    ],
  },
];

export interface ToneDrillQuestion {
  id: string;
  type: "contour_identification" | "sandhi_identification";
  title: string;
  prompt: string;
  audioPrompt: string;
  focusWord: {
    hanzi: string;
    pinyin: string;
    translation: string;
  };
  options: {
    id: string;
    label: string;
    sublabel?: string;
    isCorrect: boolean;
  }[];
  explanation: {
    ruleTitle: string;
    detail: string;
    indonesianTip: string;
  };
}

export const TONE_DRILL_QUESTIONS: ToneDrillQuestion[] = [
  {
    id: "td-01",
    type: "sandhi_identification",
    title: "Identifikasi Sandhi: Sapaan '你好'",
    prompt:
      "Dengarkan pelafalan kata '你好' (nǐ hǎo). Nada berapakah yang sebenarnya dilafalkan pada suku kata pertama '你'?",
    audioPrompt: "你好",
    focusWord: {
      hanzi: "你好",
      pinyin: "nǐ hǎo",
      translation: "halo / apa kabar",
    },
    options: [
      {
        id: "opt-1",
        label: "Dilafalkan sebagai Nada 2 (ní)",
        sublabel: "Kaidah Sandhi 3 + 3",
        isCorrect: true,
      },
      {
        id: "opt-2",
        label: "Tetap dilafalkan sebagai Nada 3 (nǐ)",
        sublabel: "Tanpa perubahan nada",
        isCorrect: false,
      },
      {
        id: "opt-3",
        label: "Dilafalkan sebagai Nada 4 (nì)",
        sublabel: "Turun tegas",
        isCorrect: false,
      },
    ],
    explanation: {
      ruleTitle: "Aturan Sandhi Nada 3 + Nada 3",
      detail:
        "Kata '你' (nǐ) dan '好' (hǎo) keduanya bertanda Nada 3. Sesuai aturan fonologi Mandarin, suku kata pertama wajib berubah menjadi Nada 2 (ní hǎo).",
      indonesianTip:
        "Perhatikan bagaimana suaramu meluncur naik seperti intonasi bertanya ringan di suku kata pertama.",
    },
  },
  {
    id: "td-02",
    type: "sandhi_identification",
    title: "Identifikasi Sandhi: Negasi '不是'",
    prompt:
      "Dengarkan kata '不是'. Mengapa pelafalan suku kata '不' terdengar menanjak naik (bú)?",
    audioPrompt: "不是",
    focusWord: {
      hanzi: "不是",
      pinyin: "bù shì",
      translation: "bukan / tidak benar",
    },
    options: [
      {
        id: "opt-2a",
        label: "Karena '是' (shì) bertanda Nada 4, sehingga '不' berubah ke Nada 2",
        sublabel: "Kaidah Sandhi '不'",
        isCorrect: true,
      },
      {
        id: "opt-2b",
        label: "Karena '不' aslinya selalu bertanda Nada 2",
        sublabel: "Salah pemahaman asali",
        isCorrect: false,
      },
      {
        id: "opt-2c",
        label: "Karena berada di awal kalimat",
        sublabel: "Posisi sintaksis",
        isCorrect: false,
      },
    ],
    explanation: {
      ruleTitle: "Kaidah Sandhi Negasi '不'",
      detail:
        "Kata '不' aslinya bernada ke-4 (bù). Namun saat bertemu dengan suku kata lain yang juga bernada ke-4 seperti '是' (shì), '不' otomatis berubah menjadi Nada 2 (bú shì) untuk mencegah tabrakan dua nada hentak.",
      indonesianTip:
        "Bandingkan dengan '不好' (bù hǎo): karena '好' bernada ke-3, maka '不' tetap bernada ke-4.",
    },
  },
  {
    id: "td-03",
    type: "sandhi_identification",
    title: "Identifikasi Sandhi: Kata '一个'",
    prompt:
      "Dengarkan frasa '一个' (yī gè). Bagaimanakah perubahan nada pada kata bilangan '一'?",
    audioPrompt: "一个",
    focusWord: {
      hanzi: "一个",
      pinyin: "yī gè",
      translation: "sebuah / satu buah",
    },
    options: [
      {
        id: "opt-3a",
        label: "Berubah menjadi Nada 2 (yí)",
        sublabel: "Karena diikuti kata penggolong Nada 4 (gè)",
        isCorrect: true,
      },
      {
        id: "opt-3b",
        label: "Tetap Nada 1 (yī) datar tinggi",
        sublabel: "Pelafalan hitungan",
        isCorrect: false,
      },
      {
        id: "opt-3c",
        label: "Berubah menjadi Nada Netral (yi)",
        sublabel: "Tanpa tekanan",
        isCorrect: false,
      },
    ],
    explanation: {
      ruleTitle: "Kaidah Sandhi Bilangan '一' di Depan Nada 4",
      detail:
        "Kata '一' (yī) yang aslinya Nada 1 akan berubah menjadi Nada 2 (yí) apabila diikuti kata bertanda Nada 4 (seperti '个' gè). Pelafalan aktualnya adalah 'yí gè'.",
      indonesianTip:
        "Ini adalah frasa yang paling sering digunakan dalam percakapan sehari-hari saat memesan barang atau menyebut jumlah.",
    },
  },
  {
    id: "td-04",
    type: "contour_identification",
    title: "Identifikasi Kontur: Kata '十' vs '四'",
    prompt:
      "Dengarkan rekaman angka berikut, lalu tentukan kontur nada Chao yang tepat:",
    audioPrompt: "十",
    focusWord: {
      hanzi: "十",
      pinyin: "shí",
      translation: "sepuluh (angka 10)",
    },
    options: [
      {
        id: "opt-4a",
        label: "Nada 2 (35 Naik) : shí",
        sublabel: "Meluncur naik dari tengah ke tinggi",
        isCorrect: true,
      },
      {
        id: "opt-4b",
        label: "Nada 4 (51 Turun) : sì",
        sublabel: "Jatuh menghentak cepat (angka 4)",
        isCorrect: false,
      },
      {
        id: "opt-4c",
        label: "Nada 1 (55 Datar) : shī",
        sublabel: "Tinggi stabil konstan",
        isCorrect: false,
      },
    ],
    explanation: {
      ruleTitle: "Perbedaan Krusial Angka 10 (shí) dan 4 (sì)",
      detail:
        "Angka 10 '十' bernada ke-2 (阳平 - Yángpíng) dengan kontur 35 naik. Angka 4 '四' bernada ke-4 (去声 - Qùshēng) dengan kontur 51 turun tegas.",
      indonesianTip:
        "Tertukar antara Nada 2 dan Nada 4 pada angka adalah kesalahan paling fatal saat berbelanja atau memesan kamar hotel!",
    },
  },
];
