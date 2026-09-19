/**
 * Data Struktur Modul Fondasi Dasar Mandarin (Sebelum HSK 1)
 * Memuat:
 * 1. 4 Nada Dasar & Nada Netral + Aturan Penempatan Nada
 * 2. 23 Inisial (Konsonan) & 24 Final (Vokal) Pinyin
 * 3. 8 Goresan Dasar Karakter Hanzi (Yongzi Bafa)
 * 4. 7 Kaidah Utama Urutan Menulis Hanzi (Bishun)
 * 5. Set Latihan Evaluasi Fondasi
 */

export interface FundamentalTone {
  toneNumber: number;
  name: string;
  hanziName: string;
  pinyinName: string;
  pitchContour: string;
  markSymbol: string;
  description: string;
  mnemonic: string;
  specimen: {
    syllable: string;
    hanzi: string;
    pinyin: string;
    translation: string;
  };
}

export interface FundamentalInitial {
  letter: string;
  category: string;
  articulationTip: string;
  exampleHanzi: string;
  examplePinyin: string;
  exampleTranslation: string;
}

export interface FundamentalFinal {
  letter: string;
  type: "Vokal Tunggal" | "Vokal Majemuk" | "Vokal Sengau (Nasal)";
  soundDescription: string;
  exampleHanzi: string;
  examplePinyin: string;
  exampleTranslation: string;
}

export interface FundamentalStroke {
  name: string;
  hanzi: string;
  pinyin: string;
  direction: string;
  visualSymbol: string;
  description: string;
  exampleChar: string;
  examplePinyin: string;
  exampleMeaning: string;
}

export interface FundamentalStrokeRule {
  number: string;
  ruleTitle: string;
  hanziPrinciple: string;
  pinyinPrinciple: string;
  explanation: string;
  exampleChar: string;
  examplePinyin: string;
  exampleMeaning: string;
  strokeSteps: string;
}

export interface FundamentalQuizQuestion {
  id: string;
  category: "nada" | "fonetik" | "hanzi";
  prompt: string;
  contextText?: string;
  audioText?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// 1. Dataset 4 Nada Dasar + Nada Netral
export const FUNDAMENTAL_TONES: FundamentalTone[] = [
  {
    toneNumber: 1,
    name: "Nada Pertama (Tinggi Datar)",
    hanziName: "阴平",
    pinyinName: "Yīnpíng",
    pitchContour: "55 (Tinggi Stabil)",
    markSymbol: "ˉ (makron)",
    description:
      "Suara diucapkan pada nada tinggi, datar, dan stabil tanpa perubahan intonasi naik maupun turun. Mirip menyanyikan nada tinggi 'aaah' saat periksa dokter.",
    mnemonic: "Tinggi konstan seperti garis lurus.",
    specimen: {
      syllable: "ma",
      hanzi: "妈",
      pinyin: "mā",
      translation: "ibu",
    },
  },
  {
    toneNumber: 2,
    name: "Nada Kedua (Naik)",
    hanziName: "阳平",
    pinyinName: "Yángpíng",
    pitchContour: "35 (Sedang ke Tinggi)",
    markSymbol: "ˊ (akut)",
    description:
      "Suara dimulai dari nada sedang lalu menanjak tajam ke nada tinggi. Mirip intonasi saat kamu heran dan bertanya: 'Hah?!' atau 'Apa?'.",
    mnemonic: "Naik bertanya dari tengah ke atas.",
    specimen: {
      syllable: "ma",
      hanzi: "麻",
      pinyin: "má",
      translation: "rami / kesemutan",
    },
  },
  {
    toneNumber: 3,
    name: "Nada Ketiga (Turun-Naik / Melengkung)",
    hanziName: "上声",
    pinyinName: "Shǎngshēng",
    pitchContour: "214 (Rendah Turun lalu Naik)",
    markSymbol: "ˇ (caron / ceklis)",
    description:
      "Suara turun rendah terlebih dahulu ke titik terendah pita suara, kemudian melompat naik kembali. Nada ini terdengar paling berayun dan berat.",
    mnemonic: "Turun ke lembah lalu naik kembali.",
    specimen: {
      syllable: "ma",
      hanzi: "马",
      pinyin: "mǎ",
      translation: "kuda",
    },
  },
  {
    toneNumber: 4,
    name: "Nada Keempat (Turun Tajam / Jatuh)",
    hanziName: "去声",
    pinyinName: "Qùshēng",
    pitchContour: "51 (Puncak Jatuh ke Dasar)",
    markSymbol: "ˋ (gravis)",
    description:
      "Suara dijatuhkan secara tegas, cepat, dan bertenaga dari nada paling tinggi ke nada paling rendah. Mirip saat kamu memberi komando tegas: 'Stop!' atau 'Tidak!'.",
    mnemonic: "Jatuh tegas bertenaga.",
    specimen: {
      syllable: "ma",
      hanzi: "骂",
      pinyin: "mà",
      translation: "memarahi",
    },
  },
  {
    toneNumber: 0,
    name: "Nada Netral (Ringan Singkat)",
    hanziName: "轻声",
    pinyinName: "Qīngshēng",
    pitchContour: "Pendek / Tanpa Kontur",
    markSymbol: "Tanpa tanda",
    description:
      "Diucapkan secara ringan, singkat, dan lembut mengikuti nada suku kata sebelumnya. Tidak memiliki tanda nada di atas huruf pinyin.",
    mnemonic: "Sentuhan ringan tanpa penekanan.",
    specimen: {
      syllable: "ma",
      hanzi: "吗",
      pinyin: "ma",
      translation: "apakah (partikel tanya)",
    },
  },
];

// Kaidah Penempatan Tanda Nada pada Vokal
export const TONE_PLACEMENT_RULES = {
  title: "Aturan Penempatan Tanda Nada (标调规则)",
  formula: "a > o > e > i / u > ü",
  rules: [
    "Jika terdapat vokal 'a', tanda nada selalu diletakkan di atas huruf 'a' (contoh: hào, cài, mā).",
    "Jika tidak ada 'a', cari vokal 'o' atau 'e' (contoh: kǒu, hěn, lèi).",
    "Jika huruf 'i' dan 'u' muncul bersamaan (seperti 'iu' atau 'ui'), tanda nada diletakkan pada huruf vokal yang paling belakang (contoh: liù, guì).",
    "Titik dua pada huruf 'ü' tetap dipertahankan saat diberi tanda nada (contoh: lǘ, nǚ), kecuali jika bergabung dengan inisial j, q, x di mana titik dua dilepas (contoh: qù, xǔ).",
  ],
};

// 2. Dataset 23 Inisial (Shēngmǔ / Konsonan Pinyin)
export const FUNDAMENTAL_INITIALS: FundamentalInitial[] = [
  {
    letter: "b",
    category: "Bibir (Labial)",
    articulationTip: "Mirip bunyi 'p' lembut dalam bahasa Indonesia; tidak berhembus (tanpa letupan udara).",
    exampleHanzi: "爸",
    examplePinyin: "bà",
    exampleTranslation: "ayah",
  },
  {
    letter: "p",
    category: "Bibir (Labial Aspirasi)",
    articulationTip: "Mirip bunyi 'p' kuat dengan hembusan udara nyata dari mulut.",
    exampleHanzi: "朋",
    examplePinyin: "péng",
    exampleTranslation: "teman",
  },
  {
    letter: "m",
    category: "Bibir Sengau (Nasal)",
    articulationTip: "Mirip 'm' biasa dalam bahasa Indonesia; udara mengalir melalui rongga hidung.",
    exampleHanzi: "妈",
    examplePinyin: "mā",
    exampleTranslation: "ibu",
  },
  {
    letter: "f",
    category: "Bibir-Gigi (Labiodental)",
    articulationTip: "Gigi atas bersentuhan ringan dengan bibir bawah, seperti 'f' pada 'fajar'.",
    exampleHanzi: "饭",
    examplePinyin: "fàn",
    exampleTranslation: "nasi",
  },
  {
    letter: "d",
    category: "Ujung Lidah (Alveolar)",
    articulationTip: "Ujung lidah menempel gusi atas tanpa hembusan udara; mirip 't' lembut bahasa Indonesia.",
    exampleHanzi: "大",
    examplePinyin: "dà",
    exampleTranslation: "besar",
  },
  {
    letter: "t",
    category: "Ujung Lidah Aspirasi",
    articulationTip: "Ujung lidah menempel gusi atas disertai hembusan udara kuat.",
    exampleHanzi: "天",
    examplePinyin: "tiān",
    exampleTranslation: "hari / langit",
  },
  {
    letter: "n",
    category: "Gusi Sengau (Nasal)",
    articulationTip: "Mirip 'n' pada bahasa Indonesia.",
    exampleHanzi: "你",
    examplePinyin: "nǐ",
    exampleTranslation: "kamu",
  },
  {
    letter: "l",
    category: "Samping Lidah (Lateral)",
    articulationTip: "Mirip 'l' pada 'lampu'.",
    exampleHanzi: "来",
    examplePinyin: "lái",
    exampleTranslation: "datang",
  },
  {
    letter: "g",
    category: "Pangkal Lidah (Velar)",
    articulationTip: "Pangkal lidah menyentuh langit-langit lunak tanpa hembusan; mirip 'k' lembut.",
    exampleHanzi: "个",
    examplePinyin: "gè",
    exampleTranslation: "buah / butir (penggolong)",
  },
  {
    letter: "k",
    category: "Pangkal Lidah Aspirasi",
    articulationTip: "Pangkal lidah menekan lalu dilepas dengan hembusan angin kuat; mirip 'kh' tegas.",
    exampleHanzi: "看",
    examplePinyin: "kàn",
    exampleTranslation: "melihat / membaca",
  },
  {
    letter: "h",
    category: "Gesekan Tenggorokan",
    articulationTip: "Mirip 'h' berat seperti berbisik dari dasar tenggorokan.",
    exampleHanzi: "好",
    examplePinyin: "hǎo",
    exampleTranslation: "baik",
  },
  {
    letter: "j",
    category: "Langit-langit Keras (Palatal)",
    articulationTip: "Lidah datar menempel langit-langit depan tanpa hembusan; mirip bunyi 'c' sangat tipis.",
    exampleHanzi: "家",
    examplePinyin: "jiā",
    exampleTranslation: "rumah / keluarga",
  },
  {
    letter: "q",
    category: "Palatal Aspirasi",
    articulationTip: "Posisi lidah sama dengan 'j', tetapi ditiupkan udara kuat; mirip 'ch' berdesis tajam.",
    exampleHanzi: "七",
    examplePinyin: "qī",
    exampleTranslation: "tujuh",
  },
  {
    letter: "x",
    category: "Palatal Gesekan",
    articulationTip: "Desis halus antara 's' dan 'sy' dengan sudut bibir ditarik melebar ke samping.",
    exampleHanzi: "谢",
    examplePinyin: "xiè",
    exampleTranslation: "terima kasih",
  },
  {
    letter: "zh",
    category: "Lidah Ditekuk (Retroflex)",
    articulationTip: "Ujung lidah ditekuk ke atas menyentuh langit-langit keras tanpa hembusan; mirip 'j' tebal.",
    exampleHanzi: "中",
    examplePinyin: "zhōng",
    exampleTranslation: "tengah",
  },
  {
    letter: "ch",
    category: "Retroflex Aspirasi",
    articulationTip: "Ujung lidah ditekuk ke atas dengan hembusan udara kuat; mirip 'ch' tebal.",
    exampleHanzi: "吃",
    examplePinyin: "chī",
    exampleTranslation: "makan",
  },
  {
    letter: "sh",
    category: "Retroflex Gesekan",
    articulationTip: "Ujung lidah ditekuk ke atas berdesis; mirip 'sy' tebal.",
    exampleHanzi: "水",
    examplePinyin: "shuǐ",
    exampleTranslation: "air",
  },
  {
    letter: "r",
    category: "Retroflex Getar Ringan",
    articulationTip: "Posisi lidah sama seperti 'sh' tetapi pita suara digetarkan; mirip bunyi 'r' bahasa Inggris berpadu desis.",
    exampleHanzi: "人",
    examplePinyin: "rén",
    exampleTranslation: "orang",
  },
  {
    letter: "z",
    category: "Gigi Depan (Dental Sibilant)",
    articulationTip: "Ujung lidah menyentuh bagian belakang gigi depan atas; mirip bunyi 'dz'.",
    exampleHanzi: "在",
    examplePinyin: "zài",
    exampleTranslation: "berada di",
  },
  {
    letter: "c",
    category: "Dental Sibilant Aspirasi",
    articulationTip: "Posisi lidah sama dengan 'z' dengan hembusan udara kuat; mirip 'ts' pada 'tsunami'.",
    exampleHanzi: "菜",
    examplePinyin: "cài",
    exampleTranslation: "hidangan / sayur",
  },
  {
    letter: "s",
    category: "Dental Sibilant Gesekan",
    articulationTip: "Desis gigi depan biasa; mirip 's' pada 'satu'.",
    exampleHanzi: "四",
    examplePinyin: "sì",
    exampleTranslation: "empat",
  },
  {
    letter: "y",
    category: "Semivokal (Pengganti i)",
    articulationTip: "Digunakan sebagai awalan suku kata yang diawali vokal 'i'.",
    exampleHanzi: "月",
    examplePinyin: "yuè",
    exampleTranslation: "bulan",
  },
  {
    letter: "w",
    category: "Semivokal (Pengganti u)",
    articulationTip: "Digunakan sebagai awalan suku kata yang diawali vokal 'u'.",
    exampleHanzi: "我",
    examplePinyin: "wǒ",
    exampleTranslation: "saya",
  },
];

// 3. Dataset 24 Final (Yùnmǔ / Vokal Pinyin)
export const FUNDAMENTAL_FINALS: FundamentalFinal[] = [
  // 6 Vokal Tunggal
  {
    letter: "a",
    type: "Vokal Tunggal",
    soundDescription: "Mulut terbuka lebar rileks, seperti 'a' pada 'ayah'.",
    exampleHanzi: "八",
    examplePinyin: "bā",
    exampleTranslation: "delapan",
  },
  {
    letter: "o",
    type: "Vokal Tunggal",
    soundDescription: "Bibir membulat penuh, mirip 'o' pada 'toko'.",
    exampleHanzi: "多",
    examplePinyin: "duō",
    exampleTranslation: "banyak",
  },
  {
    letter: "e",
    type: "Vokal Tunggal",
    soundDescription: "Bukan 'e' biasa; mulut setengah terbuka dengan bibir melebar, mirip suara 'e' pada 'lebah' namun lebih dalam di tenggorokan.",
    exampleHanzi: "喝",
    examplePinyin: "hē",
    exampleTranslation: "minum",
  },
  {
    letter: "i",
    type: "Vokal Tunggal",
    soundDescription: "Sudut bibir ditarik ke samping seperti tersenyum, mirip 'i' pada 'ibu'.",
    exampleHanzi: "一",
    examplePinyin: "yī",
    exampleTranslation: "satu",
  },
  {
    letter: "u",
    type: "Vokal Tunggal",
    soundDescription: "Bibir mencucur ke depan, mirip 'u' pada 'udara'.",
    exampleHanzi: "不",
    examplePinyin: "bù",
    exampleTranslation: "tidak",
  },
  {
    letter: "ü",
    type: "Vokal Tunggal",
    soundDescription: "Bentuk bibir membulat seperti bersiul (posisi 'u') tetapi lidah membunyikan suara 'i'.",
    exampleHanzi: "女",
    examplePinyin: "nǚ",
    exampleTranslation: "wanita",
  },

  // 9 Vokal Majemuk
  {
    letter: "ai",
    type: "Vokal Majemuk",
    soundDescription: "Meluncur dari 'a' ke 'i', seperti 'pantai'.",
    exampleHanzi: "买",
    examplePinyin: "mǎi",
    exampleTranslation: "membeli",
  },
  {
    letter: "ei",
    type: "Vokal Majemuk",
    soundDescription: "Meluncur dari 'e' ke 'i', mirip 'hei'.",
    exampleHanzi: "北",
    examplePinyin: "běi",
    exampleTranslation: "utara",
  },
  {
    letter: "ui (wei)",
    type: "Vokal Majemuk",
    soundDescription: "Singkatan dari 'uei'; meluncur dari 'u' menuju 'ei'.",
    exampleHanzi: "对",
    examplePinyin: "duì",
    exampleTranslation: "benar / tepat",
  },
  {
    letter: "ao",
    type: "Vokal Majemuk",
    soundDescription: "Meluncur dari 'a' ke 'o', mirip 'pulau'.",
    exampleHanzi: "高",
    examplePinyin: "gāo",
    exampleTranslation: "tinggi",
  },
  {
    letter: "ou",
    type: "Vokal Majemuk",
    soundDescription: "Meluncur dari 'o' ke 'u', mirip 'low' dalam bahasa Inggris.",
    exampleHanzi: "口",
    examplePinyin: "kǒu",
    exampleTranslation: "mulut",
  },
  {
    letter: "iu (you)",
    type: "Vokal Majemuk",
    soundDescription: "Singkatan dari 'iou'; meluncur dari 'i' menuju 'ou'.",
    exampleHanzi: "九",
    examplePinyin: "jiǔ",
    exampleTranslation: "sembilan",
  },
  {
    letter: "ie",
    type: "Vokal Majemuk",
    soundDescription: "Meluncur dari 'i' menuju suara 'e' terbuka.",
    exampleHanzi: "写",
    examplePinyin: "xiě",
    exampleTranslation: "menulis",
  },
  {
    letter: "üe",
    type: "Vokal Majemuk",
    soundDescription: "Meluncur dari vokal bulat 'ü' menuju 'e'.",
    exampleHanzi: "月",
    examplePinyin: "yuè",
    exampleTranslation: "bulan",
  },
  {
    letter: "er",
    type: "Vokal Majemuk",
    soundDescription: "Vokal retroflex unik; lidah digulung ke atas di akhir suara.",
    exampleHanzi: "二",
    examplePinyin: "èr",
    exampleTranslation: "dua",
  },

  // 9 Vokal Nasal
  {
    letter: "an",
    type: "Vokal Sengau (Nasal)",
    soundDescription: "Vokal 'a' diikuti dengung ujung lidah menempel gusi depan (depan).",
    exampleHanzi: "三",
    examplePinyin: "sān",
    exampleTranslation: "tiga",
  },
  {
    letter: "en",
    type: "Vokal Sengau (Nasal)",
    soundDescription: "Vokal 'e' diikuti sengau depan 'n'.",
    exampleHanzi: "很",
    examplePinyin: "hěn",
    exampleTranslation: "sangat",
  },
  {
    letter: "in",
    type: "Vokal Sengau (Nasal)",
    soundDescription: "Vokal 'i' diikuti sengau depan 'n'.",
    exampleHanzi: "您",
    examplePinyin: "nín",
    exampleTranslation: "Anda (hormat)",
  },
  {
    letter: "un (wen)",
    type: "Vokal Sengau (Nasal)",
    soundDescription: "Singkatan dari 'uen'; meluncur dari 'u' ke 'en'.",
    exampleHanzi: "问",
    examplePinyin: "wèn",
    exampleTranslation: "bertanya",
  },
  {
    letter: "ün",
    type: "Vokal Sengau (Nasal)",
    soundDescription: "Vokal bulat 'ü' diikuti sengau depan 'n'.",
    exampleHanzi: "云",
    examplePinyin: "yún",
    exampleTranslation: "awan",
  },
  {
    letter: "ang",
    type: "Vokal Sengau (Nasal)",
    soundDescription: "Sengau belakang rongga tekak; mirip 'ng' pada 'lapang'.",
    exampleHanzi: "上",
    examplePinyin: "shàng",
    exampleTranslation: "atas / naik",
  },
  {
    letter: "eng",
    type: "Vokal Sengau (Nasal)",
    soundDescription: "Vokal 'e' diikuti sengau belakang rongga tenggorokan.",
    exampleHanzi: "冷",
    examplePinyin: "lěng",
    exampleTranslation: "dingin",
  },
  {
    letter: "ing",
    type: "Vokal Sengau (Nasal)",
    soundDescription: "Vokal 'i' diikuti sengau belakang 'ng'.",
    exampleHanzi: "明",
    examplePinyin: "míng",
    exampleTranslation: "terang / besok",
  },
  {
    letter: "ong",
    type: "Vokal Sengau (Nasal)",
    soundDescription: "Bibir membulat diikuti dengung rongga hidung belakang.",
    exampleHanzi: "中",
    examplePinyin: "zhōng",
    exampleTranslation: "tengah / Tiongkok",
  },
];

// 4. Dataset 8 Goresan Dasar Karakter Hanzi (Yǒngzì Bāfǎ)
export const FUNDAMENTAL_STROKES: FundamentalStroke[] = [
  {
    name: "Héng (Mendatar)",
    hanzi: "横",
    pinyin: "Héng",
    direction: "Kiri ke Kanan",
    visualSymbol: "一",
    description: "Goresan lurus mendatar dimulai dari kiri dengan tekanan stabil dan berakhir mantap di kanan.",
    exampleChar: "一",
    examplePinyin: "yī",
    exampleMeaning: "satu",
  },
  {
    name: "Shù (Tegak Lurus)",
    hanzi: "竖",
    pinyin: "Shù",
    direction: "Atas ke Bawah",
    visualSymbol: "丨",
    description: "Goresan vertikal tegas tegak lurus dari atas ditarik ke bawah.",
    exampleChar: "十",
    examplePinyin: "shí",
    exampleMeaning: "sepuluh",
  },
  {
    name: "Piě (Miring Melengkung Kiri)",
    hanzi: "撇",
    pinyin: "Piě",
    direction: "Kanan Atas ke Kiri Bawah",
    visualSymbol: "丿",
    description: "Dimulai dengan tekanan mantap di kanan atas, lalu meluncur menipis ke arah kiri bawah.",
    exampleChar: "八",
    examplePinyin: "bā",
    exampleMeaning: "delapan",
  },
  {
    name: "Nà (Miring Tebal Kanan)",
    hanzi: "捺",
    pinyin: "Nà",
    direction: "Kiri Atas ke Kanan Bawah",
    visualSymbol: "乀",
    description: "Dimulai ringan lalu menebal saat meluncur ke kanan bawah dan berakhir anggun mendatar.",
    exampleChar: "人",
    examplePinyin: "rén",
    exampleMeaning: "orang",
  },
  {
    name: "Diǎn (Titik Tekanan)",
    hanzi: "点",
    pinyin: "Diǎn",
    direction: "Tekanan Pendek",
    visualSymbol: "丶",
    description: "Goresan titik pendek tegas seperti tetesan air yang menetes di atas kertas.",
    exampleChar: "下",
    examplePinyin: "xià",
    exampleMeaning: "bawah",
  },
  {
    name: "Tí (Jentik Naik)",
    hanzi: "提",
    pinyin: "Tí",
    direction: "Kiri Bawah ke Kanan Atas",
    visualSymbol: "㇀",
    description: "Goresan cepat dimulai mantap dari kiri bawah menjentik tajam menipis ke kanan atas.",
    exampleChar: "我",
    examplePinyin: "wǒ",
    exampleMeaning: "saya",
  },
  {
    name: "Zhé (Belokan Siku)",
    hanzi: "折",
    pinyin: "Zhé",
    direction: "Menikung Patah",
    visualSymbol: "𠃍",
    description: "Goresan satu tarikan pena yang membelok patah (misal horizontal berbelok vertikal tanpa mengangkat pena).",
    exampleChar: "口",
    examplePinyin: "kǒu",
    exampleMeaning: "mulut",
  },
  {
    name: "Gōu (Kait Ujung)",
    hanzi: "钩",
    pinyin: "Gōu",
    direction: "Sentakan Mengait",
    visualSymbol: "亅",
    description: "Kait tajam di ujung goresan vertikal atau miring, dibuat dengan sentakan cepat ke dalam.",
    exampleChar: "小",
    examplePinyin: "xiǎo",
    exampleMeaning: "kecil",
  },
];

// 5. Dataset 7 Kaidah Utama Urutan Menulis Hanzi (Bǐshùn Guīzé)
export const FUNDAMENTAL_STROKE_RULES: FundamentalStrokeRule[] = [
  {
    number: "01",
    ruleTitle: "Dari Atas ke Bawah",
    hanziPrinciple: "先上后下",
    pinyinPrinciple: "Xiān shàng hòu xià",
    explanation: "Jika suatu karakter tersusun atas lapisan horizontal bertingkat, tulis goresan paling atas terlebih dahulu.",
    exampleChar: "三",
    examplePinyin: "sān",
    exampleMeaning: "tiga",
    strokeSteps: "Goresan atas → goresan tengah → goresan bawah",
  },
  {
    number: "02",
    ruleTitle: "Dari Kiri ke Kanan",
    hanziPrinciple: "先左后右",
    pinyinPrinciple: "Xiān zuǒ hòu yòu",
    explanation: "Komponen yang berada di sisi kiri ditulis sebelum komponen yang berada di sisi kanan.",
    exampleChar: "你",
    examplePinyin: "nǐ",
    exampleMeaning: "kamu",
    strokeSteps: "Radikal orang (亻) di kiri → komponen kanan (尔)",
  },
  {
    number: "03",
    ruleTitle: "Horizontal Sebelum Vertikal",
    hanziPrinciple: "先横后竖",
    pinyinPrinciple: "Xiān héng hòu shù",
    explanation: "Ketika dua goresan saling bersilangan tegak lurus, goresan mendatar ditulis mendahului goresan tegak.",
    exampleChar: "十",
    examplePinyin: "shí",
    exampleMeaning: "sepuluh",
    strokeSteps: "Tarik garis mendatar (一) → tarik garis vertikal (丨)",
  },
  {
    number: "04",
    ruleTitle: "Miring Kiri Sebelum Miring Kanan",
    hanziPrinciple: "先撇后捺",
    pinyinPrinciple: "Xiān piě hòu nà",
    explanation: "Goresan miring ke kiri (Piě) selalu ditarik terlebih dahulu sebelum goresan miring ke kanan (Nà).",
    exampleChar: "人",
    examplePinyin: "rén",
    exampleMeaning: "orang",
    strokeSteps: "Goresan kiri (丿) → goresan tebal kanan (乀)",
  },
  {
    number: "05",
    ruleTitle: "Luar Sebelum Dalam",
    hanziPrinciple: "先外后内",
    pinyinPrinciple: "Xiān wài hòu nèi",
    explanation: "Tulis bingkai pembungkus luar sebelum mengisi komponen yang terletak di dalam bingkai.",
    exampleChar: "月",
    examplePinyin: "yuè",
    exampleMeaning: "bulan",
    strokeSteps: "Bingkai luar melengkung → dua goresan isi di dalam",
  },
  {
    number: "06",
    ruleTitle: "Masuk Dulu, Tutup Gerbang di Akhir",
    hanziPrinciple: "先进入后关门",
    pinyinPrinciple: "Xiān jìnrù hòu guānmén",
    explanation: "Untuk karakter berbingkai kotak penuh: buat sisi kiri dan atas bingkai, tulis seluruh isi dalamnya, lalu tutup garis bawah bingkai di langkah terakhir.",
    exampleChar: "日",
    examplePinyin: "rì",
    exampleMeaning: "hari / matahari",
    strokeSteps: "Garis kiri → siku atas-kanan → garis tengah → tutup bawah",
  },
  {
    number: "07",
    ruleTitle: "Tengah Sebelum Kedua Sisi",
    hanziPrinciple: "先中间后两边",
    pinyinPrinciple: "Xiān zhōngjiān hòu liǎngbiān",
    explanation: "Untuk karakter yang simetris dengan poros di tengah, tulis pilar utama di tengah terlebih dahulu, baru sayap kiri dan sayap kanannya.",
    exampleChar: "小",
    examplePinyin: "xiǎo",
    exampleMeaning: "kecil",
    strokeSteps: "Kait tengah (亅) → titik kiri (丶) → titik kanan (丿)",
  },
];

// 6. Dataset Latihan Fondasi Dasar
export const FUNDAMENTAL_QUIZ: FundamentalQuizQuestion[] = [
  {
    id: "fq-01",
    category: "nada",
    prompt: "Pilih kontur nada yang tepat untuk kata 'mǎ' (马 - kuda):",
    contextText: "mǎ (马)",
    audioText: "马",
    options: [
      "Nada 3 (Turun-Naik rendah)",
      "Nada 1 (Tinggi datar)",
      "Nada 2 (Naik tajam)",
      "Nada 4 (Jatuh bertenaga)",
    ],
    correctAnswer: "Nada 3 (Turun-Naik rendah)",
    explanation:
      "Karakter '马' (mǎ) memiliki tanda nada ceklis (ˇ) yang menandakan Nada Ketiga, berayun turun ke nada rendah lalu naik kembali.",
  },
  {
    id: "fq-02",
    category: "fonetik",
    prompt: "Manakah aturan penempatan tanda nada pinyin yang benar jika ada vokal 'a' dalam suku kata?",
    contextText: "Hierarki Vokal: a > o > e > i/u > ü",
    options: [
      "Tanda nada selalu diletakkan di atas huruf 'a'",
      "Tanda nada diletakkan pada huruf terakhir suku kata",
      "Tanda nada bebas diletakkan di mana saja",
      "Tanda nada hanya boleh diletakkan di atas konsonan",
    ],
    correctAnswer: "Tanda nada selalu diletakkan di atas huruf 'a'",
    explanation:
      "Dalam hierarki penempatan nada pinyin, vokal 'a' menempati prioritas tertinggi mutlak. Di mana pun 'a' berada, tanda nada wajib berada di atas 'a'.",
  },
  {
    id: "fq-03",
    category: "hanzi",
    prompt: "Pada karakter '十' (shí - sepuluh), goresan manakah yang wajib ditulis terlebih dahulu?",
    contextText: "Kaidah Bǐshùn: 先横后竖",
    options: [
      "Garis mendatar horizontal (横 - Héng)",
      "Garis tegak vertikal (竖 - Shù)",
      "Bebas dari arah mana saja",
      "Dari titik pertemuan tengah",
    ],
    correctAnswer: "Garis mendatar horizontal (横 - Héng)",
    explanation:
      "Berdasarkan kaidah '先横后竖' (Horizontal sebelum Vertikal), garis mendatar (一) wajib ditarik terlebih dahulu sebelum dipotong oleh garis tegak (丨).",
  },
  {
    id: "fq-04",
    category: "fonetik",
    prompt: "Bagaimana cara melafalkan vokal bulat 'ü' (contoh: nǚ - wanita) dengan tepat?",
    contextText: "Vokal Khusus: ü (yùnmǔ)",
    audioText: "女",
    options: [
      "Bibir membulat seperti bersiul (posisi u), tetapi lidah membunyikan suara 'i'",
      "Sama persis dengan huruf 'u' biasa",
      "Sama persis dengan huruf 'i' pada kata ibu",
      "Diucapkan dengan dengung hidung tanpa membuka bibir",
    ],
    correctAnswer: "Bibir membulat seperti bersiul (posisi u), tetapi lidah membunyikan suara 'i'",
    explanation:
      "Vokal 'ü' dibentuk dengan mempertahankan bentuk bibir bundar rapat seperti bersiul (posisi u), lalu secara bersamaan membunyikan getaran 'i'.",
  },
  {
    id: "fq-05",
    category: "hanzi",
    prompt: "Pada karakter berbingkai kotak penuh seperti '日' (rì) atau '国' (guó), kapankah garis penutup bawah ditarik?",
    contextText: "Kaidah Bǐshùn: 先进入后关门",
    options: [
      "Paling akhir setelah seluruh isi dalam selesai ditulis",
      "Paling awal sebelum membuat sisi lainnya",
      "Bersamaan dengan membuat garis kiri",
      "Di langkah kedua setelah garis atas",
    ],
    correctAnswer: "Paling akhir setelah seluruh isi dalam selesai ditulis",
    explanation:
      "Kaidah '先进入后关门' (Masuk dulu, tutup gerbang di akhir): kita membuat pintu masuk, menulis isi di dalam bingkai, baru menutup pintu bawah di langkah paling akhir.",
  },
];
